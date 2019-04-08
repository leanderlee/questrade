/** @format */
import * as axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';
import { sync } from 'mkdirp';
import { dirname } from 'path';
import { ICreds } from './ICreds';

export interface IAxiosRequestConfig {
  url?: string;
  method?: string;
  baseURL?: string;
  transformRequest?: axios.AxiosTransformer | axios.AxiosTransformer[];
  transformResponse?: axios.AxiosTransformer | axios.AxiosTransformer[];
  headers?: any;
  params?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  adapter?: axios.AxiosAdapter;
  auth?: axios.AxiosBasicCredentials;
  responseType?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: axios.AxiosProxyConfig | false;
  cancelToken?: axios.CancelToken;
}

const _account = '';
const _apiVersion = '';
const _authUrl = 'https://login.questrade.com';
const _keyDir = './keys';
const _keyFile = '';
const seedToken = 'FADh7OnO_gBUXkeg3WLhZGKosAac6IbF0';

let _accessToken = '';
let _apiServer = '';
let _apiUrl = '';
let _refreshToken = '';

export const _saveKey = async () => {
  writeFileSync(_getKeyFile(), _refreshToken, 'utf8');
  return _refreshToken;
};

export const _getKeyFile = () => {
  return _keyFile || `${_keyDir}/${seedToken}`;
};

export const _loadKey = () => {
  if (_keyFile) {
    sync(dirname(_keyFile));
  } else {
    sync(_keyDir);
  }
  const refreshToken: any = readFileSync(_getKeyFile(), 'utf8');
  if (!refreshToken) {
    _refreshToken = seedToken;
    _saveKey();
  }
  _refreshToken = refreshToken;
  return refreshToken;
};

export const _refreshKey = async () => {
  let response: axios.AxiosResponse = {
    data: null,
    status: 0,
    statusText: '',
    headers: { Null: null },
    config: {},
  };
  try {
    const url = `${_authUrl}/oauth2/token`;
    const params = {
      grant_type: 'refresh_token',
      refresh_token: _refreshToken,
    };
    const axiosConfig: axios.AxiosRequestConfig = {
      method: 'POST',
      params,
      url,
    };
    response = await axios.default(axiosConfig);

    const creds: ICreds = response.data;
    _apiServer = creds.api_server;
    _apiUrl = `${_apiServer}${_apiVersion}`;
    _accessToken = creds.access_token;
    _refreshToken = creds.refresh_token;
    await _saveKey();
  } catch (error) {
    console.log('response:', response);
    console.error('ERROR:', error.message);
  }
};

export const _api = async (
  method?: string,
  endpoint?: string | number,
  params?: any
) => {
  let computeParams: any = {};
  if (typeof params !== 'undefined' && typeof params === 'object') {
    computeParams = params;
  }
  computeParams.bearer = _accessToken;

  const url: string = _apiUrl + endpoint;
  const config: axios.AxiosRequestConfig = {
    params: computeParams,
    method,
    url,
  };
  //   if (method === 'GET') {
  //     opts.params = params || {};
  //   }
  return axios.default(config);
};

export const _accountApi = async (
  method?: any,
  endpoint?: any,
  params?: any
) => {
  if (!_account) {
    throw new Error('no_account_selected');
  }
  return _api(method, `/accounts/${_account}${endpoint}`, params);
};

console.log('_account', _account);
console.log('_apiVersion', _apiVersion);
console.log('_authUrl', _authUrl);
console.log('_keyDir', _keyDir);
console.log('_keyFile', _keyFile);
console.log('seedToken', seedToken);

console.log('_getKeyFile():', _getKeyFile());
console.log('_accessToken:', _accessToken);
console.log('_apiServer:', _apiServer);
console.log('_apiUrl:', _apiUrl);
console.log('_refreshToken:', _refreshToken);
console.log('_apiServer:', _apiServer);

console.log('_loadKey:', _loadKey());
console.log('_accessToken:', _accessToken);
console.log('_apiServer:', _apiServer);
console.log('_apiUrl:', _apiUrl);
console.log('_refreshToken:', _refreshToken);
console.log('_apiServer:', _apiServer);

console.log('_refreshKey:', _refreshKey());
console.log('_accessToken:', _accessToken);
console.log('_apiServer:', _apiServer);
console.log('_apiUrl:', _apiUrl);
console.log('_refreshToken:', _refreshToken);
console.log('_apiServer:', _apiServer);
// Gets name of the file where the refreshToken is stored
// Reads the refreshToken stored in the file (if it exist)
// otherwise uses the seedToken
// Synchronously create a new directory
// Refreshed the tokem (aka Logs in) using the latest RefreshToken
// (or the SeedToken if no previous saved file)
//   emit('refresh', _refreshToken);
// Method that actually mades the GET/POST request to Questrade
// Method that appends the set account to the API calls so all calls
// are made to that account. Chage account to change the account used
