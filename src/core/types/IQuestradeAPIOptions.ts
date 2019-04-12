/** @format */

export interface IQuestradeAPIOptions {
  test?: boolean;
  keyDir?: string;
  apiVersion?: string;
  keyFile?: string;
  seedToken?: seedToken;
  account?: string | number;
}

type seedToken = string;

type keyFile = string;

export type QuestradeAPIOptions = IQuestradeAPIOptions | seedToken | keyFile;
