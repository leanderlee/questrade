/** @format */

// /** @format */

// // /** @format */

// import { default as assert } from 'assert';
// import { QuestradeClass } from '../QuestradeClass/class';
// // x.
// // describe('Smoke test validate the exitence of QuestradeClass members',
// // () => {

// //   it('=>  qt.seedToken ', async (done: an!y) => {
// //     console.log('\n" qt.seedToken  ":', typeof qt.seedToken);
// //     await console.log( qt.seedToken)
// //     done();
// //   });
// //   it('=>  qt.setPrimaryAccount  ', async (done: an!y) => {
// //     console.log('\n" qt.setPrimaryAccount   ":'
// // , typeof qt.setPrimaryAccount);
// //     await qt.setPrimaryAccount()
// //     done();
// //   });
// //   it('=>  qt.getAccounts  ', async (done: an!y) => {
// //     console.log('\n" qt.getAccounts   ":', typeof qt.getAccounts);
// //     await qt.getAccounts()
// //     done();
// //   });
// //   it('=>  qt.getPositions  ', async (done: an!y) => {
// //     console.log('\n" qt.getPositions   ":', typeof qt.getPositions);
// //     await qt.getPositions()
// //     done();
// //   });
// //   it('=>  qt.getBalances  ', async (done: an!y) => {
// //     console.log('\n" qt.getBalances   ":', typeof qt.getBalances);
// //     await qt.getBalances()
// //     done();
// //   });
// //   it('=>  qt.getExecutions  ', async (done: an!y) => {
// //     console.log('\n" qt.getExecutions   ":', typeof qt.getExecutions);
// //     await qt.getExecutions()
// //     done();
// //   });
// //   it('=>  qt.getOrder  ', async (done: an!y) => {
// //     console.log('\n" qt.getOrder   ":', typeof qt.getOrder);
// //     await qt.getOrder()
// //     done();
// //   });
// //   it('=>  qt.getOrders  ', async (done: an!y) => {
// //     console.log('\n" qt.getOrders   ":', typeof qt.getOrders);
// //     await qt.getOrders()
// //     done();
// //   });
// //   it('=>  qt.getOpenOrders  ', async (done: an!y) => {
// //     console.log('\n" qt.getOpenOrders   ":', typeof qt.getOpenOrders);
// //     await qt.getOpenOrders()
// //     done();
// //   });
// //   it('=>  qt.getAllOrders  ', async (done: an!y) => {
// //     console.log('\n" qt.getAllOrders   ":', typeof qt.getAllOrders);
// //     await qt.getAllOrders()
// //     done();
// //   });
// //   it('=>  qt.getClosedOrders  ', async (done: an!y) => {
// //     console.log('\n" qt.getClosedOrders   ":', typeof qt.getClosedOrders);
// //     await qt.getClosedOrders()
// //     done();
// //   });
// //   it('=>  qt.getActivities  ', async (done: an!y) => {
// //     console.log('\n" qt.getActivities   ":', typeof qt.getActivities);
// //     await qt.getActivities()
// //     done();
// //   });
// //   it('=>  qt.getSymbol  ', async (done: an!y) => {
// //     console.log('\n" qt.getSymbol   ":', typeof qt.getSymbol);
// //     await qt.getSymbol()
// //     done();
// //   });
// //   it('=>  qt.getSymbols  ', async (done: an!y) => {
// //     console.log('\n" qt.getSymbols   ":', typeof qt.getSymbols);
// //     await qt.getSymbols()
// //     done();
// //   });
// //   it('=>  qt.search  ', async (done: an!y) => {
// //     console.log('\n" qt.search   ":', typeof qt.search);
// //     await qt.search()
// //     done();
// //   });
// //   it('=>  qt.getOptionChain  ', async (done: an!y) => {
// //     console.log('\n" qt.getOptionChain   ":', typeof qt.getOptionChain);
// //     await qt.getOptionChain()
// //     done();
// //   });
// //   it('=>  qt.getMarkets  ', async (done: an!y) => {
// //     console.log('\n" qt.getMarkets   ":', typeof qt.getMarkets);
// //     await qt.getMarkets()
// //     done();
// //   });
// //   it('=>  qt.getQuote  ', async (done: an!y) => {
// //     console.log('\n" qt.getQuote   ":', typeof qt.getQuote);
// //     await qt.getQuote()
// //     done();
// //   });
// //   it('=>  qt.getQuotes  ', async (done: an!y) => {
// //     console.log('\n" qt.getQuotes   ":', typeof qt.getQuotes);
// //     await qt.getQuotes()
// //     done();
// //   });
// //   it('=>  qt.getOptionQuote  ', async (done: an!y) => {
// //     console.log('\n" qt.getOptionQuote   ":', typeof qt.getOptionQuote);
// //     await qt.getOptionQuote()
// //     done();
// //   });
// //   it('=>  qt.getOptionQuoteSimplified  ', async (done: an!y) => {
// //     console.log(
// //       '\n" qt.getOptionQuoteSimplified   ":',
// //       typeof qt.getOptionQuoteSimplified
// //     );
// //     await qt.getOptionQuoteSimplified()
// //     done();
// //   });
// //   it('=>  qt.getCandles  ', async (done: an!y) => {
// //     console.log('\n" qt.getCandles   ":', typeof qt.getCandles);
// //     await qt.getCandles()
// //     done();
// //   });
// //   it('=>  qt.createOrder  ', async (done: an!y) => {
// //     console.log('\n" qt.createOrder   ":', typeof qt.createOrder);
// //     await qt.createOrder()
// //     done();
// //   });
// //   it('=>  qt.updateOrder  ', async (done: an!y) => {
// //     console.log('\n" qt.updateOrder   ":', typeof qt.updateOrder);
// //     await qt.updateOrder()
// //     done();
// //   });
// //   it('=>  qt.testOrder  ', async (done: an!y) => {
// //     console.log('\n" qt.testOrder   ":', typeof qt.testOrder);
// //     await qt.testOrder()
// //     done();
// //   });
// //   it('=>  qt.removeOrder  ', async (done: an!y) => {
// //     console.log('\n" qt.removeOrder   ":', typeof qt.removeOrder);
// //     await qt.removeOrder()
// //     done();
// //   });
// //   it('=>  qt.createStrategy  ', async (done: an!y) => {
// //     console.log('\n" qt.createStrategy   ":', typeof qt.createStrategy);
// //     await qt.createStrategy()
// //     done();
// //   });
// //   it('=>  qt.testStrategy  ', async (done: an!y) => {
// //     console.log('\n" qt.testStrategy   ":', typeof qt.testStrategy);
// //     await qt.testStrategy()
// //     done();
// //   });
// // });

// describe('API', () => {
//   it('sets the key as an option or as a string', async (done: an!y) => {
//     const qt = new QuestradeClass('abc');
//     assert.equal(qt.seedToken, 'abc');
//     await qt.removeAllListeners();
//     done();
//   });
//   it('sets the key as an option or as a string', async (done: an!y) => {
//     const qt = new QuestradeClass({ seedToken: 'abc' });
//     assert.equal(qt.seedToken, 'abc');
//     await qt.removeAllListeners();
//     done();
//   });
//   it('throws error if there is no key', async (done: an!y) => {
//     assert.throws(() => {
//       return new QuestradeClass();
//     });
//     done();
//   });
// });
