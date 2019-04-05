/** @format */
// import {} from 'chai'
import {
  AccountStatus,
  AccountType,
  ClientAccountType,
  Currency,
  HistoricalDataGranularity,
  ListingExchange,
  OptionDurationType,
  OptionExerciseType,
  OptionType,
  OrderAction,
  OrderClass,
  OrderSide,
  OrderState,
  OrderStateFilterType,
  OrderTimeInForce,
  OrderType,
  SecurityType,
  StrategyTypes,
  TickType,
} from '../../enums';
import { QuestradeClass } from '../../QuestradeClass/class';
const consoleDirOptions: NodeJS.InspectOptions = {
  showHidden: true,
  colors: true,
  depth: null,
};
describe('Smoke test will validate the exitence of', () => {
  it('=>  QuestradeClass ', async done => {
    console.log('\n" QuestradeClass  ":', typeof QuestradeClass);
    console.dir(await QuestradeClass, consoleDirOptions);
    done();
  });
  it('=>  Currency ', async done => {
    console.log('\n" Currency  ":', typeof Currency);
    console.dir(await Currency, consoleDirOptions);
    done();
  });
  it('=>  ListingExchange ', async done => {
    console.log('\n" ListingExchange  ":', typeof ListingExchange);
    console.dir(await ListingExchange, consoleDirOptions);
    done();
  });
  it('=>  AccountType ', async done => {
    console.log('\n" AccountType  ":', typeof AccountType);
    console.dir(await AccountType, consoleDirOptions);
    done();
  });
  it('=>  ClientAccountType ', async done => {
    console.log('\n" ClientAccountType  ":', typeof ClientAccountType);
    console.dir(await ClientAccountType, consoleDirOptions);
    done();
  });
  it('=>  AccountStatus ', async done => {
    console.log('\n" AccountStatus  ":', typeof AccountStatus);
    console.dir(await AccountStatus, consoleDirOptions);
    done();
  });
  it('=>  TickType ', async done => {
    console.log('\n" TickType  ":', typeof TickType);
    console.dir(await TickType, consoleDirOptions);
    done();
  });
  it('=>  OptionDurationType ', async done => {
    console.log('\n" OptionDurationType  ":', typeof OptionDurationType);
    console.dir(await OptionDurationType, consoleDirOptions);
    done();
  });
  it('=>  OptionExerciseType ', async done => {
    console.log('\n" OptionExerciseType  ":', typeof OptionExerciseType);
    console.dir(await OptionExerciseType, consoleDirOptions);
    done();
  });
  it('=>  SecurityType ', async done => {
    console.log('\n" SecurityType  ":', typeof SecurityType);
    console.dir(await SecurityType, consoleDirOptions);
    done();
  });
  it('=>  OrderStateFilterType ', async done => {
    console.log('\n" OrderStateFilterType  ":', typeof OrderStateFilterType);
    console.dir(await OrderStateFilterType, consoleDirOptions);
    done();
  });
  it('=>  OrderAction ', async done => {
    console.log('\n" OrderAction  ":', typeof OrderAction);
    console.dir(await OrderAction, consoleDirOptions);
    done();
  });
  it('=>  OrderSide ', async done => {
    console.log('\n" OrderSide  ":', typeof OrderSide);
    console.dir(await OrderSide, consoleDirOptions);
    done();
  });
  it('=>  OrderType ', async done => {
    console.log('\n" OrderType  ":', typeof OrderType);
    console.dir(await OrderType, consoleDirOptions);
    done();
  });
  it('=>  OrderTimeInForce ', async done => {
    console.log('\n" OrderTimeInForce  ":', typeof OrderTimeInForce);
    console.dir(await OrderTimeInForce, consoleDirOptions);
    done();
  });
  it('=>  OrderState ', async done => {
    console.log('\n" OrderState  ":', typeof OrderState);
    console.dir(await OrderState, consoleDirOptions);
    done();
  });
  it('=>  HistoricalDataGranularity ', async done => {
    console.log(
      '\n" HistoricalDataGranularity  ":',
      typeof HistoricalDataGranularity
    );
    console.dir(await HistoricalDataGranularity, consoleDirOptions);
    done();
  });
  it('=>  OrderClass ', async done => {
    console.log('\n" OrderClass  ":', typeof OrderClass);
    console.dir(await OrderClass, consoleDirOptions);
    done();
  });
  it('=>  StrategyTypes ', async done => {
    console.log('\n" StrategyTypes  ":', typeof StrategyTypes);
    console.dir(await StrategyTypes, consoleDirOptions);
    done();
  });
});

console.log(QuestradeClass);
console.log(Currency);
console.log(ListingExchange);
console.log(AccountType);
console.log(ClientAccountType);
console.log(AccountStatus);
console.log(TickType);
console.log(OptionType);
console.log(OptionDurationType);
console.log(OptionExerciseType);
console.log(SecurityType);
console.log(OrderStateFilterType);
console.log(OrderAction);
console.log(OrderSide);
console.log(OrderType);
console.log(OrderTimeInForce);
console.log(OrderState);
console.log(HistoricalDataGranularity);
console.log(OrderClass);
console.log(StrategyTypes);
