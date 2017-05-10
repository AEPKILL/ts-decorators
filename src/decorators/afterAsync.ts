import decorateTarget from '../utils/decorateTarget';
import aopGenerator from '../utils/aopGenerator';
import { AopResult } from './utils/aopResult';
import isPromise from '../utils/isPromise';
import { DECORATE_TARGET } from '../utils/decorateTarget';
import isFunction = require('lodash/isFunction');

// tslint:disable:ban-types

export function AfterAsync(afterAsyncRun: (self: any, result: any, ...args: any[]) => void | AopResult, { warn = true }) {
  return function aop_before_decorator<T extends object>(target: T | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target as Function, descriptor);
    return aopGenerator(target as Function, descriptor!, function aop_before_run(targetFunction: Function, self: any, args: any[]) {
      const promise = targetFunction.apply(self, args);
      if (isPromise(promise)) {
        promise.then(result => {
          afterAsyncRun.apply(self, [self, result].concat(args));
        });
      } else {
        let targetNameString = '[unknow class: unknow method]';
        if (targetType === DECORATE_TARGET.CLASS) {
          targetNameString = `[class ${targetFunction.name}]`;
        } else if (targetType === DECORATE_TARGET.METHOD) {
          if (isFunction(target)) {
            targetNameString = `[class ${target.name} static method: ${targetFunction.name}]`;
          } else {
            targetNameString = `[class ${target.constructor.name} method: ${targetFunction.name}]`;
          }
        }
        throw new TypeError(`AfterAsync装饰器必须装饰一个异步构造函数或方法 , ${targetNameString} 并不是一个异步的构造函数或方法`);
      }
      return promise;
    }) as T;
  };
}

export default AfterAsync;

// tslint:enable:ban-types
