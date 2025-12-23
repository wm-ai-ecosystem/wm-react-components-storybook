import { PageContextState, ProxyTarget } from "@wavemaker/react-runtime/types";
import {
  getWidgetOverrides,
  OverriddenPropsRegistry,
} from "@wavemaker/react-runtime/core/script-registry";
import { isDOMElement, wrapWithNativeDOM } from "@wavemaker/react-runtime/core/util/dom";
import {
  findWidgetElement,
  widgetElementCallbacks,
} from "@wavemaker/react-runtime/core/widget-observer";
import BaseAppProps from "../higherOrder/BaseAppProps";
import { ServiceVariable } from "../variables/service-variable";

// WeakMap to store proxy flags without exposing them as props
const proxyMap = new WeakMap();

// Store the original target for each proxy
const originalTargets = new WeakMap();

// Array methods that mutate the array and should trigger updates
const MUTATING_ARRAY_METHODS = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
  "fill",
  "copyWithin",
  "put",
];

// Create a special proxy for arrays that preserves native behavior but triggers updates
const createArrayProxy = (
  array: any[],
  widgetName: string,
  propName: string,
  setPageContext: any
) => {
  if (proxyMap.has(array)) {
    return array;
  }

  const arrayProxy = new Proxy(array, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      // If it's a mutating method, wrap it to trigger updates
      if (
        typeof prop === "string" &&
        MUTATING_ARRAY_METHODS.includes(prop) &&
        typeof value === "function"
      ) {
        return function (...args: any[]) {
          const result = (value as (...args: any[]) => any).apply(target, args);

          // Trigger page context update after mutation
          setPageContext((prevContext: any) => {
            return {
              ...prevContext,
              Widgets: {
                ...prevContext.Widgets,
                [widgetName]: {
                  ...prevContext.Widgets[widgetName],
                  [propName]: [...target], // Create new array reference to trigger re-render
                },
              },
            };
          });

          return result;
        };
      }

      return value;
    },

    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);

      // Trigger update for index assignments (arr[0] = value)
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        setPageContext((prevContext: any) => {
          return {
            ...prevContext,
            Widgets: {
              ...prevContext.Widgets,
              [widgetName]: {
                ...prevContext.Widgets[widgetName],
                [propName]: [...target], // Create new array reference to trigger re-render
              },
            },
          };
        });
      }

      return result;
    },
  });

  proxyMap.set(arrayProxy, true);
  return arrayProxy;
};

// Create array proxy for state context
const createStateArrayProxy = (
  array: any[],
  path: string[],
  propName: string,
  setPageContext: React.Dispatch<React.SetStateAction<PageContextState>>
) => {
  if (proxyMap.has(array)) {
    return array;
  }

  const arrayProxy = new Proxy(array, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);

      // If it's a mutating method, wrap it to trigger updates
      if (
        typeof prop === "string" &&
        MUTATING_ARRAY_METHODS.includes(prop) &&
        typeof value === "function"
      ) {
        return function (...args: any[]) {
          const result = (value as (...args: any[]) => any).apply(target, args);

          // Trigger state context update after mutation
          setPageContext(prev => {
            const newState = { ...prev };
            let current = newState;

            for (let i = 0; i < path.length; i++) {
              const key = path[i];
              current[key] = { ...current[key] };
              current = current[key];
            }

            // Set the new array reference to trigger re-render
            current[propName] = [...target];

            return newState;
          });

          return result;
        };
      }

      return value;
    },

    set(target, prop, value, receiver) {
      const result = Reflect.set(target, prop, value, receiver);

      // Trigger update for index assignments (arr[0] = value)
      if (typeof prop === "string" && /^\d+$/.test(prop)) {
        setPageContext(prev => {
          const newState = { ...prev };
          let current = newState;

          for (let i = 0; i < path.length; i++) {
            const key = path[i];
            current[key] = { ...current[key] };
            current = current[key];
          }

          // Set the new array reference to trigger re-render
          current[propName] = [...target];

          return newState;
        });
      }

      return result;
    },
  });

  proxyMap.set(arrayProxy, true);
  return arrayProxy;
};

