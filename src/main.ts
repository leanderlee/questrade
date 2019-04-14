/** @format */
import { QuestradeClass, QuestradeHelperFunction } from '.';

const seedToken = 'R0TFhgiWFjKi1YCwCjAMJFPgwD4A8cgb0';

(async () => {
  await QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
    await allOfgetServerTimeObject(qt);
    await allOfGetAccounts(qt);
    await allOfGetPositions(qt);
    await allOfgetBalances(qt);
    await allOfGetExecutions(qt);
    await allOfGetActivities(qt);
  });
})().catch(error => console.log(error));

export async function allOfgetServerTimeObject(qt: QuestradeClass) {
  const getServerTimeObject = await qt.getServerTimeObject();
  const getServerTime = await qt.getServerTime;
  console.log('\n\n\n\nGETSERVERTIME:');
  console.log('\n\ngetServerTime:');
  console.log(getServerTime);
  console.log('serverTime:');
  console.dir(getServerTimeObject.serverTime);
  console.log('UTC:');
  console.dir(getServerTimeObject.UTC);
  console.log('timeObject.years:');
  console.dir(getServerTimeObject.timeObject.years);
  console.log('timeObject.months:');
  console.dir(getServerTimeObject.timeObject.months);
  console.log('timeObject.date:');
  console.dir(getServerTimeObject.timeObject.date);
  console.log('timeObject.hours:');
  console.dir(getServerTimeObject.timeObject.hours);
  console.log('timeObject.minutes:');
  console.dir(getServerTimeObject.timeObject.minutes);
  console.log('timeObject.seconds:');
  console.dir(getServerTimeObject.timeObject.seconds);
  console.log('timeObject.milliseconds:');
  console.dir(getServerTimeObject.timeObject.milliseconds);
  console.log('toUTCDate:');
  console.dir(getServerTimeObject.toUTCDate);
  console.log('toArray:');
  console.dir(getServerTimeObject.toArray);
  console.log('date.day:');
  console.dir(getServerTimeObject.date.day);
  console.log('date.date:');
  console.dir(getServerTimeObject.date.date);
  console.log('date.month:');
  console.dir(getServerTimeObject.date.month);
  console.log('date.year:');
  console.dir(getServerTimeObject.date.year);
  console.log('time.hour:');
  console.dir(getServerTimeObject.time.hour);
  console.log('time.minute:');
  console.dir(getServerTimeObject.time.minute);
  console.log('time.second:');
  console.dir(getServerTimeObject.time.second);
  console.log('time.milliseconds:');
  console.dir(getServerTimeObject.time.milliseconds);
  console.log('time.unixmilliseconds:');
  console.dir(getServerTimeObject.time.unixmilliseconds);
  console.log('time.unix:');
  console.dir(getServerTimeObject.time.unix);
  console.log('time.utcOffset:');
  console.dir(getServerTimeObject.time.utcOffset);
  console.log('isValid:');
  console.dir(getServerTimeObject.isValid);
  console.log('dayOfYear:');
  console.dir(getServerTimeObject.dayOfYear);
  console.log('weekOfTheYeay:');
  console.dir(getServerTimeObject.weekOfTheYeay);
  console.log('weekday:');
  console.dir(getServerTimeObject.weekday);
  console.log('isLeapYear:');
  console.dir(getServerTimeObject.isLeapYear);
  console.log('daysInMonth:');
  console.dir(getServerTimeObject.daysInMonth);
  console.log('weeksInYear:');
  console.dir(getServerTimeObject.weeksInYear);
  console.log('quarter:');
  console.dir(getServerTimeObject.quarter);
  console.log('locale:');
  console.dir(getServerTimeObject.locale);
  return getServerTimeObject;
}
export async function allOfGetAccounts(qt: QuestradeClass) {
  const getAccounts = await qt.getAccounts();
  getAccounts.forEach(account => {
    console.log('\n\n\n\nCLIENTACCOUNTTYPE (for each):');
    console.log('\n\nclientAccountType:');
    console.dir(account.clientAccountType);
    console.log('isBilling:');
    console.dir(account.isBilling);
    console.log('isPrimary:');
    console.dir(account.isPrimary);
    console.log('number:');
    console.dir(account.number);
    console.log('status:');
    console.dir(account.status);
    console.log('type:');
    console.dir(account.type);
  });
  return getAccounts;
}

