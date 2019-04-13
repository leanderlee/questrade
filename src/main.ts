/** @format */
import { QuestradeClass, QuestradeHelperFunction } from '.';

const seedToken = 'R0TFhgiWFjKi1YCwCjAMJFPgwD4A8cgb0';

(async () => {
  await QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
    await listAllServerTimeObjPropValues(qt);
    await listAllAccountsPropValues(qt);
  });
})().catch(error => console.log(error));

export async function listAllServerTimeObjPropValues(qt: QuestradeClass) {
  const getServerTimeObject = await qt.getServerTimeObject();
  const getServerTime = await qt.getServerTime;
  console.log('getServerTime:');
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
export async function listAllAccountsPropValues(qt: QuestradeClass) {
  const getAccounts = await qt.getAccounts();
  getAccounts.forEach(account => {
    console.log('clientAccountType:');
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

/*

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
