const supportProto = { __proto__: [] } instanceof Array;

export const setPrototypeOf =
  Object.setPrototypeOf ||
  (supportProto &&
    // tslint:disable-next-line:no-shadowed-variable
    function setPrototypeOf(obj: object, parent: object) {
      (obj as any).__proto__ = parent;
    }) ||
  // tslint:disable-next-line:no-shadowed-variable
  function setPrototypeOf(obj: object, parent: object) {
    const keys = Object.keys(parent);
    for (const key of keys) {
      (obj as any)[key] = (parent as any)[key];
    }
  };

export default setPrototypeOf;
