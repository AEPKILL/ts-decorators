import Before from '../../src/decorators/before';

// tslint:disable:max-classes-per-file

describe('decorators/before', () => {

  test('参与执行', () => {
    let aepkill = 'aepkill';
    @Before(() => {
      aepkill = 'aepkill2';
    })
    class Test {
      public name: string;
      public constructor(name = 'test') {
        this.name = name;
      }
    }
    // tslint:disable-next-line:no-unused-expression
    new Test();
    expect(aepkill).toEqual('aepkill2');
  });

  test('中断执行', () => {
    class ThrowClass {
      public constructor() {
        throw new Error();
      }
    }

    @Before(() => ({ result: { name: 'aepkill' } }))
    class NoThrowClass extends ThrowClass {
      public name: string;
      public getName() {
        return this.name;
      }
    }

    expect(ThrowClass).toThrow();
    expect(new NoThrowClass().name).toBe('aepkill');
    expect(new NoThrowClass().getName()).toBe('aepkill');
  });

  test('修改参数', () => {
    @Before(() => ({ args: ['fuck you'] }))
    class Test {
      public name: string;
      public constructor(name = 'test') {
        this.name = name;
      }
    }
    expect(new Test().name).toEqual('fuck you');
  });
});

// tslint:enable:max-classes-per-file
