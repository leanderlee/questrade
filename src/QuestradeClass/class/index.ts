/** @format */
import * as axios from 'axios';
import { EventEmitter as EE } from 'events';
import { readFileSync, writeFileSync } from 'fs';
import { chain, keyBy, pick } from 'lodash';
import { sync } from 'mkdirp';
import { default as moment } from 'moment';
import { dirname } from 'path';
import { ICreds } from './auth/ICreds';
// import { promisify } from 'util';
type seedToken = string;
type keyFile = string;
interface IQuestradeOpts {
  test?: boolean;
  keyDir?: string;
  apiVersion: string;
  keyFile?: string;
  seedToken?: seedToken;
  account?: string | number;
}
type QuestradeClassOptions = IQuestradeOpts | seedToken | keyFile;
type error = Error | null;

const introspection = true;
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
  private _readFileSync: any;
  private _writeFileSync: any;

  public constructor(opts?: QuestradeClassOptions) {
    super();
    this._test = false;
    this._keyDir = './keys';
    this._apiVersion = 'v1';
    this._keyFile = '';
    this.seedToken = '';
    this._account = '';
    this._readFileSync = readFileSync;
    console.log(this._readFileSync);
    this._writeFileSync = writeFileSync;
    console.log(this._writeFileSync);

    try {
      if (introspection) console.log('constructor(...) {');
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
      if (introspection) {
        console.log('\n', 'this._apiServer: ', this._apiServer);
      }
      if (!!this._account) this.emit('ready');
      try {
        // tslint:disable-next-line: no-debugger

        if (introspection) console.log('\n', 'IN: constructor AT: _loadKey');
        this._loadKey().then(() => {
          try {
            if (introspection) {
              console.log('\n', 'IN: constructor AT: _refreshKey');
            }
            this._refreshKey().then(() => {
              try {
                if (introspection) {
                  console.log('\n', 'IN: constructor AT: setPrimaryAccount');
                }
                this.setPrimaryAccount().then(() => {
                  this.emit('ready');
                });
              } catch (setPrimaryAccountError) {
                this.emit('error', {
                  details: setPrimaryAccountError,
                  message: 'failed_to_set_account',
                });
              }
            });
          } catch (refreshKeyError) {
            this.emit('error', {
              details: refreshKeyError,
              message: 'failed_to_refresh_key',
            });
          }
        });
      } catch (loadKeyError) {
        this.emit('error', {
          details: loadKeyError,
          message: 'failed_to_load_key',
        });
      }
    } catch (error) {
      if (introspection) console.log('\n', 'error.message', error.message);
      throw new Error(error.message);
    }
  }

  public setPrimaryAccount = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'setPrimaryAccount = async () => {');
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
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getAccounts = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getAccounts = async () => {');
      return this._api('GET', '/accounts', (err: error, response: any) => {
        if (err) throw err;
        return keyBy(response.accounts, 'number');
      });
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getPositions = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getPositions = async () => {');
      return this._accountApi('GET', '/positions');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getBalances = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getBalances = async () => {');
      return this._accountApi('GET', '/balances');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getExecutions = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getExecutions = async () => {');
      return this._accountApi('GET', '/executions');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOrder = async (id: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getOrder = async (id: any) => {');
      const response: any = await this._accountApi('GET', `/orders/${id}`);
      if (!response.orders.length) {
        throw Error('order_not_found');
      }
      return response.orders[0];
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOrders = async (ids: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getOrders = async (ids: any) => {');
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return {};
      const response: any = await this._accountApi('GET', '/orders', {
        ids: ids.join(','),
      });
      return keyBy(response.orders, 'id');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOpenOrders = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getOpenOrders = async () => {');
      const response: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'Open',
      });
      keyBy(response.orders, 'id');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getAllOrders = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getAllOrders = async () => {');
      const acountResponse: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'All',
      });
      return keyBy(acountResponse.orders, 'id');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    } // ? ---
  };

  public getClosedOrders = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getClosedOrders = async () => {');
      const response: any = await this._accountApi('GET', '/orders', {
        stateFilter: 'Closed',
      });
      return keyBy(response.orders, 'id');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getActivities = async (opts_: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getActivities = async (opts_: any) => {');
      }
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getSymbol = async (id: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getSymbol = async (id: any) => {');
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getSymbols = async (ids: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getSymbols = async (ids: any) => {');
      }
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public search = async (query: any, offset: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'search = async (query: any, offset: any) => {');
      }
      if (typeof query !== 'string') {
        throw new Error('missing_query');
      }
      const response: any = await this._api('GET', '/symbols/search', {
        offset,
        prefix: query,
      });
      return response.symbols;
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOptionChain = async (symbolId: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getOptionChain = async (symbolId: any) => {');
      }
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getMarkets = async () => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getMarkets = async () => {');
      const response: any = await this._api('GET', '/markets');
      return keyBy(response.markets, 'name');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    } // ? ---
  };

  public getQuote = async (id: string) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getQuote = async (id: string) => {');
      }
      const response: any = await this._api('GET', `/markets/quotes/${id}`);
      if (!response.quotes) {
        return {
          message: 'quote_not_found',
          symbol: id,
        };
      }
      return response.quotes[0];
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getQuotes = async (ids: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getQuotes = async (ids: any) => {');
      if (!Array.isArray(ids)) {
        throw new Error('missing_ids');
      }
      if (!ids.length) return {};
      const response: any = await this._api('GET', '/markets/quotes', {
        ids: ids.join(','),
      });
      return keyBy(response.quotes, 'symbolId');
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOptionQuote = async (filters_: any[]) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getOptionQuote = async (filters_: any[]) => {');
      }
      let filters = filters_;
      if (!Array.isArray(filters) && typeof filters === 'object') {
        filters = [filters];
      }
      const response: any = await this._api('POST', '/markets/quotes/options', {
        filters,
      });
      return response.optionQuotes;
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getOptionQuoteSimplified = async (filters: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'getOptionQuoteSimplified = async (...) => {');
      }
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public getCandles = async (id: string, opts?: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'getCandles = async (...) => {');
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
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public createOrder = async (opts: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'createOrder = async (opts: any) => {');
      }
      return this._accountApi('POST', '/orders', opts);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public updateOrder = async (id: string, opts: any) => {
    // !!!
    try {
      if (introspection) console.log('\n', 'updateOrder = async (...) => {');
      return this._accountApi('POST', `/orders/${id}`, opts);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public testOrder = async (opts: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'testOrder = async (opts: any) => {');
      }
      return this._accountApi('POST', '/orders/impact', opts);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public removeOrder = async (id: string) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'removeOrder = async (id: string) => {');
      }
      return this._accountApi('DELETE', `/orders/${id}`);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public createStrategy = async (opts: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'createStrategy = async (opts: any) => {');
      }
      return this._accountApi('POST', '/orders/strategy', opts);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      // throw error;
    }
  };

  public testStrategy = async (opts: any) => {
    // !!!
    try {
      if (introspection) {
        console.log('\n', 'testStrategy = async (opts: any) => {');
      }
      return this._accountApi('POST', '/orders/strategy/impact', opts);
    } catch (error) {
      if (introspection) console.log('\n', error.message);
      throw error;
    }
  };

  //   private saveKey = async () => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_saveKey = async () => {');
  //       try {
  //         this._writeFileSync(this._getKeyFile(), this.
  //         _refreshToken, 'utf8');
  //       } catch (error) {
  //         throw new Error('failed_to_write');
  //       }
  //       return this._refreshToken;
  //     } catch (error) {
  //       if (introspection) console.log('\n', error.message);
  //       throw error;
  //     }
  //   };

  //   // Gets name of the file where the refreshToken is stored
  //   private getKeyFile = () => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_getKeyFile = () => {');
  //       return this._keyFile || `${this._keyDir}/${this.seedToken}`;
  //     } catch (error) {
  //       if (introspection) console.log('\n', error.message);
  //       throw error;
  //     }
  //   };

  //   // Reads the refreshToken stored in the file (if it exist)
  //   // otherwise uses the seedToken
  //   private loadKey = () => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_loadKey = async () => {');
  //       if (this._keyFile) {
  //         sync(dirname(this._keyFile));
  //       } else {
  //         sync(this._keyDir);
  //       }

  //       if (introspection) console.log('\n', 'will read');
  //       const refreshToken: any =
  //               this._readFileSync(this._getKeyFile(), 'utf8');
  //       if (introspection) console.log('\n', 'did read');
  //       if (!refreshToken) {
  //         this._refreshToken = this.seedToken;
  //         this._saveKey();
  //       }
  //       this._refreshToken = refreshToken;
  //       return refreshToken;
  //     } catch (error) {
  //       if (introspection) console.log('\n', 'ERROR: _loadKey = () => {');
  //       if (introspection) console.log('\n', error.message);
  //       // throw error;
  //     }
  //   };

  //   // Refreshed the tokem (aka Logs in) using the latest RefreshToken
  //   // (or the SeedToken if no previous saved file)
  //   private refreshKey = async () => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_refreshKey = async () => {');
  //       const data = {
  //         grant_type: 'refresh_token',
  //         refresh_token: this._refreshToken,
  //       };
  //       const res = await request({
  //         method: 'POST',
  //         qs: data,
  //         url: `${this._authUrl}/oauth2/token`,
  //       });
  //       const creds = await JSON.parse(res.body);
  //       if (introspection) console.log('\n', 'creds');
  //       if (introspection) console.dir(creds);
  //       if (introspection) console.log('\n', 'creds.api_server');
  //       if (introspection) console.dir(creds.api_server);
  //       this._apiServer = await creds.api_server;
  //       this._apiUrl = (await creds.api_server) + this._apiVersion;
  //       this._accessToken = await creds.access_token;
  //       this._refreshToken = await creds.refresh_token;
  //       await this._saveKey();
  //       this.emit('refresh', this._refreshToken);
  //     } catch (error) {
  //       if (introspection) console.log('\n', error.message);
  //       // throw error;
  //     }
  //   };

  //   // Method that actually mades the GET/POST request to Questrade
  //   private api = async (
  //     method?: string,
  //     endpoint?: string | number,
  //     params?: any
  //   ) => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_api = async (...) => {');
  //       const url: string = this._apiUrl + endpoint;
  //       const opts: any = {
  //         auth: {
  //           bearer: this._accessToken,
  //         },
  //         method,
  //         url,
  //       };
  //       if (method === 'GET') {
  //         opts.qs = params || {};
  //         opts.json = true;
  //       } else {
  //         opts.json = params || true;
  //       }
  //       return request(opts);
  //     } catch (error) {
  //       if (introspection) console.log('\n', error.message);
  //       // throw error;
  //     }
  //   };

  //   // Method that appends the set account to the API calls so all calls
  //   // are made to that account. Chage this.
  // account to change the account used
  //   private accountApi = async
  // (method?: any, endpoint?: any, params?: any) => {
  //     // !!!
  //     try {
  //       if (introspection) console.log('\n', '_accountApi = (...) => {');
  //       if (!this._account) {
  //         throw new Error('no_account_selected');
  //       }
  // return this._api(method, `/accounts/${this._account}${endpoint}`, params);
  //     } catch (error) {
  //       if (introspection) console.log('\n', error.message);
  //       // throw error;
  //     }
  //   };
  // private getUnused(){
  //    this._saveKey();
  //      this._getKeyFile();
  //      this._loadKey();
  //      this._refreshKey();
  //      this._api();
  //      this._accountApi();
  // }
  // Running the Authentification process and emit 'ready' when done
  // function constructor(){
  // !!  self._loadKey(function(err) {
  //     if (err)
  //       return self.emit('error', {
  //         message: 'failed_to_load_key',
  //         details: err,
  //       });
  // !!    self._refreshKey(function(err) {
  //       if (err)
  //         return self.emit('error', {
  //           message: 'failed_to_refresh_key',
  //           details: err,
  //         });
  //       if (self.account) return self.emit('ready');
  // !!      self.setPrimaryAccount(function(err) {
  //         if (err)
  //           return self.emit('error', {
  //             message: 'failed_to_set_account',
  //             details: err,
  //           });
  //         self.emit('ready');
  //       });
  //     });
  //   });
  // }

  // const this._account = '';
  // const this._apiVersion = '';
  // const this._authUrl = 'https://login.questrade.com';
  // const this._keyDir = './keys';
  // const this._keyFile = '';
  // const seedToken = 'FADh7OnO_gBUXkeg3WLhZGKosAac6IbF0';

  // let this._accessToken = '';
  // let this._apiServer = '';
  // let this._apiUrl = '';
  // let this._refreshToken = '';

  /*
Saves the latest refreshToken in the file name after the seedToken
Questrade.prototype._saveKey = function(cb) {
  cb = cb || function() {};
  var self = this;
  fs.writeFile(self._getKeyFile(), self.refreshToken, 'utf8', function(err) {
    if (err)
      return cb({
        message: 'failed_to_write',
        details: err,
      });
    cb(null, self.refreshToken);
  });
};
*/
  private _saveKey = async () => {
    writeFileSync(this._getKeyFile(), this._refreshToken, 'utf8');
    return this._refreshToken;
  };

  /*
Gets name of the file where the refreshToken is stored
Questrade.prototype._getKeyFile = function() {
  return this.keyFile || this.keyDir + '/' + this.seedToken;
};

*/
  private _getKeyFile = () => {
    return this._keyFile || `${this._keyDir}/${this.seedToken}`;
  };
  /*
Reads the refreshToken stored in the file (if it exist),
otherwise uses the seedToken
Questrade.prototype._loadKey = function(cb) {
  cb = cb || function() {};
  var self = this;
  if (self.keyFile) {
    mkdirp.sync(path.dirname(self.keyFile));
    Synchronously create a new directory
  } else {
    mkdirp.sync(self.keyDir);
  }
  fs.readFile(self._getKeyFile(), 'utf8', function(err, refreshToken) {
    if (err || !refreshToken) {
      self.refreshToken = self.seedToken;
      return self._saveKey(cb);
    }
    self.refreshToken = refreshToken;
    cb(null, refreshToken);
  });
};
*/
  private _loadKey = () => {
    if (this._keyFile) {
      sync(dirname(this._keyFile));
    } else {
      sync(this._keyDir);
    }
    const refreshToken: any = readFileSync(this._getKeyFile(), 'utf8');
    if (!refreshToken) {
      this._refreshToken = this.seedToken;
      this._saveKey();
    }
    this._refreshToken = refreshToken;
    return refreshToken;
  };
  /*
Refreshed the tokem (aka Logs in) using the latest RefreshToken
(or the SeedToken if no previous saved file)
Questrade.prototype._refreshKey = function(cb) {
  var self = this;
  var data = {
    grant_type: 'refresh_token',
    refresh_token: self.refreshToken,
  };
  request(
    {
      method: 'POST',
      url: self.authUrl + '/oauth2/token',
      qs: data,
      data: data,
    },
    function(err, http, body) {
      try {
        var creds = JSON.parse(body);
        self.api_server = creds.api_server;
        self.apiUrl = creds.api_server + self.apiVersion;
        self.accessToken = creds.access_token;
        self.refreshToken = creds.refresh_token;
        self._saveKey();
        self.emit('refresh', self.refreshToken);
      } catch (e) {
        return cb({
          message: 'login_failed',
          token: self.refreshToken,
          details: body,
        });
      }
      cb();
    }
  );
};
*/
  private _refreshKey = async () => {
    let response: axios.AxiosResponse = {
      data: null,
      status: 0,
      statusText: '',
      headers: { Null: null },
      config: {},
    };
    try {
      const url = `${this._authUrl}/oauth2/token`;
      const params = {
        grant_type: 'refresh_token',
        refresh_token: this._refreshToken,
      };
      const axiosConfig: axios.AxiosRequestConfig = {
        method: 'POST',
        params,
        url,
      };
      response = await axios.default(axiosConfig);

      const creds: ICreds = response.data;
      this._apiServer = creds.api_server;
      console.log('creds.api_server:', creds.api_server);
      this._apiUrl = `${this._apiServer}${this._apiVersion}`;
      this._accessToken = creds.access_token;
      console.log('creds.access_token:', creds.access_token);
      this._refreshToken = creds.refresh_token;
      console.log('creds.refresh_token:', creds.refresh_token);
      await this._saveKey();
    } catch (error) {
      console.log('response:', response);
      console.error('ERROR:', error.message);
    }
  };
  /*
Method that actually mades the GET/POST request to Questrade
Questrade.prototype._api = function(method, endpoint, params, cb) {
  cb = cb || function() {};
  var self = this;
  if (typeof params === 'function') {
    cb = params;
    params = undefined;
  }
  var opts = {
    method: method,
    url: self.apiUrl + endpoint,
    auth: {
      bearer: self.accessToken,
    },
  };
  if (method === 'GET') {
    opts.qs = params || {};
    opts.json = true;
  } else {
    opts.json = params || true;
  }
  request(opts, function(err, http, response) {
    if (err) {
      return cb({
        message: 'api_call_failed',
        url: self.apiUrl + endpoint,
        method: method,
        details: e,
      });
    }
    cb(null, response);
  });
};
*/
  private _api = async (
    method?: string,
    endpoint?: string | number,
    params?: any
  ) => {
    let computeParams: any = {};
    if (typeof params !== 'undefined' && typeof params === 'object') {
      computeParams = params;
    }
    computeParams.bearer = this._accessToken;

    const url: string = this._apiUrl + endpoint;
    const config: axios.AxiosRequestConfig = {
      params: computeParams,
      method,
      url,
    };
    //   if (method === 'GET') {
    //     opts.params = params || {};
    //   }
    return axios.default(config);
  };
  /*
Method that appends the set account to the API calls so all calls are made
to that account. Chage self.account to change the account used
Questrade.prototype._accountApi = function(method, endpoint, params, cb) {
  if (!this.account)
    return cb({
      message: 'no_account_selected',
    });
  this._api(method, '/accounts/' + this.account + endpoint, params, cb);
};
*/
  private _accountApi = async (method?: any, endpoint?: any, params?: any) => {
    if (!this._account) {
      throw new Error('no_account_selected');
    }
    return this._api(method, `/accounts/${this._account}${endpoint}`, params);
  };

  // console.log('_account', this._account);
  // console.log('_apiVersion', this._apiVersion);
  // console.log('_authUrl', this._authUrl);
  // console.log('_keyDir', this._keyDir);
  // console.log('_keyFile', this._keyFile);
  // console.log('seedToken', seedToken);

  // console.log('_getKeyFile():', this._getKeyFile());
  // console.log('_accessToken:', this._accessToken);
  // console.log('_apiServer:', this._apiServer);
  // console.log('_apiUrl:', this._apiUrl);
  // console.log('_refreshToken:', this._refreshToken);
  // console.log('_apiServer:', this._apiServer);

  // console.log('_loadKey:', this._loadKey());
  // console.log('_accessToken:', this._accessToken);
  // console.log('_apiServer:', this._apiServer);
  // console.log('_apiUrl:', this._apiUrl);
  // console.log('_refreshToken:', this._refreshToken);
  // console.log('_apiServer:', this._apiServer);

  // console.log('_refreshKey:', this._refreshKey());
  // console.log('_accessToken:', this._accessToken);
  // console.log('_apiServer:', this._apiServer);
  // console.log('_apiUrl:', this._apiUrl);
  // console.log('_refreshToken:', this._refreshToken);
  // console.log('_apiServer:', this._apiServer);
  // * Gets name of the file where the refreshToken is stored
  // * Reads the refreshToken stored in the file (if it exist)
  // * otherwise uses the seedToken
  // * Synchronously create a new directory
  // * Refreshed the tokem (aka Logs in) using the latest RefreshToken
  // * (or the SeedToken if no previous saved file)
  // *   emit('refresh', this._refreshToken);
  // * Method that actually mades the GET/POST request to Questrade
  // * Method that appends the set account to the API calls so all calls
  // * are made to that account. Chage account to change the account used
}
