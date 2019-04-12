/** @format */

// The following table specifies all supported order state filter types.
export enum OrderStateFilterType {
  // Includes all orders, regardless of their state.
  All = 'All',
  // Includes only orders that are still open.
  Open = 'Open',
  // Includes only orders that are already closed.
  Closed = 'Closed',
}