export async function allOfGetPositions(qt: QuestradeClass) {
  const getPositions = await qt.getPositions();
  const getPosition = getPositions[0];
  console.log('\n\n\n\nGETPOSITION at [0]');
  console.log('\n\ngetPosition.symbol:');
  console.dir(getPosition.symbol);
  console.log('getPosition.symbolId:');
  console.dir(getPosition.symbolId);
  console.log('getPosition.openQuantity:');
  console.dir(getPosition.openQuantity);
  console.log('getPosition.closedQuantity:');
  console.dir(getPosition.closedQuantity);
  console.log('getPosition.currentMarketValue:');
  console.dir(getPosition.currentMarketValue);
  console.log('getPosition.currentPrice:');
  console.dir(getPosition.currentPrice);
  console.log('getPosition.averageEntryPrice:');
  console.dir(getPosition.averageEntryPrice);
  console.log('getPosition.dayPnl:');
  console.dir(getPosition.dayPnl);
  console.log('getPosition.closedPnl:');
  console.dir(getPosition.closedPnl);
  console.log('getPosition.openPnl:');
  console.dir(getPosition.openPnl);
  console.log('getPosition.totalCost:');
  console.dir(getPosition.totalCost);
  console.log('getPosition.isRealTime:');
  console.dir(getPosition.isRealTime);
  console.log('getPosition.isUnderReorg:');
  console.dir(getPosition.isUnderReorg);
  console.log('getPositions.length:', getPositions.length);
  return getPositions;
}

