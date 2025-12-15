let appVariablesInstance: { Variables: Record<string, any>; Actions: Record<string, any> };
let isInitialized = false;

export const getAppVariablesInstance = (pageProxy: any, getAppVariables: Function) => {
  if (!isInitialized) {
    appVariablesInstance = getAppVariables(pageProxy);
    isInitialized = true;
    console.log("App variables initialized once");
  }
  return appVariablesInstance;
};

export const resetAppVariables = () => {
  appVariablesInstance = null;
  isInitialized = false;
};
