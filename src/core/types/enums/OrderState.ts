/** @format */

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
