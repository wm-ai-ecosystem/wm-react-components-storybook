import isEqual from "lodash-es/isEqual";

export default function compare<T extends Record<string, unknown>>(
  prev: T | undefined | null,
  next: T | undefined | null
): boolean {
  // Handle null/undefined cases
  if (prev === next) {
    return true;
  }

  if (!prev || !next) {
    return false;
  }

  const keys = Object.keys(next);

  return keys.every(key => {
    const prevValue = prev[key];
    const nextValue = next[key];

    // If prev doesn't have this key but next does, they're different
    if (!(key in prev) && nextValue !== undefined) {
      return false;
    }

    // Use isEqual for deep comparison
    return isEqual(prevValue, nextValue);
  });
}
