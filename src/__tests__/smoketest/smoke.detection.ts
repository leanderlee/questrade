/** @format */

// /** @format */
// // import {} from 'chai'
// import {
//   AccountStatus,
//   AccountType,
//   ClientAccountType,
//   Currency,
//   HistoricalDataGranularity,
//   ListingExchange,
//   OptionDurationType,
//   OptionExerciseType,
//   OptionType,
//   OrderAction,
//   OrderClass,
//   OrderSide,
//   OrderState,
//   OrderStateFilterType,
//   OrderTimeInForce,
//   OrderType,
//   SecurityType,
//   StrategyTypes,
//   TickType,
// } from '../../enums';
// import { QuestradeClass } from '../../QuestradeClass/class';
// const qt = new QuestradeClass('');

// const consoleDirOptions: NodeJS.InspectOptions = {
//   showHidden: true,
//   colors: true,
//   depth: null,
// };
// describe('Smoke test will validate the exitence of', () => {
//   describe('Smoke test validate the exitence of QuestradeClass members', () => {
//     it('=>  QuestradeClass ', async (done: any) => {
//       console.log('\n" QuestradeClass  ":', typeof QuestradeClass);
//       console.dir(await QuestradeClass, consoleDirOptions);
//       done();
//     });

//     it('=>  qt.seedToken ', async (done: any) => {
//       console.log('\n" qt.seedToken  ":', typeof qt.seedToken);
//       console.dir(await qt.seedToken, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.setPrimaryAccount  ', async (done: any) => {
//       console.log('\n" qt.setPrimaryAccount   ":', typeof qt.setPrimaryAccount);
//       console.dir(await qt.setPrimaryAccount, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getAccounts  ', async (done: any) => {
//       console.log('\n" qt.getAccounts   ":', typeof qt.getAccounts);
//       console.dir(await qt.getAccounts, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getPositions  ', async (done: any) => {
//       console.log('\n" qt.getPositions   ":', typeof qt.getPositions);
//       console.dir(await qt.getPositions, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getBalances  ', async (done: any) => {
//       console.log('\n" qt.getBalances   ":', typeof qt.getBalances);
//       console.dir(await qt.getBalances, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getExecutions  ', async (done: any) => {
//       console.log('\n" qt.getExecutions   ":', typeof qt.getExecutions);
//       console.dir(await qt.getExecutions, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOrder  ', async (done: any) => {
//       console.log('\n" qt.getOrder   ":', typeof qt.getOrder);
//       console.dir(await qt.getOrder, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOrders  ', async (done: any) => {
//       console.log('\n" qt.getOrders   ":', typeof qt.getOrders);
//       console.dir(await qt.getOrders, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOpenOrders  ', async (done: any) => {
//       console.log('\n" qt.getOpenOrders   ":', typeof qt.getOpenOrders);
//       console.dir(await qt.getOpenOrders, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getAllOrders  ', async (done: any) => {
//       console.log('\n" qt.getAllOrders   ":', typeof qt.getAllOrders);
//       console.dir(await qt.getAllOrders, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getClosedOrders  ', async (done: any) => {
//       console.log('\n" qt.getClosedOrders   ":', typeof qt.getClosedOrders);
//       console.dir(await qt.getClosedOrders, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getActivities  ', async (done: any) => {
//       console.log('\n" qt.getActivities   ":', typeof qt.getActivities);
//       console.dir(await qt.getActivities, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getSymbol  ', async (done: any) => {
//       console.log('\n" qt.getSymbol   ":', typeof qt.getSymbol);
//       console.dir(await qt.getSymbol, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getSymbols  ', async (done: any) => {
//       console.log('\n" qt.getSymbols   ":', typeof qt.getSymbols);
//       console.dir(await qt.getSymbols, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.search  ', async (done: any) => {
//       console.log('\n" qt.search   ":', typeof qt.search);
//       console.dir(await qt.search, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOptionChain  ', async (done: any) => {
//       console.log('\n" qt.getOptionChain   ":', typeof qt.getOptionChain);
//       console.dir(await qt.getOptionChain, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getMarkets  ', async (done: any) => {
//       console.log('\n" qt.getMarkets   ":', typeof qt.getMarkets);
//       console.dir(await qt.getMarkets, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getQuote  ', async (done: any) => {
//       console.log('\n" qt.getQuote   ":', typeof qt.getQuote);
//       console.dir(await qt.getQuote, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getQuotes  ', async (done: any) => {
//       console.log('\n" qt.getQuotes   ":', typeof qt.getQuotes);
//       console.dir(await qt.getQuotes, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOptionQuote  ', async (done: any) => {
//       console.log('\n" qt.getOptionQuote   ":', typeof qt.getOptionQuote);
//       console.dir(await qt.getOptionQuote, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getOptionQuoteSimplified  ', async (done: any) => {
//       console.log(
//         '\n" qt.getOptionQuoteSimplified   ":',
//         typeof qt.getOptionQuoteSimplified
//       );
//       console.dir(await qt.getOptionQuoteSimplified, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.getCandles  ', async (done: any) => {
//       console.log('\n" qt.getCandles   ":', typeof qt.getCandles);
//       console.dir(await qt.getCandles, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.createOrder  ', async (done: any) => {
//       console.log('\n" qt.createOrder   ":', typeof qt.createOrder);
//       console.dir(await qt.createOrder, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.updateOrder  ', async (done: any) => {
//       console.log('\n" qt.updateOrder   ":', typeof qt.updateOrder);
//       console.dir(await qt.updateOrder, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.testOrder  ', async (done: any) => {
//       console.log('\n" qt.testOrder   ":', typeof qt.testOrder);
//       console.dir(await qt.testOrder, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.removeOrder  ', async (done: any) => {
//       console.log('\n" qt.removeOrder   ":', typeof qt.removeOrder);
//       console.dir(await qt.removeOrder, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.createStrategy  ', async (done: any) => {
//       console.log('\n" qt.createStrategy   ":', typeof qt.createStrategy);
//       console.dir(await qt.createStrategy, consoleDirOptions);
//       done();
//     });
//     it('=>  qt.testStrategy  ', async (done: any) => {
//       console.log('\n" qt.testStrategy   ":', typeof qt.testStrategy);
//       console.dir(await qt.testStrategy, consoleDirOptions);
//       done();
//     });
//   });

