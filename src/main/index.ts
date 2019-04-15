/** @format */
import { QuestradeClass, QuestradeHelperFunction } from '..';
import { allOfGetAccounts } from './allOfGetAccounts';
import { allOfGetActivities } from './allOfGetActivities';
import { allOfgetBalances } from './allOfgetBalances';
import { allOfGetExecutions } from './allOfGetExecutions';
import { allOfgetMarkets } from './allOfgetMarkets';
import { allOfGetOrder } from './allOfGetOrder';
import { allOfGetOrders } from './allOfGetOrders';
import { allOfGetPositions } from './allOfGetPositions';
import { allOfgetServerTimeObject } from './allOfgetServerTimeObject';
export const main = async (seedToken: string) => {
  await QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
    console.log('seedToken:', qt.seedToken);
    console.log('keyFile:', qt.keyFile);
    console.log('getServerTime:', qt.getServerTime);

    await allOfgetServerTimeObject(qt);
    await allOfGetAccounts(qt);
    await allOfGetPositions(qt);
    await allOfgetBalances(qt);
    await allOfGetExecutions(qt);
    await allOfGetActivities(qt);
    await allOfGetOrder(qt);
    await allOfGetOrders(qt);
    await allOfgetMarkets(qt);
    // const result = await qt.search('aapl');
    // await console.log(result);
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
! public async getCandles(
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
