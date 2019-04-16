/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfgetMarkets(qt: QuestradeClass, done: any) {
  const getMarkets = await qt.getMarkets();
  // const getMarket = getMarkets[0];
  const getMarket = getMarkets[0];
  await console.log('\n\n\n\nGETMARKET');
  await console.log('\n\ngetMarket.name:');
  await console.log(getMarket.name);
  await console.log('getMarket.tradingVenues:');
  await console.log(getMarket.tradingVenues);
  await console.log('getMarket.defaultTradingVenue:');
  await console.log(getMarket.defaultTradingVenue);
  await console.log('getMarket.primaryOrderRoutes:');
  await console.log(getMarket.primaryOrderRoutes);
  await console.log('getMarket.secondaryOrderRoutes:');
  await console.log(getMarket.secondaryOrderRoutes);
  await console.log('getMarket.level1Feeds:');
  await console.log(getMarket.level1Feeds);
  await console.log('getMarket.level2Feeds:');
  await console.log(getMarket.level2Feeds);
  await console.log('getMarket.extendedStartTime:');
  await console.log(getMarket.extendedStartTime);
  await console.log('getMarket.startTime:');
  await console.log(getMarket.startTime);
  await console.log('getMarket.endTime:');
  await console.log(getMarket.endTime);
  await console.log('getMarket.extendedEndTime:');
  await console.log(getMarket.extendedEndTime);
  await console.log('getMarket.currency:');
  await console.log(getMarket.currency);
  await console.log('getMarket.snapQuotesLimit:');
  await console.log(getMarket.snapQuotesLimit);
  await console.log('getMarket.currency:');
  await console.log(getMarket.currency);
  await console.log('getMarkets:');
  await console.dir(getMarkets);
  await console.log('getMarkets.length', getMarkets.length);
  done();
}
