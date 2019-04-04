import { inherits } from 'util';
import { EventEmitter as EE } from 'events';
import { writeFile, readFile } from 'fs';
import { keyBy, chain, pick } from 'lodash';
import { dirname } from 'path';
import { sync } from 'mkdirp';
import moment from 'moment';
import request from 'request';

/**
 * Questrade Class to interact with Questrade API
 * @constructor
 * @param {(Object|string)} opts - An object containing options or, a string with with either the seedToken or the File that contains it
 * @param {boolean} [opts.test = false] - Set to true if using a practice account (http://www.questrade.com/api/free-practice-account)
 * @param {string} [opts.keyDir = './keys'] - Directory where the last refreshToken is stored. The file name will have to be seedToken
 * @param {string} [opts.account] - The default Account agains wich the API are made. GetAccounts() will return the possible values
 */
function Questrade(opts) {
  var self = this;
  if (opts === undefined) throw new Error('questrade_missing_api_key or options');
  opts = opts || {};

  if (typeof opts === 'string') {
    if (opts.indexOf('/') === -1) {
      opts = {
        seedToken: opts
      };
    } else {
      opts = {
        keyFile: opts
      };
    }
  }

  self.test = opts.test === undefined ? false : !!opts.test; // Set to true if using a practice account (http://www.questrade.com/api/free-practice-account)
  self.keyDir = opts.keyDir || './keys'; // Directory where the last refreshToken is stored. The file name will have to be seedToken
  self.apiVersion = opts.apiVersion || 'v1'; // Used as part of the API URL
  self.keyFile = opts.keyFile || ''; // File that stores the last refreshToken. Not really neede if you keep the seedToken and the keyDir
  self.seedToken = opts.seedToken || ''; // The original token obtained mannuelly from the interface
  self.account = opts.account || ''; // The default Account agains wich the API are made. GetAccounts() will return the possible values
  self.refreshToken = ''; // The refresh token used to login and get the new accessToken, the new refreshToken (next time to log in) and the api_server
  self.accessToken = ''; // Stores The unique token that is used to call each API call, Changes everytime you Refresh Tokens (aka Login)
  self.api_server = ''; // The server your connection needs to be made to (changes sometimes)
  self.apiUrl = ''; // Strores the URL (without the endpoint) to use for regular GET/POST Apis

  if (self.test) {
    self.authUrl = 'https://practicelogin.questrade.com';
  } else {
    self.authUrl = 'https://login.questrade.com';
  }

  // Running the Authentification process and emit 'ready' when done
  self._loadKey(function (err) {
    if (err) return self.emit('error', {
      message: 'failed_to_load_key',
      details: err
    });
    self._refreshKey(function (err) {
      if (err) return self.emit('error', {
        message: 'failed_to_refresh_key',
        details: err
      });
      if (self.account) return self.emit('ready');
      self.setPrimaryAccount(function (err) {
        if (err) return self.emit('error', {
          message: 'failed_to_set_account',
          details: err
        });
        self.emit('ready');
      });
    });
  });

}

inherits(Questrade, EE);

// Saves the latest refreshToken in the file name after the seedToken
Questrade.prototype._saveKey = function (cb) {
  cb = cb || function () { };
  var self = this;
  writeFile(self._getKeyFile(), self.refreshToken, 'utf8', function (err) {
    if (err) return cb({
      message: 'failed_to_write',
      details: err
    });
    cb(null, self.refreshToken);
  });
};

// Gets name of the file where the refreshToken is stored
Questrade.prototype._getKeyFile = function () {
  return (this.keyFile || this.keyDir + '/' + this.seedToken);
};

// Reads the refreshToken stored in the file (if it exist), otherwise uses the seedToken
Questrade.prototype._loadKey = function (cb) {
  cb = cb || function () { };
  var self = this;
  if (self.keyFile) {
    sync(dirname(self.keyFile)); //Synchronously create a new directory
  } else {
    sync(self.keyDir);
  }
  readFile(self._getKeyFile(), 'utf8', function (err, refreshToken) {
    if (err || !refreshToken) {
      self.refreshToken = self.seedToken;
      return self._saveKey(cb);
    }
    self.refreshToken = refreshToken;
    cb(null, refreshToken);
  });
};

// Refreshed the tokem (aka Logs in) using the latest RefreshToken (or the SeedToken if no previous saved file)
Questrade.prototype._refreshKey = function (cb) {
  var self = this;
  var data = {
    grant_type: 'refresh_token',
    refresh_token: self.refreshToken
  };
  request({
    method: 'POST',
    url: self.authUrl + '/oauth2/token',
    qs: data,
    data: data
  }, function (null: unknown, http, body) {
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
        details: body
      });
    }
    cb();
  });
};

