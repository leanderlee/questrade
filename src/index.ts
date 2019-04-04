/** @format */

import { EventEmitter as EE } from 'events';
import { readFile, writeFile } from 'fs';
import { chain, keyBy, pick } from 'lodash';
import { sync } from 'mkdirp';
import moment from 'moment';
import { dirname } from 'path';
import request from 'request';
import { inherits } from 'util';

/** @format */

export class QuestradeClass {
  public constructor() {
    //
  }
  public setPrimaryAccount = () => {
    //
  };
  public getAccounts = () => {
    //
  };
  public getPositions = () => {
    //
  };
  public getBalances = () => {
    //
  };
  public getExecutions = () => {
    //
  };
  public getOrder = () => {
    //
  };
  public getOrders = () => {
    //
  };
  public getOpenOrders = () => {
    //
  };
  public getAllOrders = () => {
    //
  };
  public getClosedOrders = () => {
    //
  };
  public getActivities = () => {
    //
  };
  public getSymbol = () => {
    //
  };
  public getSymbols = () => {
    //
  };
  public search = () => {
    //
  };
  public getOptionChain = () => {
    //
  };
  public getMarkets = () => {
    //
  };
  public getQuote = () => {
    //
  };
  public getQuotes = () => {
    //
  };
  public getOptionQuote = () => {
    //
  };
  public getOptionQuoteSimplified = () => {
    //
  };
  public getCandles = () => {
    //
  };
  public createOrder = () => {
    //
  };
  public updateOrder = () => {
    //
  };
  public testOrder = () => {
    //
  };
  public removeOrder = () => {
    //
  };
  public createStrategy = () => {
    //
  };
  public testStrategy = () => {
    //
  };
  public tempFunct() {
    return {
      accountAp: this.accountApi,
      api: this.api,
      getKeyFile: this.getKeyFile,
      loadKey: this.loadKey,
      refreshKey: this.refreshKey,
      saveKey: this.saveKey,
    };
  }
  private saveKey = () => {
    //
  };
  private getKeyFile = () => {
    //
  };
  private loadKey = () => {
    //
  };
  private refreshKey = () => {
    //
  };
  private api = () => {
    //
  };
  private accountApi = () => {
    //
  };
}

/**
 * Questrade Class to interact with Questrade API
 * @constructor
 * @param {(Object|string)} opts - An object containing options or,
 * a string with with either the seedToken or the File that contains it
 * @param {boolean} [opts.test = false] - Set to true if using a practice
 *  account (http://www.questrade.com/api/free-practice-account)
 * @param {string} [opts.keyDir = './keys'] - Directory where the last
 *  refreshToken is stored. The file name will have to be seedToken
 * @param {string} [opts.account] - The default Account agains wich the
 * API are made. GetAccounts() will return the possible values
 */
const Questrade = (opts_: any) => {
  let opts: any;
  if (opts === undefined) {
    throw new Error('questrade_missing_api_key or options');
  }
  opts = opts_ || {};

  if (typeof opts === 'string') {
    if (opts.indexOf('/') === -1) {
      opts = {
        seedToken: opts,
      };
    } else {
      opts = {
        keyFile: opts,
      };
    }
  }

  // Set to true if using a practice account (http://www.questrade.com/api/free-practice-account)
  this.test = opts.test === undefined ? false : !!opts.test;
  // Directory where the last refreshToken is stored. The file name will have to be seedToken
  this.keyDir = opts.keyDir || './keys';
  // Used as part of the API URL
  this.apiVersion = opts.apiVersion || 'v1';
  // File that stores the last refreshToken. Not really neede if you keep the seedToken and the keyDir
  this.keyFile = opts.keyFile || '';
  // The original token obtained mannuelly from the interface
  this.seedToken = opts.seedToken || '';
  // The default Account agains wich the API are made. GetAccounts() will return the possible values
  this.account = opts.account || '';
  // The refresh token used to login and get the new accessToken,
  // the new refreshToken (next time to log in) and the api_server
  this.refreshToken = '';
  // Stores The unique token that is used to call each API call, Changes everytime you Refresh Tokens (aka Login)
  this.accessToken = '';
  // The server your connection needs to be made to (changes sometimes)
  this.api_server = '';
  // Strores the URL (without the endpoint) to use for regular GET/POST Apis
  this.apiUrl = '';

  this.authUrl = this.test
    ? 'https://practicelogin.questrade.com'
    : 'https://login.questrade.com';

  // Running the Authentification process and emit 'ready' when done
  this._loadKey((loadKeyErr: Error) => {
    if (loadKeyErr) {
      return this.emit('error', {
        details: loadKeyErr,
        message: 'failed_to_load_key',
      });
    }
    this._refreshKey((refreshKeyErr: Error) => {
      if (refreshKeyErr) {
        return this.emit('error', {
          details: refreshKeyErr,
          message: 'failed_to_refresh_key',
        });
      }
      if (this.account) return this.emit('ready');
      this.setPrimaryAccount((setPrimaryAccountErr: Error) => {
        if (setPrimaryAccountErr) {
          return this.emit('error', {
            details: setPrimaryAccountErr,
            message: 'failed_to_set_account',
          });
        }
        this.emit('ready');
      });
    });
  });
};

