/** @format */
import { QuestradeClass, QuestradeHelperFunction } from '..';
import { allOfGetAccounts } from '../main/allOfGetAccounts';
import { allOfGetActivities } from './allOfGetActivities';
import { allOfgetBalances } from './allOfgetBalances';
import { allOfGetEquitySymbols } from './allOfGetEquitySymbols';
import { allOfGetExecutions } from './allOfGetExecutions';
import { allOfgetMarkets } from './allOfgetMarkets';
import { allOfGetOrder } from './allOfGetOrder';
import { allOfGetOrders } from './allOfGetOrders';
import { allOfGetPositions } from './allOfGetPositions';
import { allOfgetServerTimeObject } from './allOfgetServerTimeObject';

export const main = async (seedToken: string) => {
  await QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
    await console.log('seedToken:', qt.seedToken);
    await console.log('keyFile:', qt.keyFile);
    await console.log('getServerTime:', qt.getServerTime);
    await console.log(
      'qt.getPrimaryAccountNumber():',
      await qt.getPrimaryAccountNumber()
    );
    await allOfgetServerTimeObject(qt, () => {
      // do nothing yet
    });
    await allOfGetAccounts(qt, () => {
      // do nothing yet
    });
    await allOfGetPositions(qt, () => {
      // do nothing yet
    });
    await allOfgetBalances(qt, () => {
      // do nothing yet
    });
    await allOfGetExecutions(qt, () => {
      // do nothing yet
    });
    await allOfGetActivities(qt, () => {
      // do nothing yet
    });
    await allOfGetOrder(qt, () => {
      // do nothing yet
    });
    await allOfGetOrders(qt, () => {
      // do nothing yet
    });
    await allOfgetMarkets(qt, () => {
      // do nothing yet
    });
    await allOfGetEquitySymbols(qt, () => {
      // do nothing yet
    });
    try {
      // const candle = await qt.getCandles(symbolID);
      // await console.log(candle[0].close);
      // await console.log(candle[0].end);
      // await console.log(candle[0].high);
      // await console.log(candle[0].low);
      // await console.log(candle[0].open);
      // await console.log(candle[0].close);
      // await console.log(candle[0].volume);
      // const result = await qt.search('aapl');
      // await await console.log(result);Ã¹
    } catch (error) {
      await console.log(error.message);
    }
  });
};

/*
# public async getOrdersAll()
# public async getOrdersClosed()
# public async getOrdersOpen()
# public async getOrder()
# public async getOrders(ids?: idsType)


& public async getAccounts(): Promise<IAccount[]> {
& public async getActivities(
& public async getBalances(): Promise<IBalances> {
! public async getCandles()
& public async getExecutions(range: TimeRange = {}): Promise<IExecution[]> {
! public async getMarkets(): Promise<IMarket[]> {
! public async getOptionQuote(filters_: IFilter[] | IFilter) {
& public async getPositions(): Promise<IPosition[]> {
! public async getPrimaryAccountNumber(
! public async getQuote(id: idType): Promise<IQuote> {
! public async getQuotes(ids: idsType): Promise<IQuote[]> {
& public async getServerTimeObject(): Promise<IDateObject> {
! public async getstockSymbolId(stockSymbol: string): Promise<number> {
! public async getSymbol(idOrSymbol: idType): Promise<ISymbol[]> {
! public async getSymbols(ids: idsType): Promise<ISymbol[]> {
! public async search()
! public async searchSymbol(stockSymbol: string): Promise<IStockSymbol> {
& public get getServerTime(): Promise<string> {
& public get keyFile() {
& public seedToken: string;

*/
