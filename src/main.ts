/** @format */
import { questrade, QuestradeClass } from '.';

let qt: Promise<QuestradeClass>;
const seedToken = 'qmlxoVqRa2rAtJ13YSOi2QDHNJSTF5gn0';

try {
  qt = questrade({ seedToken }, (qtObj: QuestradeClass) => {
    qtObj.searchSymbol('aapl').then((data: any) => {
      console.log(data);
    });
  });
} catch (error) {
  console.log(error);
}
export { qt };