inherits(Questrade, EE);

// Saves the latest refreshToken in the file name after the seedToken
Questrade.prototype._saveKey = (cb_: any) => {
  let cb: any = cb_;
  cb = cb
    ? cb
    : () => {
        return null;
      };

  writeFile(this._getKeyFile(), this.refreshToken, 'utf8', (err: Error) => {
    if (err) {
      return cb({
        details: err,
        message: 'failed_to_write',
      });
    }
    cb(null, this.refreshToken);
  });
};

// Gets name of the file where the refreshToken is stored
Questrade.prototype._getKeyFile = () => {
  return this.keyFile || `${this.keyDir}/${this.seedToken}`;
};

// Reads the refreshToken stored in the file (if it exist), otherwise uses the seedToken
Questrade.prototype._loadKey = (cb_: any) => {
  let cb: any = cb_;
  cb = cb
    ? cb
    : () => {
        return;
      };

  if (this.keyFile) {
    sync(dirname(this.keyFile)); // Synchronously create a new directory
  } else {
    sync(this.keyDir);
  }
  readFile(this._getKeyFile(), 'utf8', (err, refreshToken) => {
    if (err || !refreshToken) {
      this.refreshToken = this.seedToken;
      return this._saveKey(cb);
    }
    this.refreshToken = refreshToken;
    cb(null, refreshToken);
  });
};

// Refreshed the tokem (aka Logs in) using the latest RefreshToken (or the SeedToken if no previous saved file)
Questrade.prototype._refreshKey = (cb: any) => {
  const data = {
    grant_type: 'refresh_token',
    refresh_token: this.refreshToken,
  };
  request(
    {
      method: 'POST',
      qs: data,
      url: `${this.authUrl}/oauth2/token`,
    },
    (_res: any, _http: any, body: any) => {
      try {
        const creds = JSON.parse(body);
        this.api_server = creds.api_server;
        this.apiUrl = creds.api_server + this.apiVersion;
        this.accessToken = creds.access_token;
        this.refreshToken = creds.refresh_token;
        this._saveKey();
        this.emit('refresh', this.refreshToken);
      } catch (e) {
        return cb({
          details: body,
          message: 'login_failed',
          token: this.refreshToken,
        });
      }
      cb();
    }
  );
};

// Method that actually mades the GET/POST request to Questrade
Questrade.prototype._api = (
  method: string,
  endpoint: string | number,
  params_: boolean,
  cb_: {
    (arg0: { details: any; message: string; method: any; url: any }): void;
    (arg0: any, arg1: any): void;
  }
) => {
  let cb: any = cb_;
  let params = params_;
  cb = cb
    ? cb
    : () => {
        return;
      };

  if (typeof params === 'function') {
    cb = params;
    params = undefined;
  }
  let e: any;
  e = '';
  const opts: any = {
    auth: {
      bearer: this.accessToken,
    },
    method,
    url: this.apiUrl + endpoint,
  };
  if (method === 'GET') {
    opts.qs = params || {};
    opts.json = true;
  } else {
    opts.json = params || true;
  }
  request(opts, (err: Error, _http: any, response: any) => {
    if (err) {
      return cb({
        details: e,
        message: 'api_call_failed',
        method,
        url: this.apiUrl + endpoint,
      });
    }
    cb(null, response);
  });
};

// Method that appends the set account to the API calls so all calls
// are made to that account. Chage  this.account to change the account used
Questrade.prototype._accountApi = (
  method: any,
  endpoint: string,
  params: any,
  cb: (arg0: { message: string }) => void
) => {
  if (!this.account) {
    return cb({
      message: 'no_account_selected',
    });
  }
  this._api(method, `/accounts/${this.account}${endpoint}`, params, cb);
};

