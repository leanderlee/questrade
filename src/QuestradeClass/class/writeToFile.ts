/** @format */

import { write, writeFileSync } from 'fs';
const refreshToken = 'QpzUOwBpsGHjd_CTJuriaQBnRBCgoN1_0';
const keyFile = '';
const keyDir = './key';
const seedToken = refreshToken;
const token = {
  access_token: 'C3lTUKuNQrAAmSD/TPjuV/HI7aNrAwDp',
  token_type: 'Bearer',
  expires_in: 300,
  refresh_token: 'aSBe7wAAdx88QTbwut0tiu3SYic3ox8F',
  api_server: 'https:// api01.iq.questrade.com',
};
export const writeParams = () => {
  writeFileSync(getKeyFile(), refreshToken, 'utf8');
  return refreshToken;
};

const getKeyFile = () => {
  return keyFile || `${keyDir}/${seedToken}`;
};

export { write, token };
