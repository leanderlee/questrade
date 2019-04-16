/** @format */

import { Currency, ListingExchange, SecurityType } from './enums';

export interface IEquitySymbols {
  equitySymbols: IEquitySymbol[];
}
export interface IEquitySymbol {
  symbol: string;
  symbolId: number;
  description: string;
  securityType: SecurityType;
  listingExchange: ListingExchange;
  isQuotable: boolean;
  isTradable: boolean;
  currency: Currency;
}
