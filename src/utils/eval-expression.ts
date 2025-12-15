import { isArray } from "lodash-es";

export const evalExp = (obj: any, path: string): any | null => {
  if (!obj || typeof path !== "string") {
    console.warn("Invalid input: obj is null/undefined or path is not a string.");
    return null;
  }

  // Convert  indices to dot notation and split
  const pathArray = path.replace(/\[(\w+)\]/g, ".$1").split(".");

  // traverse the pathArray and check if the key exists or not
  const item = pathArray.slice(1, pathArray.length).reduce((accumulator, currentKey) => {
    if (!accumulator) {
      return null;
    }
    if (isArray(accumulator)) {
      return accumulator[parseInt(currentKey)];
    } else if (typeof accumulator === "object") {
      return accumulator[currentKey];
    }
    return accumulator;
  }, obj);
  return item;
};
