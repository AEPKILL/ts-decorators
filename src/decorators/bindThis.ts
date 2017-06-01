// tslint:disable:ban-types

import Before from './before';
import createFunctionWithName from '../utils/createFunctionWithName';
import { IAopNewResult } from './utils/aopResult';
import isFunction = require('lodash/isFunction');

export interface IBindThisOptions {
  include?: Array<string | symbol>;
  exclude?: Array<string | symbol>;
  trace?: number;
  execConstructor?: boolean;
}

export function BindThis({ include, exclude, trace = -1, execConstructor = true }: IBindThisOptions = {}) {
  return function bind_this_decorator<T extends object>(classFn: T | Function) {
    const needBinds: Array<string | symbol> = [];
    let prototype = (classFn as Function).prototype;
    while (prototype && trace--) {
      const names = getObjectAllFunctionNames(prototype);
      for (const name of names) {
        // only bind method once
        if (needBinds.indexOf(name) < 0) {
          if (include && include.indexOf(name) < 0) {
            continue;
          }
          if (exclude && exclude.indexOf(name) >= 0) {
            continue;
          }
          needBinds.push(name);
        }
      }
      prototype = isFunction(Object.getPrototypeOf) ? Object.getPrototypeOf(prototype) : (prototype as any).__proto__;
    }
    return Before((self: any) => {
      for (const methodName of needBinds) {
        const method: Function = self[methodName];
        self[methodName] = isFunction(method.bind) ? method.bind(self) : createFunctionWithName(method.name, function bind_this() {
          method.apply(self, [].slice.call(arguments));
        });
      }
      /**
       * 不执行构造函数 可以把 BindThis 当做一个工具方法来用
       *
       * @example
       * BindThis()(target)(this);
       */
      if (!execConstructor) {
        return {
          result: null
        } as IAopNewResult;
      }
      return;
    })(classFn);
  };
}

export default BindThis;

function getObjectAllFunctionNames(obj: any): Array<string | symbol> {
  let functions: Array<string | symbol> = Object.getOwnPropertyNames(obj);
  functions = functions.concat(isFunction(Object.getOwnPropertySymbols) ? Object.getOwnPropertySymbols(obj) : []);
  return functions.filter(key => isFunction(obj[key]));
}

// tslint:enable:ban-types
