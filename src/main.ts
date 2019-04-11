/** @format */
import { questrade, QuestradeClass } from '.';

let qt: Promise<QuestradeClass>;
const seed = 'ZzzCWOrTwAiOssxp3pZE6Ug9mbmikgDg0';

try {
  qt = questrade(seed, (qtObj: QuestradeClass) => {
    qtObj.search('aapl').then((data: any) => {
      console.log(data);
    });
  });
} catch (error) {
  console.log(error);
}
export { qt };
