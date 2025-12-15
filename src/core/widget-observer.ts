// Global DOM observer for widget element tracking
let globalObserver: MutationObserver | null = null;
const widgetElementCallbacks = new Map<string, Set<(element: HTMLElement | null) => void>>();

// Initialize global observer once
const initializeGlobalObserver = () => {
  if (globalObserver || typeof window === "undefined") return;

  globalObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      // Handle added nodes
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          checkForWidgetElements(node as HTMLElement);
        }
      });
    });
  });

  globalObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// Check if element matches any registered widgets
const checkForWidgetElements = (element: HTMLElement) => {
  const widgetId = element.getAttribute("data-widget-id");
  const name = element.getAttribute("name");

  if (name) {
    const key = widgetId ? `${name}:${widgetId}` : name;
    const callbacks = widgetElementCallbacks.get(key);
    if (callbacks) {
      callbacks.forEach(callback => callback(element));
    }
  }

  // Check descendants
  const descendants = element.querySelectorAll("[data-widget-id], [name]");
  descendants.forEach(desc => {
    const descWidgetId = desc.getAttribute("data-widget-id");
    const descName = desc.getAttribute("name");
    if (descName) {
      const key = descWidgetId ? `${descName}:${descWidgetId}` : descName;
      const callbacks = widgetElementCallbacks.get(key);
      if (callbacks) {
        callbacks.forEach(callback => callback(desc as HTMLElement));
      }
    }
  });
};

// Helper function to find widget elements
export const findWidgetElement = (widgetName: string, widgetId?: string): HTMLElement | null => {
  // Strategy 1: Find by widget-id (most specific)
  if (widgetId) {
    const element = document.querySelector(`[data-widget-id="${widgetId}"]`);
    if (element) return element as HTMLElement;
  }

  // Strategy 2: Find by name attribute
  if (widgetName) {
    const element = document.querySelector(`[name="${widgetName}"]`);
    if (element) return element as HTMLElement;
  }

  // Strategy 3: Find by class name
  if (widgetName) {
    const element = document.querySelector(`.${widgetName}`);
    if (element) return element as HTMLElement;
  }

  // Strategy 4: Find by id
  if (widgetName) {
    const element = document.querySelector(`#${widgetName}`);
    if (element) return element as HTMLElement;
  }

  return null;
};

// Export the widget element callbacks map for use in proxy service
export { widgetElementCallbacks };

// Auto-initialize observer
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGlobalObserver);
  } else {
    initializeGlobalObserver();
  }
}
