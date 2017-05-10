import Before from './before';
import createFunctionWithName from '../utils/createFunctionWithName';
import isFunction = require('lodash/isFunction');

export interface IBindThisOptions {
  include?: Array<string | symbol>;
  exclude?: Array<string | symbol>;
}

export function BindThis({ include, exclude }: IBindThisOptions = {}) {
  // tslint:disable-next-line:ban-types
  return function bind_this_decorate<T extends Function>(classFn: T) {
    const needBinds: Array<string | symbol> = [];
    let prototype = classFn.prototype;
    while (prototype) {
      const names = getObjectAllFunctionNames(prototype);
      for (const name of names) {
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
      prototype = Object.getPrototypeOf ? Object.getPrototypeOf(prototype) : (prototype as any).__proto__;
    }
    return Before((self: any) => {
      for (const methodName of needBinds) {
        // tslint:disable-next-line:ban-types
        const method: Function = self[methodName];
        self[methodName] = isFunction(method.bind) ? method.bind(self) : createFunctionWithName(method.name, function bind_this() {
          method.apply(self, [].slice.call(arguments));
        });
      }
    })(classFn);
  };
}

export default BindThis;

function getObjectAllFunctionNames(obj: any): Array<string | symbol> {
  const functions: Array<string | symbol> = Object.getOwnPropertyNames(obj);
  functions.concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(obj) : []);
  return functions.filter(key => isFunction(obj[key]));
}
