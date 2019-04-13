/** @format */

import { Currency } from './enums';

/** @format */
// GET markets
// Retrieves information about supported markets.
// Request parameters
// No parameters.
export interface IMarketsResponse {
  markets: IMarket[];
}
export interface IMarket {
  // Market name.
  name?: string;

  // List of Order execution venue code.
  tradingVenues?: string[];

  // Default trading venue code.
  defaultTradingVenue?: string;

  // List of primary order route codes.
  primaryOrderRoutes?: string[];

  // List of secondary order route codes.
  secondaryOrderRoutes?: string[];

  // List of Level 1 market data feed code
  level1Feeds?: string[];

  // List of Level 2 market data feed code.
  level2Feeds?: string[];

  // Pre-market opening time for current trading date.
  extendedStartTime?: Date | string;

  // Regular market opening time for current trading date.
  startTime?: Date | string;

  // Regular market closing time for current trading date.
  endTime?: Date | string;

  // Extended market closing time for current trading date.
  extendedEndTime?: Date | string;

  // Currency code (ISO format).
  currency?: Currency;

  // Number of snap quotes that the user can retrieve from a market.
  snapQuotesLimit?: number;
}

/*
Sample request
GET https://api01.iq.questrade.com/v1/markets
Sample JSON response
{
	"markets": [
		{
			"name": "TSX",
			"tradingVenues": [
				"TSX",
				"ALPH",
				"CHIC",
				"OMGA",
				"PURE"
			],
			"defaultTradingVenue": "AUTO",
			"primaryOrderRoutes": [
				"AUTO"
			],
			"secondaryOrderRoutes": [
				"TSX",
				"AUTO"
			],
			"level1Feeds": [
				"ALPH",
				"CHIC",
				"OMGA",
				"PURE",
				"TSX"
			],
			"extendedStartTime": "2014-10-06T07:00:00.000000-04:00",
			"startTime": "2014-10-06T09:30:00.000000-04:00",
			"endTime": "2014-10-06T16:00:00.000000-04:00",
			"currency": "CAD",
			"snapQuotesLimit": 99999
		},
		...
	]
}
*/
