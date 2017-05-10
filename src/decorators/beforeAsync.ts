import { BeforeResult, isBeforeReturnNewResult } from './before';
import aopGenerator from '../utils/aopGenerator';
import { decorateTarget, DECORATE_TARGET } from '../utils/decorateTarget';
import setPrototypeOf from '../utils/setPrototypeOf';

export function BeforeAsync(beforeRun: (self: any, ...args: any[]) => Promise<void | BeforeResult>) {
  // tslint:disable-next-line:ban-types
  return function aop_before_decorator<T extends Function>(target: T, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target, descriptor);
    // tslint:disable-next-line:ban-types
    return aopGenerator(target, descriptor!, async function aop_before_async_run(targetFunction: Function, self: any, args: any[]) {
      const aopResult: BeforeResult = await beforeRun.apply(self, [self].concat(args));
      if (aopResult) {
        if (isBeforeReturnNewResult(aopResult)) {
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
