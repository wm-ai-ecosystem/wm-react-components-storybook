const isObjectLike = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getComparableKeys = (value: Record<string, unknown>, ignored: Set<string>) =>
  Object.keys(value).filter(key => !ignored.has(key));

export const safeIsEqual = (
  value1: unknown,
  value2: unknown,
  depth: number = 5,
  ignoreKeys: string[] = ["listener"]
): boolean => {
  const ignoredKeys = new Set(ignoreKeys);
  const visited = new WeakMap<object, WeakMap<object, boolean>>();

  const hasVisitedPair = (a: object, b: object) =>
    !!visited.get(a)?.get(b) || !!visited.get(b)?.get(a);

  const markVisitedPair = (a: object, b: object) => {
    if (!visited.has(a)) {
      visited.set(a, new WeakMap<object, boolean>());
    }
    if (!visited.has(b)) {
      visited.set(b, new WeakMap<object, boolean>());
    }
    visited.get(a)!.set(b, true);
    visited.get(b)!.set(a, true);
  };

  const compare = (a: unknown, b: unknown, currentDepth: number): boolean => {
    if (Object.is(a, b)) {
      return true;
    }

    if (currentDepth <= 0) {
      return false;
    }

    if (!isObjectLike(a) || !isObjectLike(b)) {
      return false;
    }

    if (hasVisitedPair(a, b)) {
      return true;
    }
    markVisitedPair(a, b);

    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray || bIsArray) {
      if (!(aIsArray && bIsArray)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i += 1) {
        if (!compare(a[i], b[i], currentDepth - 1)) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }

    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      for (const [key, val] of a.entries()) {
        if (!b.has(key)) {
          return false;
        }
        if (!compare(val, b.get(key), currentDepth - 1)) {
          return false;
        }
      }
      return true;
    }

    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      for (const val of a.values()) {
        if (![...b].some(item => compare(val, item, currentDepth - 1))) {
          return false;
        }
      }
      return true;
    }

    const keysA = getComparableKeys(a, ignoredKeys);
    const keysB = getComparableKeys(b, ignoredKeys);
    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (
        !compare(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          currentDepth - 1
        )
      ) {
        return false;
      }
    }

    return true;
  };

  return compare(value1, value2, Math.max(0, depth));
};
