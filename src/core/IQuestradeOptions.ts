/** @format */

export interface IQuestradeOptions {
  test?: boolean;
  keyDir?: string;
  apiVersion?: string;
  keyFile?: string;
  seedToken?: seedToken;
  account?: string | number;
}

type seedToken = string;

type keyFile = string;

export type QuestradeOptions = IQuestradeOptions | seedToken | keyFile;
