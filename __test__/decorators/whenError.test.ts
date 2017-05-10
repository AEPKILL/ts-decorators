import WhenError from '../../src/decorators/whenError';
// tslint:disable:max-classes-per-file

class Test {
  public name: string;
  public constructor(name: string = 'test') {
    this.name = name;
  }
}

class TestThrow extends Test {
  public getName() {
    return this.name;
  }
  public constructor() {
    super();
    throw new Error();
  }
}

describe('decorators/whenError', () => {
  test('未发生异常不应该参与执行', () => {
    let run = false;
    const Temp = WhenError(() => {
      run = true;
    })(Test);
    // tslint:disable-next-line:no-unused-expression
    new Temp();
    expect(run).toEqual(false);
  });

  test('发生异常应该参与执行', () => {
    expect(TestThrow).toThrow();
    let run = false;
    const Temp = WhenError(() => {
      run = true;
    })(TestThrow);
    // tslint:disable-next-line:no-unused-expression
    new Temp();
    expect(run).toEqual(true);
  });

  test('发生异常返回一个正常正常的对象', () => {
    expect(TestThrow).toThrow();
    const Temp = WhenError(() => ({
      result: {
        name: 'aepkill'
      }
    }))(TestThrow);
    const obj = new Temp();
    expect(obj.getName()).toEqual('aepkill');
  });

});

// tslint:enable:max-classes-per-file
