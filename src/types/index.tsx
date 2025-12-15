export interface Config {
  serviceDefs?: Record<string, any>;
  appConfig: {
    url: string;
  };
  appVariables: any;
}

// Adding index signature to PageContextState
export interface PageContextState {
  Widgets: Record<string, any>;
  Variables: Record<string, VariableState>;
  Actions: Record<string, any>;
  onReady: () => void;
  serviceDefinitions: Record<string, any>;
  baseUrl: string;
  [key: string]: any;
}

export interface VariableState {
  loading: boolean;
  error: any;
  data: any;
  invokeOnParamChange?: Function;
}

export interface ProxyTarget {
  [key: string]: any;
}

export interface MockApp {
  getDependency: (name: string) => null;
  appConfig: any;
  Variables: Record<string, any>;
  Actions: Record<string, any>;
  serviceDefinitions: Record<string, any>;
  baseUrl: string;
  reload: () => void;
  changeLocale: (locale: string) => void;
  selectedLocale: string;
}
export type WithPageContextProps<P> = P & {
  config?: Config;
  [key: string]: any;
};

// Enums and Types
export enum VariableEvents {
  BEFORE_INVOKE = "beforeInvoke",
  SUCCESS = "success",
  ERROR = "error",
  AFTER_INVOKE = "afterInvoke",
}

export interface Subscription {
  variable: any;
  event: VariableEvents;
  handler: () => void;
}

export interface CommonComponentInfo {
  component: React.ComponentType<any>;
}
