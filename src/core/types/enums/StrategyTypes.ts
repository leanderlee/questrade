/** @format */

// The following types of strategies are supported for multi-leg strategy orders
export enum StrategyTypes {
  // Covered Call
  CoveredCall = 'CoveredCall',
  // Married Put
  MarriedPuts = 'MarriedPuts',
  // Vertical Call
  VerticalCallSpread = 'VerticalCallSpread',
  // Vertical Put
  VerticalPutSpread = 'VerticalPutSpread',
  // Calendar Call
  CalendarCallSpread = 'CalendarCallSpread',
  // Calendar Put
  CalendarPutSpread = 'CalendarPutSpread',
  // Diagonal Call
  DiagonalCallSpread = 'DiagonalCallSpread',
  // Diagonal Put
  DiagonalPutSpread = 'DiagonalPutSpread',
  // Collar
  Collar = 'Collar',
  // Straddle
  Straddle = 'Straddle',
  // Strangle
  Strangle = 'Strangle',
  // Butterfly Call
  ButterflyCall = 'ButterflyCall',
  // Butterfly Put
  ButterflyPut = 'ButterflyPut',
  // Iron Butterfly
  IronButterfly = 'IronButterfly',
  // Condor
  CondorCall = 'CondorCall',
  // Custom, or user defined
  Custom = 'Custom',
}
