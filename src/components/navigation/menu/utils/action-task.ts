export function executeActionTaskFromItem(item: any, listener?: any): void {
  let actionExpr = item?.value?.actiontask ?? item?.dataObject?.actiontask;
  if (!actionExpr || typeof actionExpr !== "string") {
    return;
  }
  const normalizedExpr = actionExpr.replaceAll("?", "");
  const parts = normalizedExpr.split(".");
  const methodToken = parts?.pop() || "";
  const widgetName = parts?.pop();
  const widget = listener?.Widgets?.[widgetName as any];
  const match = methodToken.match(/^(\w+)\((.*)\)$/);
  if (widget && match) {
    const methodName = match[1];
    const argsStr = match[2];
    if (methodName && typeof widget[methodName] === "function") {
      widget[methodName](argsStr);
    }
  }
}
