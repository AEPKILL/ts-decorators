/**
 * 创建一个指定名称的函数
 *
 * @param {string} name
 * @param {Function} fn
 * @returns {Function}
 */
// tslint:disable-next-line:ban-types
export function createFunctionWithName(name: string, fn: Function): Function {
  /**
   * 创建的函数需要指定严格模式，否则当this为null时默认指向window对象
   * eg:
   *  function xx(){ console.log(this) }
   * 严格模式下： xx.call(null) // 输出: null
   * 非严格模式下: xx.call(null) // 输出: window
   */
  return Function('fn', `return (
    function ${name}(){
      'use strict';
      return fn.apply(this, arguments);
    }
  );`)(fn);
}

export default createFunctionWithName;
