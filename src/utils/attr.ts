export const removeInvalidAttributes = (
  attributes: Record<string, any>,
  explicitRemoveAttributes?: string[]
) => {
  const filteredAttributes: Record<string, any> = {};
  Object.keys(attributes).forEach(key => {
    if (explicitRemoveAttributes?.includes(key)) {
      return;
    }
    const value = attributes[key];
    if (Array.isArray(value) || (typeof value === "object" && value !== null)) {
      return;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        try {
          const parsed = JSON.parse(value);
          if (typeof parsed === "object" && parsed !== null) {
            return;
          }
        } catch (e) {
          // invalid json, ignore
        }
      }
    }
    filteredAttributes[key] = value;
  });
  return filteredAttributes;
};
