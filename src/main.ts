/** @format */
import { QuestradeClass } from '.';

try {
  const q = new QuestradeClass('QpzUOwBpsGHjd_CTJuriaQBnRBCgoN1_0');
  q.search('aapl', null)
    .then(value => console.log(value))
    .catch(err => console.log('err', err));
} catch (error) {
  console.log(error);
}
