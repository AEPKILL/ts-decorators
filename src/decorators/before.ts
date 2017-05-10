import aopGenerator from '../utils/aopGenerator';
import decorateTarget from '../utils/decorateTarget';
import { DECORATE_TARGET } from '../utils/decorateTarget';
import { setPrototypeOf } from '../utils/setPrototypeOf';

export type BeforeResult = undefined | { result: object } | { args: any[] };

/**
 * 在 构造函数 / 方法前执行一个函数
 *
 * @export
 * @param {(self: any, ...args: any[]) => BeforeResult} beforeRun
 * @returns
 */
export function Before(beforeRun: (self: any, ...args: any[]) => void | BeforeResult) {
  // tslint:disable-next-line:ban-types
  return function aop_before_decorator<T extends Function>(target: T, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): T {
    const targetType = decorateTarget(target, descriptor);
    // tslint:disable-next-line:ban-types
    return aopGenerator(target, descriptor!, function aop_before_run(targetFunction: Function, self: any, args: any[]) {
      const aopResult: BeforeResult = beforeRun.apply(self, [self].concat(args));
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

export function isBeforeReturnNewResult(val: BeforeResult): val is { result: object } {
  return (val as { result: object }).result !== undefined;
}

export default Before;
