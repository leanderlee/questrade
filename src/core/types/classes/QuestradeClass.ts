/** @format */
import { AxiosRequestConfig, AxiosResponse, default as axios } from 'axios';
import { EventEmitter as EE } from 'events';
import { readFileSync, writeFileSync } from 'fs';
import { sync } from 'mkdirp';
import { default as moment } from 'moment';
import { dirname } from 'path';
import {
  AcountNumber,
  HistoricalDataGranularity,
  IAccount,
  IAccountActivity,
  IAccounts,
  IActivities,
  IBalances,
  ICreds,
  IDateObject,
  idsType,
  idType,
  IExecution,
  IExecutions,
  IFilter,
  IHeaders,
  IMarket,
  IMarketsResponse,
  IPosition,
  IPositions,
  Optionals,
  OrdersOptions,
  QuestradeAPIOptions,
  Time,
  TimeRange,
  TimeRangeInterval,
} from '../../types';
import { OrderStateFilterType } from '../enums';
import { ICandle, ICandles } from '../ICandles';
import { IEquitySymbol, IEquitySymbols } from '../IEquitySymbols';
import { IOptionsQuotes } from '../IOptionsQuotes';
import { IOrder, IOrders } from '../IOrders';
import { IQuote, IQuotes } from '../IQuotes';

