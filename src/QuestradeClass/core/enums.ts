/** @format */

// The following table specifies all supported currency codes.

export enum Currency {
  USD = 'US dollar',
  CAD = 'Canadian dollar',
}

// The following table specifies all supported listing exchanges.

export enum ListingExchange {
  // Toronto Stock Exchange.
  TSX = 'TSX',
  // Toronto Venture Exchange.
  TSXV = 'TSXV',
  // Canadian National Stock Exchange.
  CNSX = 'CNSX',
  // Montreal Exchange.
  MX = 'MX',
  // NASDAQ.
  NASDAQ = 'NASDAQ',
  // New York Stock Exchange.
  NYSE = 'NYSE',
  // NYSE AMERICAN
  NYSEAM = 'NYSEAM',
  // NYSE Arca.
  ARCA = 'ARCA',
  // Option Reporting Authority.
  OPRA = 'OPRA',
  // Pink Sheets.
  PinkSheets = 'PinkSheets',
  // OTC Bulletin Board.
  OTCBB = 'OTCBB',
}

// The following table specifies all supported user account types.

export enum AccountType {
  // Cash account.
  Cash = 'Cash',
  // Margin account.
  Margin = 'Margin',
  // Tax Free Savings Account.
  TFSA = 'TFSA',
  // Registered Retirement Savings Plan.
  RRSP = 'RRSP',
  // Spousal RRSP.
  SRRSP = 'SRRSP',
  // Locked-In RRSP.
  LRRSP = 'LRRSP',
  // Locked-In Retirement Account.
  LIRA = 'LIRA',
  // Life Income Fund.
  LIF = 'LIF',
  // Retirement Income Fund.
  RIF = 'RIF',
  // Spousal RIF.
  SRIF = 'SRIF',
  // Locked-In RIF.
  LRIF = 'LRIF',
  // Registered RIF.
  RRIF = 'RRIF',
  // Prescribed RIF.
  PRIF = 'PRIF',
  // Individual Registered Education Savings Plan.
  RESP = 'RESP',
  // Family RESP.
  FRESP = 'FRESP',
}

// The following table specifies all supported account client types.

export enum ClientAccountType {
  // Account held by an individual.

  Individual = 'Individual',
  // Account held jointly by several individuals (e.g., spouses).

  Joint = 'Joint',
  // Non-individual account held by an informal trust.

  InformalTrust = 'Informal Trust',
  // Non-individual account held by a corporation.

  Corporation = 'Corporation',
  // Non-individual account held by an investment club.

  InvestmentClub = 'Investment Club',
  // Non-individual account held by a formal trust.

  FormalTrust = 'Formal Trust',
  // Non-individual account held by a partnership.

  Partnership = 'Partnership',
  // Non-individual account held by a sole proprietorship.

  SoleProprietorship = 'Sole Proprietorship',
  // Account held by a family.

  Family = 'Family',
  // Non-individual account held by a joint and informal trust.

  JointAndInformalTrust = 'Joint and Informal Trust',
  // Non-individual account held by an institution.

  Institution = 'Institution',
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
  // Designates an uptick.
  Up = 'Up',
  // Designates a downtick.
  Down = 'Down',
  // Designates a tick that took place at the same price as a previous one.
  Equal = 'Equal',
}

// The following table specifies all supported option types.

export enum OptionType {
  // Call option.
  Call = 'Call',
  // Put option.
  Put = 'Put',
}

// The following table specifies all supported option duration types.

export enum OptionDurationType {
  // Weekly expiry cycle.
  Weekly = 'Weekly',
  // Monthly expiry cycle.
  Monthly = 'Monthly',
  // Quarterly expiry cycle.
  Quarterly = 'Quarterly',
  // Long-term Equity Appreciation contracts.
  LEAP = 'LEAP',
}

// The following table specifies all supported option exercise types.

export enum OptionExerciseType {
  // American option.
  American = 'American',
  // European option.
  European = 'European',
}

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

// The following table specifies all supported order state filter types.

export enum OrderStateFilterType {
  // Includes all orders, regardless of their state.
  All = 'All',
  // Includes only orders that are still open.
  Open = 'Open',
  // Includes only orders that are already closed.
  Closed = 'Closed',
}

// The following table specifies all supported order side values.

export enum OrderAction {
  // Designates an order to purchase a security.
  Buy = 'Buy',
  // Designates an order to dispose a security.
  Sell = 'Sell',
}

// The following table specifies all supported client order side values.

export enum OrderSide {
  // Buy
  Buy = 'Buy',
  // Sell
  Sell = 'Sell',
  // Sell short.
  Short = 'Short',
  // Cover the short.
  Cov = 'Cov',
  // Buy-To-Open.
  BTO = 'BTO',
  // Sell-To-Close.
  STC = 'STC',
  // Sell-To-Open.
  STO = 'STO',
  // Buy-To-Close.
  BTC = 'BTC',
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
  // One candlestick per 1 minute.
  OneMinute = 'OneMinute',
  // One candlestick per 2 minutes.
  TwoMinutes = 'TwoMinutes',
  // One candlestick per 3 minutes.
  ThreeMinutes = 'ThreeMinutes',
  // One candlestick per 4 minutes.
  FourMinutes = 'FourMinutes',
  // One candlestick per 5 minutes.
  FiveMinutes = 'FiveMinutes',
  // One candlestick per 10 minutes.
  TenMinutes = 'TenMinutes',
  // One candlestick per 15 minutes.
  FifteenMinutes = 'FifteenMinutes',
  // One candlestick per 20 minutes.
  TwentyMinutes = 'TwentyMinutes',
  // One candlestick per 30 minutes.
  HalfHour = 'HalfHour',
  // One candlestick per 1 hour.
  OneHour = 'OneHour',
  // One candlestick per 2 hours.
  TwoHours = 'TwoHours',
  // One candlestick per 4 hours.
  FourHours = 'FourHours',
  // One candlestick per 1 day.
  OneDay = 'OneDay',
  // One candlestick per 1 week.
  OneWeek = 'OneWeek',
  // One candlestick per 1 month.
  OneMonth = 'OneMonth',
  // One candlestick per 1 year.
  OneYear = 'OneYear',
}

// The following table specifies all supported bracket order components.

export enum OrderClass {
  //  Primary order
  Primary = 'Primary',
  //  Profit exit order
  Limit = 'Limit',
  //  Loss exit order
  StopLoss = 'StopLoss',
}

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
