/** @format */
import { questrade } from '.';
import { QuestradeClass } from './QuestradeClass';
let qt: any;
try {
  // const q = new QuestradeClass('N7lnrE-hAJKUYdCgB--TCk0pz_VeR8LN0');
  // q.search('aapl', null)
  //   .then(value => {
  //     return console.log('in main:', value);
  //   })
  //   .catch(err => console.log(' ERROR in main:', err));
  qt = questrade(
    'N7lnrE-hAJKUYdCgB--TCk0pz_VeR8LN0',
    (qtObj: QuestradeClass) => {
      qtObj.search('aapl').then((data: any) => {
        console.log(data);
      });
    }
  );
} catch (error) {
  console.log(error);
}
export { qt };
