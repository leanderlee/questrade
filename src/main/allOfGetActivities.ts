/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfGetActivities(qt: QuestradeClass) {
  const getActivities = await qt.getActivities();
  const activity = getActivities[0];
  console.log('\n\n\n\nGETACTIVITIES');
  console.log('\n\nactivity.action:');
  console.log(activity.action);
  console.log('activity.tradeDate');
  console.log(activity.tradeDate);
  console.log('activity.transactionDate');
  console.log(activity.transactionDate);
  console.log('activity.settlementDate');
  console.log(activity.settlementDate);
  console.log('activity.symbol');
  console.log(activity.symbol);
  console.log('activity.symbolId');
  console.log(activity.symbolId);
  console.log('activity.description');
  console.log(activity.description);
  console.log('activity.currency');
  console.log(activity.currency);
  console.log('activity.quantity');
  console.log(activity.quantity);
  console.log('activity.price');
  console.log(activity.price);
  console.log('activity.grossAmount');
  console.log(activity.grossAmount);
  console.log('activity.commission');
  console.log(activity.commission);
  console.log('activity.netAmount');
  console.log(activity.netAmount);
  console.log('activity.type');
  console.log(activity.type);
  console.log('getActivities.length', getActivities.length);
  return getActivities;
}
