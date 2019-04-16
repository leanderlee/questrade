/** @format */

import { DateTime } from '.';
import {
  HistoricalDataGranularity,
  OptionType,
  OrderStateFilterType,
} from './enums';

export type AccountType = number | string;
export interface IFilter {
  optionType: OptionType;
  underlyingId: number;
  expiryDate: DateTime;
  minstrikePrice: number;
  maxstrikePrice: number;
}

interface ITimeStartEnd {
  startTime?: DateTime;
  endTime?: DateTime;
}
interface ITimeStartEndAndInterval extends ITimeStartEnd {
  interval?: HistoricalDataGranularity | string;
}
interface IOrdersOptions {
  id?: AccountType;
  startTime?: DateTime;
  endTime?: DateTime;
  stateFilter?: OrderStateFilterType;
  orderId?: number;
}
interface IOptionals extends ITimeStartEndAndInterval, IOrdersOptions {
  stateFilter?: OrderStateFilterType;
  id?: string | number;
  name?: string;
  names?: string[] | string;
  offset?: number;
  prefix?: string | number;
  interval?: string;
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
