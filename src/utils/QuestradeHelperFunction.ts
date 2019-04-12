/** @format */

import { IQuestradeAPIOptions, QuestradeClass } from '../core/types';

export async function QuestradeHelperFunction(
  opts: IQuestradeAPIOptions,
  cb?: any
) {
  const qt = await new QuestradeClass(opts);
  qt.on('ready', () => {
    if (typeof cb === 'function') {
      cb(qt);
    }
  });
  return qt;
}
