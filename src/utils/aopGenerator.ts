/*
 * AOP 装饰器 生成器
 *
 * --- AEPKILL Created on 9:42:04 AM Mon May 08 2017 ---
 * --- a@aepkill.com ---
 */
import isFunction from 'lodash/isFunction';
import staticExtend from './staticExtend';
import createFunctionWithName from './createFunctionWithName';
import decorateTarget from './decorateTarget';
import { DECORATE_TARGET } from './decorateTarget';

// tslint:disable-next-line:ban-types
export function aopGenerator(target: Function, descriptor: PropertyDescriptor, aop: (targetFn: Function, self: any, args: any[]) => any): Function | PropertyDescriptor {
  const targetType = decorateTarget(target, descriptor);
  if (targetType === DECORATE_TARGET.UN_KNOW) {
    throw new Error('can decorate class or function!');
  }
  // tslint:disable-next-line:ban-types
  const targetFunction: Function = targetType === DECORATE_TARGET.CLASS ? target : descriptor.value;
  const wapper = staticExtend(
    createFunctionWithName(
      targetFunction.name,
      function F(this: any, ...args: any[]) {
        return aop(targetFunction, this, args);
      }
    )
    , targetFunction);
  wapper.prototype = target.prototype;
  if (targetType === DECORATE_TARGET.CLASS) {
    return wapper;
  }
  descriptor.value = wapper;
  return descriptor;
}

export default aopGenerator;
