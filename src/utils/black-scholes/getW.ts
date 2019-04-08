/**
 * Calcuate omega as defined in the Black-Scholes formula.
 *
 * @format
 * @param {Number} s Current price of the underlying
 * @param {Number} k Strike price
 * @param {Number} t Time to experiation in years
 * @param {Number} v Volatility as a decimal
 * @param {Number} r Anual risk-free interest rate as a decimal
 * @returns {Number} The value of omega
 */

export const getW = (
  s: number,
  k: number,
  t: number,
  v: number,
  r: number
): number => {
  const w =
    (r * t + (Math.pow(v, 2) * t) / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
  return w;
};
