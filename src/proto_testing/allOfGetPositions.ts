/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfGetPositions(qt: QuestradeClass, done: any) {
  const getPositions = await qt.getPositions();
  const getPosition = getPositions[0];
  await console.log('\n\n\n\nGETPOSITION at [0]');
  await console.log('\n\ngetPosition.symbol:');
  await console.dir(getPosition.symbol);
  await console.log('getPosition.symbolId:');
  await console.dir(getPosition.symbolId);
  await console.log('getPosition.openQuantity:');
  await console.dir(getPosition.openQuantity);
  await console.log('getPosition.closedQuantity:');
  await console.dir(getPosition.closedQuantity);
  await console.log('getPosition.currentMarketValue:');
  await console.dir(getPosition.currentMarketValue);
  await console.log('getPosition.currentPrice:');
  await console.dir(getPosition.currentPrice);
  await console.log('getPosition.averageEntryPrice:');
  await console.dir(getPosition.averageEntryPrice);
  await console.log('getPosition.dayPnl:');
  await console.dir(getPosition.dayPnl);
  await console.log('getPosition.closedPnl:');
  await console.dir(getPosition.closedPnl);
  await console.log('getPosition.openPnl:');
  await console.dir(getPosition.openPnl);
  await console.log('getPosition.totalCost:');
  await console.dir(getPosition.totalCost);
  await console.log('getPosition.isRealTime:');
  await console.dir(getPosition.isRealTime);
  await console.log('getPosition.isUnderReorg:');
  await console.dir(getPosition.isUnderReorg);
  await console.log('getPositions.length:', getPositions.length);
  done();
}
