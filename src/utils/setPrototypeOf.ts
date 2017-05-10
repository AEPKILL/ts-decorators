const supportProto = ({ __proto__: [] }) instanceof Array;

export const setPrototypeOf = Object.setPrototypeOf ||
  (supportProto && function setPrototypeOf(obj: object, parent: object) {
    (obj as any).__proto__ = parent;
  }) ||
  (function setPrototypeOf(obj: object, parent: object) {
    const keys = Object.keys(parent);
    for (const key of keys) {
      (obj as any)[key] = (parent as any)[key];
    }
  });

export default setPrototypeOf;