// Method that actually mades the GET/POST request to Questrade
Questrade.prototype._api = function (method, endpoint, params, cb) {
  cb = cb || function () { };
  var self = this;
  if (typeof params === 'function') {
    cb = params;
    params = undefined;
  }
  var opts = {
    method: method,
    url: self.apiUrl + endpoint,
    auth: {
      bearer: self.accessToken
    }
  };
  if (method === 'GET') {
    opts.qs = params || {};
    opts.json = true;
  } else {
    opts.json = params || true;
  }
  request(opts, function (err, http, response) {
    if (err) {
      return cb({
        message: 'api_call_failed',
        url: self.apiUrl + endpoint,
        method: method,
        details: e
      });
    }
    cb(null, response);
  });
};

// Method that appends the set account to the API calls so all calls are made to that account. Chage self.account to change the account used
Questrade.prototype._accountApi = function (method, endpoint, params, cb) {
  if (!this.account) return cb({
    message: 'no_account_selected'
  });
  this._api(method, '/accounts/' + this.account + endpoint, params, cb);
};

// Sets self.account to the first account (presumively the "primary account")
Questrade.prototype.setPrimaryAccount = function (cb) {
  cb = cb || function () { };
  var self = this;
  self.getAccounts(function (err, accounts) {
    if (err) return cb(err);
    if (!accounts || !Object.keys(accounts).length) return cb({
      message: 'no_accounts_found'
    });
    var primaryAccount = Object.keys(accounts).filter(function (accountNumber) {
      return accounts[accountNumber].isPrimary;
    });
    if (!primaryAccount.length) return cb({
      message: 'no_primary_account'
    });
    self.account = primaryAccount[0];
    cb(null, self.account);
  });
};

Questrade.prototype.getAccounts = function (cb) {
  console.log('getAccounts');
  this._api('GET', '/accounts', function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.accounts, 'number'));
  });
};

Questrade.prototype.getPositions = function (cb) {
  this._accountApi('GET', '/positions', cb);
};

Questrade.prototype.getBalances = function (cb) {
  this._accountApi('GET', '/balances', cb);
};

Questrade.prototype.getExecutions = function (cb) {
  this._accountApi('GET', '/executions', cb);
};

Questrade.prototype.getOrder = function (id, cb) {
  this._accountApi('GET', '/orders/' + id, function (err, response) {
    if (err) return cb(err);
    if (!response.orders.length) return cb({
      message: 'order_not_found'
    });
    cb(null, response.orders[0]);
  });
};

Questrade.prototype.getOrders = function (ids, cb) {
  if (!Array.isArray(ids)) return cb({
    message: 'missing_ids'
  });
  if (!ids.length) return cb(null, {});
  this._accountApi('GET', '/orders', {
    ids: ids.join(',')
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.orders, 'id'));
  });
};

Questrade.prototype.getOpenOrders = function (cb) {
  this._accountApi('GET', '/orders', {
    stateFilter: 'Open'
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.orders, 'id'));
  });
};

Questrade.prototype.getAllOrders = function (cb) {
  this._accountApi('GET', '/orders', {
    stateFilter: 'All'
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.orders, 'id'));
  });
};

Questrade.prototype.getClosedOrders = function (cb) {
  this._accountApi('GET', '/orders', {
    stateFilter: 'Closed'
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.orders, 'id'));
  });
};

Questrade.prototype.getActivities = function (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  if (opts.startTime && !moment(opts.startTime).isValid()) {
    return cb({
      message: 'start_time_invalid',
      details: opts.startTime
    });
  }
  if (opts.endTime && !moment(opts.endTime).isValid()) {
    return cb({
      message: 'end_time_invalid',
      details: opts.endTime
    });
  }
  var startTime = opts.startTime ? moment(opts.startTime).toISOString() : moment().startOf('day').subtract(30, 'days').toISOString();
  var endTime = opts.endTime ? moment(opts.endTime).toISOString() : moment().toISOString();
  this._accountApi('GET', '/activities', {
    startTime: startTime,
    endTime: endTime
  }, cb);
};

Questrade.prototype.getSymbol = function (id, cb) {
  var params = false;
  if (typeof id === 'number') {
    params = {
      id: id
    };
  } else if (typeof id === 'string') {
    params = {
      names: id + ''
    };
  }
  if (params === false) return cb({
    message: 'missing_id'
  });
  this._api('GET', '/symbols', params, function (err, response) {
    if (err) return cb(err);
    if (!response.symbols.length) return cb({
      message: 'symbol_not_found'
    });
    cb(null, response.symbols[0]);
  });
};

Questrade.prototype.getSymbols = function (ids, cb) {
  if (!Array.isArray(ids)) return cb({
    message: 'missing_ids'
  });
  if (!ids.length) return cb(null, {});
  var params = false;
  if (typeof ids[0] === 'number') {
    params = {
      ids: ids.join(',')
    };
  } else if (typeof ids[0] === 'string') {
    params = {
      names: ids.join(',')
    };
  }
  if (params === false) return cb({
    message: 'missing_id'
  });
  this._api('GET', '/symbols', params, function (err, response) {
    if (err) return cb(err);
    if (!response.symbols.length) return cb({
      message: 'symbols_not_found'
    });
    cb(null, keyBy(response.symbols, params.names ? 'symbol' : 'symbolId'));
  });
};

