/** @format */

import { QuestradeClass } from '../../core/types';

export async function allOfGetExecutions(qt: QuestradeClass, done: any) {
  const getExecutions = await qt.getExecutions();
  const execution = getExecutions[0];
  await console.log('\n\n\n\nGETEXECUTIONS');
  await console.log('\n\nexecution.symbol:');
  await console.log(execution.symbol);
  await console.log('execution.symbolId:');
  await console.log(execution.symbolId);
  await console.log('execution.quantity:');
  await console.log(execution.quantity);
  await console.log('execution.side:');
  await console.log(execution.side);
  await console.log('execution.price:');
  await console.log(execution.price);
  await console.log('execution.id:');
  await console.log(execution.id);
  await console.log('execution.orderId:');
  await console.log(execution.orderId);
  await console.log('execution.orderChainId:');
  await console.log(execution.orderChainId);
  await console.log('execution.exchangeExecId:');
  await console.log(execution.exchangeExecId);
  await console.log('execution.timestamp:');
  await console.log(execution.timestamp);
  await console.log('execution.notes:');
  await console.log(execution.notes);
  await console.log('execution.venue:');
  await console.log(execution.venue);
  await console.log('execution.totalCost:');
  await console.log(execution.totalCost);
  await console.log('execution.orderPlacementCommission:');
  await console.log(execution.orderPlacementCommission);
  await console.log('execution.commission:');
  await console.log(execution.commission);
  await console.log('execution.executionFee:');
  await console.log(execution.executionFee);
  await console.log('execution.secFee:');
  await console.log(execution.secFee);
  await console.log('execution.canadianExecutionFee:');
  await console.log(execution.canadianExecutionFee);
  await console.log('execution.parentId:');
  await console.log(execution.parentId);
  await console.log('getExecutions.length', getExecutions.length);
  done();
}
