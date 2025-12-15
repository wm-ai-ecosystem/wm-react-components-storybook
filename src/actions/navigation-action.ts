import { VariableEvents } from "@wavemaker/react-runtime/variables/base-variable";
import { ActionConfig, BaseAction } from "./base-action";
import { merge } from "lodash-es";
import { getRouterInstance } from "@wavemaker/react-runtime/store/middleware/navigationMiddleware";
import { ROUTING_BASEPATH } from "@/core/constants";

export interface NavigationParams {
  pageName?: string;
  tabName?: string;
  accordionName?: string;
  [key: string]: any;
}
export interface NavigationActionConfig extends ActionConfig {
  appConfig: any;
  // appConfig: AppConfig;
  operation: string;
  _context: any;
}

export class NavigationAction extends BaseAction<NavigationActionConfig> {
  constructor(config: NavigationActionConfig) {
    super(config);
  }

  public invoke(params?: {}, onSuccess?: Function, onError?: Function): Promise<NavigationAction> {
    const config = this.config;
    // @ts-ignore
    params = params?.data
      ? merge(this.config.paramProvider(), params.data)
      : merge(this.config.paramProvider(), this.dataSet);
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);
    return super
      .invoke(params, onSuccess, onError)
      .then(() => {
        switch (config.operation) {
          case "goToPreviousPage":
            this.handleGoToPreviousPage();
            break;
          case "gotoTab":
            this.handleGotoTab(params || {});
            break;
          case "gotoAccordion":
            this.handleGotoAccordion(params || {});
            break;
          case "gotoPage":
            this.handleGotoPage(params || {});
        }
      })
      .then(
        () => {
          config.onSuccess && config.onSuccess(this, this.dataSet);
          this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
        },
        () => {
          config.onError && config.onError(this, null);
          this.notify(VariableEvents.ERROR, [this, this.dataSet]);
        }
      )
      .then(() => {
        this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
        return this;
      });
  }

  public navigate(
    params?: {},
    onSuccess?: Function,
    onError?: Function
  ): Promise<NavigationAction> {
    return this.invoke(params, onSuccess, onError);
  }

  private handleGoToPreviousPage(): void {
    const router = getRouterInstance();
    try {
      if (router) {
        router.back();
        return;
      }

      // Fallback to window history if router.back() doesn't work
      if (typeof window !== "undefined") {
        window.history.length > 1 ? window.history.go(-1) : (window.location.href = "/");
        return;
      }

      console.warn("Unable to navigate to previous page");
    } catch (error) {
      console.error("Error navigating to previous page:", error);

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  private handleGotoTab(params: NavigationParams): void {
    const tabName = params?.tabName;
    if (tabName && this.config._context?.Widgets[tabName]?.select) {
      this.config._context.Widgets[tabName].select();
    } else {
      console.warn(`Unable to select tab: ${tabName}`);
    }
  }

  private handleGotoAccordion(params: NavigationParams): void {
    const accordionName = params?.accordionName;
    if (accordionName && this.config._context?.Widgets[accordionName]?.expand) {
      this.config._context.Widgets[accordionName].expand();
    } else {
      console.warn(`Unable to expand accordion: ${accordionName}`);
    }
  }

  private handleGotoPage(params: NavigationParams): void {
    const router = getRouterInstance();
    const pageName = params?.pageName;
    if (pageName) {
      // Remove leading slash if present, then add it back to ensure consistency
      const cleanPageName = pageName.replace(/^\//, "");

      // Prepare query params if any exist
      // Filter out undefined/null values
      const queryParams = Object.entries(params)
        .filter(
          ([key, value]) =>
            key !== "pageName" && value !== undefined && value !== null && value !== ""
        )
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      // Construct full path with optional query string
      const fullPath = queryParams ? `/${cleanPageName}?${queryParams}` : `/${cleanPageName}`;

      if (router) {
        router.push(`/${ROUTING_BASEPATH}${fullPath}`);
      }
    } else {
      console.warn("No page name provided for navigation");
    }
  }
}
