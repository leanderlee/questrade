/** @format */

import { DateTime } from '.';
import { HistoricalDataGranularity, OptionType } from './enums';

export type AccountType = number | string;
export interface IFilter {
  optionType: OptionType;
  underlyingId: number; // Underlying ID
  expiryDate: DateTime; // Expiry date
  minstrikePrice: number; // 0 Min strike price
  maxstrikePrice: number; // 0 Max strike price
}

interface ITimeStartEnd {
  startTime?: DateTime;
  endTime?: DateTime;
}
interface ITimeStartEndAndInterval extends ITimeStartEnd {
  interval?: HistoricalDataGranularity | string;
}
interface IOrdersOptions {
  id?: AccountType; // Account number.
  // Can occur in the ‘location’ header only.
  startTime?: DateTime; // Start of the time range in ISO format.
  // By default – start of today, 12:00am.
  endTime?: DateTime; // End of the time range in ISO format.
  // By default – end of today, 11:59pm.
  // Enum All, Open, Closed – retrieve all, active or closed orders.
  stateFilter?: any;
  orderId?: number; // Retrieve single order details.
}
interface IOptionals extends ITimeStartEndAndInterval, IOrdersOptions {
  stateFilter?: any;
  id?: string | number;
  name?: string;
  names?: string[] | string;
  offset?: any;
  prefix?: any;
  interval?: any;
  ids?: string | number | string[] | number[];
  filters?: IFilter[];
  filter?: IFilter;
}

export type TimeRange = ITimeStartEnd;
export type OrdersOptions = IOrdersOptions;
export type TimeRangeInterval = ITimeStartEndAndInterval;
export type Optionals = IOptionals;
/*

OptionIdFilter

Option filters based on underlying Ids
export enum HistoricalDataGranularity {


*/