export async function allOfgetBalances(qt: QuestradeClass) {
  const getBalances = await qt.getBalances();
  console.log('\n\n\n\nGETBALANCES');
  console.log('\n\nperCurrencyBalancs[CAD].currency:');
  console.log(getBalances.perCurrencyBalances[0].currency);
  console.log('perCurrencyBalancs[CAD].cash:');
  console.log(getBalances.perCurrencyBalances[0].cash);
  console.log('perCurrencyBalancs[CAD].marketValue:');
  console.log(getBalances.perCurrencyBalances[0].marketValue);
  console.log('perCurrencyBalancs[CAD].totalEquity:');
  console.log(getBalances.perCurrencyBalances[0].totalEquity);
  console.log('perCurrencyBalancs[CAD].buyingPower:');
  console.log(getBalances.perCurrencyBalances[0].buyingPower);
  console.log('perCurrencyBalancs[CAD].maintenanceExcess:');
  console.log(getBalances.perCurrencyBalances[0].maintenanceExcess);
  console.log('perCurrencyBalancs[CAD].isRealTime:');
  console.log(getBalances.perCurrencyBalances[0].isRealTime);

  console.log('\n\nperCurrencyBalancs[USD].currency:');
  console.log(getBalances.perCurrencyBalances[1].currency);
  console.log('perCurrencyBalancs[USD].cash:');
  console.log(getBalances.perCurrencyBalances[1].cash);
  console.log('perCurrencyBalancs[USD].marketValue:');
  console.log(getBalances.perCurrencyBalances[1].marketValue);
  console.log('perCurrencyBalancs[USD].totalEquity:');
  console.log(getBalances.perCurrencyBalances[1].totalEquity);
  console.log('perCurrencyBalancs[USD].buyingPower:');
  console.log(getBalances.perCurrencyBalances[1].buyingPower);
  console.log('perCurrencyBalancs[USD].maintenanceExcess:');
  console.log(getBalances.perCurrencyBalances[1].maintenanceExcess);
  console.log('perCurrencyBalancs[USD].isRealTime:');
  console.log(getBalances.perCurrencyBalances[1].isRealTime);

  console.log('\n\ncombinedBalances[CAD].currency:');
  console.log(getBalances.combinedBalances[0].currency);
  console.log('combinedBalances[CAD].cash:');
  console.log(getBalances.combinedBalances[0].cash);
  console.log('combinedBalances[CAD].marketValue:');
  console.log(getBalances.combinedBalances[0].marketValue);
  console.log('combinedBalances[CAD].totalEquity:');
  console.log(getBalances.combinedBalances[0].totalEquity);
  console.log('combinedBalances[CAD].buyingPower:');
  console.log(getBalances.combinedBalances[0].buyingPower);
  console.log('combinedBalances[CAD].maintenanceExcess:');
  console.log(getBalances.combinedBalances[0].maintenanceExcess);
  console.log('combinedBalances[CAD].isRealTime:');
  console.log(getBalances.combinedBalances[0].isRealTime);

  console.log('\n\ncombinedBalances[USD].currency:');
  console.log(getBalances.combinedBalances[1].currency);
  console.log('combinedBalances[USD].cash:');
  console.log(getBalances.combinedBalances[1].cash);
  console.log('combinedBalances[USD].marketValue:');
  console.log(getBalances.combinedBalances[1].marketValue);
  console.log('combinedBalances[USD].totalEquity:');
  console.log(getBalances.combinedBalances[1].totalEquity);
  console.log('combinedBalances[USD].buyingPower:');
  console.log(getBalances.combinedBalances[1].buyingPower);
  console.log('combinedBalances[USD].maintenanceExcess:');
  console.log(getBalances.combinedBalances[1].maintenanceExcess);
  console.log('combinedBalances[USD].isRealTime:');
  console.log(getBalances.combinedBalances[1].isRealTime);

  console.log('\n\nsodPerCurrencyBalances[CAD].currency');
  console.log(getBalances.sodPerCurrencyBalances[0].currency);
  console.log('sodPerCurrencyBalances[CAD].cash');
  console.log(getBalances.sodPerCurrencyBalances[0].cash);
  console.log('sodPerCurrencyBalances[CAD].marketValue');
  console.log(getBalances.sodPerCurrencyBalances[0].marketValue);
  console.log('sodPerCurrencyBalances[CAD].totalEquity');
  console.log(getBalances.sodPerCurrencyBalances[0].totalEquity);
  console.log('sodPerCurrencyBalances[CAD].buyingPower');
  console.log(getBalances.sodPerCurrencyBalances[0].buyingPower);
  console.log('sodPerCurrencyBalances[CAD].maintenanceExcess');
  console.log(getBalances.sodPerCurrencyBalances[0].maintenanceExcess);
  console.log('sodPerCurrencyBalances[CAD].isRealTime');
  console.log(getBalances.sodPerCurrencyBalances[0].isRealTime);

  console.log('\n\nsodPerCurrencyBalances[USD].currency');
  console.log(getBalances.sodPerCurrencyBalances[1].currency);
  console.log('sodPerCurrencyBalances[USD].cash');
  console.log(getBalances.sodPerCurrencyBalances[1].cash);
  console.log('sodPerCurrencyBalances[USD].marketValue');
  console.log(getBalances.sodPerCurrencyBalances[1].marketValue);
  console.log('sodPerCurrencyBalances[USD].totalEquity');
  console.log(getBalances.sodPerCurrencyBalances[1].totalEquity);
  console.log('sodPerCurrencyBalances[USD].buyingPower');
  console.log(getBalances.sodPerCurrencyBalances[1].buyingPower);
  console.log('sodPerCurrencyBalances[USD].maintenanceExcess');
  console.log(getBalances.sodPerCurrencyBalances[1].maintenanceExcess);
  console.log('sodPerCurrencyBalances[USD].isRealTime');
  console.log(getBalances.sodPerCurrencyBalances[1].isRealTime);

  console.log('\n\nsodCombinedBalancs[CAD].currency:');
  console.log(getBalances.sodCombinedBalances[0].currency);
  console.log('sodCombinedBalances[CAD].cash');
  console.log(getBalances.sodCombinedBalances[0].cash);
  console.log('sodCombinedBalancs[CAD].marketValue');
  console.log(getBalances.sodCombinedBalances[0].marketValue);
  console.log('sodCombinedBalances[CAD].totalEquity');
  console.log(getBalances.sodCombinedBalances[0].totalEquity);
  console.log('sodCombinedBalances[CAD].buyingPower');
  console.log(getBalances.sodCombinedBalances[0].buyingPower);
  console.log('sodCombinedBalancs[CAD].maintenanceExcess');
  console.log(getBalances.sodCombinedBalances[0].maintenanceExcess);
  console.log('sodCombinedBalances[CAD].isRealTime');
  console.log(getBalances.sodCombinedBalances[0].isRealTime);

  console.log('\n\nsodCombinedBalancs[USD].currency:');
  console.log(getBalances.sodCombinedBalances[1].currency);
  console.log('sodCombinedBalances[USD].cash');
  console.log(getBalances.sodCombinedBalances[1].cash);
  console.log('sodCombinedBalancs[USD].marketValue');
  console.log(getBalances.sodCombinedBalances[1].marketValue);
  console.log('sodCombinedBalances[USD].totalEquity');
  console.log(getBalances.sodCombinedBalances[1].totalEquity);
  console.log('sodCombinedBalances[USD].buyingPower');
  console.log(getBalances.sodCombinedBalances[1].buyingPower);
  console.log('sodCombinedBalancs[USD].maintenanceExcess');
  console.log(getBalances.sodCombinedBalances[1].maintenanceExcess);
  console.log('sodCombinedBalances[USD].isRealTime');
  console.log(getBalances.sodCombinedBalances[1].isRealTime);
  return getBalances;
}

