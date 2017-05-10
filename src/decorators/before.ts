import aopGenerator from '../utils/aopGenerator';
import decorateTarget from '../utils/decorateTarget';
import { DECORATE_TARGET } from '../utils/decorateTarget';
import { setPrototypeOf } from '../utils/setPrototypeOf';
import { AopResult, isAopReturnNewResult } from './utils/aopResult';
import isObject = require('lodash/isObject');

// tslint:disable:ban-types

/**
 * 在 构造函数 / 方法前执行一个函数
 *
 * @export
 * @param {(self: any, ...args: any[]) => BeforeResult} beforeRun
 * @returns
 */
export function Before(beforeRun: (self: any, ...args: any[]) => void | AopResult) {
  return function aop_before_decorator<T extends object>(target: T | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target as Function, descriptor);
    return aopGenerator(target as Function, descriptor!, function aop_before_run(targetFunction: Function, self: any, args: any[]) {
      const aopResult: AopResult = beforeRun.apply(self, [self].concat(args));
      if (aopResult) {
        if (isAopReturnNewResult(aopResult)) {
          // 处理返回对象的继承关系
          if (targetType === DECORATE_TARGET.CLASS && aopResult.result && isObject(aopResult.result)) {
            setPrototypeOf(aopResult.result, targetFunction.prototype);
          }
          return aopResult.result;
        } else if (aopResult.args !== undefined) {
          return targetFunction.apply(self, aopResult.args);
        }
      }
      return targetFunction.apply(self, args);
    }) as T;
  };
}

export default Before;

// tslint:enable:ban-types
