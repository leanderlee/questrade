/** @format */

export interface IErrorMessage {
  message: string;
}
export interface IErrorWithMessage {
  data?: any;
  error?: Error;
  message?: string;
}
export type errors = null | string | Error | IErrorMessage | IErrorWithMessage;

export function pfErrors(errorToValidate: errors) {
  let data: any;
  let error: Error;
  let message: any;
  let returnValue: IErrorWithMessage;

  data = errorToValidate;
  data = errorToValidate;
  error = new Error();
  message = 'null';
  returnValue = { message, error, data };

  // errors = null
  if (errorToValidate === null) return returnValue;

  // errors = string
  if (typeof errorToValidate === 'string') {
    return { message: errorToValidate, error, data: null };
  }

  // errors = IErrorMessage
  if (typeof errorToValidate.message !== 'undefined') {
    return { message: errorToValidate.message, error, data: null };
  }
  if (errorToValidate.hasOwnProperty('data')) {
    return { message: errorToValidate.message, error, data: null };
  }

  if (isType<Error>(errorToValidate)) {
    return {
      message: errorToValidate.message,
      error: errorToValidate,
      data: null,
    };
  }
  if (isType<IErrorWithMessage>(errorToValidate)) {
    return {
      message: errorToValidate.message,
      error: errorToValidate.error,
      data: errorToValidate.data,
    };
  }

  return returnValue;
}

function isType<T>(toBeDetermined: errors): toBeDetermined is T {
  if (toBeDetermined as T) {
    return true;
  }
  return false;
}
