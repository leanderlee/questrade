/**
 * Double factorial.  See {@link https://bit.ly/2uRpeq2|Wikipedia page}.
 *
 * @format
 * @private
 * @param {Number} n The number to calculate the double factorial of
 * @returns {Number} The double factorial of n
 */

export const doubleFactorial = (n: number): number => {
  let val = 1;
  for (let i = n; i > 1; i -= 2) {
    val *= i;
  }
  return val;
};
