/*
 * static extend
 *
 * --- AEPKILL Created on 7:31:04 AM Mon May 08 2017 ---
 * --- a@aepkill.com ---
 */

import setPrototypeOf from './setPrototypeOf';
import isFunction = require('lodash/isFunction');
import isObject = require('lodash/isObject');

/**
 * 将一个对象放置到另一个对象的原型链上
 *
 * @export
 * @template C
 * @template object
 * @template P
 * @template object
 * @param {C} obj
 * @param {P} parent
 * @returns {(C & P)}
 */
export function staticExtend<C extends object = object, P extends object = object>(obj: C, parent: P): C & P {
  if (obj == null || (!isFunction(obj) && !isObject(obj))) {
    throw new TypeError(`staticExtends called on null or undefined or not a function or not a object`);
  }
  setPrototypeOf(obj, parent);
  return obj as any;
}

export default staticExtend;
