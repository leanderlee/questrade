/** @format */

// The following table specifies all supported order Time-In-Force instructions.
export enum OrderTimeInForce {
  Day = 'Day',
  GoodTillCanceled = 'GoodTillCanceled',
  GoodTillExtendedDay = 'GoodTillExtendedDay',
  GoodTillDate = 'GoodTillDate',
  ImmediateOrCancel = 'ImmediateOrCancel',
  FillOrKill = 'FillOrKill',
}
