/** @format */
import { QuestradeClass, QuestradeHelperFunction } from '../';
import { allOfGetAccounts } from './main/allOfGetAccounts';
import { allOfGetActivities } from './main/allOfGetActivities';
import { allOfgetBalances } from './main/allOfgetBalances';
import { allOfGetEquitySymbols } from './main/allOfGetEquitySymbols';
import { allOfGetExecutions } from './main/allOfGetExecutions';
import { allOfgetMarkets } from './main/allOfgetMarkets';
import { allOfGetOrder } from './main/allOfGetOrder';
import { allOfGetOrders } from './main/allOfGetOrders';
import { allOfGetPositions } from './main/allOfGetPositions';
import { allOfgetServerTimeObject } from './main/allOfgetServerTimeObject';
const seedToken = 'U45gzxijTrHbVrKmDNujvwMsOS4AlsTU0';
// export const main = async (seedToken: string) => {
describe('validating each thing', () => {
  it('validate stuff', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await console.log('seedToken:', qt.seedToken);
      await console.log('keyFile:', qt.keyFile);
      await console.log('getServerTime:', await qt.getServerTime);
      await console.log(
        'qt.getPrimaryAccountNumber():',
        await qt.getPrimaryAccountNumber()
      );
      done();
    });
  });
  it('get allOfgetServerTimeObject', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfgetServerTimeObject(qt, done);
    });
    done();
  });
  it('get allOfGetAccounts', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetAccounts(qt, done);
    });
    done();
  });
  it('get allOfGetPositions', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetPositions(qt, done);
    });
    done();
  });
  it('get allOfgetBalances', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfgetBalances(qt, done);
    });
    done();
  });
  it('get allOfGetExecutions', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetExecutions(qt, done);
    });
    done();
  });
  it('get allOfGetActivities', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetActivities(qt, done);
    });
    done();
  });
  it('get allOfGetOrder', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetOrder(qt, done);
    });
    done();
  });
  it('get allOfGetOrders', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetOrders(qt, done);
    });
    done();
  });
  it('get allOfgetMarkets', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfgetMarkets(qt, done);
    });
    done();
  });
  it('get allOfGetEquitySymbols', async (done: any) => {
    QuestradeHelperFunction({ seedToken }, async (qt: QuestradeClass) => {
      await allOfGetEquitySymbols(qt, done);
    });
    done();
  });
});
