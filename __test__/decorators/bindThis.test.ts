import BindThis from '../../src/decorators/bindThis';

// tslint:disable:max-classes-per-file
class Test {
  public name = 'test';
  public static Fuck() {
    return 'fuck';
  }
  public test() {
    return this.name;
  }
  public test2() {
    return this.name;
  }
  public test3() {
    return this.name;
  }
  get myName() {
    return this.name.toString();
  }
}

class Test2 extends Test {}

describe('decorators/bindThis', () => {
  test('bind this(static extends)', () => {
    const Temp = BindThis()(Test);
    expect(Temp.Fuck).toEqual(Test.Fuck);
  });

  test('bind this', () => {
    const Temp = BindThis()(Test);
    const obj = new Temp();
    const testMethod = obj.test;
    expect(testMethod()).toEqual('test');
  });

  test('bind this getter', () => {
    const Temp = BindThis()(Test);
    const obj = new Temp();
    expect(obj.name).toEqual(obj.myName);
  });

  test('bind this(继承)', () => {
    const Temp = BindThis()(Test2);
    const obj = new Temp();
    const testMethod = obj.test;
    expect(testMethod()).toEqual('test');
  });

  test('bind this(options: include)', () => {
    const Temp = BindThis({ include: ['test'] })(Test2);
    const obj = new Temp();
    const testMethod = obj.test;
    const test2Method = obj.test2;
    expect(testMethod()).toEqual('test');
    expect(test2Method).toThrowError(/undefined/);
  });

  test('bind this(options: exclude & include)', () => {
    const Temp = BindThis({
      include: ['test', 'test2'],
      exclude: ['test2']
    })(Test2);
    const obj = new Temp();
    const testMethod = obj.test;
    const test2Method = obj.test2;
    expect(testMethod()).toEqual('test');
    expect(test2Method).toThrowError(/undefined/);
  });
});

// tslint:enable:max-classes-per-file
