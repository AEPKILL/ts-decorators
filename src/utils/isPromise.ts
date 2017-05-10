import isObject = require('lodash/isObject');
import isFunction = require('lodash/isFunction');

export function isPromise(val: any): val is Promise<any> {
  if (isObject(val)) {
    if (Promise) {
      return val instanceof Promise;
    }
    return isFunction(val.then) && isFunction(val.catch);
  }
  return false;
}

export default isPromise;
