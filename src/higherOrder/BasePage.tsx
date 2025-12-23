"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import isEqual from "lodash-es/isEqual";
import cloneDeep from "lodash-es/cloneDeep";
import merge from "lodash-es/merge";
import compare from "@/core/util/compare";
import { WidgetProvider } from "@wavemaker/react-runtime/context/WidgetProvider";
import { WmSpinner } from "@wavemaker/react-runtime/components/basic/spinner";
import { getAppVariablesInstance } from "@wavemaker/react-runtime/core/appVariablesStore";
import { useAppSelector, useAppDispatch } from "@wavemaker/react-runtime/store";
import { useAppContext } from "@wavemaker/react-runtime/context/AppContext";
import useAccess from "@wavemaker/react-runtime/hooks/useAccess";
import { redirectToLogin } from "@wavemaker/react-runtime/store/slices/authSlice";
import {
  PageContextState,
  ProxyTarget,
  VariableEvents,
  Subscription,
  MockApp,
  WithPageContextProps,
} from "@wavemaker/react-runtime/types";
import { createStateProxy } from "@wavemaker/react-runtime/core/proxy-service";
import { getRouterInstance } from "@wavemaker/react-runtime/store/middleware/navigationMiddleware";
import { mergeVariablesAndActions } from "@wavemaker/react-runtime/higherOrder/helper";
import { toastService } from "@wavemaker/react-runtime/actions/toast.service";
import appstore from "@wavemaker/react-runtime/core/appstore";
import {
  clearOverriddenProps,
  createOverriddenPropsRegistry,
  OverriddenPropsRegistry,
} from "@wavemaker/react-runtime/core/script-registry";
import BaseAppProps from "./BaseAppProps";
import formatters from "@/core/formatters";
import { useAppProxy } from "@/context/AppContext";
import { isJQueryError } from "@/core/util/utils";
import { createWidgetCleanup } from "@/utils/widget-cleanup-util";
import { computeMergedPageParams } from "@/utils/page-params-util";
import { ROUTING_BASEPATH } from "../core/constants";
import { useAppSpinner } from "@/context/AppSpinnerProvider";
import { get } from "lodash";
import { EVENTEMITTER_METHODS } from "@/core/constants/events";
import { wrapWithThirdPartyErrorGuard } from "@/utils/lib-error-skipper";
import { viewportService } from "@/store/viewport.service";
import { formatMessage } from "../core/util";

