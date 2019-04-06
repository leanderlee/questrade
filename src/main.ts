/** @format */

import { QuestradeClass } from '.';
const q = new QuestradeClass('oCOpAMyzmpyk5v2F9kcmSll6nNJ84kKY0');
q.search('aapl', null)
  .then(value => console.log(value))
  .catch(err => console.log('err', err));
