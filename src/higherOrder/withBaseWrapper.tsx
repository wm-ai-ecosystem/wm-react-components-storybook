"use client";
import React, { ComponentType, useEffect, useMemo, useCallback } from "react";
import isEqual from "lodash-es/isEqual";
import { useDeviceVisibility } from "@wavemaker/react-runtime/hooks/useDeviceVisibility";
import { usePageContext } from "@wavemaker/react-runtime/context/WidgetProvider";
import { sanitizeStyleObject } from "@wavemaker/react-runtime/utils/style-utils";
import { Props } from "@wavemaker/react-runtime/higherOrder/props";
import {
  isPropOverridden,
  isWidgetOverridden,
  getWidgetOverrides,
} from "@wavemaker/react-runtime/core/script-registry";

export interface BaseProps extends Props {}

export const withBaseWrapper = <P extends BaseProps>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> => {
  const WithBaseComponent = (props: BaseProps) => {
    const { show = true, name, deferload = true, ...rest } = props;

    // All hooks must be called before any early returns
    const { isHidden } = useDeviceVisibility(props.showindevice || ["all"]);
    const { pageContext, updateWidgetState, cleanup } = usePageContext();

    // Extract widget-id from component props
    const componentWidgetId = useMemo(() => props?.["data-widget-id"], [props?.["data-widget-id"]]);

    const widgetFromContext = name ? pageContext?.Widgets?.[name] : undefined;

    // Register widget in context (last wins - second component should win)
    useEffect(() => {
      if (name && props?.iswidget !== "false" && pageContext?.Widgets) {
        // Create registry entry with widget-id
        const registryEntry = {
          ...props,
          "data-widget-id": componentWidgetId || undefined, // Ensure widget-id is stored
        };

        // Last component with same name overwrites previous (LAST WINS)
        pageContext.Widgets[name] = registryEntry;
      }
    }, [name, pageContext?.Widgets, componentWidgetId, props]);

    // Compute merged props in a memoized way
    const mergedProps = useMemo(() => {
      if (!name || !pageContext?.Widgets || props?.iswidget === "false") {
        return props;
      }

      const widget = widgetFromContext || {};

      // Extract widget-id from context widget
      const contextWidgetId = widget?.["data-widget-id"];

      // FIRST WINS: Only merge if this component's widget-id matches the context
      // OR if no widget-id filtering is needed (backward compatibility)
      const shouldMergeFromContext =
        !componentWidgetId || !contextWidgetId || componentWidgetId === contextWidgetId;

      let mergedState: Record<string, any> = { ...props };
      const datavalue = props.datavalue ?? widget.datavalue;
      if (shouldMergeFromContext && isWidgetOverridden(name, componentWidgetId)) {
        // Apply widget-id specific overridden properties from the registry
        const widgetOverrides = getWidgetOverrides(name, componentWidgetId);
        Object.keys(widgetOverrides).forEach(key => {
          mergedState[key] = widgetOverrides[key];
        });

        // Then handle other widget properties that are not overridden
        Object.keys(widget).forEach(key => {
          if (!isPropOverridden(name, key, componentWidgetId)) {
            mergedState[key] = props[key];
          }
        });
      } else if (shouldMergeFromContext) {
        // For regular widgets (no widget-id or matching widget-id), merge with component props taking precedence
        mergedState = {
          ...widget,
          ...props,
          ...(WrappedComponent.displayName === "WmFormField" && !props.value
            ? { value: datavalue }
            : {}),
          datavalue,
        };
      } else {
        // Widget-id mismatch: component stays independent with only its own props
        mergedState = {
          ...props,
          ...(WrappedComponent.displayName === "WmFormField" && !props.value
            ? { value: datavalue }
            : {}),
          datavalue,
        };
      }

      return mergedState;
    }, [props, widgetFromContext, componentWidgetId]);

    const syncWithContext = useCallback(() => {
      if (name && pageContext?.Widgets && props?.iswidget !== "false" && !props?.formfield) {
        const currentWidgetState = pageContext.Widgets[name] || {};

        // Extract widget-id from context
        const contextWidgetId = currentWidgetState?.["data-widget-id"];

        // Only sync if widget-ids match OR no widget-id filtering needed
        const shouldSync =
          !componentWidgetId || !contextWidgetId || componentWidgetId === contextWidgetId;

        if (shouldSync) {
          // Skip comparing listener property
          const stateForComparison = { ...currentWidgetState };
          const propsForComparison = { ...mergedProps };
          delete stateForComparison.listener;
          delete propsForComparison.listener;

          if (!isEqual(stateForComparison, propsForComparison)) {
            updateWidgetState(name, mergedProps);
          }
        }
      }
    }, [pageContext?.Widgets, mergedProps, props, componentWidgetId]);

    useEffect(() => {
      syncWithContext();
    }, [syncWithContext]);

    const computedStyles = useMemo(() => {
      // Ensure conditionalstyle is a valid CSS object or undefined
      const conditionalStyleObj =
        typeof props.conditionalstyle === "object" && props.conditionalstyle !== null
          ? sanitizeStyleObject(props.conditionalstyle)
          : {};

      const baseStyles = sanitizeStyleObject(props.styles);

      return { ...baseStyles, ...conditionalStyleObj };
    }, [props.styles, props.conditionalstyle]);

    const computedClassName = useMemo(() => {
      return [
        props.className,
        props.conditionalclass,
        props.animation && `animated ${props.animation}`,
      ]
        .filter(Boolean)
        .join(" ");
    }, [props.className, props.conditionalclass, props.animation]);

    // Early returns after all hooks
    if (isHidden) return null;

    // Optimized deferload and show logic
    const isDeferLoad = deferload === true;
    const showValue = mergedProps?.show?.toString() !== "false";

    // Implement exact logic from requirements:
    // show = false, deferload = undefined/false → render initial, not UI (hidden=true)
    // show = false, deferload = true → don't render at all
    // show = true, deferload = true → render in both
    // show = true, deferload = false/undefined → render in UI

    if (!showValue && isDeferLoad) {
      // Case: show = false, deferload = true → don't render at all
      return null;
    }

    // Case: show = false, deferload = false/undefined → render with hidden=true
    const shouldHide = !showValue && !isDeferLoad;

    const updateon = props?.updateon === "default" ? "keypress" : props?.updateon;

    return (
      <WrappedComponent
        {...(rest as P)}
        {...mergedProps}
        {...(updateon && { updateon })}
        {...(shouldHide && { hidden: true })}
        {...(deferload !== undefined && { deferload: deferload.toString() })}
        show={mergedProps?.show?.toString()}
        name={name}
        className={computedClassName}
        styles={computedStyles}
        {...(props?.dataset && { dataset: props?.dataset })}
      />
    );
  };

  WithBaseComponent.displayName = `WithBase(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return React.memo(WithBaseComponent, (prevProps, nextProps) => {
    return prevProps === nextProps;
  });
};
export default withBaseWrapper;
