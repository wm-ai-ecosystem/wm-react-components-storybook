import React, { useState, useEffect, useRef } from "react";
import cloneDeep from "lodash-es/cloneDeep";
import isEqual from "lodash-es/isEqual";
import get from "lodash-es/get";

import { useAppDispatch, useAppSelector } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { setSelectedLocaleAndLoadBundle } from "@/store/slices/i18nSlice";
import appstore from "@/core/appstore";
import { getAppVariablesInstance } from "@/core/appVariablesStore";
import BaseAppProps from "./BaseAppProps";
import AppContext from "@/context/AppContext";
import { CommonComponentInfo } from "@/types";
import EventNotifier from "@/core/event-notifier";
import DialogService from "@/core/dialog.service";
import { handle401 } from "@/core/app.service";
import { createStateProxy } from "@/core/proxy-service";
import { BaseAppInitialState, importModule } from "@/higherOrder/helper";
import { defaultUserState } from "@/store/slices/authSlice";
import AppSpinnerProvider from "@/context/AppSpinnerProvider";

// HOC function that wraps the app component
export const BaseApp = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  addAppScript: (app: any) => void,
  getAppVariables: (appProxy: any) => {
    Variables: Record<string, any>;
    Actions: Record<string, any>;
  },
  appInfo: any = {}
) => {
  const AppContextComponent = (props: P) => {
    const dispatch = useAppDispatch();
    const authContext = useAuth();
    const i18n = useAppSelector((state: any) => state.i18n);
    const info = useAppSelector((state: any) => state.info);

    const [appContext, setAppContext] = useState<BaseAppProps>({
      ...BaseAppInitialState,
      updateActivePage,
      changeLocale,
      selectedLocale: i18n.selectedLocale || "en",
      baseUrl: info?.appConfig?.url || "",
      appConfig: {
        ...info?.appConfig,
        SecurityService: authContext,
        loggedInUser: cloneDeep(authContext?.loggedInUser) || defaultUserState,
      },
      serviceDefinitions: cloneDeep(info?.serviceDefs || {}),
      notifyApp,
      notify,
      eval: evaluateExpression,
      openActionDialog: openActionDialog,
      executeStartAppOperations,
      importModule,
      Widgets: {},
      subscribe,
      ...appInfo,
    });

    const appProxyRef = useRef<any>(null);
    const isInitializedRef = useRef(false);
    const serviceErrorSubscriptionRef = useRef<(() => void) | null>(null);
    const isVariablesExecutedRef = useRef(false);
    const registrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pendingWidgetRegistrations = useRef<Record<string, any>>({});
    const subscribersRef = useRef<Map<string, Set<Function>>>(new Map());

    // Set up service error listener using EventNotifier (outside useEffect)
    useEffect(() => {
      const unsubscribe = EventNotifier.ROOT.subscribe(
        "SERVICE_ERROR",
        (variable: any, error: any, options: any) => {
          // if error is 401, show login dialog
          if (options?.xhrObj?.status === 401) {
            handle401();
          }

          if (options?.xhrObj?.code === "ERR_CANCELED") {
            return;
          }
          if (
            appProxyRef.current?.onServiceError &&
            typeof appProxyRef.current.onServiceError === "function"
          ) {
            appProxyRef.current.onServiceError(error, options.xhrObj);
          }
          notifyApp(error, "error", "Service Error");
        }
      );

      serviceErrorSubscriptionRef.current = unsubscribe;
      // Cleanup function
      return () => {
        if (serviceErrorSubscriptionRef.current) {
          serviceErrorSubscriptionRef.current();
        }
        // Clear any pending widget registration timeout
        if (registrationTimeoutRef.current) {
          clearTimeout(registrationTimeoutRef.current);
          registrationTimeoutRef.current = null;
        }
      };
    }, []);

    // Initialize app once
    useEffect(() => {
      if (!info?.serviceDefs) return;
      if (isInitializedRef.current) return;
      isInitializedRef.current = true;

      // initialize app
      initializeApp();
      // Cleanup function
      return () => {
        // Clean up service error subscription
        if (serviceErrorSubscriptionRef.current) {
          serviceErrorSubscriptionRef.current();
        }
        // Clear any pending widget registration timeout
        if (registrationTimeoutRef.current) {
          clearTimeout(registrationTimeoutRef.current);
          registrationTimeoutRef.current = null;
        }
      };
    }, [info?.serviceDefs]);

    function openActionDialog(notification: any, title?: string) {
      setAppContext(prev => {
        if (title) {
          prev.Common[title].open();
        }
        return {
          ...prev,
          notification: notification,
        };
      });
    }

    async function executeStartAppOperations() {
      if (isVariablesExecutedRef.current) return;
      isVariablesExecutedRef.current = true;
      const startUpVariables = appInfo.startUpVariables || [];

      const appVariables = appProxyRef.current.Variables;

      // Execute startup variables
      const variablePromises = startUpVariables.map(async (varName: string | number) => {
        const variable = (appVariables as any)[varName];
        if (variable && variable.invoke && typeof variable.invoke === "function") {
          try {
            return await variable.invoke();
          } catch (error) {
            console.warn(`Error invoking startup variable ${varName}:`, error);
            return null;
          }
        }
        return Promise.resolve();
      });

      try {
        await Promise.allSettled(variablePromises);

        // Call onAppVariablesReady after startup variables are loaded
        if (
          appProxyRef.current.onAppVariablesReady &&
          typeof appProxyRef.current.onAppVariablesReady === "function"
        ) {
          await appProxyRef.current.onAppVariablesReady();
        }
      } catch (error) {
        console.error("Error during app startup operations:", error);
      }
    }

    const initializeApp = async () => {
      try {
        const appProxy: any = createStateProxy(appContext, [], setAppContext);

        appProxyRef.current = appProxy;

        // Get app variables
        let appVariables: { Variables: Record<string, any>; Actions: Record<string, any> } = {
          Variables: {},
          Actions: {},
        };

        if (getAppVariables && typeof getAppVariables === "function") {
          appVariables = getAppVariables(appProxy);
        } else {
          // Fallback to appstore
          const APP_VARIABLES = (appstore as any).get("AppConfig")?.appVariables;
          if (APP_VARIABLES) {
            appVariables = getAppVariablesInstance(appProxy, APP_VARIABLES);
          }
        }

        // Set variables and actions in app proxy
        appProxy.Variables = appVariables.Variables;
        appProxy.Actions = appVariables.Actions;

        // Initialize app script and register callbacks
        if (addAppScript && typeof addAppScript === "function") {
          addAppScript(appProxy);
        }

        // Execute app startup operations
        const executeAppStartup = async () => {
          const startUpActions = appInfo.startUpActions || [];

          // Execute startup actions
          for (const actionName of startUpActions) {
            const action = (appVariables.Actions as any)[actionName];
            if (action && action.invoke && typeof action.invoke === "function") {
              try {
                action.invoke();
              } catch (error) {
                console.warn(`Error invoking startup action ${actionName}:`, error);
              }
            }
          }
        };

        await executeStartAppOperations();

        // Execute startup operations
        await executeAppStartup();

        // Initialize DialogService in appstore
        appstore.DialogService.set(DialogService);

        // Set app as ready and update context
        setAppContext(prev => ({
          ...prev,
          Variables: appVariables.Variables,
          Actions: appVariables.Actions,
          appProxy: appProxy,
          isAppReady: true,
        }));
      } catch (error) {
        console.error("Error initializing app:", error);
        setAppContext(prev => ({ ...prev, isAppReady: true }));
      }
    };

    function evaluateExpression(fn: Function, failOnError = false) {
      try {
        return fn.call(appContext);
      } catch (e) {
        if (failOnError) {
          throw e;
        } else {
          return null;
        }
      }
    }

    function updateActivePage(pageName: string) {
      if (appProxyRef.current) {
        appProxyRef.current.lastActivePage = appProxyRef.current?.activePageName;
        appProxyRef.current.activePageName = pageName;
      }
    }

    function subscribe(eventName: string, callback: Function): () => void {
      if (!eventName || typeof callback !== "function") {
        return () => {};
      }

      if (!subscribersRef.current.has(eventName)) {
        subscribersRef.current.set(eventName, new Set());
      }

      const subscribers = subscribersRef.current.get(eventName)!;
      subscribers.add(callback);

      return () => {
        const subs = subscribersRef.current.get(eventName);
        if (subs) {
          subs.delete(callback);
          if (subs.size === 0) {
            subscribersRef.current.delete(eventName);
          }
        }
      };
    }

    function notify(eventName: string, value?: any): void {
      if (!eventName) {
        return;
      }

      const subscribers = subscribersRef.current.get(eventName);
      if (subscribers && subscribers.size > 0) {
        subscribers.forEach(callback => {
          try {
            callback(value);
          } catch (error) {
            console.error(`Error in subscriber callback for ${eventName}:`, error);
          }
        });
      }
    }
    // Change locale function
    function changeLocale(locale: string) {
      dispatch(
        setSelectedLocaleAndLoadBundle({
          locale: locale,
        })
      );
    }

    function notifyApp(message: string, type: string, title?: any) {
      // App-level notification
      const notificationAction = get(appContext, "Actions.appNotification");
      if (notificationAction) {
        const appNotification = notificationAction.config.paramProvider();
        const newParams = () => ({
          text: message || "Success",
          content: "inline",
          class: type || "Success",
          duration: appNotification.duration || 3000,
          toasterPosition: appNotification.toasterPosition || "bottom right",
        });
        notificationAction.config.paramProvider = newParams;
        notificationAction.invoke();
      } else {
        console.warn(
          'The default Action "appNotification" doesn\'t exist in the app.  App notified following error:\n ',
          message
        );
      }
    }

    // For app Level Common Widgets
    const commonComponentsArray = useRef<CommonComponentInfo[]>(
      (() => {
        const commonProp = appInfo?.common;

        if (!commonProp) {
          return [];
        }

        if (Array.isArray(commonProp)) {
          return commonProp.map(comp => ({ component: comp }));
        }

        return [{ component: commonProp }];
      })()
    );

    const registerCommonComponent = (commonContext: any) => {
      if (!commonContext?.Widgets) return;

      // Collect all widgets from this component
      Object.keys(commonContext.Widgets).forEach(widgetName => {
        pendingWidgetRegistrations.current[widgetName] = commonContext.Widgets[widgetName];
      });

      // Clear existing timeout and set a new one to batch updates
      if (registrationTimeoutRef.current) {
        clearTimeout(registrationTimeoutRef.current);
      }

      registrationTimeoutRef.current = setTimeout(() => {
        const updatedWidgets = { ...appContext.Common, ...pendingWidgetRegistrations.current };

        if (!isEqual(updatedWidgets, appContext.Common)) {
          setAppContext(prev => ({
            ...prev,
            Common: updatedWidgets,
          }));
        }

        // Clear pending registrations after update
        pendingWidgetRegistrations.current = {};
        registrationTimeoutRef.current = null;
      }, 0); // Use setTimeout with 0 to batch all synchronous calls
    };

    const renderCommonComponents = () => {
      if (commonComponentsArray.current.length === 0) return null;

      return commonComponentsArray.current.map((commonInfo, index) => {
        const { component: Component } = commonInfo;

        return (
          <React.Fragment key={`component-wrapper-${index}`}>
            <Component
              key={`common-component-${index}`}
              onRender={(commonComponent: any) => registerCommonComponent(commonComponent)}
            />
          </React.Fragment>
        );
      });
    };

    return (
      <AppContext.Provider
        value={{
          state: appContext,
          proxy: appProxyRef.current,
        }}
      >
        <AppSpinnerProvider>
          {renderCommonComponents()}
          <WrappedComponent {...props} />
        </AppSpinnerProvider>
      </AppContext.Provider>
    );
  };

  AppContextComponent.displayName = `BaseApp(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return AppContextComponent;
};

export default BaseApp;
