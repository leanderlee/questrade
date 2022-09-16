import _ from 'lodash'
import fetch from 'isomorphic-unfetch'
import moment from 'moment'

class QuestradeOptions {
  constructor(api, data) {
    Object.assign(this, data)
    this.api = api
  }
  async getQuote() {
    const { callSymbolId, putSymbolId } = this
    const quotes = await this.api.getQuotesById([callSymbolId, putSymbolId])
    return { call: quotes[callSymbolId], put: quotes[putSymbolId] }
  }
}

class QuestradeSymbol {
  constructor(api, data) {
    Object.assign(this, data)
    this.api = api
  }
  async getOptionChain() {
    const { api, symbolId } = this
    const { optionChain } = await api.request('GET', `/symbols/${symbolId}/options`)
    optionChain.forEach((chain) => {
      chain.expiryDate = moment(chain.expiryDate).format('YYYY-MM-DD')
    })
    return _.chain(optionChain)
      .keyBy('expiryDate')
      .mapValues((option) => {
        const { chainPerStrikePrice } = option.chainPerRoot[0]
        const chainItems = chainPerStrikePrice.map(data => new QuestradeOptions(api, data))
        return _.keyBy(chainItems, 'strikePrice')
      })
      .value()
  }
  async getQuote() {
    const { quotes } = await this.api.request('GET', `/markets/quotes/${this.symbolId}`)
    return quotes[0]
  }
  async getCandles(params = {}) {
    const {
      interval = 'OneDay',
      startTime: inputStartTime,
      endTime: inputEndTime,
    } = params
    if (inputStartTime && !moment(inputStartTime).isValid()) {
      throw new Error(`Invalid start time "${inputStartTime}".`)
    }
    if (inputEndTime && !moment(inputEndTime).isValid()) {
      throw new Error(`Invalid start time "${inputEndTime}".`)
    }
    const startTime = inputStartTime ? moment(inputStartTime).toISOString() : moment().startOf('day').subtract(30, 'days').toISOString()
    const endTime = inputEndTime ? moment(inputEndTime).toISOString() : moment().toISOString()
    const { candles } = await this.api.request('GET', `/markets/candles/${this.symbolId}`, { startTime, endTime, interval })
    return candles
  }
}

class QuestradeAccount {
  constructor(api, { number: accountId, ...data }) {
    Object.assign(this, data)
    this.api = api
    this.accountId = accountId
  }

  async request(method, endpoint, params) {
    return this.api.request(method, `/accounts/${this.accountId}${endpoint}`, params);
  }

  async getPositions() {
    return this.request('GET', '/positions')
  }
  async getBalances() {
    return this.request('GET', '/balances')
  }
  async getExecutions() {
    return this.request('GET', '/executions')
  }
  async createOrder(params) {
    return this.request('POST', '/orders', params)
  }
  async getOrders(params) {
    return this.request('GET', '/orders', params)
  }
  async getOpenOrders() {
    return this.getOrders({ stateFilter: 'Open' })
  }
  async getClosedOrders() {
    return this.getOrders({ stateFilter: 'Closed' })
  }
  async getAllOrders() {
    return this.getOrders({ stateFilter: 'All' })
  }
  async getOrder(orderId, params) {
    return this.request('GET', `/orders/${orderId}`, params)
  }
  async updateOrder(orderId, params) {
    return this.request('POST', `/orders/${orderId}`, params)
  }
  async removeOrder(orderId) {
    return this.request('DELETE', `/orders/${orderId}`)
  }
  async testOrder(params) {
    return this.request('POST', '/orders/impact', params)
  }
  async createStrategy(params) {
    return this.request('POST', '/orders/strategy', params)
  }
  async testStrategy(params) {
    return this.request('POST', '/orders/strategy/impact', params)
  }
  async getActivities(params = {}) {
    const { startTime: inputStartTime, endTime: inputEndTime } = params
    if (inputStartTime && !moment(inputStartTime).isValid()) {
      throw new Error(`Invalid start time "${inputStartTime}".`)
    }
    if (inputEndTime && !moment(inputEndTime).isValid()) {
      throw new Error(`Invalid start time "${inputEndTime}".`)
    }
    const startTime = inputStartTime ? moment(inputStartTime).toISOString() : moment().startOf('day').subtract(30, 'days').toISOString();
    const endTime = inputEndTime ? moment(inputEndTime).toISOString() : moment().toISOString();
    return this.request('GET', '/activities', { startTime, endTime })
  }
}

