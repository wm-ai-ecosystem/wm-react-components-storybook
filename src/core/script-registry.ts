// Global registry to track overridden properties (kept for backward compatibility)
export let overriddenProps: Record<string, Record<string, any>> = {};

// New: Widget-ID specific overrides (kept for backward compatibility)
export let widgetIdOverriddenProps: Record<string, Record<string, Record<string, any>>> = {};

const IGNORED_PROPERTIES = ["name", "activePane", "activePaneIndex", "activeTab"];

// Per-page registry instance class
export class OverriddenPropsRegistry {
  private overriddenProps: Record<string, Record<string, any>> = {};
  private widgetIdOverriddenProps: Record<string, Record<string, Record<string, any>>> = {};

  // Add a property to the registry
  trackOverriddenProps(widgetName: string, propName: string, value: any, widgetId?: string): void {
    if (IGNORED_PROPERTIES.includes(propName)) return;

    // If widget-id is provided, use widget-id specific tracking
    if (widgetId) {
      if (!this.widgetIdOverriddenProps[widgetName]) {
        this.widgetIdOverriddenProps[widgetName] = {};
      }
      if (!this.widgetIdOverriddenProps[widgetName][widgetId]) {
        this.widgetIdOverriddenProps[widgetName][widgetId] = {};
      }
      this.widgetIdOverriddenProps[widgetName][widgetId][propName] = value;
    } else {
      // Fallback to global registry for backward compatibility
      if (!this.overriddenProps[widgetName]) {
        this.overriddenProps[widgetName] = {};
      }
      this.overriddenProps[widgetName][propName] = value;
    }
  }

  // Check if a property has been script-modified
  isPropOverridden(widgetName: string, propName: string, widgetId: string): boolean {
    const overriddenItem =
      this.widgetIdOverriddenProps[widgetName]?.[widgetId]?.[propName] ||
      (this.overriddenProps[widgetName]?.[propName] != undefined
        ? this.overriddenProps[widgetName]?.[propName]
        : false);
    return overriddenItem !== undefined;
  }

  isWidgetOverridden(widgetName: string, widgetId: string): boolean {
    const overriddenItem =
      this.widgetIdOverriddenProps[widgetName]?.[widgetId] || this.overriddenProps[widgetName];
    return overriddenItem !== undefined;
  }

  // Get widget-id specific overrides
  getWidgetOverrides(widgetName: string, widgetId: string): Record<string, any> {
    const overriddenItem =
      this.widgetIdOverriddenProps[widgetName]?.[widgetId] || this.overriddenProps[widgetName];
    return overriddenItem || {};
  }

  clear(): void {
    this.overriddenProps = {};
    this.widgetIdOverriddenProps = {};
  }
}

// Factory function to create a new registry instance
export function createOverriddenPropsRegistry(): OverriddenPropsRegistry {
  return new OverriddenPropsRegistry();
}

// Legacy global functions for backward compatibility (deprecated - use registry instance instead)
export function trackOverriddenProps(
  widgetName: string,
  propName: string,
  value: any,
  widgetId?: string
): void {
  if (IGNORED_PROPERTIES.includes(propName)) return;

  // If widget-id is provided, use widget-id specific tracking
  if (widgetId) {
    if (!widgetIdOverriddenProps[widgetName]) {
      widgetIdOverriddenProps[widgetName] = {};
    }
    if (!widgetIdOverriddenProps[widgetName][widgetId]) {
      widgetIdOverriddenProps[widgetName][widgetId] = {};
    }
    widgetIdOverriddenProps[widgetName][widgetId][propName] = value;
  } else {
    // Fallback to global registry for backward compatibility
    if (!overriddenProps[widgetName]) {
      overriddenProps[widgetName] = {};
    }
    overriddenProps[widgetName][propName] = value;
  }
}

// Check if a property has been script-modified
export function isPropOverridden(widgetName: string, propName: string, widgetId: string): boolean {
  const overriddenItem =
    widgetIdOverriddenProps[widgetName]?.[widgetId]?.[propName] ||
    (overriddenProps[widgetName]?.[propName] != undefined
      ? overriddenProps[widgetName]?.[propName]
      : false);
  return overriddenItem !== undefined;
}

export function isWidgetOverridden(widgetName: string, widgetId: string): boolean {
  const overriddenItem =
    widgetIdOverriddenProps[widgetName]?.[widgetId] || overriddenProps[widgetName];
  return overriddenItem !== undefined;
}

// Get widget-id specific overrides
export function getWidgetOverrides(widgetName: string, widgetId: string): Record<string, any> {
  const overriddenItem =
    widgetIdOverriddenProps[widgetName]?.[widgetId] || overriddenProps[widgetName];
  return overriddenItem || {};
}

export function clearOverriddenProps(): void {
  overriddenProps = {};
  widgetIdOverriddenProps = {};
}
