import decorateTarget, {
  DECORATE_TARGET
} from '../../src/utils/decorateTarget';

let classArgs: any = null;
let staticMethodArgs: any = null;
let methodArgs: any = null;
let protertyArgs: any = null;

@setClassArgs
class A {
  @setProtertyArgs public name!: string;
  @setStaticMethodArgs
  public static Say() {
    return 'static say';
  }
  @setmethodArgs
  public Say() {
    return 'say';
  }
}

function setClassArgs(...args: any[]) {
  classArgs = arguments;
}

function setStaticMethodArgs(...args: any[]) {
  staticMethodArgs = arguments;
}

function setmethodArgs(...args: any[]) {
  methodArgs = arguments;
}

function setProtertyArgs(...args: any[]) {
  protertyArgs = arguments;
}

describe('test utils/decorateTarget', () => {
  test('descorate target', () => {
    expect(decorateTarget(classArgs[0])).toBe(DECORATE_TARGET.CLASS);
    expect(decorateTarget(staticMethodArgs[0], staticMethodArgs[2])).toBe(
      DECORATE_TARGET.METHOD
    );
    expect(decorateTarget(methodArgs[0], methodArgs[2])).toBe(
      DECORATE_TARGET.METHOD
    );
    expect(decorateTarget(protertyArgs[0], protertyArgs[2])).toBe(
      DECORATE_TARGET.UN_KNOW
    );
  });
});
