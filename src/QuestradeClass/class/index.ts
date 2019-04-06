/** @format */
import { default as axios } from 'axios';
import { EventEmitter as EE } from 'events';
import { readFile, writeFile } from 'fs';
import { chain, keyBy, pick } from 'lodash';
import { sync } from 'mkdirp';
import { default as moment } from 'moment';
import { dirname } from 'path';
import { default as request } from 'request';
type seedToken = string;
type keyFile = any;
interface IQuestradeOpts {
  test?: boolean;
  keyDir?: string;
  apiVersion: string;
  keyFile?: string;
  seedToken?: string;
  account?: any;
}
type QuestradeClassOptions = IQuestradeOpts | seedToken | keyFile;
type error = Error | null;
type callBack = (err: error, response?: any) => any;

export class QuestradeClass extends EE {
  public seedToken: string;
  private _accessToken: string;
  private _test: boolean;
  private _keyDir: string;
  private _apiVersion: string;
  private _keyFile: string;
  private _account: string;
  private _refreshToken: string;
  private _apiUrl: string;
  private _authUrl: string;
  public constructor(opts?: QuestradeClassOptions) {
    super();
    this._test = false;
    this._keyDir = './keys';
    this._apiVersion = 'v1';
    this._keyFile = '';
    this.seedToken = '';
    this._account = '';

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
      this._account = opts.account || '';
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

    this._authUrl = this._test
      ? 'https://practicelogin.questrade.com'
      : 'https://login.questrade.com';

    // Running the Authentification process and emit 'ready' when done

    const fnRefreshKey = (refreshKeyErr: error) => {
      if (refreshKeyErr) {
        return this.emit('error', {
          details: refreshKeyErr,
          message: 'failed_to_refresh_key',
        });
      }

      if (this._account) return this.emit('ready');

      this.setPrimaryAccount()
        .then(() => this.emit('ready'))
        .catch((setPrimaryAccountErr: error) =>
          this.emit('error', {
            details: setPrimaryAccountErr,
            message: 'failed_to_set_account',
          })
        );
      return this.emit('ready');
    };

    const fnLowKey = (loadKeyErr: error) => {
      if (loadKeyErr) {
        return this.emit('error', {
          details: loadKeyErr,
          message: 'failed_to_load_key',
        });
      }
      this._refreshKey(fnRefreshKey);
      return this.emit('ready');
    };

    this._loadKey(fnLowKey);
  }

  public setPrimaryAccount = async () => {
    const accounts: any = await this.getAccounts();
    if (!accounts || !Object.keys(accounts).length) {
      throw new Error('no_accounts_found');
    }
    const primaryAccount = Object.keys(accounts).filter(
      (accountNumber: any) => {
        return accounts[accountNumber].isPrimary;
      }
    );
    if (!primaryAccount.length) {
      throw new Error('no_primary_account');
    }
    this._account = primaryAccount[0];
    return this._account;
  };

  public getAccounts = async () => {
    return this._api('GET', '/accounts', (err: error, response: any) => {
      if (err) throw err;
      return keyBy(response.accounts, 'number');
    });
  };

  public getPositions = (cb: callBack) => {
    this._accountApi('GET', '/positions', cb);
  };

  public getBalances = (cb: callBack) => {
    this._accountApi('GET', '/balances', cb);
  };

  public getExecutions = (cb: callBack) => {
    this._accountApi('GET', '/executions', cb);
  };

  public getOrder = (id: any, cb: callBack) => {
    this._accountApi('GET', `/orders/${id}`, (err: error, response: any) => {
      if (err) return cb(err, null);
      if (!response.orders.length) {
        if (typeof cb === 'undefined') {
          // throw new Error('callback function required');
          return console.log("throw new Error('callback function required');");
        }
        const message = 'order_not_found';
        return cb(new Error(message));
      }
      cb(null, response.orders[0]);
    });
  };

  public getOrders = (ids: any, cb: callBack) => {
    if (!Array.isArray(ids)) {
      if (typeof cb === 'undefined') {
        // throw new Error('callback function required');
        return console.log("throw new Error('callback function required');");
      }
      const message = 'missing_ids';
      return cb(new Error(message));
    }
    if (!ids.length) return cb(null, {});
    this._accountApi(
      'GET',
      '/orders',
      {
        ids: ids.join(','),
      },
      (err: error, response: any) => {
        if (err) return cb(err, null);
        cb(null, keyBy(response.orders, 'id'));
      }
    );
  };

