import isPromise from '../../src/utils/isPromise';

describe('test utils/isPromise', () => {
  const promise = Promise.resolve();

  test('isPromise', () => {
    expect(isPromise(promise)).toBe(true);
  });

  test('is not Promise', () => {
    expect(isPromise({})).toBe(false);
  });

  test('is not Promise', () => {
    expect(isPromise(null)).toBe(false);
  });

});
