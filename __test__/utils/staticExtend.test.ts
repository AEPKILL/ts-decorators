import staticExtend from '../../src/utils/staticExtend';

const parent = {
  name: 'aepkill'
};

const child: { name?: string, age?: number } = {
  age: 20
};

class A {
  public name: string;
  public static test() {
    return 'testA';
  }
  public static test2() {
    return 'test2A';
  }
  public test3() {
    return 'test3A';
  }
  constructor(name = 'a class') {
    this.name = name;
  }
}

// tslint:disable-next-line:max-classes-per-file
class B {
  public name: string;
  public static test() {
    return 'testB';
  }
  constructor(name = 'b class') {
    this.name = name;
  }
}

describe('test utils/staticExtend', () => {
  test('normal object', () => {
    expect(child.name).toBe(undefined);
    staticExtend(child, parent);
    expect(child.name).toBe(parent.name);
  });
  test('class', () => {
    let a = new A();
    let b = new B();
    expect(A.test()).toBe('testA');
    expect(B.test()).toBe('testB');
    expect((B as any).test2).toBe(undefined);
    staticExtend(B, A);
    expect((B as any).test2).toBe(A.test2);
    expect((b as any).test3).toBe(undefined);
    staticExtend(B.prototype, A.prototype);
    a = new A();
    b = new B();
    expect((b as any).test3).toBe(a.test3);
  });
});
