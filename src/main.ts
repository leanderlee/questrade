/** @format */
import { QuestradeClass } from '.';
import { IQuestradeOptions } from './core/types';

const seedToken = 'qmlxoVqRa2rAtJ13YSOi2QDHNJSTF5gn0';

const questrade = async (opts: IQuestradeOptions, cb?: any) => {
  const qt = await new QuestradeClass(opts);
  qt.on('ready', () => {
    if (typeof cb === 'function') {
      cb(qt);
    }
  });
  return qt;
};

const testApp = async () => {
  try {
    await questrade({ seedToken }, async (qt: QuestradeClass) => {
      // const data = await qt.searchSymbol('aapl');
      console.dir(await qt.getServerTimeObjects());
    });
    return true;
  } catch (error) {
    await console.log(error);
    return false;
  }
};
testApp();
export { testApp };

/*

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
