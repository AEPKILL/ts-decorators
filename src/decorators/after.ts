// tslint:disable:ban-types

import { AopResult, isAopReturnNewResult } from './utils/aopResult';
import decorateTarget from '../utils/decorateTarget';
import aopGenerator from '../utils/aopGenerator';
import { DECORATE_TARGET } from '../utils/decorateTarget';
import setPrototypeOf from '../utils/setPrototypeOf';
import isPromise from '../utils/isPromise';
import isObject = require('lodash/isObject');
import isFunction = require('lodash/isFunction');

export function After(afterRun: (self: any, result: any, ...args: any[]) => void | AopResult, { warn = true }) {
  return function aop_before_decorator<T extends object>(target: T | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target as Function, descriptor);
    return aopGenerator(target as Function, descriptor!, function aop_before_run(targetFunction: Function, self: any, args: any[]) {
      const result = targetFunction.apply(self, args);

      // 执行警告
      if (warn && isPromise(result)) {
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
        console.warn(
          `%cWARING:
  After装饰器适合用来装饰同步方法
  但%c${targetNameString}%c看起来像是一个异步方法
  异步方法应该使用AfterAsync装饰
  如果你确信你的操作无误，使用 {warn: false} 作为 After 第二个参数禁用该警告。`, 'color:black', 'color: red;padding:0 20px;font-size:1.2em;', 'color:black'
        );
      }

      const aopResult = afterRun.apply(self, [self, result].concat(args));

      if (aopResult) {
        if (isAopReturnNewResult(aopResult)) {
          if (targetType === DECORATE_TARGET.CLASS && aopResult.result && isObject(aopResult.result)) {
            setPrototypeOf(aopResult.result, targetFunction.prototype);
          }
          return aopResult.result;
        }
      }
      return result;
    }) as T;
  };
}

export default After;

// tslint:enable:ban-types
