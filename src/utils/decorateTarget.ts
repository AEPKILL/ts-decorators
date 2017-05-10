import isFunction = require('lodash/isFunction');
export enum DECORATE_TARGET {
  UN_KNOW = -1,
  CLASS,
  METHOD
}

// tslint:disable-next-line:ban-types
export function decorateTarget(target: Function, descriptor?: PropertyDescriptor) {
  if (descriptor && isFunction(descriptor.value)) {
    return DECORATE_TARGET.METHOD;
  } else if (isFunction(target)) {
    return DECORATE_TARGET.CLASS;
  }
  return DECORATE_TARGET.UN_KNOW;
}

export default decorateTarget;
