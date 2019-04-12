/** @format */

import { Currency, ListingExchange, SecurityType } from './enums';
export interface IStockSymbol {
  symbol: string;
  symbolId: number;
  description: string;
  securityType: SecurityType;
  listingExchange: ListingExchange;
  isTradable: boolean;
  isQuotable: boolean;
  currency: Currency;
}

export type StockSymbol = IStockSymbol | string;