export class QuestradeClass extends EE {
  public get getServerTime(): Promise<string> {
    return this._getTime();
  }
  // Gets name of the file where the refreshToken is stored
  public get keyFile() {
    return this._keyFile || `${this._keyDir}/${this.seedToken}`;
  }
  public set account(accountNumber: string | number) {
    this._accountNumber = accountNumber.toString();
  }
  public seedToken: string;
  private _accessToken: string;
  private _accountNumber: AcountNumber;
  private _apiServer: string;
  private _apiUrl: string;
  private _apiVersion: string;
  private _authUrl: string;
  private _keyDir: string;
  private _keyFile: string;
  private _refreshToken: string;
  private _test: boolean;
  public constructor(options?: QuestradeAPIOptions) {
    super();
    this._accountNumber = '';
    this._apiVersion = 'v1';
    this._keyDir = './keys';
    this._keyFile = '';
    this._test = false;
    this.seedToken = '';
    try {
      if (typeof options === 'undefined' || options === undefined) {
        throw new Error('questrade_missing_api_key or options');
      }
      if (typeof options === 'string' && options.indexOf('/') !== -1) {
        this._keyFile = options;
      }
      if (typeof options === 'string' && options.indexOf('/') === -1) {
        this.seedToken = options;
      }
      if (typeof options === 'object') {
        // Set to true if using a practice account
        // (http://www.questrade.com/api/free-practice-account)
        this._test = options.test === undefined ? false : !!options.test;
        // Directory where the last refreshToken is stored.
        // The file name will have to be seedToken
        this._keyDir = options.keyDir || './keys';
        // Used as part of the API URL
        this._apiVersion = options.apiVersion || 'v1';
        // File that stores the last refreshToken.
        // Not really neede if you keep the seedToken and the keyDir
        this._keyFile = options.keyFile || '';
        // The original token obtained mannuelly from the interface
        this.seedToken = options.seedToken || '';
        // The default Account agains wich the API are made.
        // GetAccounts() will return the possible values
        this._accountNumber = `${options.account}` || '';
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
      const getPrimaryAccountNumber = async () => {
        try {
          await this.getPrimaryAccountNumber();
          this.emit('accountSeted');
        } catch (error) {
          console.error(error.message);
          this.emit('getPrimaryAccountNumberError');
          this.emit('error');
          throw new Error(error.message);
        }
      };
      const main = async () => {
        try {
          await loadKey();
          await refreshKey();
          await getPrimaryAccountNumber();
          this.emit('ready');
        } catch (error) {
          console.error(error.message);
          this.emit('error');
          throw new Error(error.message);
        }
      };
      main()
        .then(() => {
          // will alphabetise
        })
        .catch(err => {
          throw new Error(err.message);
        });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getAccounts()
  public async getAccounts(): Promise<IAccount[]> {
    try {
      const { accounts } = await this._api<IAccounts>('GET', '/accounts');
      return accounts;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getActivities(opts_)
  public async getActivities(
    range: TimeRange = {}
  ): Promise<IAccountActivity[]> {
    try {
      const { startTime, endTime } = this._rangeValidation(range);
      const { activities } = await this._accountApi<IActivities>(
        'GET',
        '/activities',
        {
          endTime,
          startTime,
        }
      );
      return activities;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getBalances()
  public async getBalances(): Promise<IBalances> {
    try {
      const balances = await this._accountApi<IBalances>('GET', '/balances');
      return balances;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getCandles(id)
  public async getCandles(
    id: idType,
    rangeAndInterval: TimeRangeInterval = {
      interval: HistoricalDataGranularity.OneDay,
    }
  ): Promise<ICandle[]> {
    try {
      const { startTime, endTime, interval } = this._rangeValidation(
        rangeAndInterval
      );
      const { candles } = await this._api<ICandles>(
        'GET',
        `/markets/candles/${id}`,
        {
          endTime,
          interval,
          startTime,
        }
      );
      return candles;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getExecutions()
  public async getExecutions(range: TimeRange = {}): Promise<IExecution[]> {
    try {
      const { startTime, endTime } = this._rangeValidation(range);
      const executions = await this._accountApi<IExecutions>(
        'GET',
        '/executions',
        { startTime, endTime }
      );
      return executions.executions;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getMarkets()
  public async getMarkets(): Promise<IMarket[]> {
    try {
      const { markets } = await this._api<IMarketsResponse>('GET', '/markets');
      return markets; // keyBy(response.markets, 'name');
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOptionQuote(filters_[])
  // % post
  public async getOptionQuote(filters_: IFilter[] | IFilter) {
    try {
      let filters = filters_;
      if (!Array.isArray(filters) && typeof filters === 'object') {
        filters = [filters];
      }
      const { quotes } = await this._api<IOptionsQuotes>(
        'GET',
        '/markets/quotes/options',
        {
          filters,
        }
      );
      return quotes;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOrdersAll()
  public async getOrdersAll(range?: TimeRange): Promise<IOrder[]> {
    try {
      return this.getOrder(undefined, {
        stateFilter: OrderStateFilterType.All,
        ...range,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOrdersClosed()
  public async getOrdersClosed(range?: TimeRange): Promise<IOrder[]> {
    try {
      return this.getOrder(undefined, {
        stateFilter: OrderStateFilterType.Closed,
        ...range,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOrdersOpen()
  public async getOrdersOpen(range?: TimeRange): Promise<IOrder[]> {
    try {
      return this.getOrder(undefined, {
        stateFilter: OrderStateFilterType.Open,
        ...range,
      });
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOrder()
  public async getOrder(
    orderId?: idType,
    orderOptions: OrdersOptions = { stateFilter: OrderStateFilterType.All }
  ): Promise<IOrder[]> {
    const rangeValidated = this._rangeValidation(orderOptions);
    try {
      const url = !orderId ? '/orders' : `/orders/${orderId}`;
      console.log('url:', url);
      const { orders } = await this._accountApi<IOrders>(
        'GET',
        '/orders',
        rangeValidated
      );
      // if (!orders.length) {
      //   throw Error('order_not_found');
      // }
      return orders;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getOrdersByIds(ids)
  public async getOrdersByIds(ids: idType[]): Promise<IOrder[]> {
    try {
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return [];
      const { orders } = await this._accountApi<IOrders>('GET', '/orders', {
        ids: ids.join(','),
      });
      return orders;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getPositions()
  public async getPositions(): Promise<IPosition[]> {
    try {
      const positions = await this._accountApi<IPositions>('GET', '/positions');
      return positions.positions;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getPrimaryAccountNumber(
  public async getPrimaryAccountNumber(
    reset: boolean = false
  ): Promise<AcountNumber> {
    if (!reset && this._accountNumber.toString().length === 8) {
      return this._accountNumber;
    }
    // if zero available then throw
    const accounts = await this.getAccounts();
    if (accounts.length < 1) {
      throw new Error('No account number found');
    }
    // if only one retur the only one ...
    if (accounts.length === 1) {
      this._accountNumber = accounts[0].number;
      return this._accountNumber;
    }
    // if more than one return the first one marked primary
    const primary = await accounts.filter(account => account.isPrimary);
    if (primary.length > 0) {
      this._accountNumber = primary[0].number;
      return this._accountNumber;
    }
    // if none marked primary and more than one return first one
    this._accountNumber = accounts[0].number;
    return this._accountNumber;
  }
  // ! async method getQuote(id)
  public async getQuote(id: idType): Promise<IQuote> {
    try {
      let symID = '';
      if (typeof id === 'number') {
        symID = id.toString();
      }
      const { quotes } = await this._api<IQuotes>(
        'GET',
        `/markets/quotes/${symID}`
      );
      return quotes[0];
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getQuotes(ids)
  public async getQuotes(ids: idsType): Promise<IQuote[]> {
    try {
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return [];
      const { quotes } = await this._api<IQuotes>('GET', '/markets/quotes', {
        ids: ids.join(','),
      });
      return quotes;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method getServerTimeObjects()
  public async getServerTimeObject(): Promise<IDateObject> {
    const serverTime = await this._getTime();
    const timeMoment = moment(serverTime);
    const weekDay = timeMoment.localeData().weekdays()[timeMoment.weekday()];
    const returnDate = {
      serverTime,
      UTC: timeMoment.toJSON(),
      timeObject: timeMoment.toObject(),
      toUTCDate: timeMoment.toDate(),
      toArray: timeMoment.toArray(),
      date: {
        day: weekDay,
        date: timeMoment.date(),
        month: timeMoment.month() + 1,
        year: timeMoment.year(),
      },
      time: {
        hour: timeMoment.hour(),
        minute: timeMoment.minute(),
        second: timeMoment.second(),
        milliseconds: timeMoment.milliseconds(),
        unixmilliseconds: timeMoment.valueOf(),
        unix: timeMoment.unix(),
        utcOffset: timeMoment.utcOffset(),
      },
      isValid: timeMoment.isValid(),
      dayOfYear: timeMoment.dayOfYear(),
      weekOfTheYeay: timeMoment.isoWeek(),
      weekday: timeMoment.weekday(),
      isLeapYear: timeMoment.isLeapYear(),
      daysInMonth: timeMoment.daysInMonth(),
      weeksInYear: timeMoment.isoWeeksInYear(),
      quarter: timeMoment.quarter(),
      locale: timeMoment.locale(),
    };
    return returnDate;
  }
  // ! async method getstockSymbolId(stockSymbol)
  // public async getstockSymbolId(stockSymbol: string): Promise<number> {
  //   return (await this.searchSymbol(stockSymbol)).symbolId;
  // }
  // ! async method getEquitySymbols(idOrSymbol)
  public async getEquitySymbols(idOrSymbol: idType): Promise<IEquitySymbol[]> {
    try {
      let params;
      if (typeof idOrSymbol === 'number' || !isNaN(Number(idOrSymbol))) {
        params = {
          ids: Number(idOrSymbol),
        };
      } else if (typeof idOrSymbol === 'string') {
        params = {
          names: idOrSymbol,
        };
      }
      if (params === undefined) {
        throw new Error('missing_ID_or_Symbol');
      }
      const { symbols } = await this._api<IEquitySymbols>(
        'GET',
        '/symbols',
        params
      );
      return symbols;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method search(prefix)
  public async search(prefix: string, offset: number = 0): Promise<any> {
    try {
      const { equitySymbols } = await this._api<any>('GET', '/symbols/search', {
        offset,
        prefix,
      });
      return equitySymbols;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  // ! async method searchSymbol(stockSymbol)
  public async searchSymbol(
    stockSymbol: string,
    offset: number = 0
  ): Promise<any> {
    try {
      const equitySymbols = await this._api<any>('GET', '/symbols/search', {
        offset,
        prefix: stockSymbol,
      });
      console.log(equitySymbols);
      // return keyBy<IEquitySymbol>(equitySymbols, 'symbol')[
      //   stockSymbol.toUpperCase()
      // ];
      // const some = equitySymbols.find(
      //   symb => symb.symbol === stockSymbol.toUpperCase()
      // );
      // if (!!some) {
      //   return some;
      // }
      // throw new Error("Can't find symbol");
    } catch (error) {
      console.error(error.message);
      // throw new Error(error.message);
    }
  }
  // ? async method _accountApi<T>
  // Method that appends the set account to the API calls so all calls are made
  private async _accountApi<T>(
    method?: string,
    endpoint?: string,
    options?: Optionals
  ) {
    if (!this._accountNumber) {
      throw new Error('no_account_selected');
    }
    return this._api<T>(
      method,
      `/accounts/${this._accountNumber}${endpoint}`,
      options,
      { location: this._accountNumber }
    );
  }
  // ? async method _api<T>
  // Method that actually mades the GET/POST request to Questrade
  private async _api<T>(
    method?: string,
    endpoint?: string,
    options?: Optionals,
    additionalHeaders?: IHeaders
  ): Promise<T> {
    const client = axios;
    let params: Optionals = {};
    if (typeof options !== 'undefined' && typeof options === 'object') {
      params = options;
    }
    const auth = `Bearer ${this._accessToken}`;
    const url: string = this._apiUrl + endpoint;
    const headers: IHeaders = { Authorization: auth, ...additionalHeaders };
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
  // ? async method getTime(): Promise <string>
  private async _getTime(): Promise<string> {
    try {
      const { time } = await this._api<Time>('GET', '/time');
      return time;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  // ? async method _loadKey()
  //  Reads the refreshToken stored in the file (if it exist),
  // otherwise uses the seedToken
  private async _loadKey() {
    let refreshToken: string = '';
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
  // ?   private _rangeValidation(rangeOptions: TimeRange = {})
  // used to validate range of start and end dates and setting
  // a 30 day default value
  private _rangeValidation(rangeOptions: TimeRange = {}): Optionals {
    if (rangeOptions.startTime && !moment(rangeOptions.startTime).isValid()) {
      throw new Error('start_time_invalid');
    }
    if (rangeOptions.endTime && !moment(rangeOptions.endTime).isValid()) {
      throw new Error('end_time_invalid');
    }
    const startTime = rangeOptions.startTime
      ? moment(rangeOptions.startTime).toISOString()
      : moment()
          .startOf('day')
          .subtract(30, 'days')
          .toISOString();
    const endTime = rangeOptions.endTime
      ? moment(rangeOptions.endTime).toISOString()
      : moment().toISOString();
    return { startTime, endTime, ...rangeOptions };
  }
  // ? async method _refreshKey()
  //  Refresh the tokem (aka Logs in) using the latest RefreshToken
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
  // ? async method _saveKey()
  // Saves the latest refreshToken in the file name after the seedToken
  private async _saveKey() {
    writeFileSync(this.keyFile, this._refreshToken, 'utf8');
    return this._refreshToken;
  }
}
