/** @format */

import { QuestradeClass } from '../../core/types';

export async function allOfgetBalances(qt: QuestradeClass) {
  const getBalances = await qt.getBalances();
  console.log('\n\n\n\nGETBALANCES');
  console.log('\n\nperCurrencyBalancs[CAD].currency:');
  console.log(getBalances.perCurrencyBalances[0].currency);
  console.log('perCurrencyBalancs[CAD].cash:');
  console.log(getBalances.perCurrencyBalances[0].cash);
  console.log('perCurrencyBalancs[CAD].marketValue:');
  console.log(getBalances.perCurrencyBalances[0].marketValue);
  console.log('perCurrencyBalancs[CAD].totalEquity:');
  console.log(getBalances.perCurrencyBalances[0].totalEquity);
  console.log('perCurrencyBalancs[CAD].buyingPower:');
  console.log(getBalances.perCurrencyBalances[0].buyingPower);
  console.log('perCurrencyBalancs[CAD].maintenanceExcess:');
  console.log(getBalances.perCurrencyBalances[0].maintenanceExcess);
  console.log('perCurrencyBalancs[CAD].isRealTime:');
  console.log(getBalances.perCurrencyBalances[0].isRealTime);

  console.log('\n\nperCurrencyBalancs[USD].currency:');
  console.log(getBalances.perCurrencyBalances[1].currency);
  console.log('perCurrencyBalancs[USD].cash:');
  console.log(getBalances.perCurrencyBalances[1].cash);
  console.log('perCurrencyBalancs[USD].marketValue:');
  console.log(getBalances.perCurrencyBalances[1].marketValue);
  console.log('perCurrencyBalancs[USD].totalEquity:');
  console.log(getBalances.perCurrencyBalances[1].totalEquity);
  console.log('perCurrencyBalancs[USD].buyingPower:');
  console.log(getBalances.perCurrencyBalances[1].buyingPower);
  console.log('perCurrencyBalancs[USD].maintenanceExcess:');
  console.log(getBalances.perCurrencyBalances[1].maintenanceExcess);
  console.log('perCurrencyBalancs[USD].isRealTime:');
  console.log(getBalances.perCurrencyBalances[1].isRealTime);

  console.log('\n\ncombinedBalances[CAD].currency:');
  console.log(getBalances.combinedBalances[0].currency);
  console.log('combinedBalances[CAD].cash:');
  console.log(getBalances.combinedBalances[0].cash);
  console.log('combinedBalances[CAD].marketValue:');
  console.log(getBalances.combinedBalances[0].marketValue);
  console.log('combinedBalances[CAD].totalEquity:');
  console.log(getBalances.combinedBalances[0].totalEquity);
  console.log('combinedBalances[CAD].buyingPower:');
  console.log(getBalances.combinedBalances[0].buyingPower);
  console.log('combinedBalances[CAD].maintenanceExcess:');
  console.log(getBalances.combinedBalances[0].maintenanceExcess);
  console.log('combinedBalances[CAD].isRealTime:');
  console.log(getBalances.combinedBalances[0].isRealTime);

  console.log('\n\ncombinedBalances[USD].currency:');
  console.log(getBalances.combinedBalances[1].currency);
  console.log('combinedBalances[USD].cash:');
  console.log(getBalances.combinedBalances[1].cash);
  console.log('combinedBalances[USD].marketValue:');
  console.log(getBalances.combinedBalances[1].marketValue);
  console.log('combinedBalances[USD].totalEquity:');
  console.log(getBalances.combinedBalances[1].totalEquity);
  console.log('combinedBalances[USD].buyingPower:');
  console.log(getBalances.combinedBalances[1].buyingPower);
  console.log('combinedBalances[USD].maintenanceExcess:');
  console.log(getBalances.combinedBalances[1].maintenanceExcess);
  console.log('combinedBalances[USD].isRealTime:');
  console.log(getBalances.combinedBalances[1].isRealTime);

  console.log('\n\nsodPerCurrencyBalances[CAD].currency');
  console.log(getBalances.sodPerCurrencyBalances[0].currency);
  console.log('sodPerCurrencyBalances[CAD].cash');
  console.log(getBalances.sodPerCurrencyBalances[0].cash);
  console.log('sodPerCurrencyBalances[CAD].marketValue');
  console.log(getBalances.sodPerCurrencyBalances[0].marketValue);
  console.log('sodPerCurrencyBalances[CAD].totalEquity');
  console.log(getBalances.sodPerCurrencyBalances[0].totalEquity);
  console.log('sodPerCurrencyBalances[CAD].buyingPower');
  console.log(getBalances.sodPerCurrencyBalances[0].buyingPower);
  console.log('sodPerCurrencyBalances[CAD].maintenanceExcess');
  console.log(getBalances.sodPerCurrencyBalances[0].maintenanceExcess);
  console.log('sodPerCurrencyBalances[CAD].isRealTime');
  console.log(getBalances.sodPerCurrencyBalances[0].isRealTime);

  console.log('\n\nsodPerCurrencyBalances[USD].currency');
  console.log(getBalances.sodPerCurrencyBalances[1].currency);
  console.log('sodPerCurrencyBalances[USD].cash');
  console.log(getBalances.sodPerCurrencyBalances[1].cash);
  console.log('sodPerCurrencyBalances[USD].marketValue');
  console.log(getBalances.sodPerCurrencyBalances[1].marketValue);
  console.log('sodPerCurrencyBalances[USD].totalEquity');
  console.log(getBalances.sodPerCurrencyBalances[1].totalEquity);
  console.log('sodPerCurrencyBalances[USD].buyingPower');
  console.log(getBalances.sodPerCurrencyBalances[1].buyingPower);
  console.log('sodPerCurrencyBalances[USD].maintenanceExcess');
  console.log(getBalances.sodPerCurrencyBalances[1].maintenanceExcess);
  console.log('sodPerCurrencyBalances[USD].isRealTime');
  console.log(getBalances.sodPerCurrencyBalances[1].isRealTime);

  console.log('\n\nsodCombinedBalancs[CAD].currency:');
  console.log(getBalances.sodCombinedBalances[0].currency);
  console.log('sodCombinedBalances[CAD].cash');
  console.log(getBalances.sodCombinedBalances[0].cash);
  console.log('sodCombinedBalancs[CAD].marketValue');
  console.log(getBalances.sodCombinedBalances[0].marketValue);
  console.log('sodCombinedBalances[CAD].totalEquity');
  console.log(getBalances.sodCombinedBalances[0].totalEquity);
  console.log('sodCombinedBalances[CAD].buyingPower');
  console.log(getBalances.sodCombinedBalances[0].buyingPower);
  console.log('sodCombinedBalancs[CAD].maintenanceExcess');
  console.log(getBalances.sodCombinedBalances[0].maintenanceExcess);
  console.log('sodCombinedBalances[CAD].isRealTime');
  console.log(getBalances.sodCombinedBalances[0].isRealTime);

  console.log('\n\nsodCombinedBalancs[USD].currency:');
  console.log(getBalances.sodCombinedBalances[1].currency);
  console.log('sodCombinedBalances[USD].cash');
  console.log(getBalances.sodCombinedBalances[1].cash);
  console.log('sodCombinedBalancs[USD].marketValue');
  console.log(getBalances.sodCombinedBalances[1].marketValue);
  console.log('sodCombinedBalances[USD].totalEquity');
  console.log(getBalances.sodCombinedBalances[1].totalEquity);
  console.log('sodCombinedBalances[USD].buyingPower');
  console.log(getBalances.sodCombinedBalances[1].buyingPower);
  console.log('sodCombinedBalancs[USD].maintenanceExcess');
  console.log(getBalances.sodCombinedBalances[1].maintenanceExcess);
  console.log('sodCombinedBalances[USD].isRealTime');
  console.log(getBalances.sodCombinedBalances[1].isRealTime);
  return getBalances;
}