export async function allOfGetExecutions(qt: QuestradeClass) {
  const getExecutions = await qt.getExecutions();
  const execution = getExecutions[0];
  console.log('\n\n\n\nGETEXECUTIONS');
  console.log('\n\nexecution.symbol:');
  console.log(execution.symbol);
  console.log('execution.symbolId:');
  console.log(execution.symbolId);
  console.log('execution.quantity:');
  console.log(execution.quantity);
  console.log('execution.side:');
  console.log(execution.side);
  console.log('execution.price:');
  console.log(execution.price);
  console.log('execution.id:');
  console.log(execution.id);
  console.log('execution.orderId:');
  console.log(execution.orderId);
  console.log('execution.orderChainId:');
  console.log(execution.orderChainId);
  console.log('execution.exchangeExecId:');
  console.log(execution.exchangeExecId);
  console.log('execution.timestamp:');
  console.log(execution.timestamp);
  console.log('execution.notes:');
  console.log(execution.notes);
  console.log('execution.venue:');
  console.log(execution.venue);
  console.log('execution.totalCost:');
  console.log(execution.totalCost);
  console.log('execution.orderPlacementCommission:');
  console.log(execution.orderPlacementCommission);
  console.log('execution.commission:');
  console.log(execution.commission);
  console.log('execution.executionFee:');
  console.log(execution.executionFee);
  console.log('execution.secFee:');
  console.log(execution.secFee);
  console.log('execution.canadianExecutionFee:');
  console.log(execution.canadianExecutionFee);
  console.log('execution.parentId:');
  console.log(execution.parentId);
  console.log('getExecutions.length', getExecutions.length);
  return getExecutions;
}

