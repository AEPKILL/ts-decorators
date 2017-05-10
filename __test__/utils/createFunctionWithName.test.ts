import createFunctionWithName from '../../src/utils/createFunctionWithName';
function fuck(this: any) {
  return this;
}

const data = {
  name: 'aepkill'
};

describe('utils/createFunctionWithName', () => {
  test('createFunctionWithName', () => {
    const fuck2 = createFunctionWithName('fuck2', fuck);
    expect(fuck2.name).toBe('fuck2');
    expect(fuck()).toBe(fuck2());
    expect(fuck.call(data)).toBe(fuck2.call(data));
  });
});