  public getOpenOrders = (cb: callBack) => {
    this._accountApi(
      'GET',
      '/orders',
      {
        stateFilter: 'Open',
      },
      (err: error, response: any) => {
        if (err) return cb(err, null);
        cb(null, keyBy(response.orders, 'id'));
      }
    );
  };

  public getAllOrders = (cb: callBack) => {
    this._accountApi(
      'GET',
      '/orders',
      {
        stateFilter: 'All',
      },
      (err: error, response: any) => {
        if (err) return cb(err, null);
        cb(null, keyBy(response.orders, 'id'));
      }
    );
  };

  public getClosedOrders = (cb: callBack) => {
    this._accountApi(
      'GET',
      '/orders',
      {
        stateFilter: 'Closed',
      },
      (err: error | null, response: any) => {
        if (err) return cb(err, null);
        cb(null, keyBy(response.orders, 'id'));
      }
    );
  };

  public getActivities = (opts_: any, cb_: any) => {
    let cb: callBack = cb_;
    let opts: any;
    if (typeof opts_ === 'function') {
      cb = opts_;
      opts = {};
    }
    opts = opts_ || {};
    if (opts.startTime && !moment(opts.startTime).isValid()) {
      return cb(new Error('start_time_invalid'), { details: opts.startTime });
    }
    if (opts.endTime && !moment(opts.endTime).isValid()) {
      return cb(new Error('end_time_invalid'), { details: opts.endTime });
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
    this._accountApi(
      'GET',
      '/activities',
      {
        endTime,
        startTime,
      },
      cb
    );
  };

  public getSymbol = async (id: any) => {
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
  };

  public getSymbols = async (ids: any) => {
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
  };

  public search = async (query: any, offset: any) => {
    if (typeof query !== 'string') {
      throw new Error('missing_query');
    }
    const response: any = await this._api('GET', '/symbols/search', {
      offset,
      prefix: query,
    });

    return response.symbols;
  };

  public getOptionChain = (symbolId: any, cb: callBack) => {
    this._api(
      'GET',
      `/symbols/${symbolId}/options`,
      (err: error, response: any) => {
        if (err) return cb(err, null);
        cb(
          null,
          chain(response.optionChain)
            .keyBy('expiryDate')
            .mapValues(option => {
              return keyBy(
                option.chainPerRoot[0].chainPerStrikePrice,
                'strikePrice'
              );
            })
            .value()
        );
      }
    );
  };

  public getMarkets = (cb: callBack) => {
    this._api('GET', '/markets', (err: error, response: any) => {
      if (err) return cb(err, null);
      cb(null, keyBy(response.markets, 'name'));
    });
  };

  public getQuote = (
    id: string,
    cb: {
      (arg0: { message: string; symbol: any }): void;
      (arg0: any, arg1: any): void;
    }
  ) => {
    this._api('GET', `/markets/quotes/${id}`, (err: error, response: any) => {
      if (err) return cb(err, null);
      if (!response.quotes) {
        return cb({
          message: 'quote_not_found',
          symbol: id,
        });
      }
      cb(null, response.quotes[0]);
    });
  };

  public getQuotes = async (ids: any) => {
    if (!Array.isArray(ids)) {
      throw new Error('missing_ids');
    }
    if (!ids.length) return {};
    const response: any = await this._api('GET', '/markets/quotes', {
      ids: ids.join(','),
    });

    return keyBy(response.quotes, 'symbolId');
  };

  public getOptionQuote = async (filters_: any[]) => {
    let filters = filters_;
    if (!Array.isArray(filters) && typeof filters === 'object') {
      filters = [filters];
    }
    const response: any = await this._api('POST', '/markets/quotes/options', {
      filters,
    });

    return response.optionQuotes;
  };

  public getOptionQuoteSimplified = async (filters: any, cb: callBack) => {
    const optionsQuotes = await this.getOptionQuote(filters);

    cb(
      null,
      chain(optionsQuotes)
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
        .value()
    );
  };

  public getCandles = async (
    id: string,
    opts?: { startTime?: any; endTime?: any; interval?: any } | callBack
  ) => {
    const opt: any = typeof opts === 'undefined' ? {} : opts;

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
  };

  public createOrder = (opts: any, cb: callBack) => {
    this._accountApi('POST', '/orders', opts, cb);
  };

  public updateOrder = (id: string, opts: any, cb: callBack) => {
    this._accountApi('POST', `/orders/${id}`, opts, cb);
  };

  public testOrder = (opts: any, cb: callBack) => {
    this._accountApi('POST', '/orders/impact', opts, cb);
  };

  public removeOrder = (id: string, cb: callBack) => {
    this._accountApi('DELETE', `/orders/${id}`, cb);
  };

  public createStrategy = (opts: any, cb: callBack) => {
    this._accountApi('POST', '/orders/strategy', opts, cb);
  };

  public testStrategy = (opts: any, cb: callBack) => {
    this._accountApi('POST', '/orders/strategy/impact', opts, cb);
  };
  private _saveKey = (cb_?: any) => {
    let cb: callBack = cb_;
    cb = cb
      ? cb
      : () => {
          return null;
        };

    writeFile(this._getKeyFile(), this._refreshToken, 'utf8', (err: error) => {
      if (err) {
        console.log('error with writeFile ');
        return cb(new Error('failed_to_write'), { details: err });
      }
      cb(null, this._refreshToken);
    });
  };

  // Gets name of the file where the refreshToken is stored
  private _getKeyFile = () => {
    return this._keyFile || `${this._keyDir}/${this.seedToken}`;
  };

  // Reads the refreshToken stored in the file (if it exist)
  // otherwise uses the seedToken
  private _loadKey = (cb_?: any) => {
    let cb: callBack = cb_;
    cb = cb
      ? cb
      : () => {
          return;
        };

    if (this._keyFile) {
      sync(dirname(this._keyFile)); // Synchronously create a new directory
    } else {
      sync(this._keyDir);
    }
    readFile(this._getKeyFile(), 'utf8', (err, refreshToken) => {
      if (err || !refreshToken) {
        this._refreshToken = this.seedToken;
        return this._saveKey(cb);
      }
      this._refreshToken = refreshToken;
      cb(null, refreshToken);
    });
  };

  // Refreshed the tokem (aka Logs in) using the latest RefreshToken
  // (or the SeedToken if no previous saved file)
  private _refreshKey = (cb: callBack) => {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: this._refreshToken,
    };
    request(
      {
        method: 'POST',
        qs: data,
        url: `${this._authUrl}/oauth2/token`,
      },
      (_res: any, _http: any, body: any) => {
        try {
          const creds = JSON.parse(body);
          // this._apiServer = creds.api_server;
          this._apiUrl = creds.api_server + this._apiVersion;
          this._accessToken = creds.access_token;
          this._refreshToken = creds.refresh_token;
          this._saveKey();
          this.emit('refresh', this._refreshToken);
        } catch (e) {
          return cb(e, {
            details: body,
            message: 'login_failed',
            token: this._refreshToken,
          });
        }
        cb(null);
      }
    );
  };

  // Method that actually mades the GET/POST request to Questrade
  private _api = async (
    method?: string,
    endpoint?: string | number,
    params?: any
  ) => {
    const opts: any = {
      auth: {
        bearer: this._accessToken,
      },
      method,
      url: this._apiUrl + endpoint,
    };
    if (method === 'GET') {
      opts.qs = params || {};
      opts.json = true;
    } else {
      opts.json = params || true;
    }
    return axios(opts);
  };

  // Method that appends the set account to the API calls so all calls
  // are made to that account. Chage  this.account to change the account used
  private _accountApi = (
    method?: any,
    endpoint?: any,
    params?: any,
    cb?: callBack
  ) => {
    if (!this._account) {
      if (typeof cb === 'undefined') {
        // throw new Error('callback function required');
        return console.log("throw new Error('callback function required');");
      }
      throw new Error('no_account_selected');
    }
    return this._api(method, `/accounts/${this._account}${endpoint}`, params);
  };
}
