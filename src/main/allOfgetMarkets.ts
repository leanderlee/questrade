/** @format */

import { QuestradeClass } from '../core/types';

export async function allOfgetMarkets(qt: QuestradeClass) {
  const getMarkets = await qt.getMarkets();
  // const getMarket = getMarkets[0];
  getMarkets.forEach(getMarket => {
    console.log('\n\n\n\nGETMARKET');
    console.log('\n\ngetMarket.name:');
    console.log(getMarket.name);
    console.log('getMarket.tradingVenues:');
    console.log(getMarket.tradingVenues);
    console.log('getMarket.defaultTradingVenue:');
    console.log(getMarket.defaultTradingVenue);
    console.log('getMarket.primaryOrderRoutes:');
    console.log(getMarket.primaryOrderRoutes);
    console.log('getMarket.secondaryOrderRoutes:');
    console.log(getMarket.secondaryOrderRoutes);
    console.log('getMarket.level1Feeds:');
    console.log(getMarket.level1Feeds);
    console.log('getMarket.level2Feeds:');
    console.log(getMarket.level2Feeds);
    console.log('getMarket.extendedStartTime:');
    console.log(getMarket.extendedStartTime);
    console.log('getMarket.startTime:');
    console.log(getMarket.startTime);
    console.log('getMarket.endTime:');
    console.log(getMarket.endTime);
    console.log('getMarket.extendedEndTime:');
    console.log(getMarket.extendedEndTime);
    console.log('getMarket.currency:');
    console.log(getMarket.currency);
    console.log('getMarket.snapQuotesLimit:');
    console.log(getMarket.snapQuotesLimit);
    console.log('getMarket.currency:');
    console.log(getMarket.currency);
  });
  console.log('getMarkets:');
  console.dir(getMarkets);
  console.log('getMarkets.length', getMarkets.length);
  return getMarkets;
}
