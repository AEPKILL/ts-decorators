// tslint:disable:ban-types

import aopGenerator from '../utils/aopGenerator';
import setPrototypeOf from '../utils/setPrototypeOf';
import decorateTarget from '../utils/decorateTarget';
import { DECORATE_TARGET } from '../utils/decorateTarget';
import { isAopReturnNewResult } from './utils/aopResult';
import isObject = require('lodash/isObject');

export function WhenError(whenErrorRun: (self: any, error: Error, ...args: any[]) => (void | { result: any })) {
  return function aop_when_error_decorator<T extends object>(target: T | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target as Function, descriptor);
    return aopGenerator(target as Function, descriptor!, function aop_before_run(targetFunction: Function, self: any, args: any[]) {
      try {
        return targetFunction.apply(self, args);
      } catch (e) {
        const aopResult = whenErrorRun.apply(self, [self, e].concat(args));
        if (isAopReturnNewResult(aopResult)) {
          if (targetType === DECORATE_TARGET.CLASS && aopResult.result && isObject(aopResult.result)) {
            setPrototypeOf(aopResult.result, targetFunction.prototype);
          }
          return aopResult.result;
        }
      }
    }) as T;
  };
}

export default WhenError;

// tslint:enable:ban-types
