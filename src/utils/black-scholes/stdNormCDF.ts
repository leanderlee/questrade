/** @format */

import { doubleFactorial } from '.';
/**
 * Standard normal cumulative distribution function.
 * The probability is estimated by expanding the CDF
 * into a series using the first 100 terms.
 * See {@link https://bit.ly/2IiT4vD|Wikipedia page}.
 *
 * @param {Number} x The upper bound to integrate over.
 * This is P{Z <= x} where Z is a standard normal random variable.
 * @returns {Number} The probability that a standard normal random
 * variable will be less than or equal to x
 */
export const stdNormCDF = (x: number): number => {
  let probability = 0;
  // avoid divergence in the series which happens around +/-8 when summing the
  // first 100 terms
  if (x >= 8) {
    probability = 1;
  } else if (x <= -8) {
    probability = 0;
  } else {
    for (let i = 0; i < 100; i += 1) {
      probability += Math.pow(x, 2 * i + 1) / doubleFactorial(2 * i + 1);
    }
    probability *= Math.pow(Math.E, -0.5 * Math.pow(x, 2));
    probability /= Math.sqrt(2 * Math.PI);
    probability += 0.5;
  }
  return probability;
};
