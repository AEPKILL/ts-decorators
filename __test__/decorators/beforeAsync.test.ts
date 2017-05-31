import { deferred } from 'deferred-factory';
import BeforeAsync from '../../src/decorators/beforeAsync';

// tslint:disable:max-classes-per-file

class Test {
  public name: string;
  public constructor(name: string = 'test') {
    this.name = name;
  }
}

function sleep(time: number) {
  const defer = deferred<undefined>();
  setTimeout(() => {
    defer.resolve();
  }, time);
  return defer.promise;
}

describe('decorators/beforeAsync', () => {
  test('beforeAsync', async () => {
    const Temp = BeforeAsync(async () => {
      await sleep(2000);
      return {
        result: {
          name: 'aepkill'
        }
      };
    })(Test);
    const t = await new Temp();
    expect(t.name).toEqual('aepkill');
    expect(t instanceof Temp).toEqual(true);
  });
});

// tslint:enable:max-classes-per-file
