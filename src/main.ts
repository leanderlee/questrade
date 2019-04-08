/** @format */
import { QuestradeClass } from '.';

try {
  const q = new QuestradeClass('AATHoMFONVWl6OnNB4SVgwM8t2M-5vhU0');
  q.search('aapl', null)
    .then(value => console.log(value))
    .catch(err => console.log('err', err));
} catch (error) {
  console.log(error);
}
