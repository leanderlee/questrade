/** @format */

// The following table specifies all supported order types.
export enum OrderType {
  Market = 'Market',
  Limit = 'Limit',
  Stop = 'Stop',
  StopLimit = 'StopLimit',
  TrailStopInPercentage = 'TrailStopInPercentage',
  TrailStopInDollar = 'TrailStopInDollar',
  TrailStopLimitInPercentage = 'TrailStopLimitInPercentage',
  TrailStopLimitInDollar = 'TrailStopLimitInDollar',
  LimitOnOpen = 'LimitOnOpen',
  LimitOnClose = 'LimitOnClose',
}