export async function allOfGetActivities(qt: QuestradeClass) {
  const getActivities = await qt.getActivities();
  const activity = getActivities[0];
  console.log('\n\n\n\nGETACTIVITIES');
  console.log('\n\nactivity.action:');
  console.log(activity.action);
  console.log('activity.tradeDate');
  console.log(activity.tradeDate);
  console.log('activity.transactionDate');
  console.log(activity.transactionDate);
  console.log('activity.settlementDate');
  console.log(activity.settlementDate);
  console.log('activity.symbol');
  console.log(activity.symbol);
  console.log('activity.symbolId');
  console.log(activity.symbolId);
  console.log('activity.description');
  console.log(activity.description);
  console.log('activity.currency');
  console.log(activity.currency);
  console.log('activity.quantity');
  console.log(activity.quantity);
  console.log('activity.price');
  console.log(activity.price);
  console.log('activity.grossAmount');
  console.log(activity.grossAmount);
  console.log('activity.commission');
  console.log(activity.commission);
  console.log('activity.netAmount');
  console.log(activity.netAmount);
  console.log('activity.type');
  console.log(activity.type);
  console.log('getActivities.length', getActivities.length);
  return getActivities;
}
/*

export interface IAccountActivity {
  console.log("activity.tradeDate")
  console.log(activity.tradeDate)
  console.log("activity.transactionDate")
  console.log(activity.transactionDate)
  console.log("activity.settlementDate")
  console.log(activity.settlementDate)
  console.log("activity.action")
  console.log(activity.action)
  console.log("activity.symbol")
  console.log(activity.symbol)
  console.log("activity.symbolId")
  console.log(activity.symbolId)
  console.log("activity.description")
  console.log(activity.description)
  console.log("activity.currency")
  console.log(activity.currency)
  console.log("activity.quantity")
  console.log(activity.quantity)
  console.log("activity.price")
  console.log(activity.price)
  console.log("activity.grossAmount")
  console.log(activity.grossAmount)
  console.log("activity.commission")
  console.log(activity.commission)
  console.log("activity.netAmount")
  console.log(activity.netAmount)
  console.log("activity.type")
  console.log(activity.type)
}

export interface IBalance {
  currency
  cash
  marketValue
  totalEquity
  buyingPower
  maintenanceExcess
  isRealTime
}

export interface IBalances {
  perCurrencyBalances: IBalance[];
  combinedBalances: IBalance[];
  sodPerCurrencyBalances: IBalance[];
  sodCombinedBalances: IBalance[];
}



    const symb = await qt.searchSymbol('aapl');
    console.log(symb);
    console.log(await qt.getQuote(symb.symbolId));
    console.log('\n\n\nawait qt.getMarkets()');
    const markets = await qt.getMarkets();
    const name = await markets[0].name;
    console.log(name, markets);
    console.log(await qt.getActivities({}));

      const data = await qt.searchSymbol('aapl');
      console.log(data.symbolId);
      console.log('\n\n\nqt.seedToken', await qt.seedToken);
      console.log(
        '\n\n\nqt.getPrimaryAccount()',
        await qt.getPrimaryAccountNumber()
      );
      console.log('\n\n\nqt.getAccounts()', await qt.getAccounts());
      console.log(
        '\n\n\nqt.getPrimaryAccountNumber()',
        await qt.getPrimaryAccountNumber()
      );

      console.log('\n\n\nqt.getPositions()', await qt.getPositions());
      console.log('\n\n\nqt.getBalances()', await qt.getBalances());
      console.log('\n\n\nqt.getExecutions()', await qt.getExecutions());
      console.log('\n\n\nqt.getOrder(data.symbolId)');

    const data = await qt.searchSymbol('aapl');
      console.dir(await qt.getServerTimeObjects());
      console.log('\n\n\nqt.getTime', await qt.getServerTimeObject());

const data = await qt.searchSymbol('aapl');
      console.log('\n\n\nqt.getTime', await qt.getServerTimeObject());
      console.log(data.symbolId);
      console.log('\n\n\nqt.seedToken', await qt.seedToken);
      console.log('\n\n\nqt.getPrimaryAccount()'
      , await qt.getPrimaryAccount());
      console.log('\n\n\nqt.getAccounts()', await qt.getAccounts());
      console.log('\n\n\nqt.getPositions()', await qt.getPositions());
      console.log('\n\n\nqt.getBalances()', await qt.getBalances());
      console.log('\n\n\nqt.getExecutions()', await qt.getExecutions());
      console.log('\n\n\nqt.getOrder(data.symbolId)');

      //   await qt.getOrder(data.symbolId)
      // );
      console.log('\n\n\nqt.getOrders(ids)');
      // await qt.getOrders(ids) )
      console.log('\n\n\nqt.getOpenOrders()', await qt.getOpenOrders());
      console.log('\n\n\nqt.getAllOrders()', await qt.getAllOrders());
      console.log('\n\n\nqt.getClosedOrders()', await qt.getClosedOrders());
      console.log('\n\n\nqt.getActivities(opts_)');
      // , await qt.getActivities(opts_));
      console.log('\n\n\nqt.getSymbol(data.symbolId)');
      // ,  await qt.getSymbol(data.symbolId)
      // );
      console.log('\n\n\nqt.getSymbols(ids)');
      // , await qt.getSymbols(ids) )
      console.log('\n\n\nqt.search(prefix)');
      // , await offset)',
      // await qt.search(prefix,
      // await offset));
      console.log('\n\n\nqt.searchSymbol(stockSymbol)');
      //   qt.searchSymbol(stockSymbol)
      // );
      console.log('\n\n\nqt.getstockSymbolId(stockSymbol)');
      //   qt.getstockSymbolId(stockSymbol)
      // );
      console.log(
        '\n\n\nqt.getOptionChain(data.symbolId)',
        await qt.getOptionChain(data.symbolId)
      );
      console.log('\n\n\nqt.getMarkets()', await qt.getMarkets());
      console.log('\n\n\nqt.getQuote(data.symbolId)');
      // , await qt.getQuote(data.symbolId));
      console.log('\n\n\nqt.getQuotes(ids)');
      // ,    await qt.getQuotes(ids) )
      console.log('\n\n\nqt.getOptionQuote(filters_[])');
      // ,    await qt.getOptionQuote(filters_[]) )
      console.log('\n\n\nqt.getOptionQuoteSimplified(filters)');
      // ,    await
      //  qt.getOptionQuoteSimplified(filters) )
      console.log('\n\n\nqt.getCandles(id)');
      // ,    await opts?)'
      // ,    await qt.getCandles(id
      // ,    await opts?) )
      console.log('\n\n\nqt.createOrder(opts)');
      // ,    await qt.createOrder(opts) )
      console.log('\n\n\nqt.updateOrder(id)');
      // ,    await opts)'
      // ,    await qt.updateOrder(id
      // ,    await opts) )
      console.log('\n\n\nqt.testOrder(opts)');
      // ,    await qt.testOrder(opts) )
      console.log('\n\n\nqt.removeOrder(data.symbolId)');
      // ,      await qt.removeOrder(data.symbolId.toString())
      // );
      console.log('\n\n\nqt.createStrategy(opts)');
      // ,    await qt.createStrategy(opts) )
      console.log('\n\n\nqt.testStrategy(opts)');
      // ,    await qt.testStrategy(opts) )
      console.log('\n\n\nqt.keyFile');
      // ,await qt.keyFile);

*/
