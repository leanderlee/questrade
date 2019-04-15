/** @format */

import { QuestradeClass } from '../../core/types';

export async function allOfgetBalances(qt: QuestradeClass, done: any) {
  const getBalances = await qt.getBalances();
  await console.log('\n\n\n\nGETBALANCES');
  await console.log('\n\nperCurrencyBalancs[CAD].currency:');
  await console.log(getBalances.perCurrencyBalances[0].currency);
  await console.log('perCurrencyBalancs[CAD].cash:');
  await console.log(getBalances.perCurrencyBalances[0].cash);
  await console.log('perCurrencyBalancs[CAD].marketValue:');
  await console.log(getBalances.perCurrencyBalances[0].marketValue);
  await console.log('perCurrencyBalancs[CAD].totalEquity:');
  await console.log(getBalances.perCurrencyBalances[0].totalEquity);
  await console.log('perCurrencyBalancs[CAD].buyingPower:');
  await console.log(getBalances.perCurrencyBalances[0].buyingPower);
  await console.log('perCurrencyBalancs[CAD].maintenanceExcess:');
  await console.log(getBalances.perCurrencyBalances[0].maintenanceExcess);
  await console.log('perCurrencyBalancs[CAD].isRealTime:');
  await console.log(getBalances.perCurrencyBalances[0].isRealTime);

  await console.log('\n\nperCurrencyBalancs[USD].currency:');
  await console.log(getBalances.perCurrencyBalances[1].currency);
  await console.log('perCurrencyBalancs[USD].cash:');
  await console.log(getBalances.perCurrencyBalances[1].cash);
  await console.log('perCurrencyBalancs[USD].marketValue:');
  await console.log(getBalances.perCurrencyBalances[1].marketValue);
  await console.log('perCurrencyBalancs[USD].totalEquity:');
  await console.log(getBalances.perCurrencyBalances[1].totalEquity);
  await console.log('perCurrencyBalancs[USD].buyingPower:');
  await console.log(getBalances.perCurrencyBalances[1].buyingPower);
  await console.log('perCurrencyBalancs[USD].maintenanceExcess:');
  await console.log(getBalances.perCurrencyBalances[1].maintenanceExcess);
  await console.log('perCurrencyBalancs[USD].isRealTime:');
  await console.log(getBalances.perCurrencyBalances[1].isRealTime);

  await console.log('\n\ncombinedBalances[CAD].currency:');
  await console.log(getBalances.combinedBalances[0].currency);
  await console.log('combinedBalances[CAD].cash:');
  await console.log(getBalances.combinedBalances[0].cash);
  await console.log('combinedBalances[CAD].marketValue:');
  await console.log(getBalances.combinedBalances[0].marketValue);
  await console.log('combinedBalances[CAD].totalEquity:');
  await console.log(getBalances.combinedBalances[0].totalEquity);
  await console.log('combinedBalances[CAD].buyingPower:');
  await console.log(getBalances.combinedBalances[0].buyingPower);
  await console.log('combinedBalances[CAD].maintenanceExcess:');
  await console.log(getBalances.combinedBalances[0].maintenanceExcess);
  await console.log('combinedBalances[CAD].isRealTime:');
  await console.log(getBalances.combinedBalances[0].isRealTime);

  await console.log('\n\ncombinedBalances[USD].currency:');
  await console.log(getBalances.combinedBalances[1].currency);
  await console.log('combinedBalances[USD].cash:');
  await console.log(getBalances.combinedBalances[1].cash);
  await console.log('combinedBalances[USD].marketValue:');
  await console.log(getBalances.combinedBalances[1].marketValue);
  await console.log('combinedBalances[USD].totalEquity:');
  await console.log(getBalances.combinedBalances[1].totalEquity);
  await console.log('combinedBalances[USD].buyingPower:');
  await console.log(getBalances.combinedBalances[1].buyingPower);
  await console.log('combinedBalances[USD].maintenanceExcess:');
  await console.log(getBalances.combinedBalances[1].maintenanceExcess);
  await console.log('combinedBalances[USD].isRealTime:');
  await console.log(getBalances.combinedBalances[1].isRealTime);

  await console.log('\n\nsodPerCurrencyBalances[CAD].currency');
  await console.log(getBalances.sodPerCurrencyBalances[0].currency);
  await console.log('sodPerCurrencyBalances[CAD].cash');
  await console.log(getBalances.sodPerCurrencyBalances[0].cash);
  await console.log('sodPerCurrencyBalances[CAD].marketValue');
  await console.log(getBalances.sodPerCurrencyBalances[0].marketValue);
  await console.log('sodPerCurrencyBalances[CAD].totalEquity');
  await console.log(getBalances.sodPerCurrencyBalances[0].totalEquity);
  await console.log('sodPerCurrencyBalances[CAD].buyingPower');
  await console.log(getBalances.sodPerCurrencyBalances[0].buyingPower);
  await console.log('sodPerCurrencyBalances[CAD].maintenanceExcess');
  await console.log(getBalances.sodPerCurrencyBalances[0].maintenanceExcess);
  await console.log('sodPerCurrencyBalances[CAD].isRealTime');
  await console.log(getBalances.sodPerCurrencyBalances[0].isRealTime);

  await console.log('\n\nsodPerCurrencyBalances[USD].currency');
  await console.log(getBalances.sodPerCurrencyBalances[1].currency);
  await console.log('sodPerCurrencyBalances[USD].cash');
  await console.log(getBalances.sodPerCurrencyBalances[1].cash);
  await console.log('sodPerCurrencyBalances[USD].marketValue');
  await console.log(getBalances.sodPerCurrencyBalances[1].marketValue);
  await console.log('sodPerCurrencyBalances[USD].totalEquity');
  await console.log(getBalances.sodPerCurrencyBalances[1].totalEquity);
  await console.log('sodPerCurrencyBalances[USD].buyingPower');
  await console.log(getBalances.sodPerCurrencyBalances[1].buyingPower);
  await console.log('sodPerCurrencyBalances[USD].maintenanceExcess');
  await console.log(getBalances.sodPerCurrencyBalances[1].maintenanceExcess);
  await console.log('sodPerCurrencyBalances[USD].isRealTime');
  await console.log(getBalances.sodPerCurrencyBalances[1].isRealTime);

  await console.log('\n\nsodCombinedBalancs[CAD].currency:');
  await console.log(getBalances.sodCombinedBalances[0].currency);
  await console.log('sodCombinedBalances[CAD].cash');
  await console.log(getBalances.sodCombinedBalances[0].cash);
  await console.log('sodCombinedBalancs[CAD].marketValue');
  await console.log(getBalances.sodCombinedBalances[0].marketValue);
  await console.log('sodCombinedBalances[CAD].totalEquity');
  await console.log(getBalances.sodCombinedBalances[0].totalEquity);
  await console.log('sodCombinedBalances[CAD].buyingPower');
  await console.log(getBalances.sodCombinedBalances[0].buyingPower);
  await console.log('sodCombinedBalancs[CAD].maintenanceExcess');
  await console.log(getBalances.sodCombinedBalances[0].maintenanceExcess);
  await console.log('sodCombinedBalances[CAD].isRealTime');
  await console.log(getBalances.sodCombinedBalances[0].isRealTime);

  await console.log('\n\nsodCombinedBalancs[USD].currency:');
  await console.log(getBalances.sodCombinedBalances[1].currency);
  await console.log('sodCombinedBalances[USD].cash');
  await console.log(getBalances.sodCombinedBalances[1].cash);
  await console.log('sodCombinedBalancs[USD].marketValue');
  await console.log(getBalances.sodCombinedBalances[1].marketValue);
  await console.log('sodCombinedBalances[USD].totalEquity');
  await console.log(getBalances.sodCombinedBalances[1].totalEquity);
  await console.log('sodCombinedBalances[USD].buyingPower');
  await console.log(getBalances.sodCombinedBalances[1].buyingPower);
  await console.log('sodCombinedBalancs[USD].maintenanceExcess');
  await console.log(getBalances.sodCombinedBalances[1].maintenanceExcess);
  await console.log('sodCombinedBalances[USD].isRealTime');
  await console.log(getBalances.sodCombinedBalances[1].isRealTime);
  done();
}
