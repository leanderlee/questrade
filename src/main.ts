/** @format */
import { questrade, QuestradeClass } from '.';

const seedToken = 'qmlxoVqRa2rAtJ13YSOi2QDHNJSTF5gn0';

try {
  questrade({ seedToken }, async (qtObj: QuestradeClass) => {
    const data = await qtObj.searchSymbol('aapl');
    console.log(data.symbolId);
  });
} catch (error) {
  console.log(error);
}
