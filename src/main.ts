/** @format */
import { QuestradeClass } from '.';

try {
  const q = new QuestradeClass('Rtegb4qE35wy7PZfgD61C5npp8UAEfya0');
  q.search('aapl', null)
    .then(value => console.log(value))
    .catch(err => console.log('err', err));
} catch (error) {
  console.log(error);
}
