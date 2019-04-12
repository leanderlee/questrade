/** @format */

import { AxiosRequestConfig, AxiosResponse, default as axios } from 'axios';
import { EventEmitter as EE } from 'events';
import { readFileSync, writeFileSync } from 'fs';
import { chain, keyBy, pick } from 'lodash';
import { sync } from 'mkdirp';
import { default as moment } from 'moment';
import { dirname } from 'path';
import { ICreds } from '../ICreds';
import { QuestradeOptions } from '../IQuestradeOptions';
import { IStockSymbol } from '../IStockSymbol';

export const questrade = async (opts: QuestradeOptions, cb?: any) => {
  const qt = await new QuestradeClass(opts);
  qt.on('ready', () => {
    if (typeof cb === 'function') {
      cb(qt);
    }
  });
  return qt;
};
export class QuestradeClass extends EE {
  public seedToken: string;
  private _accessToken: string;
  private _test: boolean;
  private _keyDir: string;
  private _apiVersion: string;
  private _keyFile: string;
  private _account: string;
  private _apiServer: string;
  private _refreshToken: string;
  private _apiUrl: string;
  private _authUrl: string;

  public constructor(opts?: QuestradeOptions) {
    super();

    this._test = false;
    this._keyDir = './keys';
    this._apiVersion = 'v1';
    this._keyFile = '';
    this.seedToken = '';
    this._account = '';

    try {
      if (typeof opts === 'undefined' || opts === undefined) {
        throw new Error('questrade_missing_api_key or options');
      }
      if (typeof opts === 'string' && opts.indexOf('/') !== -1) {
        this._keyFile = opts;
      }
      if (typeof opts === 'string' && opts.indexOf('/') === -1) {
        this.seedToken = opts;
      }
      if (typeof opts === 'object') {
        // Set to true if using a practice account
        // (http://www.questrade.com/api/free-practice-account)
        this._test = opts.test === undefined ? false : !!opts.test;
        // Directory where the last refreshToken is stored.
        // The file name will have to be seedToken
        this._keyDir = opts.keyDir || './keys';
        // Used as part of the API URL
        this._apiVersion = opts.apiVersion || 'v1';
        // File that stores the last refreshToken.
        // Not really neede if you keep the seedToken and the keyDir
        this._keyFile = opts.keyFile || '';
        // The original token obtained mannuelly from the interface
        this.seedToken = opts.seedToken || '';
        // The default Account agains wich the API are made.
        // GetAccounts() will return the possible values
        this._account = `${opts.account}` || '';
      }
      // The refresh token used to login and get the new accessToken,
      // the new refreshToken (next time to log in) and the api_server
      this._refreshToken = '';
      // Stores The unique token that is used to call each API call,
      //  Changes everytime you Refresh Tokens (aka Login)
      this._accessToken = '';
      // The server your connection needs to be made to (changes sometimes)
      // this._apiServer = '';
      // Strores the URL (without the endpoint) to use for regular GET/POST Apis
      this._apiUrl = '';
      this._apiServer = '';
      this._authUrl = this._test
        ? 'https://practicelogin.q.com'
        : 'https://login.questrade.com';
      // Running the Authentification process and emit 'ready' when done
      // if (!!this._account) this.emit('ready');

      const loadKey = async () => {
        try {
          await this._loadKey();
          this.emit('keyLoaded');
        } catch (error) {
          console.error(error.message);
          this.emit('loadKeyError');
          this.emit('error');
          throw new Error(error.message);
        }
      };
      const refreshKey = async () => {
        try {
          await this._refreshKey();
          this.emit('keyRefreshed');
        } catch (error) {
          console.error(error.message);
          this.emit('refreshKeyError');
          this.emit('error');
          throw new Error(error.message);
        }
      };
      const setPrimaryAccount = async () => {
        try {
          await this.getPrimaryAccount();
          this.emit('accountSeted');
        } catch (error) {
          console.error(error.message);
          this.emit('setPrimaryAccountError');
          this.emit('error');
          throw new Error(error.message);
        }
      };

      const main = async () => {
        try {
          await loadKey();
          await refreshKey();
          await setPrimaryAccount();

          this.emit('ready');
        } catch (error) {
          console.error(error.message);
          this.emit('error');
          throw new Error(error.message);
        }
      };

      main()
        .then(() => {
          //
        })
        .catch(err => {
          throw new Error(err.message);
        });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getPrimaryAccount() {
    try {
      const accounts: any = await this.getAccounts();
      if (!accounts || !Object.keys(accounts).length) {
        throw new Error('no_accounts_found');
      }
      const allAccountsNumber: string[] = [];
      let primaryAccount: string[] = await Object.keys(accounts).filter(
        (accountNumber: any) => {
          allAccountsNumber.push(accountNumber);
          return accounts[accountNumber].isPrimary;
        }
      );
      if (!primaryAccount.length) {
        primaryAccount = allAccountsNumber;
      }
      this._account = primaryAccount[0];
      return this._account;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getAccounts() {
    try {
      const response = await this._api('GET', '/accounts');
      return keyBy(response.accounts, 'number');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getPositions() {
    try {
      return this._accountApi('GET', '/positions');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getBalances() {
    try {
      return this._accountApi('GET', '/balances');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getExecutions() {
    try {
      return this._accountApi('GET', '/executions');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getOrder(id: any) {
    try {
      const response: any = await this._accountApi('GET', `/orders/${id}`);
      if (!response.orders.length) {
        throw Error('order_not_found');
      }
      return response.orders[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getOrders(ids: any) {
    try {
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return {};
      const response: any = await this._accountApi('GET', '/orders', {
        ids: ids.join(','),
      });
      return keyBy(response.orders, 'id');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getOpenOrders() {
    try {
      const response: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'Open',
      });
      keyBy(response.orders, 'id');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getAllOrders() {
    try {
      const acountResponse: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'All',
      });
      return keyBy(acountResponse.orders, 'id');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getClosedOrders() {
    try {
      const response: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'Closed',
      });
      return keyBy(response.orders, 'id');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getActivities(opts_: any) {
    try {
      const opts = opts_ || {};
      if (opts.startTime && !moment(opts.startTime).isValid()) {
        throw new Error('start_time_invalid');
      }
      if (opts.endTime && !moment(opts.endTime).isValid()) {
        throw new Error('end_time_invalid');
      }
      const startTime = opts.startTime
        ? moment(opts.startTime).toISOString()
        : moment()
            .startOf('day')
            .subtract(30, 'days')
            .toISOString();
      const endTime = opts.endTime
        ? moment(opts.endTime).toISOString()
        : moment().toISOString();
      this._accountApi('GET', '/activities', {
        endTime,
        startTime,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getSymbol(id: any) {
    try {
      let params: any = false;
      if (typeof id === 'number') {
        params = {
          id,
        };
      } else if (typeof id === 'string') {
        params = {
          names: id,
        };
      }
      if (params === false) {
        throw new Error('missing_id');
      }
      const response: any = this._api('GET', '/symbols', params);
      return response.symbols[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getSymbols(ids: any) {
    try {
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return {};
      let params: any = false;
      if (typeof ids[0] === 'number') {
        params = {
          ids: ids.join(','),
        };
      } else if (typeof ids[0] === 'string') {
        params = {
          names: ids.join(','),
        };
      }
      if (params === false) {
        throw new Error('missing_id');
      }
      const response: any = await this._api('GET', '/symbols', params);
      if (!response.symbols.length) {
        throw new Error('symbols_not_found');
      }
      return keyBy(response.symbols, params.names ? 'symbol' : 'symbolId');
    } catch (error) {
      console.error(error.message);
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async search(prefix: string, offset: number = 0) {
    try {
      const response: any = await this._api('GET', '/symbols/search', {
        offset,
        prefix,
      });
      return keyBy(response.symbols, 'symbol');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  public async searchSymbol(stockSymbol: string): Promise<IStockSymbol> {
    try {
      const offset: number = 0;
      const response: any = await this._api('GET', '/symbols/search', {
        offset,
        prefix: stockSymbol,
      });
      return keyBy<IStockSymbol>(response.symbols, 'symbol')[
        stockSymbol.toUpperCase()
      ];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  public async getstockSymbolId(stockSymbol: string): Promise<number> {
    return (await this.searchSymbol(stockSymbol)).symbolId;
  }
  public async getOptionChain(symbolId: any) {
    try {
      const response: any = await this._api(
        'GET',
        `/symbols/${symbolId}/options`
      );
      return chain(response.optionChain)
        .keyBy('expiryDate')
        .mapValues(option => {
          return keyBy(
            option.chainPerRoot[0].chainPerStrikePrice,
            'strikePrice'
          );
        })
        .value();
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getMarkets() {
    try {
      const response: any = await this._api('GET', '/markets');
      return keyBy(response.markets, 'name');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getQuote(id: string) {
    try {
      const response: any = await this._api('GET', `/markets/quotes/${id}`);
      if (!response.quotes) {
        return {
          message: 'quote_not_found',
          symbol: id,
        };
      }
      return response.quotes[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getQuotes(ids: any) {
    try {
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return {};
      const response = await this._api('GET', '/markets/quotes', {
        ids: ids.join(','),
      });
      return keyBy(response.quotes, 'symbolId');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getOptionQuote(filters_: any[]) {
    try {
      let filters = filters_;
      if (!Array.isArray(filters) && typeof filters === 'object') {
        filters = [filters];
      }
      const response: any = await this._api('POST', '/markets/quotes/options', {
        filters,
      });
      return response.optionQuotes;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getOptionQuoteSimplified(filters: any) {
    try {
      const optionsQuotes = await this.getOptionQuote(filters);
      return chain(optionsQuotes)
        .map(optionQuote => {
          const parsedSymbol = optionQuote.symbol.match(
            /^([a-zA-Z]+)(.+)(C|P)(\d+\.\d+)$/
          );
          if (parsedSymbol.length >= 5) {
            const parsedDate = parsedSymbol[2].match(/^(\d+)([a-zA-Z]+)(\d+)$/);
            const expiryDate: any = moment()
              .utc()
              .month(parsedDate[2])
              .date(parsedDate[1])
              .year(20 + parsedDate[3])
              .startOf('day');
            const expiryString = `${expiryDate
              .toISOString()
              .slice(0, -1)}000-04:00`;
            optionQuote.underlying = parsedSymbol[1];
            optionQuote.expiryDate = expiryString;
            optionQuote.strikePrice = parseFloat(parsedSymbol[4]);
            optionQuote.optionType = parsedSymbol[3] === 'P' ? 'Put' : 'Call';
          }
          return optionQuote;
        })
        .groupBy('underlying')
        .mapValues(underlyingQuotes => {
          return chain(underlyingQuotes)
            .groupBy('optionType')
            .mapValues(optionTypeQuotes => {
              return chain(optionTypeQuotes)
                .groupBy('expiryDate')
                .mapValues(expiryDateQuotes => {
                  return chain(expiryDateQuotes)
                    .keyBy(quote => {
                      return quote.strikePrice.toFixed(2);
                    })
                    .mapValues(quote => {
                      return pick(quote, [
                        'symbol',
                        'symbolId',
                        'lastTradePrice',
                      ]);
                    })
                    .value();
                })
                .value();
            })
            .value();
        })
        .value();
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async getCandles(id: string, opts?: any) {
    try {
      const opt: any = opts || {};
      if (opt.startTime && !moment(opt.startTime).isValid()) {
        throw new Error('start_time_invalid');
      }
      // details: opt.startTime,
      if (opt.endTime && !moment(opt.endTime).isValid()) {
        throw new Error('end_time_invalid');
      }
      const startTime = opt.startTime
        ? moment(opt.startTime).toISOString()
        : moment()
            .startOf('day')
            .subtract(30, 'days')
            .toISOString();
      const endTime = opt.endTime
        ? moment(opt.endTime).toISOString()
        : moment().toISOString();
      const response: any = this._api('GET', `/markets/candles/${id}`, {
        endTime,
        interval: opt.interval || 'OneDay',
        startTime,
      });
      return response.candles;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async createOrder(opts: any) {
    try {
      return this._accountApi('POST', '/orders', opts);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async updateOrder(id: string, opts: any) {
    try {
      return this._accountApi('POST', `/orders/${id}`, opts);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async testOrder(opts: any) {
    try {
      return this._accountApi('POST', '/orders/impact', opts);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async removeOrder(id: string) {
    try {
      return this._accountApi('DELETE', `/orders/${id}`);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async createStrategy(opts: any) {
    try {
      return this._accountApi('POST', '/orders/strategy', opts);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  public async testStrategy(opts: any) {
    try {
      return this._accountApi('POST', '/orders/strategy/impact', opts);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  // Saves the latest refreshToken in the file name after the seedToken
  private async _saveKey() {
    writeFileSync(this.keyFile, this._refreshToken, 'utf8');
    return this._refreshToken;
  }

  // Gets name of the file where the refreshToken is stored
  public get keyFile() {
    return this._keyFile || `${this._keyDir}/${this.seedToken}`;
  }

  // Reads the refreshToken stored in the file (if it exist),
  // otherwise uses the seedToken
  private async _loadKey() {
    let refreshToken: any;
    try {
      if (!!this._keyFile) {
        sync(dirname(this._keyFile));
      } else {
        sync(this._keyDir);
      }

      refreshToken = await readFileSync(this.keyFile, 'utf8');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    } finally {
      if (!refreshToken) {
        this._refreshToken = this.seedToken;
        this._saveKey();
      }
    }
    this._refreshToken = refreshToken;
    return refreshToken;
  }

  // Refreshed the tokem (aka Logs in) using the latest RefreshToken
  // (or the SeedToken if no previous saved file)
  private async _refreshKey() {
    let response: AxiosResponse = {
      data: null,
      status: 0,
      statusText: '',
      headers: { Null: null },
      config: {},
    };
    const client = axios;
    try {
      const url = `${this._authUrl}/oauth2/token`;
      const params = {
        grant_type: 'refresh_token',
        refresh_token: this._refreshToken,
      };
      const axiosConfig: AxiosRequestConfig = {
        method: 'POST',
        params,
        url,
      };

      response = await client(axiosConfig);

      const creds: ICreds = await response.data;

      this._apiServer = creds.api_server;
      this._apiUrl = `${this._apiServer}${this._apiVersion}`;
      this._accessToken = creds.access_token;
      this._refreshToken = creds.refresh_token;
      await this._saveKey();
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  /*
       this._api('GET', '/symbols/search', {
        offset,
        prefix,
      });
   */
  // Method that actually mades the GET/POST request to Questrade
  private async _api<T = any>(
    method?: string,
    endpoint?: string,
    options?: any
  ): Promise<T> {
    const client = axios;
    let params: any = {};
    if (typeof options !== 'undefined' && typeof options === 'object') {
      params = options;
    }

    const auth = `Bearer ${this._accessToken}`;
    const url: string = this._apiUrl + endpoint;
    const headers: any = { Authorization: auth };
    const config: AxiosRequestConfig = {
      params,
      method,
      headers,
      url,
    };
    let response: AxiosResponse<T>;
    try {
      response = await client(config);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return response.data;
  }

  // Method that appends the set account to the API calls so all calls are made
  private async _accountApi<T = any>(
    method?: any,
    endpoint?: any,
    options?: any
  ) {
    if (!this._account) {
      throw new Error('no_account_selected');
    }
    return this._api<T>(
      method,
      `/accounts/${this._account}${endpoint}`,
      options
    );
  }
}
