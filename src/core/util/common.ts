import { isArray, isString } from "lodash-es";

const _deepCopy = (o1: any, ...o2: any) => {
  o2.forEach((o: any) => {
    if (o) {
      Object.keys(o).forEach(k => {
        const v = o[k];
        if (v && !isString(v) && !isArray(v) && typeof v === "object") {
          o1[k] = _deepCopy(o1[k] || {}, o[k]);
        } else {
          o1[k] = _deepCopy(v);
        }
      });
    }
  });
  return o1;
};

export const deepCopy = (...objects: any) => _deepCopy({}, ...objects);
