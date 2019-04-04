/** @format */

export class Questrade {
  public setPrimaryAccount: any;
  public getAccounts: any;
  public getPositions: any;
  public getBalances: any;
  public getExecutions: any;
  public getOrder: any;
  public getOrders: any;
  public getOpenOrders: any;
  public getAllOrders: any;
  public getClosedOrders: any;
  public getActivities: any;
  public getSymbol: any;
  public getSymbols: any;
  public search: any;
  public getOptionChain: any;
  public getMarkets: any;
  public getQuote: any;
  public getQuotes: any;
  public getOptionQuote: any;
  public getOptionQuoteSimplified: any;
  public getCandles: any;
  public createOrder: any;
  public updateOrder: any;
  public testOrder: any;
  public removeOrder: any;
  public createStrategy: any;
  public testStrategy: any;
  private saveKey: any;
  private getKeyFile: any;
  private loadKey: any;
  private refreshKey: any;
  private api: any;
  private accountApi: any;
  public constructor() {
    this.saveKey = '';
    this.getKeyFile = '';
    this.loadKey = '';
    this.refreshKey = '';
    this.api = '';
    this.accountApi = '';
  }
  public tempFunct() {
    return {
      accountAp: this.accountApi,
      api: this.api,
      getKeyFile: this.getKeyFile,
      loadKey: this.loadKey,
      refreshKey: this.refreshKey,
      saveKey: this.saveKey,
    };
  }
}
