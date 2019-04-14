/** @format */

import { DateTime, idType } from '.';
import {
  OrderClass,
  OrderSide,
  OrderState,
  OrderTimeInForce,
  OrderType,
  StrategyTypes,
} from './enums';

export interface IOrders {
  orders: IOrder[];
}
export interface IOrder {
  id?: idType;
  symbol?: string;
  symbolId?: idType;
  totalQuantity?: number;
  openQuantity?: number;
  filledQuantity?: number;
  canceledQuantity?: number;
  side?: OrderSide;
  orderType?: OrderType;
  limitPrice?: number;
  stopPrice?: number;
  isAllOrNone?: boolean;
  isAnonymous?: boolean;
  icebergQuantity?: number;
  minQuantity?: number;
  avgExecPrice?: number;
  lastExecPrice?: number;
  source?: string;
  timeInForce?: OrderTimeInForce;
  gtdDate?: DateTime;
  state?: OrderState;
  clientReasonStr?: string;
  chainId?: idType;
  creationTime?: DateTime;
  updateTime?: DateTime;
  notes?: string;
  primaryRoute?: string;
  secondaryRoute?: string;
  orderRoute?: string;
  venueHoldingOrder?: string;
  commissionCharged?: number;
  exchangeOrderId?: idType;
  isSignificantShareholder?: boolean;
  isInsider?: boolean;
  isLimitOffsetInDollar?: boolean;
  userId?: idType;
  placementCommission?: number;
  legs?: string;
  OrderLeg?: string;
  strategyType?: StrategyTypes;
  triggerStopPrice?: number;
  orderGroupId?: idType;
  orderClass?: OrderClass;
}