/**
 * Questrade Class to interact with Questrade API
 */
class QuestradeApi {
  constructor(opts = {}) {
    if (typeof opts === 'string') {
      opts = { clientId: opts }
    }
    const {
      isDev = false, // Set to true if using a practice account (http://www.questrade.com/api/free-practice-account)
      apiVersion = 'v1', // Used as part of the API URL
      clientId,
      accessToken,
    } = opts
    this.isDev = isDev
    this.apiVersion = apiVersion
    this.clientId = clientId // Stores The unique token that is used to call each API call, Changes everytime you Refresh Tokens (aka Login)
    this.apiUrl = '' // Stores the URL (without the endpoint) to use for regular GET/POST Apis
    this.accessToken = accessToken // The default Account agains wich the API are made. GetAccounts() will return the possible values
    if (this.isDev) {
      this.authUrl = 'https://practicelogin.questrade.com'
    } else {
      this.authUrl = 'https://login.questrade.com'
    }
  }
  get isConnected() {
    return !!this.accessToken
  }

  // Refreshed the tokem (aka Logs in) using the latest RefreshToken (or the SeedToken if no previous saved file)
  async connect() {
    const authUrl = `${this.authUrl}/oauth2/token?${new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.clientId,
    })}`
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const creds = await response.json()
    const { api_server, access_token, refresh_token } = creds
    this.apiUrl = `${api_server}${this.apiVersion}`
    this.accessToken = access_token
    return refresh_token
  }

  // Method that actually mades the GET/POST request to Questrade
  async request(method, endpoint, params = {}) {
    if (!this.accessToken) {
      throw new Error('Not connected')
    }
    let url = `${this.apiUrl}${endpoint}`
    let body
    if (method === 'GET') {
      url = `${url}?${new URLSearchParams(params)}`
    } else {
      body = JSON.stringify(params)
    }
    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body,
    })
    return response.json()
  }

  async getPrimaryAccount() {
    const accounts = await this.getAccounts()
    for (const accountId in accounts) {
      const account = accounts[accountId]
      const { isPrimary } = account
      if (isPrimary) {
        return account
      }
    }
    throw new Error('No primary account')
  }
  async getAccounts() {
    const { accounts: accountData } = await this.request('GET', '/accounts')
    const accounts = accountData.map((data) => new QuestradeAccount(this, data))
    return _.keyBy(accounts, 'accountId')
  }

  getSymbol(id, cb) {
    let params = false;
    if (typeof id === 'number') {
      params = {
        id,
      };
    } else if (typeof id === 'string') {
      params = {
        names: `${id}`,
      };
    }
    if (params === false) {
      return cb({
        message: 'missing_id',
      });
    }
    this._api('GET', '/symbols', params, (err, response) => {
      if (err) return cb(err);
      if (!response.symbols.length) {
        return cb({
          message: 'symbol_not_found',
        });
      }
      cb(null, response.symbols[0]);
    });
  }
  async getSymbols(tickers) {
    const { symbols } = await this.request('GET', '/symbols', { names: tickers.join(',') })
    return symbols.map(data => new QuestradeSymbol(this, data))
  }
  async getSymbol(ticker) {
    const [symbol] = await this.getSymbols([ticker])
    return symbol
  }
  async searchSymbols(prefix, offset = 0) {
    if (!prefix) {
      throw new Error('Missing prefix')
    }
    const { symbols } = await this.request('GET', '/symbols/search', { prefix, offset })
    return symbols.map(data => new QuestradeSymbol(this, data))
  }
  async getMarkets() {
    const { markets } = await this._api('GET', '/markets')
    return markets
  }
  async getQuotesById(symbolIds) {
    const { quotes } = await this.request('GET', '/markets/quotes', { ids: symbolIds.join(',') })
    return _.keyBy(quotes, 'symbolId')
  }
}


module.exports = QuestradeApi
