import appstore from "@/core/appstore";
import { getCurrentMonth, reload } from "@/core/util";
import moment from "moment-timezone";

export const mergeVariablesAndActions = (
  pageVariables: { Variables: Record<string, any>; Actions: Record<string, any> },
  appVars: { Variables: Record<string, any>; Actions: Record<string, any> } = {
    Variables: {},
    Actions: {},
  }
) => {
  return {
    Variables: {
      ...appVars.Variables,
      ...pageVariables.Variables,
    },
    Actions: {
      ...appVars.Actions,
      ...pageVariables.Actions,
    },
  };
};

export const BaseAppInitialState = {
  activePageName: "",
  lastActivePage: "",
  Variables: {},
  Actions: {},
  isAppReady: false,
  getDependency: appstore.getDependency,
  getCurrentMonth,
  notification: null,
  Common: {},
  onPageReady: () => {},
  reload: reload,
};

export function importModule(moduleName: string) {
  if (moduleName === "moment") {
    return moment;
  }
}
