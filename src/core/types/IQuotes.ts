/** @format */

import { TickType } from './enums';

export interface IQuotes {
  quotes: IQuote[];
}
export interface IQuote {
  symbol: number;
  symbolId: string;
  bidPrice: number;
  bidSize: number;
  askPrice: number;
  askSize: number;
  lastTradeTrHrs: number;
  lastTradePrice: number;
  lastTradeSize: number;
  lastTradeTick: TickType;
  volume: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  delay: boolean;
  isHalted: boolean;
}
