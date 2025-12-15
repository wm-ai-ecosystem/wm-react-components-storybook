export const computeMergedPageParams = (
  urlParams: Record<string, any>,
  options?: { componentType?: string; props?: Record<string, any> }
): Record<string, any> => {
  const { componentType, props } = options || {};

  if (componentType === "PARTIAL") {
    const partialParams: Record<string, any> = {};
    Object.keys(props || {}).forEach(k => {
      // Including all incoming props as partial params
      partialParams[k] = (props as any)[k];
    });

    return { ...urlParams, ...partialParams };
  }

  return urlParams;
};
