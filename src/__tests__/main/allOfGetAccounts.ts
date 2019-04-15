/** @format */

import { QuestradeClass } from '../../core/types';

export async function allOfGetAccounts(qt: QuestradeClass, done: any) {
  const getAccounts = await qt.getAccounts();
  const account = getAccounts[0];
  await console.log('\n\n\n\nCLIENTACCOUNTTYPE (for each):');
  await console.log('\n\nclientAccountType:');
  await console.dir(account.clientAccountType);
  await console.log('isBilling:');
  await console.dir(account.isBilling);
  await console.log('isPrimary:');
  await console.dir(account.isPrimary);
  await console.log('number:');
  await console.dir(account.number);
  await console.log('status:');
  await console.dir(account.status);
  await console.log('type:');
  await console.dir(account.type);

  done();
}
