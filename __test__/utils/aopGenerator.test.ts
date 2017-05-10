import aopGenerator from '../../src/utils/aopGenerator';

const sym = Symbol();

class Fuck {
  public fuckThis: string;
  public static Fuck() {
    return 'fuck';
  }
  [sym]() {
    return 'symbol';
  }
  public constructor(name = 'fuck off') {
    this.fuckThis = name;
  }
}

// tslint:disable-next-line:ban-types
function aop(targetFunction: Function, self: any, args: any[]) {
  return targetFunction.apply(self, args);
}

describe('utils/aopGenerator', () => {
  test('aopGenerator', () => {
    // tslint:disable-next-line:ban-types
    const temp = aopGenerator(Fuck, {}, aop) as Function;
    expect(temp.prototype).toEqual(Fuck.prototype);
    expect(temp.name).toEqual(Fuck.name);
    expect(new (temp as any)().fuckThis).toEqual('fuck off');
    expect((temp as any).Fuck).toEqual(Fuck.Fuck);
  });

  test('aopGenerator symbol', () => {
    // tslint:disable-next-line:ban-types
    const temp = aopGenerator(Fuck, {}, aop) as typeof Fuck;
    expect((temp.prototype as any)[sym]).toEqual((Fuck.prototype as any)[sym]);
  });
});