Questrade.prototype.search = function (query, offset, cb) {
  if (typeof offset === 'function') {
    cb = offset;
    offset = 0;
  }
  if (typeof query !== 'string') return cb({
    message: 'missing_query'
  });
  this._api('GET', '/symbols/search', {
    prefix: query,
    offset: offset
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, response.symbols);
  });
};

Questrade.prototype.getOptionChain = function (symbolId, cb) {
  this._api('GET', '/symbols/' + symbolId + '/options', function (err, response) {
    if (err) return cb(err);
    cb(null, chain(response.optionChain)
      .keyBy('expiryDate')
      .mapValues(function (option) {
        return keyBy(option.chainPerRoot[0].chainPerStrikePrice, 'strikePrice');
      })
      .value());
  });
};

Questrade.prototype.getMarkets = function (cb) {
  this._api('GET', '/markets', function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.markets, 'name'));
  });
};

Questrade.prototype.getQuote = function (id, cb) {
  this._api('GET', '/markets/quotes/' + id, function (err, response) {
    if (err) return cb(err);
    if (!response.quotes) return cb({
      message: 'quote_not_found',
      symbol: id
    });
    cb(null, response.quotes[0]);
  });
};

Questrade.prototype.getQuotes = function (ids, cb) {
  if (!Array.isArray(ids)) return cb({
    message: 'missing_ids'
  });
  if (!ids.length) return cb(null, {});
  this._api('GET', '/markets/quotes', {
    ids: ids.join(',')
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, keyBy(response.quotes, 'symbolId'));
  });
};

Questrade.prototype.getOptionQuote = function (filters, cb) {
  if (!Array.isArray(filters) && typeof filters === 'object') filters = [filters];
  this._api('POST', '/markets/quotes/options', {
    filters: filters
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, response.optionQuotes);
  });
};

Questrade.prototype.getOptionQuoteSimplified = function (filters, cb) {
  this.getOptionQuote(filters, function (err, quotes) {
    cb(null, chain(quotes)
      .map(function (quote) {
        var parsedSymbol = quote.symbol.match(/^([a-zA-Z]+)(.+)(C|P)(\d+\.\d+)$/);
        if (parsedSymbol.length >= 5) {
          var parsedDate = parsedSymbol[2].match(/^(\d+)([a-zA-Z]+)(\d+)$/);
          var expiryDate = moment().utc().month(parsedDate[2]).date(parsedDate[1]).year('20' + parsedDate[3]).startOf('day');
          var expiryString = expiryDate.toISOString().slice(0, -1) + '000-04:00';
          quote.underlying = parsedSymbol[1];
          quote.expiryDate = expiryString;
          quote.strikePrice = parseFloat(parsedSymbol[4]);
          quote.optionType = parsedSymbol[3] === 'P' ? 'Put' : 'Call';
        }
        return quote;
      })
      .groupBy('underlying')
      .mapValues(function (quotes) {
        return chain(quotes)
          .groupBy('optionType')
          .mapValues(function (quotes) {
            return chain(quotes)
              .groupBy('expiryDate')
              .mapValues(function (quotes) {
                return chain(quotes)
                  .keyBy(function (quote) {
                    return quote.strikePrice.toFixed(2);
                  })
                  .mapValues(function (quote) {
                    return pick(quote, ['symbol', 'symbolId', 'lastTradePrice']);
                  })
                  .value();
              })
              .value();
          })
          .value();
      })
      .value());
  });
};

Questrade.prototype.getCandles = function (id, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  if (opts.startTime && !moment(opts.startTime).isValid()) {
    return cb({
      message: 'start_time_invalid',
      details: opts.startTime
    });
  }
  if (opts.endTime && !moment(opts.endTime).isValid()) {
    return cb({
      message: 'end_time_invalid',
      details: opts.endTime
    });
  }
  var startTime = opts.startTime ? moment(opts.startTime).toISOString() : moment().startOf('day').subtract(30, 'days').toISOString();
  var endTime = opts.endTime ? moment(opts.endTime).toISOString() : moment().toISOString();
  this._api('GET', '/markets/candles/' + id, {
    startTime: startTime,
    endTime: endTime,
    interval: opts.interval || 'OneDay'
  }, function (err, response) {
    if (err) return cb(err);
    cb(null, response.candles);
  });
};

Questrade.prototype.createOrder = function (opts, cb) {
  this._accountApi('POST', '/orders', opts, cb);
};

Questrade.prototype.updateOrder = function (id, opts, cb) {
  this._accountApi('POST', '/orders/' + id, opts, cb);
};

Questrade.prototype.testOrder = function (opts, cb) {
  this._accountApi('POST', '/orders/impact', opts, cb);
};

Questrade.prototype.removeOrder = function (id, cb) {
  this._accountApi('DELETE', '/orders/' + id, cb);
};

Questrade.prototype.createStrategy = function (opts, cb) {
  this._accountApi('POST', '/orders/strategy', opts, cb);
};

Questrade.prototype.testStrategy = function (opts, cb) {
  this._accountApi('POST', '/orders/strategy/impact', opts, cb);
};



export default Questrade;
