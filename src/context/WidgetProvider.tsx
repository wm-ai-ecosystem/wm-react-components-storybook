import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from "react";
import isEqual from "lodash-es/isEqual";
import get from "lodash-es/get";
import debounce from "lodash-es/debounce";
import { createWidgetProxy } from "@/core/proxy-service";
import { HttpProvider } from "@/hooks/useHttp";
import { createWidgetCleanup } from "@/utils/widget-cleanup-util";
import { registerFormField, registerFormFieldSafe } from "@/utils/form-state.util";
import { EVENTEMITTER_METHODS } from "@/core/constants/events";

interface WidgetContextProps {
  pageContext: any;
  updateWidgetState: (widgetName: string, props: Record<string, any>) => void;
  proxy: any;
  cleanup: (name: string) => void;
}

const WidgetContext = createContext<WidgetContextProps | undefined>(undefined);

// WeakMap to store proxy flags without exposing them as props
const proxyMap = new WeakMap();

export const WidgetProvider = ({
  value: Context,
  children,
}: {
  value: { value: any; proxy: any };
  children: React.ReactNode;
}) => {
  const { value, proxy } = Context;
  const [pageContext, setPageContext] = useState<any>(value);
  const pageContextRef = useRef<any>(value);
  pageContextRef.current = pageContext;

  // Create cleanup utility instance
  const cleanupUtilRef = useRef<ReturnType<typeof createWidgetCleanup> | null>(null);

  // Initialize cleanup utility if not already created
  if (!cleanupUtilRef.current) {
    cleanupUtilRef.current = createWidgetCleanup({
      setPageContext,
      proxyRef: { current: proxy },
      debounceDelay: 100,
    });
  }

  useEffect(() => {
    setPageContext((prevContext: any) => {
      const newContext = { ...prevContext };

      if (value?.Widgets && newContext?.Widgets) {
        Object.keys(value.Widgets).forEach(widgetName => {
          const currentWidget = newContext.Widgets[widgetName];
          const incomingWidget = value.Widgets[widgetName];

          if (!currentWidget || !proxyMap.has(currentWidget)) {
            // Create new proxy if widget doesn't exist or isn't proxied
            // Get registry from pageContext if available
            const registry = (value as any)?.overriddenPropsRegistry;
            const widgetProxy = createWidgetProxy(
              { ...incomingWidget },
              widgetName,
              setPageContext,
              registry
            );
            newContext.Widgets[widgetName] = widgetProxy;
            newContext.App.Widgets[widgetName] = widgetProxy;

            // Register form field if applicable
            registerFormField(newContext.Widgets, widgetProxy, incomingWidget);
          } else {
            // Update existing proxy properties - important for widgets that start minimal
            // Always update all properties to ensure proxy has complete data
            Object.entries(incomingWidget).forEach(([key, val]) => {
              if (typeof key === "string" && !key.startsWith("_")) {
                currentWidget[key] = val;
              }
            });
          }
        });
      }

      // Handle other context properties
      value &&
        Object.keys(value).forEach(key => {
          if (key !== "Widgets") {
            newContext[key] = value[key];
          }
        });
      pageContextRef.current = newContext;
      return newContext;
    });
  }, [value]);

  const updateWidgetState = useMemo(() => {
    return (widgetName: string, props: Record<string, any>) => {
      if (!widgetName || !pageContext.Widgets) return;
      const widget = pageContext.Widgets[widgetName];
      if (widget != props) {
        pageContext.Widgets[widgetName] = props;
        pageContextRef.current.Widgets[widgetName] = props;
      }

      // Register form field with safe structure initialization
      registerFormFieldSafe(pageContext.Widgets, props);
    };
  }, []);

  const cleanup = (name: string) => {
    cleanupUtilRef.current?.cleanup(name);
  };

  const contextValue = useMemo(
    () => ({
      pageContext,
      updateWidgetState,
      proxy,
      cleanup,
    }),
    [pageContext, updateWidgetState, proxy, cleanup]
  );

  // Stable debounced emitter
  const debouncedEmitRef = useRef(
    debounce((partialName: string, context: any) => {
      EVENTEMITTER_METHODS.PARTIAL_STATE_SYNC_EMIT({
        partialName,
        pageContext: context,
      });
    }, 100)
  );

  // Extract only what matters to avoid extra renders
  const partialName =
    pageContext?.partialName ||
    (pageContext?.componentType?.toLowerCase() === "prefab" && pageContext?.name);
  const isPage = pageContext?.componentType?.toUpperCase() === "PAGE";

  useEffect(() => {
    if (!isPage) return;

    const handlePartialStateSync = (data: any) => {
      if (!data.pageContext) return;

      // If proxy must sync, clone to avoid mutation issues
      proxy.Widgets[data.partialName] = data.pageContext;
      proxy.App.Widgets[data.partialName] = data.pageContext;
      pageContextRef.current.Widgets[data.partialName] = data.pageContext;
    };

    EVENTEMITTER_METHODS.PARTIAL_STATE_SYNC_ON(handlePartialStateSync);
    return () => {
      EVENTEMITTER_METHODS.PARTIAL_STATE_SYNC_OFF(handlePartialStateSync);
    };
  }, [isPage]);

  /**
   * Emit partial updates only for partial/prefab types
   */
  useEffect(() => {
    if (isPage || !partialName) return;

    debouncedEmitRef.current(partialName, proxy);
  }, [isPage, partialName, pageContext]);

  return (
    <HttpProvider>
      <WidgetContext.Provider value={contextValue}>{children}</WidgetContext.Provider>
    </HttpProvider>
  );
};

export const usePageContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidgetContext must be used within a WidgetProvider");
  }
  return context;
};

export const useWidgetProxy = (name: string) => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidgetProxy must be used within a WidgetProvider");
  }
  return get(context.proxy, `Widgets.${name}`, {});
};
export const useProxy = (path?: string) => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useProxy must be used within a WidgetProvider");
  }
  if (!path) {
    return context.proxy;
  }
  return get(context.proxy, path, null);
};

export const useAppState = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useAppState must be used within a WidgetProvider");
  }
  return context.pageContext;
};
