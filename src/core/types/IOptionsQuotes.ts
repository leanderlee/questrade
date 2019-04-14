/** @format */

import { DateTime } from './Types';

/** @format */

export interface IOptionsQuotes {
  quotes: IOptionsQuote[];
}
// Level1OptionData: an!y; // Complex

export interface IOptionsQuote {
  underlying: string; // Underlying name
  underlyingId: number; // Underlying ID
  symbol: string; // Symbol name
  symbolId: number; // Symbol ID
  bidPrice: number; // Bid price
  bidSize: number; // Bid size
  askPrice: number; // Ask price
  askSize: number; // Ask size
  lastTradePriceTrHrs: number; // Last trade price trade hours
  lastTradePrice: number; // Last trade price
  lastTradeSize: number; // Last trade size
  lastTradeTick: string; // Last trade tick
  lastTradeTime: DateTime; // Last trade time
  volume: number; // Volume
  openPrice: number; // Open price
  highPrice: number; // High price
  lowPrice: number; // Low price
  volatility: number; // Volatility
  delta: number; // Delta
  gamma: number; // Gamma
  theta: number; // Theta
  vega: number; // Vega
  rho: number; // Rho
  openInterest: number; // Open interest
  delay: number; // How much is data delayed
  isHalted: boolean; // Whether or not the symbol was halted
  VWAP: number; // Volume Weighted Average Price
}
