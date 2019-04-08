/** @format */

// import * as axios from 'axios';
// import { readFileSync, writeFileSync } from 'fs';
// import { sync } from 'mkdirp';
// import { dirname } from 'path';
// import { ICreds } from './ICreds';

// // Running the Authentification process and emit 'ready' when done
// // function constructor(){
// // !!  self._loadKey(function(err) {
// //     if (err)
// //       return self.emit('error', {
// //         message: 'failed_to_load_key',
// //         details: err,
// //       });
// // !!    self._refreshKey(function(err) {
// //       if (err)
// //         return self.emit('error', {
// //           message: 'failed_to_refresh_key',
// //           details: err,
// //         });
// //       if (self.account) return self.emit('ready');
// // !!      self.setPrimaryAccount(function(err) {
// //         if (err)
// //           return self.emit('error', {
// //             message: 'failed_to_set_account',
// //             details: err,
// //           });
// //         self.emit('ready');
// //       });
// //     });
// //   });
// // }

// // const this._account = '';
// // const this._apiVersion = '';
// // const this._authUrl = 'https://login.questrade.com';
// // const this._keyDir = './keys';
// // const this._keyFile = '';
// // const seedToken = 'FADh7OnO_gBUXkeg3WLhZGKosAac6IbF0';

// // let this._accessToken = '';
// // let this._apiServer = '';
// // let this._apiUrl = '';
// // let this._refreshToken = '';

// /*
// Saves the latest refreshToken in the file name after the seedToken
// Questrade.prototype._saveKey = function(cb) {
//   cb = cb || function() {};
//   var self = this;
//   fs.writeFile(self._getKeyFile(), self.refreshToken, 'utf8', function(err) {
//     if (err)
//       return cb({
//         message: 'failed_to_write',
//         details: err,
//       });
//     cb(null, self.refreshToken);
//   });
// };
// */
// private this._saveKey = async () => {
//   writeFileSync(this._getKeyFile(), this._refreshToken, 'utf8');
//   return this._refreshToken;
// };

// /*
// Gets name of the file where the refreshToken is stored
// Questrade.prototype._getKeyFile = function() {
//   return this.keyFile || this.keyDir + '/' + this.seedToken;
// };

// */
// private this._getKeyFile = () => {
//   return this._keyFile || `${_keyDir}/${seedToken}`;
// };
// /*
// Reads the refreshToken stored in the file (if it exist),
// otherwise uses the seedToken
// Questrade.prototype._loadKey = function(cb) {
//   cb = cb || function() {};
//   var self = this;
//   if (self.keyFile) {
//     mkdirp.sync(path.dirname(self.keyFile));
//     Synchronously create a new directory
//   } else {
//     mkdirp.sync(self.keyDir);
//   }
//   fs.readFile(self._getKeyFile(), 'utf8', function(err, refreshToken) {
//     if (err || !refreshToken) {
//       self.refreshToken = self.seedToken;
//       return self._saveKey(cb);
//     }
//     self.refreshToken = refreshToken;
//     cb(null, refreshToken);
//   });
// };
// */
// private this._loadKey = () => {
//   if (this._keyFile) {
//     sync(dirname(this._keyFile));
//   } else {
//     sync(this._keyDir);
//   }
//   const refreshToken: any = readFileSync(this._getKeyFile(), 'utf8');
//   if (!refreshToken) {
//     this._refreshToken = seedToken;
//     this._saveKey();
//   }
//   this._refreshToken = refreshToken;
//   return refreshToken;
// };
// /*
// Refreshed the tokem (aka Logs in) using the latest RefreshToken
// (or the SeedToken if no previous saved file)
// Questrade.prototype._refreshKey = function(cb) {
//   var self = this;
//   var data = {
//     grant_type: 'refresh_token',
//     refresh_token: self.refreshToken,
//   };
//   request(
//     {
//       method: 'POST',
//       url: self.authUrl + '/oauth2/token',
//       qs: data,
//       data: data,
//     },
//     function(err, http, body) {
//       try {
//         var creds = JSON.parse(body);
//         self.api_server = creds.api_server;
//         self.apiUrl = creds.api_server + self.apiVersion;
//         self.accessToken = creds.access_token;
//         self.refreshToken = creds.refresh_token;
//         self._saveKey();
//         self.emit('refresh', self.refreshToken);
//       } catch (e) {
//         return cb({
//           message: 'login_failed',
//           token: self.refreshToken,
//           details: body,
//         });
//       }
//       cb();
//     }
//   );
// };
// */
// private this._refreshKey = async () => {
//   let response: axios.AxiosResponse = {
//     data: null,
//     status: 0,
//     statusText: '',
//     headers: { Null: null },
//     config: {},
//   };
//   try {
//     const url = `${_authUrl}/oauth2/token`;
//     const params = {
//       grant_type: 'refresh_token',
//       refresh_token: this._refreshToken,
//     };
//     const axiosConfig: axios.AxiosRequestConfig = {
//       method: 'POST',
//       params,
//       url,
//     };
//     response = await axios.default(axiosConfig);

