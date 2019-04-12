/** @format */

// The following table specifies all supported market data tick types.
export enum TickType {
  // Designates an uptick.
  Up = 'Up',
  // Designates a downtick.
  Down = 'Down',
  // Designates a tick that took place at the same price as a previous one.
  Equal = 'Equal',
}
