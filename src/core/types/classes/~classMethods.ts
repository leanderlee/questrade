/**
 *
 *   public get getServerTime(): Promise<string> {
 *   public get keyFile() {
 *   public set account(accountNumber: string | number) {
 *   public seedToken: string;
 *   public constructor(opts?: QuestradeAPIOptions) {
 *   public async createOrder(opts: any) {
 *   public async createStrategy(opts: any) {
 *   public async getAccounts(): Promise<IAccount[]> {
 *   public async getActivities(opts_: any) {
 *   public async getAllOrders() {
 *   public async getBalances(): Promise<IBalances> {
 *   public async getCandles(id: string, opts?: any) {
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
  public async getOptionChain(symbolId: any) {
  public async getOptionQuote(filters_: any[]) {
  public async getOptionQuoteSimplified(filters: any) {
  public async getOrder(id: any) {
  public async getOrders(ids: any) {
  public async getPositions() {
  public async getPrimaryAccountNumber(
  public async getQuote(id: string | number) {
  public async getQuotes(ids: any) {
  public async getServerTimeObjects(): Promise<IDateObject> {
  public async getstockSymbolId(stockSymbol: string): Promise<number> {
  public async getSymbol(id: any) {
  public async getSymbols(ids: any) {
  public async removeOrder(id: string) {
  public async search(prefix: string, offset: number = 0) {
  public async searchSymbol(stockSymbol: string): Promise<IStockSymbol> {
  public async testOrder(opts: any) {
  public async testStrategy(opts: any) {
  public async updateOrder(id: string, opts: any) {
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
  private async _accountApi<T = any>(
  private async _api<T = any>(
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


 * getOrder(id: any)
 * getSymbol(id: any)
 * getOptionChain(symbolId: any)
 *
 * getOrders(ids: any)
 * getSymbols(ids: any)
 * getQuotes(ids: any)
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
 * createOrder(opts: any)
 * updateOrder(id: string, opts: any)
 * testOrder(opts: any)
 * createStrategy(opts: any)
 * testStrategy(opts: any)
 * getActivities(opts_: any)
 * getOptionQuote(filters_: any[])
 *
 *
 * public seedToken: string;
 * public constructor(opts?: QuestradeAPIOptions)
 * public set account(accountNumber: string | number)
 * getPrimaryAccountNumber(
 * search(prefix: string, offset: number = 0)
 * getQuote(id: string | number)
 * getOptionQuoteSimplified(filters: any)
 * getCandles(id: string, opts?: any)
 * removeOrder(id: string)
 *
 * @format
 */
