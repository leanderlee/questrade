/** @format */

// The following table specifies all supported currency codes.
export enum Currency {
  USD = 'US dollar',
  CAD = 'Canadian dollar',
}

// The following table specifies all supported listing exchanges.
export enum ListingExchange {
  TSX = 'TSX', // Toronto Stock Exchange.
  TSXV = 'TSXV', // Toronto Venture Exchange.
  CNSX = 'CNSX', // Canadian National Stock Exchange.
  MX = 'MX', // Montreal Exchange.
  NASDAQ = 'NASDAQ', // NASDAQ.
  NYSE = 'NYSE', // New York Stock Exchange.
  NYSEAM = 'NYSEAM', // NYSE AMERICAN
  ARCA = 'ARCA', // NYSE Arca.
  OPRA = 'OPRA', // Option Reporting Authority.
  PinkSheets = 'PinkSheets', // Pink Sheets.
  OTCBB = 'OTCBB', // OTC Bulletin Board.
}

// The following table specifies all supported user account types.
export enum AccountType {
  Cash = 'Cash', // Cash account.
  Margin = 'Margin', // Margin account.
  TFSA = 'TFSA', // Tax Free Savings Account.
  RRSP = 'RRSP', // Registered Retirement Savings Plan.
  SRRSP = 'SRRSP', // Spousal RRSP.
  LRRSP = 'LRRSP', // Locked-In RRSP.
  LIRA = 'LIRA', // Locked-In Retirement Account.
  LIF = 'LIF', // Life Income Fund.
  RIF = 'RIF', // Retirement Income Fund.
  SRIF = 'SRIF', // Spousal RIF.
  LRIF = 'LRIF', // Locked-In RIF.
  RRIF = 'RRIF', // Registered RIF.
  PRIF = 'PRIF', // Prescribed RIF.
  RESP = 'RESP', // Individual Registered Education Savings Plan.
  FRESP = 'FRESP', // Family RESP.
}

// The following table specifies all supported account client types.
export enum ClientAccountType {
  Individual = 'Individual', // Account held by an individual.
  Joint = 'Joint', // Account held jointly by several individuals (e.g., spouses).
  InformalTrust = 'Informal Trust', // Non-individual account held by an informal trust.
  Corporation = 'Corporation', // Non-individual account held by a corporation.
  InvestmentClub = 'Investment Club', // Non-individual account held by an investment club.
  FormalTrust = 'Formal Trust', // Non-individual account held by a formal trust.
  Partnership = 'Partnership', // Non-individual account held by a partnership.
  SoleProprietorship = 'Sole Proprietorship', // Non-individual account held by a sole proprietorship.
  Family = 'Family', // Account held by a family.
  JointAndInformalTrust = 'Joint and Informal Trust', // Non-individual account held by a joint and informal trust.
  Institution = 'Institution', // Non-individual account held by an institution.
}

// The following table specifies all supported account status values.
export enum AccountStatus {
  Active,
  SuspendedClosed,
  SuspendediewOnly,
  LiquidateOnly,
  Closed,
}

// The following table specifies all supported market data tick types.
export enum TickType {
  Up = 'Up', // Designates an uptick.
  Down = 'Down', // Designates a downtick.
  Equal = 'Equal', // Designates a tick that took place at the same price as a previous one.
}

// The following table specifies all supported option types.
export enum OptionType {
  Call = 'Call', // Call option.
  Put = 'Put', // Put option.
}

// The following table specifies all supported option duration types.
export enum OptionDurationType {
  Weekly = 'Weekly', // Weekly expiry cycle.
  Monthly = 'Monthly', // Monthly expiry cycle.
  Quarterly = 'Quarterly', // Quarterly expiry cycle.
  LEAP = 'LEAP', // Long-term Equity Appreciation contracts.
}

// The following table specifies all supported option exercise types.
export enum OptionExerciseType {
  American = 'American', // American option.
  European = 'European', // European option.
}

// The following table specifies all supported security types.
export enum SecurityType {
  Stock = 'Stock', // Common and preferred equities, ETFs, ETNs, units, ADRs, etc.
  Option = 'Option', // Equity and index options.
  Bond = 'Bond', // Debentures, notes, bonds, both corporate and government.
  Right = 'Right', // Equity or bond rights and warrants.
  Gold = 'Gold', // Physical gold (coins, wafers, bars).
  MutualFund = 'MutualFund', // Canadian or US mutual funds.
  Index = 'Index', // Stock indices (e.g., Dow Jones).
}