export const createWidgetProxy = (
  widget: any,
  widgetName: string,
  setPageContext: any,
  overriddenPropsRegistry?: OverriddenPropsRegistry
) => {
  // If widget is already a proxy or is a DOM element, return it directly
  if (proxyMap.has(widget) || isDOMElement(widget)) {
    return widget;
  }

  const proxy = new Proxy(widget, {
    set(target, prop, value, receiver) {
      // Ignore internal properties
      if (typeof prop === "symbol" || prop === "prototype") {
        return Reflect.set(target, prop, value, receiver);
      }

      // Skip if value hasn't changed
      const currentVal = Reflect.get(target, prop, receiver);
      if (currentVal === value) {
        return true;
      }

      // track script-modified properties
      if (typeof prop === "string") {
        const widgetId = widget["data-widget-id"];
        // Use page-specific registry if provided, otherwise fallback to global
        if (
          overriddenPropsRegistry &&
          typeof overriddenPropsRegistry.trackOverriddenProps === "function"
        ) {
          overriddenPropsRegistry.trackOverriddenProps(widgetName, prop, value, widgetId);
        }
      }

      Reflect.set(target, prop, value, receiver);

      setPageContext((prevContext: any) => {
        // Check if widget-id matches before updating context
        const currentWidget = prevContext.Widgets[widgetName];
        const registryWidgetId = currentWidget?.["data-widget-id"];
        const widgetId = widget["data-widget-id"];

        if (currentWidget && registryWidgetId && widgetId) {
          // Only update if widget-id matches
          if (registryWidgetId === widgetId) {
            return {
              ...prevContext,
              Widgets: {
                ...prevContext.Widgets,
                [widgetName]: {
                  ...prevContext.Widgets[widgetName],
                  [prop]: value,
                },
              },
            };
          }
          // If widget-id doesn't match, don't update context
          return prevContext;
        }

        // No widget-id present, don't update
        return prevContext; // Don't update context if no widget-id match
      });

      return true;
    },
    get(target, prop, receiver) {
      if (typeof prop === "symbol" || prop === "prototype") {
        return Reflect.get(target, prop, receiver);
      }

      //  setProperty method to set properties dynamically
      if (prop === "setProperty") {
        return function (this: any, key: string, value: any) {
          (proxy as any)[key] = value;
          return this;
        };
      }

      // Special getter for $element - return jQuery-like wrapped element
      if (prop === "$element") {
        const rawElement = Reflect.get(target, prop, receiver);
        if (rawElement) {
          // If already wrapped, return as-is
          if (rawElement.length === 1 && isDOMElement(rawElement[0])) {
            return rawElement;
          }
          // If raw DOM element, wrap it
          if (isDOMElement(rawElement)) {
            return wrapWithNativeDOM(rawElement);
          }
        }

        // Try to find element in DOM directly
        const widgetId = widget["data-widget-id"];
        const element = findWidgetElement(widgetName, widgetId);
        if (element) {
          const wrappedElement = wrapWithNativeDOM(element);
          Reflect.defineProperty(target, prop, {
            value: wrappedElement,
            writable: true,
            configurable: true,
            enumerable: false,
          });
          return wrappedElement;
        }

        // Register for future element updates if not found
        if (!target._elementCallbackRegistered) {
          const key = widgetId ? `${widgetName}:${widgetId}` : widgetName;
          let callbacks = widgetElementCallbacks.get(key);
          if (!callbacks) {
            callbacks = new Set();
            widgetElementCallbacks.set(key, callbacks);
          }

          callbacks.add((element: HTMLElement | null) => {
            if (element) {
              const wrapped = wrapWithNativeDOM(element);
              Reflect.defineProperty(target, prop, {
                value: wrapped,
                writable: true,
                configurable: true,
                enumerable: false,
              });
            }
          });

          Reflect.defineProperty(target, "_elementCallbackRegistered", {
            value: true,
            writable: true,
            configurable: true,
            enumerable: false,
          });
        }

        return null;
      }

      const value = Reflect.get(target, prop, receiver);

      const widgetId = widget["data-widget-id"];
      // Use page-specific registry if provided, otherwise fallback to global
      const widgetOverrides = overriddenPropsRegistry?.getWidgetOverrides(widgetName, widgetId);
      if (widgetOverrides && prop in widgetOverrides) {
        return widgetOverrides[prop];
      }

      // Return DOM elements directly to preserve their context
      if (isDOMElement(value)) {
        return value;
      }

      // Return array proxy to preserve native array behavior while enabling reactivity
      if (Array.isArray(value) && typeof prop === "string") {
        return createArrayProxy(value, widgetName, prop, setPageContext);
      }

      return value;
    },
  });

  // Store proxy flag in WeakMap
  proxyMap.set(proxy, true);
  // Store original target reference
  originalTargets.set(proxy, widget);

  return proxy;
};

