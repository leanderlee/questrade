Questrade API
=============

[![npm package](https://nodei.co/npm/questrade.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/questrade/)

[![Build status](https://img.shields.io/travis/leanderlee/questrade.svg?style=flat-square)](https://travis-ci.org/leanderlee/questrade)
[![Dependency Status](https://img.shields.io/david/leanderlee/questrade.svg?style=flat-square)](https://david-dm.org/leanderlee/questrade)
[![Known Vulnerabilities](https://snyk.io/test/npm/questrade/badge.svg?style=flat-square)](https://snyk.io/test/npm/questrade)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/leanderlee/questrade?utm_source=badge)


This API is an easy way to use the [Questrade API](www.questrade.com/api/documentation/getting-started) immediately.

### Features

- Token management
- Easy to use API calls
- Auto-select primary account

## Getting Started

Simply start by installing the questrade library:

```bash
npm install --save questrade
```

You will then need to get an [API key](https://login.questrade.com/APIAccess/userapps.aspx).

After that's it's really simple to use:

```js
var Questrade = require('questrade');

var qt = new Questrade('<your-api-key-here>');
// - OR -
var qt = new Questrade('./path/to/file'); // Location of a text file with the API key

// Wait to login
qt.on('ready', function () {
  
  // Access your account here
  qt.getAccounts()
  qt.getBalances()

  // Get Market quotes
  qt.getQuote('MSFT')

  // ... etc. See the full documentation for all the calls you can make!
})
```

Apart from the `ready` event, we emit include `error` on fatal errors, and `refresh` when the login token is refreshed.

I would not recommend calling other calls before the `ready` event fires.

### Security and Token management

Questrade's security token system requires that you save the latest refresh token that it vends you. After you create one in the user apps page, our library needs to save a key somewhere onto disk. By default, we create a folder for these keys in `./keys` at your working directory, but you can change the directory location or to load from a text file (with the key as its contents).

In order to do that, you should set either the `keyDir` option (defaults to `./keys`) or `keyFile` to point to a file (defaults to using a directory.) -- See full options below.

## Switching Accounts

By default, if you instantiate the `Questrade` class without passing in an account ID to options, we will try to find and select the primary account (by fetching a list of all the accounts). If you want to change the account, simply do:

```js
qt.account = '123456'; // Switch to account 123456 -- All future calls will use this account.
```

## Some examples

#### Account Info
```js
qt.getBalances(function (err, balances) {})
qt.getAccounts(function (err, accounts) {})
qt.getActivities(function (err, activities) {})
qt.getMarkets(function (err, markets) {})
```

#### Orders
```js
qt.getOrder(orderId, function (err, order) {})
qt.getOpenOrders(function (err, orders) {})
qt.getAllOrders(function (err, orders) {})
qt.getClosedOrders(function (err, orders) {})
qt.createOrder(newOrder, function (err, response) {})
qt.updateOrder(orderId, newOrder, function (err, response) {})
qt.removeOrder(orderId, function (err, response) {})
qt.testOrder(order, function (err, impact) {})
```

#### Quotes
```js
qt.getSymbol(symbolId, function (err, symbol) {})
qt.getSymbol('MSFT', function (err, symbol) {})
qt.search('B', function (err, symbols) {})
qt.getQuote('MSFT', function (err, quote) {})
qt.getQuotes(['MSFT', 'AAPL', 'BMO'], function (err, quotes) {})
qt.getCandles(symbolId, options, function (err, candles) {})
```

#### Strategy
```js
qt.createStrategy(newStrategy, function (err, response) {})
qt.testStrategy(strategy, function (err, impact) {})
```

#### Option Chain
```js
qt.getSymbol('MSFT', function (err, symbol) {
  qt.getOptionChain(symbol.symbolId, function (err, options) {
    var filters = [];
    Object.keys(options).forEach(function (expiryDate) {
      filters.push({
        optionType: 'Call',
        underlyingId: symbol.symbolId,
        expiryDate: expiryDate
      })
      filters.push({
        optionType: 'Put',
        underlyingId: symbol.symbolId,
        expiryDate: expiryDate
      })
    })
    qt.getOptionQuoteSimplified(filters, function (err, options) {
       /*

        options = {
          MSFT: {
            Call: {
              '2016-06-24T00:00:00.000000-04:00': [Option Chain],
              '2016-07-01T00:00:00.000000-04:00': [Option Chain],
              '2016-07-08T00:00:00.000000-04:00': [Option Chain],
              '2016-07-15T00:00:00.000000-04:00': [Option Chain],
              '2016-07-22T00:00:00.000000-04:00': [Option Chain],
              '2016-07-29T00:00:00.000000-04:00': [Option Chain],
              '2016-08-05T00:00:00.000000-04:00': [Option Chain],
              '2016-08-19T00:00:00.000000-04:00': [Option Chain],
              '2016-09-16T00:00:00.000000-04:00': [Option Chain],
              '2016-10-21T00:00:00.000000-04:00': [Option Chain],
              '2017-01-20T00:00:00.000000-04:00': [Option Chain],
              '2017-04-21T00:00:00.000000-04:00': [Option Chain],
              '2017-06-16T00:00:00.000000-04:00': [Option Chain],
              '2018-01-19T00:00:00.000000-04:00': [Option Chain]
            },
            Put: {
              '2016-06-24T00:00:00.000000-04:00': [Option Chain],
              '2016-07-01T00:00:00.000000-04:00': [Option Chain],
              '2016-07-08T00:00:00.000000-04:00': [Option Chain],
              '2016-07-15T00:00:00.000000-04:00': [Option Chain],
              '2016-07-22T00:00:00.000000-04:00': [Option Chain],
              '2016-07-29T00:00:00.000000-04:00': [Option Chain],
              '2016-08-05T00:00:00.000000-04:00': [Option Chain],
              '2016-08-19T00:00:00.000000-04:00': [Option Chain],
              '2016-09-16T00:00:00.000000-04:00': [Option Chain],
              '2016-10-21T00:00:00.000000-04:00': [Option Chain],
              '2017-01-20T00:00:00.000000-04:00': [Option Chain],
              '2017-04-21T00:00:00.000000-04:00': [Option Chain],
              '2017-06-16T00:00:00.000000-04:00': [Option Chain],
              '2018-01-19T00:00:00.000000-04:00': [Option Chain]
            }
          }
        }

        [Option Chain] =
          {
            '30.00': {
              symbol: 'MSFT16Jun17C30.00',
              symbolId: 14053313,
              lastTradePrice: 20
            },
            '35.00': {
              symbol: 'MSFT16Jun17C35.00',
              symbolId: 14053314,
              lastTradePrice: 15.3
            },

             ... etc

            '75.00': {
              symbol: 'MSFT16Jun17C75.00',
              symbolId: 14053324,
              lastTradePrice: null
            }
          }
       */
    })
  })
})
```
### Full Options

- **test** - Whether or not to use real or fake login server (and API server)
- **keyDir** - Directory location of tokens to be saved. Defaults to `./keys`.
- **keyFile** - Instead of picking a directory location, specify the exact key file to use instead.
- **account** - Specify which account ID to use
- **apiVersion** - Defaults to `v1`


### Full Documentation

- **setPrimaryAccount** (cb)
- **getAccounts** (cb)
- **getPositions** (cb)
- **getBalances** (cb)
- **getExecutions** (cb)
- **getOrder** (id, cb)
- **getOrders** (ids, cb)
- **getOpenOrders** (cb)
- **getAllOrders** (cb)
- **getClosedOrders** (cb)
- **getActivities** (cb)
- **getSymbol** (id, cb)
- **getSymbols** (ids, cb)
- **search** (query, offset, cb)
- **getOptionChain** (symbolId, cb)
- **getMarkets** (cb)
- **getQuote** (id, cb)
- **getQuotes** (ids, cb)
- **getOptionQuote** (filters, cb)
- **getOptionQuoteSimplified** (filters, cb)
- **getCandles** (id, opts, cb)
- **createOrder** (opts, cb)
- **updateOrder** (id, opts, cb)
- **testOrder** (opts, cb)
- **removeOrder** (id, cb)
- **createStrategy** (opts, cb)
- **testStrategy** (opts, cb)

### Contributions
Are welcome!