// The following table specifies all supported order state filter types.
export enum OrderStateFilterType {
  All = 'All', // Includes all orders, regardless of their state.
  Open = 'Open', // Includes only orders that are still open.
  Closed = 'Closed', // Includes only orders that are already closed.
}

// The following table specifies all supported order side values.
export enum OrderAction {
  Buy = 'Buy', // Designates an order to purchase a security.
  Sell = 'Sell', // Designates an order to dispose a security.
}

// The following table specifies all supported client order side values.
export enum OrderSide {
  Buy = 'Buy', // Buy
  Sell = 'Sell', // Sell
  Short = 'Short', // Sell short.
  Cov = 'Cov', // Cover the short.
  BTO = 'BTO', // Buy-To-Open.
  STC = 'STC', // Sell-To-Close.
  STO = 'STO', // Sell-To-Open.
  BTC = 'BTC', // Buy-To-Close.
}

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

// The following table specifies all supported order Time-In-Force instructions.
export enum OrderTimeInForce {
  Day = 'Day',
  GoodTillCanceled = 'GoodTillCanceled',
  GoodTillExtendedDay = 'GoodTillExtendedDay',
  GoodTillDate = 'GoodTillDate',
  ImmediateOrCancel = 'ImmediateOrCancel',
  FillOrKill = 'FillOrKill',
}

// The following table specifies all supported order states.
export enum OrderState {
  Failed = 'Failed',
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  CancelPending = 'CancelPending',
  Canceled = 'Canceled',
  PartialCanceled = 'PartialCanceled',
  Partial = 'Partial',
  Executed = 'Executed',
  ReplacePending = 'ReplacePending',
  Replaced = 'Replaced',
  Stopped = 'Stopped',
  Suspended = 'Suspended',
  Expired = 'Expired',
  Queued = 'Queued',
  Triggered = 'Triggered',
  Activated = 'Activated',
  PendingRiskReview = 'PendingRiskReview',
  ContingentOrder = 'ContingentOrder',
}

// The following table specifies all supported order execution status values.
export enum HistoricalDataGranularity {
  OneMinute = 'OneMinute', // One candlestick per 1 minute.
  TwoMinutes = 'TwoMinutes', // One candlestick per 2 minutes.
  ThreeMinutes = 'ThreeMinutes', // One candlestick per 3 minutes.
  FourMinutes = 'FourMinutes', // One candlestick per 4 minutes.
  FiveMinutes = 'FiveMinutes', // One candlestick per 5 minutes.
  TenMinutes = 'TenMinutes', // One candlestick per 10 minutes.
  FifteenMinutes = 'FifteenMinutes', // One candlestick per 15 minutes.
  TwentyMinutes = 'TwentyMinutes', // One candlestick per 20 minutes.
  HalfHour = 'HalfHour', // One candlestick per 30 minutes.
  OneHour = 'OneHour', // One candlestick per 1 hour.
  TwoHours = 'TwoHours', // One candlestick per 2 hours.
  FourHours = 'FourHours', // One candlestick per 4 hours.
  OneDay = 'OneDay', // One candlestick per 1 day.
  OneWeek = 'OneWeek', // One candlestick per 1 week.
  OneMonth = 'OneMonth', // One candlestick per 1 month.
  OneYear = 'OneYear', // One candlestick per 1 year.
}

// The following table specifies all supported bracket order components.
export enum OrderClass {
  Primary = 'Primary', //  Primary order
  Limit = 'Limit', //  Profit exit order
  StopLoss = 'StopLoss', //  Loss exit order
}

// The following types of strategies are supported for multi-leg strategy orders
export enum StrategyTypes {
  CoveredCall = 'CoveredCall', // Covered Call
  MarriedPuts = 'MarriedPuts', // Married Put
  VerticalCallSpread = 'VerticalCallSpread', // Vertical Call
  VerticalPutSpread = 'VerticalPutSpread', // Vertical Put
  CalendarCallSpread = 'CalendarCallSpread', // Calendar Call
  CalendarPutSpread = 'CalendarPutSpread', // Calendar Put
  DiagonalCallSpread = 'DiagonalCallSpread', // Diagonal Call
  DiagonalPutSpread = 'DiagonalPutSpread', // Diagonal Put
  Collar = 'Collar', // Collar
  Straddle = 'Straddle', // Straddle
  Strangle = 'Strangle', // Strangle
  ButterflyCall = 'ButterflyCall', // Butterfly Call
  ButterflyPut = 'ButterflyPut', // Butterfly Put
  IronButterfly = 'IronButterfly', // Iron Butterfly
  CondorCall = 'CondorCall', // Condor
  Custom = 'Custom', // Custom, or user defined
}
