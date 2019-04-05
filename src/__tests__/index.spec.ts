/** @format */

import assert from 'assert';
import { QuestradeClass } from '../QuestradeClass/class';

describe('API', () => {
  it('throws error if there is no key', () => {
    assert.throws(() => {
      return new QuestradeClass();
    });
  });

  it('sets the key as an option or as a string', () => {
    const qt1 = new QuestradeClass('abc');
    assert.equal(qt1.seedToken, 'abc');
    const qt2 = new QuestradeClass({ seedToken: 'abc' });
    assert.equal(qt2.seedToken, 'abc');
  });
});
