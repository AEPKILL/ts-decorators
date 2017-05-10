import aopGenerator from '../utils/aopGenerator';
import { decorateTarget, DECORATE_TARGET } from '../utils/decorateTarget';
import setPrototypeOf from '../utils/setPrototypeOf';
import { AopResult, isAopReturnNewResult } from './utils/aopResult';

// tslint:disable:ban-types

export function BeforeAsync(beforeRun: (self: any, ...args: any[]) => Promise<void | AopResult>) {
  return function aop_before_decorator<T extends object>(target: T | Function, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target as Function, descriptor);
    return aopGenerator(target as Function, descriptor!, async function aop_before_async_run(targetFunction: Function, self: any, args: any[]) {
      const aopResult: AopResult = await beforeRun.apply(self, [self].concat(args));
      if (aopResult) {
        if (isAopReturnNewResult(aopResult)) {
          if (targetType === DECORATE_TARGET.CLASS) {
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

export default BeforeAsync;

// tslint:enable:ban-types
