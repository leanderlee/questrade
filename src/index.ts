/** @format */

export {
  AccountStatus,
  ClientAccountType,
  Currency,
  HistoricalDataGranularity,
  ListingExchange,
  OptionDurationType,
  OptionExerciseType,
  OptionType,
  OrderAction,
  OrderClass,
  OrderSide,
  OrderState,
  OrderStateFilterType,
  OrderTimeInForce,
  OrderType,
  SecurityType,
  StrategyTypes,
  TickType,
  UserAccountType,
} from './core/types';
export { QuestradeClass } from './core/types/classes/QuestradeClass';
export {
  IQuestradeAPIOptions,
  QuestradeAPIOptions,
} from './core/types/IQuestradeAPIOptions';
export { QuestradeHelperFunction };
import { QuestradeHelperFunction } from './utils/QuestradeHelperFunction';
export const tokenConnection = async (seedToken: string) => {
  const questrade = await QuestradeHelperFunction({ seedToken });
  return { questrade: questrade };
};