// Sets  this.account to the first account (presumively the "primary account")
Questrade.prototype.setPrimaryAccount = (cb_: any) => {
  let cb: any = cb_;

  cb = cb
    ? cb
    : () => {
        return;
      };

  this.getAccounts(
    (err: any, accounts: { [x: string]: { isPrimary: any } }) => {
      if (err) return cb(err);
      if (!accounts || !Object.keys(accounts).length) {
        return cb({
          message: 'no_accounts_found',
        });
      }
      const primaryAccount = Object.keys(accounts).filter(accountNumber => {
        return accounts[accountNumber].isPrimary;
      });
      if (!primaryAccount.length) {
        return cb({
          message: 'no_primary_account',
        });
      }
      this.account = primaryAccount[0];
      cb(null, this.account);
    }
  );
};

Questrade.prototype.getAccounts = (cb: any) => {
  console.log('getAccounts');
  this._api('GET', '/accounts', (err: Error, response: any) => {
    if (err) return cb(err);
    cb(null, keyBy(response.accounts, 'number'));
  });
};

Questrade.prototype.getPositions = (cb: any) => {
  this._accountApi('GET', '/positions', cb);
};

Questrade.prototype.getBalances = (cb: any) => {
  this._accountApi('GET', '/balances', cb);
};

Questrade.prototype.getExecutions = (cb: any) => {
  this._accountApi('GET', '/executions', cb);
};

Questrade.prototype.getOrder = (id: any, cb: any) => {
  this._accountApi('GET', `/orders/${id}`, (err: Error, response: any) => {
    if (err) return cb(err);
    if (!response.orders.length) {
      return cb({
        message: 'order_not_found',
      });
    }
    cb(null, response.orders[0]);
  });
};

Questrade.prototype.getOrders = (ids: any, cb: any) => {
  if (!Array.isArray(ids)) {
    return cb({
      message: 'missing_ids',
    });
  }
  if (!ids.length) return cb(null, {});
  this._accountApi(
    'GET',
    '/orders',
    {
      ids: ids.join(','),
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, keyBy(response.orders, 'id'));
    }
  );
};

Questrade.prototype.getOpenOrders = (cb: any) => {
  this._accountApi(
    'GET',
    '/orders',
    {
      stateFilter: 'Open',
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, keyBy(response.orders, 'id'));
    }
  );
};

Questrade.prototype.getAllOrders = (cb: any) => {
  this._accountApi(
    'GET',
    '/orders',
    {
      stateFilter: 'All',
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, keyBy(response.orders, 'id'));
    }
  );
};

Questrade.prototype.getClosedOrders = (cb: any) => {
  this._accountApi(
    'GET',
    '/orders',
    {
      stateFilter: 'Closed',
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, keyBy(response.orders, 'id'));
    }
  );
};

Questrade.prototype.getActivities = (opts_: any, cb_: any) => {
  let cb: any = cb_;
  let opts: any;
  if (typeof opts_ === 'function') {
    cb = opts_;
    opts = {};
  }
  opts = opts_ || {};
  if (opts.startTime && !moment(opts.startTime).isValid()) {
    return cb({
      details: opts.startTime,
      message: 'start_time_invalid',
    });
  }
  if (opts.endTime && !moment(opts.endTime).isValid()) {
    return cb({
      details: opts.endTime,
      message: 'end_time_invalid',
    });
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

Questrade.prototype.getSymbol = (id: any, cb: any) => {
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
    return cb({
      message: 'missing_id',
    });
  }
  this._api(
    'GET',
    '/symbols',
    params,
    (err: Error, response: { symbols: any[] }) => {
      if (err) return cb(err);
      if (!response.symbols.length) {
        return cb({
          message: 'symbol_not_found',
        });
      }
      cb(null, response.symbols[0]);
    }
  );
};

Questrade.prototype.getSymbols = (ids: any, cb: any) => {
  if (!Array.isArray(ids)) {
    return cb({
      message: 'missing_ids',
    });
  }
  if (!ids.length) return cb(null, {});
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
    return cb({
      message: 'missing_id',
    });
  }
  this._api('GET', '/symbols', params, (err: Error, response: any) => {
    if (err) return cb(err);
    if (!response.symbols.length) {
      return cb({
        message: 'symbols_not_found',
      });
    }
    cb(null, keyBy(response.symbols, params.names ? 'symbol' : 'symbolId'));
  });
};

