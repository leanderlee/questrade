/**
 *
 *   public get getServerTime(): Promise<string> {
 *   public get keyFile() {
 *   public set account(accountNumber: string | number) {
 *   public seedToken: string;
 *   public constructor(opts?: QuestradeAPIOptions) {
 *   public async createOrder(opts: an!y) {
 *   public async createStrategy(opts: an!y) {
 *   public async getAccounts(): Promise<IAccount[]> {
 *   public async getActivities(opts_: an!y) {
 *   public async getAllOrders() {
 *   public async getBalances(): Promise<IBalances> {
 *   public async getCandles(id: string, opts?: an!y) {
 *   public async getClosedOrders() {
 *   public async getExecutions() {
 *   public async getMarkets() {
 *
 *     Response properties
 *
 * markets	...	List of market records.
 * Market	...
 *
 * @format
 */

/*

tradingVenues	Complex	List of trading venue codes.
code	Enumeration	Order execution venue code.
defaultTradingVenue	Enumeration	Default trading venue code.
primaryOrderRoutes	Complex	List of primary order route codes.
code	Enumeration	Order route code.
secondaryOrderRoutes	Complex	List of secondary order route codes.
code	Enumeration	Order route code.
level1Feeds	Complex	List of level 1 market data feed codes.
code	Enumeration	Level 1 market data feed code.
level2Feeds	Complex	List of level 2 market data feed codes.
code	Enumeration	Level 2 market data feed code.
extendedStartTime	DateTime	Pre-market opening time for current trading date.
startTime	DateTime	Regular market opening time for current trading date.
endTime	DateTime	Regular market closing time for current trading date.
extendedEndTime	DateTime	Extended market closing time for current trading date.
currency	Enumeration	Currency code (ISO format).
snapQuotesLimit	Integer	Number of snap quotes that the user can retrieve from a market.

  public async getOpenOrders() {
  public async getOptionChain(symbolId: an!y) {
  public async getOptionQuote(filters_: an!y[]) {
  public async getOptionQuoteSimplified(filters: an!y) {
  public async getOrder(id: an!y) {
  public async getOrders(ids: an!y) {
  public async getPositions() {
  public async getPrimaryAccountNumber(
  public async getQuote(id: string | number) {
  public async getQuotes(ids: an!y) {
  public async getServerTimeObjects(): Promise<IDateObject> {
  public async getstockSymbolId(stockSymbol: string): Promise<number> {
  public async getSymbol(id: an!y) {
  public async getSymbols(ids: an!y) {
  public async removeOrder(id: string) {
  public async search(prefix: string, offset: number = 0) {
  public async searchSymbol(stockSymbol: string): Promise<IStockSymbol> {
  public async testOrder(opts: an!y) {
  public async testStrategy(opts: an!y) {
  public async updateOrder(id: string, opts: an!y) {
  private _accessToken: string;
  private _account: string;
  private _apiServer: string;
  private _apiUrl: string;
  private _apiVersion: string;
  private _authUrl: string;
  private _keyDir: string;
  private _keyFile: string;
  private _refreshToken: string;
  private _test: boolean;
  private async _accountApi<T = an!y>(
  private async _api<T = an!y>(
  private async _getTime(): Promise<string> {
  private async _loadKey() {
  private async _refreshKey() {
  private async _saveKey() {
 *
 * private _accessToken: string;
private _account: string;
private _apiServer: string;
private _apiUrl: string;
private _apiVersion: string;
private _authUrl: string;
private _keyDir: string;
private _keyFile: string;
private _refreshToken: string;
private _test: boolean;
// // ! constructor(opts?: QuestradeAPIOptions)
// ! get getServerTime(): Promise<string>
// ! get keyFile()
// ! seedToken: string;
// ! set account(accountNumber: string | number)


 * getOrder(id: an!y)
 * getSymbol(id: an!y)
 * getOptionChain(symbolId: an!y)
 *
 * getOrders(ids: an!y)
 * getSymbols(ids: an!y)
 * getQuotes(ids: an!y)
 *
 * public get keyFile()
 * getPositions()
 * getExecutions()
 * getOpenOrders()
 * getAllOrders()
 * getClosedOrders()
 * getMarkets()
 *
 * public get getServerTime(): Promise<string>
 * getAccounts(): Promise<IAccount[]>
 * getBalances(): Promise<IBalances>
 * getServerTimeObjects(ofset: string = ''): Promise<IDateObject>
 * searchSymbol(stockSymbol: string): Promise<IStockSymbol>
 * getstockSymbolId(stockSymbol: string): Promise<number>
 *
 * createOrder(opts: an!y)
 * updateOrder(id: string, opts: an!y)
 * testOrder(opts: an!y)
 * createStrategy(opts: an!y)
 * testStrategy(opts: an!y)
 * getActivities(opts_: an!y)
 * getOptionQuote(filters_: an!y[])
 *
 *
 * public seedToken: string;
 * public constructor(opts?: QuestradeAPIOptions)
 * public set account(accountNumber: string | number)
 * getPrimaryAccountNumber(
 * search(prefix: string, offset: number = 0)
 * getQuote(id: string | number)
 * getOptionQuoteSimplified(filters: an!y)
 * getCandles(id: string, opts?: an!y)
 * removeOrder(id: string)
 *
 * @format
 */
