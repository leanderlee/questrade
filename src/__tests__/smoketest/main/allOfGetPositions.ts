/** @format */

import { QuestradeClass } from '../../core/types';

export async function allOfGetPositions(qt: QuestradeClass) {
  const getPositions = await qt.getPositions();
  const getPosition = getPositions[0];
  console.log('\n\n\n\nGETPOSITION at [0]');
  console.log('\n\ngetPosition.symbol:');
  console.dir(getPosition.symbol);
  console.log('getPosition.symbolId:');
  console.dir(getPosition.symbolId);
  console.log('getPosition.openQuantity:');
  console.dir(getPosition.openQuantity);
  console.log('getPosition.closedQuantity:');
  console.dir(getPosition.closedQuantity);
  console.log('getPosition.currentMarketValue:');
  console.dir(getPosition.currentMarketValue);
  console.log('getPosition.currentPrice:');
  console.dir(getPosition.currentPrice);
  console.log('getPosition.averageEntryPrice:');
  console.dir(getPosition.averageEntryPrice);
  console.log('getPosition.dayPnl:');
  console.dir(getPosition.dayPnl);
  console.log('getPosition.closedPnl:');
  console.dir(getPosition.closedPnl);
  console.log('getPosition.openPnl:');
  console.dir(getPosition.openPnl);
  console.log('getPosition.totalCost:');
  console.dir(getPosition.totalCost);
  console.log('getPosition.isRealTime:');
  console.dir(getPosition.isRealTime);
  console.log('getPosition.isUnderReorg:');
  console.dir(getPosition.isUnderReorg);
  console.log('getPositions.length:', getPositions.length);
  return getPositions;
}
