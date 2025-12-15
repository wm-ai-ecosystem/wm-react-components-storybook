import { ProxyTarget } from "@wavemaker/react-runtime/types";

type notify = (message: string, type: string, title?: any) => void;
export interface BaseAppProps {
  Variables: Record<string, any>;
  Actions: Record<string, any>;
  isAppReady: boolean;
  changeLocale: (locale: string) => void;
  selectedLocale: string;
  getDependency: (name: string) => any;
  serviceDefinitions: Record<string, any>;
  baseUrl: string;
  appConfig: any;
  reload: () => void;
  notifyApp: notify;
  notify: notify;
  notification: Record<string, any> | null;
  Common: Record<string, any>;
  onPageReady: (activePageName: string, activePageScrope: any, activePageEl: any) => void;
  openActionDialog: (notification: any, title?: string) => void;
  eval: (fn: Function, failOnError?: boolean) => any;
  getCurrentMonth: () => string;
  updateActivePage: (pageName: string) => void;
  executeStartAppOperations: () => void;
  importModule?: (moduleName: string) => any;
  Widgets?: Record<string, ProxyTarget>;
  subscribe: (variableName: string, callback: Function) => void;
  autoUpdateVariables: String[];
}

export default BaseAppProps;