Questrade.prototype.search = (query: any, offset_: any, cb_: any) => {
  let cb: any = cb_;
  let offset: any = offset_;

  if (typeof offset === 'function') {
    cb = offset;
    offset = 0;
  }
  if (typeof query !== 'string') {
    return cb({
      message: 'missing_query',
    });
  }
  this._api(
    'GET',
    '/symbols/search',
    {
      offset,
      prefix: query,
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, response.symbols);
    }
  );
};

Questrade.prototype.getOptionChain = (symbolId: any, cb: any) => {
  this._api(
    'GET',
    `/symbols/${symbolId}/options`,
    (err: Error, response: any) => {
      if (err) return cb(err);
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

Questrade.prototype.getMarkets = (cb: any) => {
  this._api('GET', '/markets', (err: Error, response: any) => {
    if (err) return cb(err);
    cb(null, keyBy(response.markets, 'name'));
  });
};

Questrade.prototype.getQuote = function(
  id: string,
  cb: {
    (arg0: { message: string; symbol: any }): void;
    (arg0: any, arg1: any): void;
  }
) {
  this._api('GET', `/markets/quotes/${id}`, (err: any, response: any) => {
    if (err) return cb(err);
    if (!response.quotes) {
      return cb({
        message: 'quote_not_found',
        symbol: id,
      });
    }
    cb(null, response.quotes[0]);
  });
};

Questrade.prototype.getQuotes = (ids: any, cb: any) => {
  if (!Array.isArray(ids)) {
    return cb({
      message: 'missing_ids',
    });
  }
  if (!ids.length) return cb(null, {});
  this._api(
    'GET',
    '/markets/quotes',
    {
      ids: ids.join(','),
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, keyBy(response.quotes, 'symbolId'));
    }
  );
};

Questrade.prototype.getOptionQuote = (filters_: any[], cb: any) => {
  let filters = filters_;
  if (!Array.isArray(filters) && typeof filters === 'object') {
    filters = [filters];
  }
  this._api(
    'POST',
    '/markets/quotes/options',
    {
      filters,
    },
    (err: Error, response: any) => {
      if (err) return cb(err);
      cb(null, response.optionQuotes);
    }
  );
};

Questrade.prototype.getOptionQuoteSimplified = (filters: any, cb: any) => {
  this.getOptionQuote(filters, (_err: any, optionsQuotes: any) => {
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
  });
};

Questrade.prototype.getCandles = (
  id: string,
  opts_: { startTime?: any; endTime?: any; interval?: any },
  cb_: {
    (arg0: { details: any; message: string }): void;
    (arg0: { details: any; message: string }): void;
    (arg0: any, arg1: any): void;
  }
) => {
  let cb: any = cb_;
  let opts: any = opts_;

  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  if (opts.startTime && !moment(opts.startTime).isValid()) {
    return cb({
      details: opts.startTime,
      message: 'start_time_invalid',
    });
  }
  if (opts.endTime && !moment(opts.endTime).isValid()) {
    return cb({
      details: opts.endTime,
      message: 'end_time_invalid',
    });
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
  this._api(
    'GET',
    `/markets/candles/${id}`,
    {
      endTime,
      interval: opts.interval || 'OneDay',
      startTime,
    },
    (err: any, response: { candles: any }) => {
      if (err) return cb(err);
      cb(null, response.candles);
    }
  );
};

Questrade.prototype.createOrder = (opts: any, cb: any) => {
  this._accountApi('POST', '/orders', opts, cb);
};

Questrade.prototype.updateOrder = (id: string, opts: any, cb: any) => {
  this._accountApi('POST', `/orders/${id}`, opts, cb);
};

Questrade.prototype.testOrder = (opts: any, cb: any) => {
  this._accountApi('POST', '/orders/impact', opts, cb);
};

Questrade.prototype.removeOrder = (id: string, cb: any) => {
  this._accountApi('DELETE', `/orders/${id}`, cb);
};

Questrade.prototype.createStrategy = (opts: any, cb: any) => {
  this._accountApi('POST', '/orders/strategy', opts, cb);
};

Questrade.prototype.testStrategy = (opts: any, cb: any) => {
  this._accountApi('POST', '/orders/strategy/impact', opts, cb);
};

export default Questrade;
