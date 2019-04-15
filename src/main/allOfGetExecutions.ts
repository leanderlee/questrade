/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfGetExecutions(qt: QuestradeClass) {
  const getExecutions = await qt.getExecutions();
  const execution = getExecutions[0];
  console.log('\n\n\n\nGETEXECUTIONS');
  console.log('\n\nexecution.symbol:');
  console.log(execution.symbol);
  console.log('execution.symbolId:');
  console.log(execution.symbolId);
  console.log('execution.quantity:');
  console.log(execution.quantity);
  console.log('execution.side:');
  console.log(execution.side);
  console.log('execution.price:');
  console.log(execution.price);
  console.log('execution.id:');
  console.log(execution.id);
  console.log('execution.orderId:');
  console.log(execution.orderId);
  console.log('execution.orderChainId:');
  console.log(execution.orderChainId);
  console.log('execution.exchangeExecId:');
  console.log(execution.exchangeExecId);
  console.log('execution.timestamp:');
  console.log(execution.timestamp);
  console.log('execution.notes:');
  console.log(execution.notes);
  console.log('execution.venue:');
  console.log(execution.venue);
  console.log('execution.totalCost:');
  console.log(execution.totalCost);
  console.log('execution.orderPlacementCommission:');
  console.log(execution.orderPlacementCommission);
  console.log('execution.commission:');
  console.log(execution.commission);
  console.log('execution.executionFee:');
  console.log(execution.executionFee);
  console.log('execution.secFee:');
  console.log(execution.secFee);
  console.log('execution.canadianExecutionFee:');
  console.log(execution.canadianExecutionFee);
  console.log('execution.parentId:');
  console.log(execution.parentId);
  console.log('getExecutions.length', getExecutions.length);
  return getExecutions;
}
