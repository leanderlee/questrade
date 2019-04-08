/** @format */

import { read, readFileSync } from 'fs';
import { sync } from 'mkdirp';
import { dirname } from 'path';

export const readParams = (
  rkeyFile: string,
  rkeyDir: string,
  getKeyFile: any,
  rrefreshToken: any,
  rseedToken: any,
  rsaveKey: any
) => {
  // _loadKey
  // !!!

  if (rkeyFile) {
    sync(dirname(rkeyFile)); // Synchronously create a new directory
  } else {
    sync(rkeyDir);
  }

  let refreshToken: any = readFileSync(getKeyFile(), 'utf8');
  if (!refreshToken) {
    refreshToken = rseedToken;
    rsaveKey();
  }
  refreshToken = refreshToken;
  //   return refreshToken;
  return {
    rkeyFile,
    rkeyDir,
    getKeyFile,
    rseedToken,
    rrefreshToken,
    rsaveKey,
  };
};

export { dirname, read, sync };
