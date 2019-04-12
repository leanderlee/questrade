/** @format */

import { stdNormCDF } from '.';

/**
 * Black-Scholes option pricing formula.
 * See {@link https://bit.ly/2UoDc1O |Wikipedia page}
 * https://en.wikipedia.org/wiki/Black–Scholes_model#Black–Scholes_formula
 * for pricing puts in addition to calls.
 *
 * @format
 * @param {Number} s       Current price of the underlying
 * @param {Number} k       Strike price
 * @param {Number} t       Time to experiation in years
 * @param {Number} v       Volatility as a decimal
 * @param {Number} r       Anual risk-free interest rate as a decimal
 * @param {String} callPut The type of option to be priced - "call" or "put"
 * @returns {Number}         Price of the option
 */

export const blackScholes = (
  s: number,
  k: number,
  t: number,
  v: number,
  r: number,
  callPut: 'call' | 'put'
): number => {
  let price = null;
  const w =
    (r * t + (Math.pow(v, 2) * t) / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
  if (callPut === 'call') {
    price =
      s * stdNormCDF(w) -
      k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(w - v * Math.sqrt(t));
  } // put
  else {
    price =
      k * Math.pow(Math.E, -1 * r * t) * stdNormCDF(v * Math.sqrt(t) - w) -
      s * stdNormCDF(-w);
  }
  return price;
};