export const withPageContext = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  addPageScript: (app: MockApp, pageProxy: ProxyTarget) => void,
  getVariables: (pageProxy: ProxyTarget) => {
    Variables: Record<string, any>;
    Actions: Record<string, any>;
  },
  componentInfo?: any,
  prefabInfo?: any
) => {
  const PageContextComponent = (props: WithPageContextProps<P>) => {
    const dispatch = useAppDispatch();
    const { show, hide } = useAppSpinner();
    const i18n = useAppSelector((state: any) => state.i18n);
    const info = useAppSelector((state: any) => state.info);
    const pageParams = useSearchParams();
    // Get app context if available (when used within BaseApp)
    const appContext: BaseAppProps | null = useAppContext();
    const appProxy = useAppProxy();

    // Use optimized access hook instead of useAccess
    const {
      hasAccess,
      loading: accessLoading,
      error: accessError,
    } = useAccess({
      componentName: componentInfo?.componentName || "Main",
      type: componentInfo?.componentType || "PAGE",
    });

    // Get security status for debugging
    const isSecurityEnabled = useAppSelector(
      (state: any) => state.auth.securityConfig?.isSecurityEnabled
    );
    const securityConfig = useAppSelector((state: any) => state.auth.securityConfig);
    const isAuthenticated = useAppSelector(
      (state: any) => state.auth.loggedInUser?.isAuthenticated
    );
    const loggedInUser = useAppSelector((state: any) => state.auth.loggedInUser);
    const appConfig = useAppSelector((state: any) => state.info.appConfig);

    // Initialization state management
    const [isInitialized, setIsInitialized] = useState(false);
    const redirectHandledRef = useRef(false);

    // Refs for managing component lifecycle
    const subscriptionsRef = useRef<Subscription[]>([]);
    const pendingStartupOpsRef = useRef<Set<string>>(new Set());
    const startUpVariableLoadedRef = useRef<boolean>(false);
    const pageProxyRef = useRef<ProxyTarget | null | any>(null);
    const isInitializingRef = useRef<boolean>(false);
    const isMountedRef = useRef<boolean>(true);
    const usedFallbackAppVarsRef = useRef<boolean>(false);
    const appVarSubscriptionsDoneRef = useRef<boolean>(false);
    const subscribedVariableNamesRef = useRef<Set<string>>(new Set());
    const overriddenPropsRegistryRef = useRef<OverriddenPropsRegistry>(null);

    // Initial page context state
    const [pageContext, setPageContext] = useState<PageContextState>({
      Widgets: {},
      Variables: {},
      Actions: {},
      onReady: () => {},
      serviceDefinitions: cloneDeep(
        prefabInfo?.serviceDefs || appContext?.serviceDefinitions || {}
      ),
      pageParams: {},
      baseUrl: prefabInfo?.baseUrl || info?.appConfig?.url || "",
      appConfig: appContext?.appConfig,
      notification: {},
      toaster: toastService,
      onContentReady,
      onChange: updateWidgetState,
      App: {},
      eval: appContext?.eval,
      appLocale: componentInfo.appLocale || i18n.appLocale || {},
      ...prefabInfo,
      ...props,
      ...componentInfo,
      executeStartup,
      formatters,
      Viewport: viewportService.getViewport(),
      formatMessage: formatMessage,
      overriddenPropsRegistryRef: overriddenPropsRegistryRef.current,
    });
    // Enhanced initial app config that inherits from app context if available
    const initialAppConfig = useMemo(() => appContext, [appContext]);

    // Handle redirect to login if authentication is required
    useEffect(() => {
      if (
        componentInfo?.componentType !== "PAGE" ||
        redirectHandledRef.current ||
        accessLoading ||
        !isSecurityEnabled
      ) {
        return;
      }

      // Check if page requires authentication
      const pageConfig = appConfig?.pages?.find(
        (p: any) => p.name.toLowerCase() === componentInfo?.componentName?.toLowerCase()
      );

      // Redirect to login if page requires authentication and user is not authenticated
      const requiresAuth =
        pageConfig?.permission === "Authenticated" || pageConfig?.permission === "Role";
      if (requiresAuth && !isAuthenticated) {
        redirectHandledRef.current = true;
        dispatch(
          redirectToLogin({
            redirectTo: componentInfo?.componentName,
            securityConfig,
          })
        );
      }
    }, [
      accessLoading,
      isSecurityEnabled,
      isAuthenticated,
      appConfig,
      componentInfo?.componentType,
      componentInfo?.componentName,
      dispatch,
      securityConfig,
    ]);

    // Check if we should proceed with initialization
    const shouldInitialize = useMemo(() => {
      // Wait for app to be ready (if app context exists)
      if (appContext && !appContext.isAppReady) {
        return false;
      }

      // Wait for access check to complete
      if (accessLoading) {
        return false;
      }

      // Don't initialize if no access
      if (!hasAccess && isSecurityEnabled) {
        if (isAuthenticated) {
          appContext?.notifyApp(
            pageContext?.appLocale?.LABELS?.ACCESS_DENIED || "Access Denied",
            "Error"
          );
        }
        return false;
      }

      return true;
    }, [appContext?.isAppReady, accessLoading, hasAccess, isSecurityEnabled, isAuthenticated]);

    // Update page context with app variables when app context changes
    useEffect(() => {
      if (!appContext?.isAppReady || !pageProxyRef.current) {
        return;
      }

      // Update page context with app variables without triggering re-initialization
      setPageContext(prev => {
        const updatedVariables = { ...prev.Variables, ...(appContext.Variables || {}) };
        const updatedActions = { ...prev.Actions, ...(appContext.Actions || {}) };

        // Update proxy with the same object references
        pageProxyRef.current.Variables = updatedVariables;
        pageProxyRef.current.Actions = updatedActions;
        pageProxyRef.current.App = {
          ...pageProxyRef.current.App,
          Variables: appContext.Variables || {},
          Actions: appContext.Actions || {},
        };

        return {
          ...prev,
          Variables: updatedVariables,
          Actions: updatedActions,
        };
      });
    }, [appContext?.isAppReady, appContext?.Variables, appContext?.Actions]);

    // Main initialization effect - runs only when conditions are met
    useEffect(() => {
      // Early returns for non-initialization cases
      if (
        !shouldInitialize ||
        isInitialized ||
        isInitializingRef.current ||
        !isMountedRef.current
      ) {
        return;
      }

      // Set initialization flag
      isInitializingRef.current = true;

      const initializeComponent = async () => {
        try {
          // Create overridden props registry
          overriddenPropsRegistryRef.current = createOverriddenPropsRegistry();
          // Create page proxy
          const pageProxy = createStateProxy(
            pageContext,
            [],
            setPageContext,
            overriddenPropsRegistryRef.current
          );
          pageProxyRef.current = pageProxy;

          // Initialize variables and actions
          const pageVariables = getVariables(pageProxy);

          // Handle app variables based on app context availability
          let appVariables = { Variables: {}, Actions: {} };
          if (appContext?.isAppReady) {
            // If app context is available and ready, use app variables directly
            appVariables = {
              Variables: appContext.Variables || {},
              Actions: appContext.Actions || {},
            };
            usedFallbackAppVarsRef.current = false;
          } else {
            // Fallback to traditional app variable initialization
            // @ts-ignore
            const APP_VARIABLES = appstore.get("AppConfig").appVariables;
            appVariables = APP_VARIABLES
              ? getAppVariablesInstance(pageProxy, APP_VARIABLES)
              : { Variables: {}, Actions: {} };
            usedFallbackAppVarsRef.current = true;
          }

          const { Variables, Actions } = mergeVariablesAndActions(pageVariables, appVariables);

          // Compute page params from URL and include partial params when applicable
          const urlParams: Record<string, any> = Object.fromEntries(pageParams.entries());
          const newParams: Record<string, any> = computeMergedPageParams(urlParams, {
            componentType: componentInfo?.componentType,
            props: props as any,
          });
          appProxy.appLocale = i18n.appLocale || {};

          // Update proxy with merged variables and actions
          (pageProxy as PageContextState).Variables = Variables;
          (pageProxy as PageContextState).Actions = Actions;
          (pageProxy as PageContextState).pageParams = { ...newParams };
          (pageProxy as PageContextState).App = {
            ...appProxy,
            ...initialAppConfig,
          };
          (pageProxy as PageContextState).pageParams = { ...newParams };
          (pageProxy as PageContextState).selectedLocale = i18n.selectedLocale || "en";
          (pageProxy as PageContextState).overriddenPropsRegistry =
            overriddenPropsRegistryRef.current;

          // Setup variable event handlers
          setupVariableSubscriptions(pageVariables.Variables);

          if (componentInfo?.componentType === "PAGE" && appProxy) {
            const pageName = componentInfo?.componentName;
            appProxy.updateActivePage(pageName);
            appProxy.activePage = pageProxy;
          }

          // Initialize page script
          addPageScript(appProxy, pageProxy);

          // Gaurd for unsupported third party functionality
          wrapWithThirdPartyErrorGuard(
            pageProxy as Record<string, any>,
            appContext,
            componentInfo?.componentName || "Prefab"
          );

          // Setup global wm object for pages
          if (componentInfo?.componentType === "PAGE") {
            (global as ProxyTarget).wm = appProxy ? { ...pageProxy, App: appProxy } : pageProxy;
          }

          // Mark as initialized
          setIsInitialized(true);
        } catch (error) {
          console.error("Error during component initialization:", error);
          // Still mark as initialized to prevent hanging
          setIsInitialized(true);
        } finally {
          isInitializingRef.current = false;
        }
      };

      initializeComponent();

      // Cleanup function
      return () => {
        // Cancel all pending page operations
        if (pageProxyRef.current) {
          const { Variables = {}, Actions = {} } = getVariables(pageProxyRef.current) || {};

          // Cancel page variables
          Object.values(Variables).forEach(variable => {
            if (variable?.cancel && typeof variable.cancel === "function") {
              try {
                variable.cancel();
              } catch (error) {
                console.warn("Failed to cancel page variable:", error);
              }
            }
          });

          // Cancel page actions
          Object.values(Actions).forEach(action => {
            if (action?.cancel && typeof action.cancel === "function") {
              try {
                action.cancel();
              } catch (error) {
                console.warn("Failed to cancel page timer action:", error);
              }
            }
          });
        }

        // Clear pending startup operations
        pendingStartupOpsRef.current.clear();
        overriddenPropsRegistryRef.current?.clear();
        // clearOverriddenProps();

        // Unsubscribe from events
        subscriptionsRef.current.forEach(({ variable, event, handler }) => {
          if (variable?.unsubscribe) {
            try {
              variable.unsubscribe(event, handler);
            } catch (error) {
              console.warn(`Failed to unsubscribe from ${event}:`, error);
            }
          }
        });
        subscriptionsRef.current = [];
      };
    }, [shouldInitialize]); // Only depend on shouldInitialize

    // If initialized with fallback app vars, subscribe to real app vars when app becomes ready
    useEffect(() => {
      if (
        !appContext?.isAppReady ||
        !pageProxyRef.current ||
        !usedFallbackAppVarsRef.current ||
        appVarSubscriptionsDoneRef.current
      ) {
        return;
      }
      try {
        const { Variables: pageVars = {} } = getVariables(pageProxyRef.current) || {
          Variables: {},
        };
        const pageVarNames = new Set(Object.keys(pageVars || {}));
        subscribeAppVariablesIfNeeded(
          (appContext.Variables as Record<string, any>) || {},
          pageVarNames
        );
        appVarSubscriptionsDoneRef.current = true;
      } catch (e) {
        // no-op
      }
    }, [appContext?.isAppReady]);

    // Prefab state sync
    useEffect(() => {
      if (prefabInfo && componentInfo?.componentType === "PREFAB") {
        const handlePrefabStateRefresh = (data: any) => {
          const proxy = pageProxyRef.current;
          Object.keys(data).forEach((key: string) => {
            const propKey = data[key].key;
            let newValue = data[key].newValue ?? data[key].oldValue;
            if (newValue && typeof newValue === "object") {
              newValue = cloneDeep(newValue);
            }

            // Call onPropertyChange if available
            if (proxy && proxy.onPropertyChange) {
              proxy[propKey] = newValue;
              proxy.onPropertyChange(propKey, newValue, data[key].oldValue);
            }
          });
        };

        EVENTEMITTER_METHODS.PREFAB_STATE_SYNC_ON(prefabInfo?.name, handlePrefabStateRefresh);

        return () => {
          EVENTEMITTER_METHODS.PREFAB_STATE_SYNC_OFF(prefabInfo?.name, handlePrefabStateRefresh);
        };
      }
    }, [prefabInfo, componentInfo?.componentType]);

    // Setup variable subscriptions
    const setupVariableSubscriptions = (variables: Record<string, any>) => {
      const handleVariableEvent = (variableName: string, event: VariableEvents, variable: any) => {
        // not required because while unmounting page,variables invocation get cancelled and state update will not happen

        const updateState = variable;
        updateState.loading = event === VariableEvents.BEFORE_INVOKE;
        updateState.error = event === VariableEvents.ERROR ? variable : null;

        if (get(variable, "spinnerContext") === "page") {
          if (updateState.loading) {
            const message = get(variable, "spinnerMessage");
            show(message);
          } else {
            hide();
          }
        }

        setPageContext(prev => ({
          ...prev,
          Variables: {
            ...prev.Variables,
            [variableName]: updateState,
          },
        }));

        if (event === VariableEvents.AFTER_INVOKE) {
          pendingStartupOpsRef.current.delete(variableName);
        }
      };

      // Set up subscriptions (avoid duplicates by name)
      Object.entries(variables).forEach(([name, variable]) => {
        if (subscribedVariableNamesRef.current.has(name)) {
          return;
        }
        Object.values(VariableEvents).forEach(event => {
          const handler = () => handleVariableEvent(name, event, variable);
          if (variable && typeof variable.subscribe === "function") {
            variable.subscribe(event, handler);
            subscriptionsRef.current.push({ variable, event, handler });
          }
        });
        subscribedVariableNamesRef.current.add(name);
      });
    };

    // Subscribe to app-level variables that are not shadowed by page variables
    const subscribeAppVariablesIfNeeded = (
      appVars: Record<string, any>,
      pageVarNames: Set<string>
    ) => {
      const appVarsOnly: Record<string, any> = {};
      Object.entries(appVars || {}).forEach(([name, variable]) => {
        if (!pageVarNames.has(name) && !subscribedVariableNamesRef.current.has(name)) {
          appVarsOnly[name] = variable;
        }
      });
      if (Object.keys(appVarsOnly).length) {
        setupVariableSubscriptions(appVarsOnly);
      }
    };

    // Execute startup operations
    const executeStartupOperations = async (Variables: any, Actions: any) => {
      const { startUpActions = [], startUpVariables = [] } = componentInfo || {};

      // Track startup operations
      startUpVariables.forEach((name: string) => pendingStartupOpsRef.current.add(name));
      startUpActions.forEach((name: string) => pendingStartupOpsRef.current.add(name));

      // If no startup operations, mark as complete immediately
      if (startUpActions.length === 0 && startUpVariables.length === 0) {
        return;
      }

      try {
        // Execute startup actions
        startUpActions.forEach((actionName: string | number) => {
          if (Actions[actionName]?.invoke) {
            Actions[actionName].invoke();
          }
          pendingStartupOpsRef.current.delete(String(actionName));
        });

        // Execute startup variables
        const variablePromises = startUpVariables.map((varName: string | number) => {
          if (Variables[varName]?.invoke) {
            return Variables[varName].invoke().catch((error: any) => {
              console.log(`Error invoking ${varName}:`, error);
              return null;
            });
          }
          return Promise.resolve();
        });

        await Promise.allSettled(variablePromises);
        startUpVariableLoadedRef.current = true;
        pendingStartupOpsRef.current.clear();
      } catch (error) {
        console.error("Error during startup operations:", error);
      }
    };

    // Widget state update function
    function updateWidgetState(widgetName: string, newProps: Record<string, any>) {
      if (!widgetName || !newProps || Object.keys(newProps).length === 0) return;
      if (compare(pageContext.Widgets[widgetName], newProps)) return;

      setPageContext(prev => ({
        ...prev,
        Widgets: {
          ...prev.Widgets,
          [widgetName]: {
            ...prev.Widgets[widgetName],
            ...newProps,
          },
        },
      }));

      Object.keys(newProps).forEach(key => {
        if (
          !isEqual(pageContext.Widgets[widgetName]?.[key], newProps?.[key]) &&
          newProps?.[key] !== undefined
        ) {
          pageProxyRef.current.Widgets[widgetName][key] = newProps[key];
        }
      });
    }

    // Content ready callback
    function onContentReady() {
      if (pageContext.onReady) {
        pageContext.onReady();
      }
      if (appContext?.onPageReady && pageContext.componentType === "PAGE") {
        appContext.onPageReady(pageContext.componentName, pageProxyRef.current, undefined);
      }

      return Promise.resolve();
    }

    async function executeStartup() {
      appContext?.executeStartAppOperations();
      await executeStartupOperations(pageContext.Variables, pageContext.Actions);
    }

    // Update pageContext.appLocale when i18n.appLocale changes
    useEffect(() => {
      const newAppLocale = merge({}, i18n.appLocale || {}, prefabInfo?.appLocale || {});
      if (!isEqual(pageContext.appLocale, newAppLocale)) {
        setPageContext(prev => ({
          ...prev,
          appLocale: newAppLocale,
        }));
        pageProxyRef.current.App.appLocale = newAppLocale;
      }
    }, [i18n.appLocale]);

    const onContentReadyCalledRef = useRef(false);
    const onStartupCompletedRef = useRef(false);
    // Call onContentReady when startup operations are complete
    useEffect(() => {
      if (
        isInitialized &&
        isMountedRef.current &&
        !onContentReadyCalledRef.current &&
        pageProxyRef.current
      ) {
        // Mark as called before invoking to prevent duplicate calls
        onContentReadyCalledRef.current = true;

        // 1. First RAF: waits for browser to schedule the next paint
        // 2. Second RAF: waits for the paint to complete and any nested renders
        // This is a reliable pattern to ensure component is fully rendered
        requestAnimationFrame(() => {
          if (!isMountedRef.current) return;

          requestAnimationFrame(async () => {
            if (isMountedRef.current && pageProxyRef.current) {
              await executeStartup();
              await onContentReady();
              onStartupCompletedRef.current = true;
            }
          });
        });
      }
    }, [isInitialized]);

    useEffect(() => {
      return () => {
        isMountedRef.current = false;
        // Cleanup viewport service when component unmounts
        viewportService.destroy();
      };
    }, []);

    // Handle access denied case
    if (!accessLoading && !hasAccess && !componentInfo?.isPartOfPrefab) {
      return null;
    }

    // Handle access error case
    if (accessError && !accessLoading) {
      console.error(`Access check failed for ${componentInfo?.componentName}:`, accessError);
      return null;
    }

    // Show loading spinner while checking access or app is not ready
    if (accessLoading || (appContext && !appContext.isAppReady) || !isInitialized) {
      return <WmSpinner name="page" caption="" listener={{}} />;
    }

    if (appContext?.autoUpdateVariables && onStartupCompletedRef.current) {
      const appVariables = appContext.Variables;
      appContext.autoUpdateVariables.forEach((value: string) => {
        appVariables[value]?.invokeOnParamChange && appVariables[value]?.invokeOnParamChange();
      });
    }

    if (pageContext.autoUpdateVariables && onStartupCompletedRef.current) {
      const pageVariables = pageContext.Variables;
      componentInfo.autoUpdateVariables.forEach((value: string) => {
        pageVariables[value]?.invokeOnParamChange && pageVariables[value]?.invokeOnParamChange();
      });
    }

    // Render the component
    return (
      <WidgetProvider value={{ value: pageContext, proxy: pageProxyRef.current }}>
        <WrappedComponent {...props} />
      </WidgetProvider>
    );
  };

  PageContextComponent.displayName = `WithPageContext(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;
  return PageContextComponent;
};

export default withPageContext;
