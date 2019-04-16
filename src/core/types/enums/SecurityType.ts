/** @format */

// The following table specifies all supported security types.
export enum SecurityType {
  // Common and preferred equities, ETFs, ETNs, units, ADRs, etc.
  Stock = 'Stock',
  // Equity and index options.
  Option = 'Option',
  // Debentures, notes, bonds, both corporate and government.
  Bond = 'Bond',
  // Equity or bond rights and warrants.
  Right = 'Right',
  // Physical gold (coins, wafers, bars).
  Gold = 'Gold',
  // Canadian or US mutual funds.
  MutualFund = 'MutualFund',
  // Stock indices (e.g., Dow Jones).
  Index = 'Index',
}