//     const creds: ICreds = response.data;
//     this._apiServer = creds.api_server;
//     console.log('creds.api_server:', creds.api_server);
//     this._apiUrl = `${_apiServer}${_apiVersion}`;
//     this._accessToken = creds.access_token;
//     console.log('creds.access_token:', creds.access_token);
//     this._refreshToken = creds.refresh_token;
//     console.log('creds.refresh_token:', creds.refresh_token);
//     await this._saveKey();
//   } catch (error) {
//     console.log('response:', response);
//     console.error('ERROR:', error.message);
//   }
// };
// /*
// Method that actually mades the GET/POST request to Questrade
// Questrade.prototype._api = function(method, endpoint, params, cb) {
//   cb = cb || function() {};
//   var self = this;
//   if (typeof params === 'function') {
//     cb = params;
//     params = undefined;
//   }
//   var opts = {
//     method: method,
//     url: self.apiUrl + endpoint,
//     auth: {
//       bearer: self.accessToken,
//     },
//   };
//   if (method === 'GET') {
//     opts.qs = params || {};
//     opts.json = true;
//   } else {
//     opts.json = params || true;
//   }
//   request(opts, function(err, http, response) {
//     if (err) {
//       return cb({
//         message: 'api_call_failed',
//         url: self.apiUrl + endpoint,
//         method: method,
//         details: e,
//       });
//     }
//     cb(null, response);
//   });
// };
// */
// private this._api = async (
//   method?: string,
//   endpoint?: string | number,
//   params?: any
// ) => {
//   let computeParams: any = {};
//   if (typeof params !== 'undefined' && typeof params === 'object') {
//     computeParams = params;
//   }
//   computeParams.bearer = this._accessToken;

//   const url: string = this._apiUrl + endpoint;
//   const config: axios.AxiosRequestConfig = {
//     params: computeParams,
//     method,
//     url,
//   };
//   //   if (method === 'GET') {
//   //     opts.params = params || {};
//   //   }
//   return axios.default(config);
// };
// /*
// Method that appends the set account to the API calls so all calls are made
// to that account. Chage self.account to change the account used
// Questrade.prototype._accountApi = function(method, endpoint, params, cb) {
//   if (!this.account)
//     return cb({
//       message: 'no_account_selected',
//     });
//   this._api(method, '/accounts/' + this.account + endpoint, params, cb);
// };
// */
// private this._accountApi = async (
//   method?: any,
//   endpoint?: any,
//   params?: any
// ) => {
//   if (!_account) {
//     throw new Error('no_account_selected');
//   }
//   return this._api(method, `/accounts/${_account}${endpoint}`, params);
// };

// // console.log('_account', this._account);
// // console.log('_apiVersion', this._apiVersion);
// // console.log('_authUrl', this._authUrl);
// // console.log('_keyDir', this._keyDir);
// // console.log('_keyFile', this._keyFile);
// // console.log('seedToken', seedToken);

// // console.log('_getKeyFile():', this._getKeyFile());
// // console.log('_accessToken:', this._accessToken);
// // console.log('_apiServer:', this._apiServer);
// // console.log('_apiUrl:', this._apiUrl);
// // console.log('_refreshToken:', this._refreshToken);
// // console.log('_apiServer:', this._apiServer);

// // console.log('_loadKey:', this._loadKey());
// // console.log('_accessToken:', this._accessToken);
// // console.log('_apiServer:', this._apiServer);
// // console.log('_apiUrl:', this._apiUrl);
// // console.log('_refreshToken:', this._refreshToken);
// // console.log('_apiServer:', this._apiServer);

// // console.log('_refreshKey:', this._refreshKey());
// // console.log('_accessToken:', this._accessToken);
// // console.log('_apiServer:', this._apiServer);
// // console.log('_apiUrl:', this._apiUrl);
// // console.log('_refreshToken:', this._refreshToken);
// // console.log('_apiServer:', this._apiServer);
// // * Gets name of the file where the refreshToken is stored
// // * Reads the refreshToken stored in the file (if it exist)
// // * otherwise uses the seedToken
// // * Synchronously create a new directory
// // * Refreshed the tokem (aka Logs in) using the latest RefreshToken
// // * (or the SeedToken if no previous saved file)
// // *   emit('refresh', this._refreshToken);
// // * Method that actually mades the GET/POST request to Questrade
// // * Method that appends the set account to the API calls so all calls
// // * are made to that account. Chage account to change the account used
