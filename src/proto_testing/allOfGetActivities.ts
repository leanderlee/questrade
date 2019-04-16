/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfGetActivities(qt: QuestradeClass, done: any) {
  const getActivities = await qt.getActivities();
  const activity = getActivities[0];
  await console.log('\n\n\n\nGETACTIVITIES');
  await console.log('\n\nactivity.action:');
  await console.log(activity.action);
  await console.log('activity.tradeDate');
  await console.log(activity.tradeDate);
  await console.log('activity.transactionDate');
  await console.log(activity.transactionDate);
  await console.log('activity.settlementDate');
  await console.log(activity.settlementDate);
  await console.log('activity.symbol');
  await console.log(activity.symbol);
  await console.log('activity.symbolId');
  await console.log(activity.symbolId);
  await console.log('activity.description');
  await console.log(activity.description);
  await console.log('activity.currency');
  await console.log(activity.currency);
  await console.log('activity.quantity');
  await console.log(activity.quantity);
  await console.log('activity.price');
  await console.log(activity.price);
  await console.log('activity.grossAmount');
  await console.log(activity.grossAmount);
  await console.log('activity.commission');
  await console.log(activity.commission);
  await console.log('activity.netAmount');
  await console.log(activity.netAmount);
  await console.log('activity.type');
  await console.log(activity.type);
  await console.log('getActivities.length', getActivities.length);
  done();
}