//   it('=>  Currency ', async (done: any) => {
//     console.log('\n" Currency  ":', typeof Currency);
//     console.dir(await Currency, consoleDirOptions);
//     done();
//   });
//   it('=>  ListingExchange ', async (done: any) => {
//     console.log('\n" ListingExchange  ":', typeof ListingExchange);
//     console.dir(await ListingExchange, consoleDirOptions);
//     done();
//   });
//   it('=>  AccountType ', async (done: any) => {
//     console.log('\n" AccountType  ":', typeof AccountType);
//     console.dir(await AccountType, consoleDirOptions);
//     done();
//   });
//   it('=>  ClientAccountType ', async (done: any) => {
//     console.log('\n" ClientAccountType  ":', typeof ClientAccountType);
//     console.dir(await ClientAccountType, consoleDirOptions);
//     done();
//   });
//   it('=>  AccountStatus ', async (done: any) => {
//     console.log('\n" AccountStatus  ":', typeof AccountStatus);
//     console.dir(await AccountStatus, consoleDirOptions);
//     done();
//   });
//   it('=>  TickType ', async (done: any) => {
//     console.log('\n" TickType  ":', typeof TickType);
//     console.dir(await TickType, consoleDirOptions);
//     done();
//   });
//   it('=>  OptionDurationType ', async (done: any) => {
//     console.log('\n" OptionDurationType  ":', typeof OptionDurationType);
//     console.dir(await OptionDurationType, consoleDirOptions);
//     done();
//   });
//   it('=>  OptionExerciseType ', async (done: any) => {
//     console.log('\n" OptionExerciseType  ":', typeof OptionExerciseType);
//     console.dir(await OptionExerciseType, consoleDirOptions);
//     done();
//   });
//   it('=>  SecurityType ', async (done: any) => {
//     console.log('\n" SecurityType  ":', typeof SecurityType);
//     console.dir(await SecurityType, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderStateFilterType ', async (done: any) => {
//     console.log('\n" OrderStateFilterType  ":', typeof OrderStateFilterType);
//     console.dir(await OrderStateFilterType, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderAction ', async (done: any) => {
//     console.log('\n" OrderAction  ":', typeof OrderAction);
//     console.dir(await OrderAction, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderSide ', async (done: any) => {
//     console.log('\n" OrderSide  ":', typeof OrderSide);
//     console.dir(await OrderSide, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderType ', async (done: any) => {
//     console.log('\n" OrderType  ":', typeof OrderType);
//     console.dir(await OrderType, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderTimeInForce ', async (done: any) => {
//     console.log('\n" OrderTimeInForce  ":', typeof OrderTimeInForce);
//     console.dir(await OrderTimeInForce, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderState ', async (done: any) => {
//     console.log('\n" OrderState  ":', typeof OrderState);
//     console.dir(await OrderState, consoleDirOptions);
//     done();
//   });
//   it('=>  HistoricalDataGranularity ', async (done: any) => {
//     console.log(
//       '\n" HistoricalDataGranularity  ":',
//       typeof HistoricalDataGranularity
//     );
//     console.dir(await HistoricalDataGranularity, consoleDirOptions);
//     done();
//   });
//   it('=>  OrderClass ', async (done: any) => {
//     console.log('\n" OrderClass  ":', typeof OrderClass);
//     console.dir(await OrderClass, consoleDirOptions);
//     done();
//   });
//   it('=>  StrategyTypes ', async (done: any) => {
//     console.log('\n" StrategyTypes  ":', typeof StrategyTypes);
//     console.dir(await StrategyTypes, consoleDirOptions);
//     done();
//   });
// });

// console.log(QuestradeClass);
// console.log(Currency);
// console.log(ListingExchange);
// console.log(AccountType);
// console.log(ClientAccountType);
// console.log(AccountStatus);
// console.log(TickType);
// console.log(OptionType);
// console.log(OptionDurationType);
// console.log(OptionExerciseType);
// console.log(SecurityType);
// console.log(OrderStateFilterType);
// console.log(OrderAction);
// console.log(OrderSide);
// console.log(OrderType);
// console.log(OrderTimeInForce);
// console.log(OrderState);
// console.log(HistoricalDataGranularity);
// console.log(OrderClass);
// console.log(StrategyTypes);
