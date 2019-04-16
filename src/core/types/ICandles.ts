/** @format */

import { DateTime } from './Types';

export interface ICandles {
  candles: ICandle[];
}
export interface ICandle {
  start?: DateTime;
  end?: DateTime; // Candlestick end timestamp (in ISO format).
  open?: number; // Opening price.
  high?: number; // High price.
  low?: number; // Low price.
  close?: number; // Closing price.
  volume?: number; // Trading volume.
}
/*

// candles	Complex	List of Candle records.
// Candle	Complex


*/
