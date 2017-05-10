import isArray = require('lodash/isArray');

export interface IAopNewResult {
  result: object;
}

export interface IAopNewArgs {
  args: any[];
}

export type AopResult = undefined | IAopNewResult | IAopNewArgs;

export function isAopReturnNewResult(val: AopResult): val is IAopNewResult {
  return (val as IAopNewResult).result !== undefined;
}

export function isAopReturnNewArgs(val: AopResult): val is IAopNewArgs {
  return isArray((val as IAopNewArgs).args);
}
