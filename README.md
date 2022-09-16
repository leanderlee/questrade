Questrade API
=============

[![npm package](https://nodei.co/npm/questrade.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/questrade/)

[![Build status](https://img.shields.io/travis/leanderlee/questrade.svg?style=flat-square)](https://travis-ci.org/leanderlee/questrade)
[![Dependency Status](https://img.shields.io/david/leanderlee/questrade.svg?style=flat-square)](https://david-dm.org/leanderlee/questrade)
[![Known Vulnerabilities](https://snyk.io/test/npm/questrade/badge.svg?style=flat-square)](https://snyk.io/test/npm/questrade)
[![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/leanderlee/questrade?utm_source=badge)


This API is an easy way to use the [Questrade API](www.questrade.com/api/documentation/getting-started) immediately.

If you're looking for the old API docs, [click here](README-v1.md).

### Features

- Easy to use API calls
- Supports options chain
- Supports account fetching
- Auto-fetch primary account

## Getting Started

Simply start by installing the questrade library:

```bash
npm install --save questrade
```

You will then need to get an [API key](https://login.questrade.com/APIAccess/userapps.aspx).

**Important note about key management:**
After that's it's really simple to use, but you **WILL** need to save the new API key and use it every time you try to reconnect. The API key Questrade initially gives you will no longer be valid after you call `connect`.

```js
const Questrade = require('questrade');

const qt = new Questrade('<your-api-key-here>');

// Connect to Questrade
const newKey = await qt.connect()
// Save newKey for next time

// Access your account here
const account = await qt.getPrimaryAccount()
const accounts = await qt.getAccounts()
const balances = await account.getBalances()

// Get Market quotes
const msft = await qt.getSymbol('MSFT')
const quote = await msft.getQuote()
const options = await msft.getOptionChain()

// ... etc. See the full documentation for all the calls you can make!
```

## Some examples

#### Root API
```js
const account = await qt.getPrimaryAccount() // Account
const markets = await qt.getMarkets()
const accounts = await qt.getAccounts() // => [Account]
```

#### Account
```js
const balances = await account.getBalances()
const activities = await account.getActivities()
const orders = await qt.getOpenOrders() // [Order]
const orders = await qt.getOrders() // [Order]
const orders = await qt.getClosedOrders() // [Order]
const order = await qt.getOrder(orderId) // => Order
await qt.createOrder(newOrder)
await qt.updateOrder(orderId, newOrder)
await qt.removeOrder(orderId)
await qt.testOrder(order)
```

#### Symbols
```js
const symbol = await qt.getSymbol('MSFT') // => Symbol
const symbols = await qt.getSymbols(['MSFT', 'AAPL', 'BMO']) // => [Symbol]
const symbols = qt.searchSymbols('MS') // => [Symbol]
```

#### Option Chain
```js
// Example fetching TSLA options
const tsla = await qt.getSymbol('tsla')
const chain = await tsla.getOptionChain()
const jan25 = chain['2025-01-17']
const jan25600 = jan25['600']
const quote = await jan25600.getQuote()
```


## Streaming

For those accounts that have L1 data access (either practice account or Advanced market data packages) you can stream live market data.

```js

// ... connect to Questrade first!

// Websocket port changes by API and by symbol. So you have to get the port every time you need different data stream
var getWebSocketURL = function (symbolId, cb) {
  var webSocketURL;
  request({
    method: 'GET',
    url: qt.apiUrl + '/markets/quotes?ids=' + symbolId + '&stream=true&mode=WebSocket',
    auth: {
      bearer: qt.accessToken
    }
  }, function (err, http, body) {
    if (err) {
      cb(err, null);
    } else {
      response = JSON.parse(body);
      webSocketURL = qt.api_server.slice(0, -1) + ':' + response.streamPort + '/' + qt.apiVersion + '/markets/quotes?ids=' + symbolId + 'stream=true&mode=WebSocket';
      cb(null, webSocketURL);
    }
  });
}
getWebSocketURL('9291,8049', function (err, webSocketURL) { // BMO.TO & AAPL
  console.log(webSocketURL);
  const WebSocket = require('ws');
  const ws = new WebSocket(webSocketURL);

  ws.on('open', function open() {
    ws.send(qt.accessToken);
  });

  ws.on('message', function incoming(data) {
    console.log(data);
    // Do what you want with the data
  });

  // CLOSING WebSocket Connections otherwise will remain open
  process.on('exit', function () {
    if (ws) {
      console.log('CLOSE WebSocket');
      ws.close();
    }
  });

  //catches ctrl+c event
  process.on('SIGINT', function () {
    if (ws) {
      console.log('CLOSE WebSocket SIGINT');
      ws.close();
    }
  });

  //catches uncaught exceptions
  process.on('uncaughtException', function () {
    if (ws) {
      console.log('CLOSE WebSocket');
      ws.close();
    }
  });
});
```


### Full Options

- **clientId** - The API key Questrade provided
- **isDev** - Whether or not to use real or fake login server (and API server). Defaults to `false`
- **apiVersion** - Defaults to `v1`
- **accessToken** - Optionally, instead of calling `connect`, you can use an access token directly, perhaps through an implicit OAuth flow.


### Full Documentation

- **getPrimaryAccount** () => [Account](#account-object)
- **getAccounts** () => [[Account](#account-object)]
- **getMarkets** (cb)
- **getQuotesById** (symbolIds)
- **getSymbol** (ticker) => [Symbol](#symbol-object)
- **getSymbols** (tickers) => [[Symbol](#symbol-object)]
- **searchSymbols** (prefix, offset = 0) => [[Symbol](#symbol-object)]

#### Account Object
- **getPositions** ()
- **getBalances** ()
- **getExecutions** ()
- **createOrder** (params)
- **getOrders** (params)
- **getOpenOrders** ()
- **getClosedOrders** ()
- **getAllOrders** ()
- **getOrder** (orderId, params)
- **updateOrder** (orderId, params)
- **removeOrder** (orderId)
- **testOrder** (params)
- **createStrategy** (params)
- **testStrategy** (params)
- **getActivities** ({ [startTime], [endTime] })

#### Symbol Object
- **getOptionChain** ()
- **getQuote** ()
- **getCandles** ({ [startTime], [endTime], [interval] })

### Contributions
Are welcome!