export const createPageProxy = (
  target: ProxyTarget,
  setPageContext: React.Dispatch<React.SetStateAction<PageContextState>>,
  overriddenPropsRegistry?: OverriddenPropsRegistry
) => {
  // Cache for widget proxies
  const widgetProxies = new Map<string, any>();

  return new Proxy(target, {
    get(widgetsTarget: ProxyTarget, widgetName: string) {
      // Handle non-string properties
      if (widgetName === undefined || widgetName === "undefined") {
        return undefined;
      }
      if (typeof widgetName !== "string") {
        return widgetsTarget[widgetName];
      }

      // Initialize widget if it doesn't exist
      if (!(widgetName in widgetsTarget)) {
        widgetsTarget[widgetName] = { name: widgetName };
      }

      const widget = widgetsTarget[widgetName];

      // Return cached proxy if available
      if (widgetProxies.has(widgetName)) {
        const proxy = widgetProxies.get(widgetName);
        const originalTarget = originalTargets.get(proxy);

        // Always sync properties to ensure proxy has latest data
        // This is important when widget was initially created with minimal data
        if (
          widget !== originalTarget ||
          Object.keys(widget).length > Object.keys(originalTarget).length
        ) {
          // Copy all properties from widget to originalTarget
          for (const key in widget) {
            Reflect.defineProperty(originalTarget, key, {
              value: widget[key],
              writable: true,
              configurable: true,
              enumerable: true,
            });
          }
        }

        return proxy;
      }

      // Create and cache a new proxy
      const proxy = createWidgetProxy(widget, widgetName, setPageContext, overriddenPropsRegistry);
      widgetProxies.set(widgetName, proxy);
      return proxy;
    },
    set(widgetsTarget: ProxyTarget, widgetName: string, widgetValue: any) {
      // Skip if nothing changed
      if (widgetsTarget[widgetName] === widgetValue) {
        return true;
      }

      // Update the widget in the target
      widgetsTarget[widgetName] = widgetValue;

      // Update existing proxy or create a new one
      if (widgetProxies.has(widgetName)) {
        const proxy = widgetProxies.get(widgetName);
        const originalTarget = originalTargets.get(proxy);

        // Only copy changed properties
        if (widgetValue && typeof widgetValue === "object") {
          for (const key in widgetValue) {
            const newVal = widgetValue[key];
            const oldVal = (originalTarget as any)[key];
            if (oldVal !== newVal) {
              Reflect.defineProperty(originalTarget, key, {
                value: newVal,
                writable: true,
                configurable: true,
                enumerable: true,
              });
            }
          }
        }
      } else if (widgetValue && typeof widgetValue === "object") {
        // Create a new proxy
        const proxy = createWidgetProxy(
          widgetValue,
          widgetName,
          setPageContext,
          overriddenPropsRegistry
        );
        widgetProxies.set(widgetName, proxy);
      }

      return true;
    },
  });
};

export const createStateProxy = (
  obj: PageContextState | BaseAppProps,
  path: string[] = [],
  setPageContext:
    | React.Dispatch<React.SetStateAction<PageContextState>>
    | React.Dispatch<React.SetStateAction<BaseAppProps>>,
  overriddenPropsRegistry?: OverriddenPropsRegistry
): ProxyTarget => {
  // Cache for nested proxies
  const nestedProxies = new Map<string, any>();

  return new Proxy(obj, {
    get(target: PageContextState, prop: string, receiver) {
      if (prop === "eval") {
        return (fn: Function, failOnError = false) => {
          try {
            return fn.call(target);
          } catch (e) {
            if (failOnError) throw e;
            return null;
          }
        };
      }

      if (prop === "Widgets" && path.length === 0) {
        if (!nestedProxies.has("Widgets")) {
          nestedProxies.set(
            "Widgets",
            createPageProxy(
              target.Widgets,
              setPageContext as React.Dispatch<React.SetStateAction<PageContextState>>,
              overriddenPropsRegistry
            )
          );
        }
        return nestedProxies.get("Widgets");
      }

      // Do not auto-create missing properties; just return undefined
      if (!(prop in target)) {
        return undefined;
      }
      const value = Reflect.get(target, prop, receiver);

      // Return primitives directly
      if (typeof value !== "object" || value === null) {
        return value;
      }

      if (value instanceof ServiceVariable) {
        return value;
      }

      // Return DOM elements directly without proxying
      if (isDOMElement(value)) {
        return value;
      }
      if (value instanceof Map) {
        return value;
      }

      // Return array proxy to preserve native array behavior while enabling reactivity
      if (Array.isArray(value)) {
        return createStateArrayProxy(
          value,
          path,
          prop,
          setPageContext as React.Dispatch<React.SetStateAction<PageContextState>>
        );
      }

      // Use cached proxy if available
      if (nestedProxies.has(prop)) {
        return nestedProxies.get(prop);
      }

      if (target?.prefab) {
        if (nestedProxies.has(target.name)) {
          return nestedProxies.get(target.name)[prop];
        }
      }

      // Create and cache a new nested proxy
      const nestedProxy = createStateProxy(
        value as PageContextState,
        [...path, prop],
        setPageContext,
        overriddenPropsRegistry
      );
      nestedProxies.set(prop, nestedProxy);

      return nestedProxy;
    },
    set(target: PageContextState, prop: string, value: any, receiver) {
      // Skip if value hasn't changed
      const currentVal = Reflect.get(target, prop, receiver);
      if (currentVal === value) {
        return true;
      }

      // Update target directly
      Reflect.set(target, prop, value, receiver);

      // Clear cached proxy if value is an object (but not an array)
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        nestedProxies.has(prop)
      ) {
        nestedProxies.delete(prop);
      }

      if (target?.prefab) {
        if (nestedProxies.has(target.name)) {
          const existingProxy = nestedProxies.get(target.name);
          existingProxy[prop] = value;
        } else {
          nestedProxies.set(target.name, createWidgetProxy(target, target.name, setPageContext));
        }
      }

      setPageContext((prev: any) => {
        // Create minimal copies along path
        const newState = { ...prev };
        let current = newState;

        for (let i = 0; i < path.length; i++) {
          const key = path[i];
          current[key] = { ...current[key] };
          current = current[key];
        }

        // Set the value
        current[prop] = value;

        return newState;
      });

      return true;
    },
  });
};
