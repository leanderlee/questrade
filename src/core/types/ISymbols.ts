import { DateTime } from './Types';

export interface ISymbols{
    symbols:ISymbol[]
}
export interface ISymbol{
    // Symbol that follows Questrade symbology (e.g., "TD.TO").
symbol: string
symbolId: number // Symbol identifier
prevDayClosePrice: number // Closing trade price from the previous trading day.
highPrice52: number // 52-week high price.
lowPrice52: number // 52-week low price.
averageVol3Months: number // Average trading volume over trailing 3 months.
averageVol20Days: number // Average trading volume over trailing 20 days.
outstandingShares: number // Total number of shares outstanding.
eps: number // Trailing 12-month earnings per share.
pe: number // Trailing 12-month price to earnings ratio.
dividend: number // Dividend amount per share.
yield: number // Dividend yield (dividend / prevDayClosePrice).
exDate: DateTime // Dividend ex-date.
marketCap: number // Market capitalization (outstandingShares * prevDayClosePrice).
optionType: any // Option type (e.g., "Call").
See Option Type section for all allowed values.
optionDurationType: any // Option duration type (e.g., "Weekly").
See Option Duration Type section for all allowed values.
// Option root symbol (e.g., "MSFT").
optionRoot: string
optionContractDeliverables any | [] // Option contract deliverables.
underlyings any | [] // List of UnderlyingMultiplierPair records.
UnderlyingMultiplierPair any | [] //
multiplier: number // Number of shares deliverable per contract (e.g., 100).
// Underlying symbol for the deliverable (e.g., "MSFT").
underlyingSymbol: string
// Underlying symbol id for the deliverable (e.g., 2345343).
underlyingSymbolId: string
cashInLieu: number // Amount of cash in lieu deliverable per contract.
optionExerciseType: any // Option exercise style (e.g., "American").
See Option Exercise Type section for all allowed values.
listingExchange: any // Primary listing exchange.
See Listing Exchange section for the list of all listing exchanges.
// Symbol description (e.g., "Microsoft Corp.").
description: string
securityType: any // Security type (e.g., "Stock").
See Security Type section for all allowed values. {
optionExpiryDate
 } Date time Option expiry date.
dividendDate Date time Dividend declaration date.
optionStrikePrice: number // Option strike price.
isQuotable: boolean // Indicates whether the symbol is actively listed.
hasOptions: boolean // Indicates whether the symbol is an underlying option.
// Currency code (follows ISO format).
currency: string
minTicks any | [] // List of MinTickData records.
MinTickData any | [] //
pivot: number // Beginning of the interval for a given minimum price increment.
minTick: number // Minimum price increment.
industrySector: any // Industry sector classification.
industryGroup: any // Industry group classification.
industrySubGroup: any // Industry subgroup classification.
}

/*



*/
