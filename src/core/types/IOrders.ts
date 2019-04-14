/** @format */

import { DateTime, idType } from '.';

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
  side?: any;
  orderType?: any;
  limitPrice?: number;
  stopPrice?: number;
  isAllOrNone?: boolean;
  isAnonymous?: boolean;
  icebergQuantity?: number;
  minQuantity?: number;
  avgExecPrice?: number;
  lastExecPrice?: number;
  source?: any;
  timeInForce?: any;
  gtdDate?: DateTime;
  state?: any;
  clientReasonStr?: string;
  chainId?: idType;
  creationTime?: DateTime;
  updateTime?: DateTime;
  notes?: string;
  primaryRoute?: any;
  secondaryRoute?: any;
  orderRoute?: any;
  venueHoldingOrder?: any;
  commissionCharged?: number;
  exchangeOrderId?: idType;
  isSignificantShareholder?: boolean;
  isInsider?: boolean;
  isLimitOffsetInDollar?: boolean;
  userId?: idType;
  placementCommission?: number;
  legs?: any;
  OrderLeg?: any;
  strategyType?: any;
  triggerStopPrice?: number;
  orderGroupId?: idType;
  orderClass?: any;
}
