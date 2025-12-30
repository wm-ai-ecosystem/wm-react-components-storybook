export const sanitizeInputValue = (value: any): string => {
  return value === null || value === undefined
    ? ""
    : typeof value === "object" || Array.isArray(value)
      ? ""
      : String(value) === "[object Object]" || String(value).startsWith("[object ")
        ? ""
        : String(value);
};
