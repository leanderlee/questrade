/** @format */

import assert from 'assert';
import { QuestradeClass } from '../QuestradeClass/class';

describe('API', () => {
  it('sets the key as an option or as a string', async (done: any) => {
    const qt = new QuestradeClass('abc');
    assert.equal(qt.seedToken, 'abc');
    await qt.removeAllListeners();
    done();
  });
  it('sets the key as an option or as a string', async (done: any) => {
    const qt = new QuestradeClass({ seedToken: 'abc' });
    assert.equal(qt.seedToken, 'abc');
    await qt.removeAllListeners();
    done();
  });
  it('throws error if there is no key', async (done: any) => {
    assert.throws(() => {
      return new QuestradeClass();
    });
    done();
  });
});
