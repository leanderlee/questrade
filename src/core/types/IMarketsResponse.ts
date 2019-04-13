/** @format */

export interface IMarketsResponse {
  // Market name.
  name?: string;

  // List of Order execution venue code.
  tradingVenues?: [];

  // Default trading venue code.
  defaultTradingVenue?: any;

  // List of primary order route codes.
  primaryOrderRoutes?: [];

  // List of secondary order route codes.
  secondaryOrderRoutes?: [];

  // List of Level 1 market data feed code
  level1Feeds?: [];

  // List of Level 2 market data feed code.
  level2Feeds?: [];

  // Pre-market opening time for current trading date.
  extendedStartTime?: Date | string;

  // Regular market opening time for current trading date.
  startTime?: Date | string;

  // Regular market closing time for current trading date.
  endTime?: Date | string;

  // Extended market closing time for current trading date.
  extendedEndTime?: Date | string;

  // Currency code (ISO format).
  currency?: any;

  // Number of snap quotes that the user can retrieve from a market.
  snapQuotesLimit?: number;
}
