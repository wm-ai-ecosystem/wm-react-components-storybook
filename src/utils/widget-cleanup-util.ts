/**
 * Configuration for the widget cleanup utility
 */
export interface WidgetCleanupConfig {
  /** Function to update the page context state */
  setPageContext: (updater: (prev: any) => any) => void;
  /** Reference to the proxy object (optional) */
  proxyRef?: React.MutableRefObject<any>;
  /** Debounce delay in milliseconds (default: 100) */
  debounceDelay?: number;
}

/**
 * Creates a debounced widget cleanup utility function
 * This eliminates code duplication between WidgetProvider and BasePage
 *
 * @param config - Configuration object for the cleanup utility
 * @returns Object containing cleanup function and cleanupRef
 */
export const createWidgetCleanup = (config: WidgetCleanupConfig) => {
  const { setPageContext, proxyRef, debounceDelay = 100 } = config;
  const cleanupRef = new Set<string>();
  let timeoutId: NodeJS.Timeout | null = null;

  // Debounced cleanup function that processes accumulated widget names
  const performCleanup = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (cleanupRef.size === 0) return;

      setPageContext((currentContext: any) => {
        const newContext = { ...currentContext };
        const widgetsToClean = [...cleanupRef];

        widgetsToClean.forEach((name: string) => {
          if (newContext.Widgets && newContext.Widgets[name]) {
            delete newContext.Widgets[name];

            // Delete from proxy if available
            if (proxyRef?.current?.Widgets) {
              delete proxyRef.current.Widgets[name];
            }
          }
        });

        cleanupRef.clear();
        return newContext;
      });

      timeoutId = null;
    }, debounceDelay);
  };

  /**
   * Cleanup function to be called when a widget needs to be removed
   * @param name - Name of the widget to cleanup
   */
  const cleanup = (name: string) => {
    // Accumulate widget names to be cleaned up
    cleanupRef.add(name);
    // Trigger debounced cleanup
    performCleanup();
  };

  /**
   * Cancel any pending cleanup operations
   */
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return {
    cleanup,
    cleanupRef,
    cancel,
  };
};
