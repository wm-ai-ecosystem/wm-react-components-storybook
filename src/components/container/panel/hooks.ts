import React, { useEffect, useState, useCallback, useRef } from "react";
import { PanelWidget, WmPanelChildProps, WmPanelComponent } from "./props";

export const usePanelExpansion = (
  initialExpanded: boolean = true,
  onExpand?: (event: React.MouseEvent, widget?: PanelWidget) => void,
  onCollapse?: (event: React.MouseEvent, widget?: PanelWidget) => void,
  name?: string,
  listener?: { Widgets?: Record<string, PanelWidget> }
) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const isExpandedRef = useRef(initialExpanded);

  const toggleExpand = useCallback(
    (event?: React.MouseEvent) => {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      const newExpanded = !isExpandedRef.current;
      isExpandedRef.current = newExpanded;
      setIsExpanded(newExpanded);

      if (newExpanded) {
        onExpand?.(event || ({} as React.MouseEvent), listener?.Widgets?.[name as string]);
      } else {
        onCollapse?.(event || ({} as React.MouseEvent), listener?.Widgets?.[name as string]);
      }
    },
    [onExpand, onCollapse, name, listener]
  );

  useEffect(() => {
    setIsExpanded(initialExpanded);
    isExpandedRef.current = initialExpanded;
  }, [initialExpanded]);

  // Update ref whenever state changes from external sources
  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  return { isExpanded, toggleExpand, isExpandedRef };
};

export const usePanelFullscreen = (
  initialFullscreen: boolean = false,
  enablefullscreen: boolean = false,
  onFullscreen?: (event: React.MouseEvent, widget?: PanelWidget) => void,
  onExitfullscreen?: (event: React.MouseEvent, widget?: PanelWidget) => void,
  name?: string,
  listener?: { Widgets?: Record<string, PanelWidget> }
) => {
  const [isFullscreen, setIsFullscreen] = useState(initialFullscreen);

  const toggleFullScreen = useCallback(
    (event: React.MouseEvent) => {
      if (!enablefullscreen) return;

      const newFullscreen = !isFullscreen;
      setIsFullscreen(newFullscreen);

      if (newFullscreen) {
        onFullscreen?.(event, listener?.Widgets?.[name as string]);
        document.body.style.overflow = "hidden";
      } else {
        onExitfullscreen?.(event, listener?.Widgets?.[name as string]);
        document.body.style.overflow = "";
      }
    },
    [isFullscreen, enablefullscreen, onFullscreen, onExitfullscreen, name, listener]
  );

  useEffect(() => {
    setIsFullscreen(initialFullscreen);
  }, [initialFullscreen]);

  useEffect(() => {
    return () => {
      if (isFullscreen) {
        document.body.style.overflow = "";
      }
    };
  }, [isFullscreen]);

  return { isFullscreen, toggleFullScreen };
};

export const usePanelDimensions = (
  height: string | number | undefined,
  isFullscreen: boolean,
  hideFooter: boolean,
  panelRef: React.RefObject<HTMLDivElement | null>,
  panelContentRef: React.RefObject<HTMLDivElement | null>,
  panelHeaderRef: React.RefObject<HTMLDivElement | null>
) => {
  const computeDimensions = useCallback(() => {
    if (!panelRef || !panelContentRef || !panelHeaderRef) return;

    const headerHeight = panelHeaderRef.current?.offsetHeight || 0;
    const footer = panelRef.current?.querySelector(".panel-footer") as HTMLElement;
    const footerHeight = footer?.offsetHeight || 0;
    const content = panelContentRef.current;
    const vHeight = window.innerHeight;
    let inlineHeight: string | number = "";

    if (isFullscreen) {
      inlineHeight = hideFooter ? vHeight - headerHeight : vHeight - (footerHeight + headerHeight);
    } else {
      inlineHeight = height || "";
    }
    if (content) {
      content.style.height =
        typeof inlineHeight === "number" ? `${inlineHeight}px` : inlineHeight.toString();
    }
  }, [height, isFullscreen, hideFooter]);

  useEffect(() => {
    const handleResize = () => {
      computeDimensions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computeDimensions]);

  return { computeDimensions };
};

export const useChildrenClassification = (children: React.ReactNode) => {
  const isWmPanelFooter = (element: React.ReactElement): boolean => {
    const elementType = element.type;
    const props = element.props as WmPanelChildProps;

    if (props.WmPanelFooter || props["data-wm-panel-footer"]) {
      return true;
    }

    if (typeof elementType === "function") {
      const component = elementType as unknown as WmPanelComponent;
      return !!(component.WmPanelFooter || component.displayName === "WmPanelFooter");
    }

    return false;
  };

  return {
    bodyContent: React.Children.toArray(children).filter(child => {
      if (!React.isValidElement(child)) return true;
      return !isWmPanelFooter(child);
    }),
    footerContent: React.Children.toArray(children).filter(child => {
      if (!React.isValidElement(child)) return false;
      return isWmPanelFooter(child);
    }),
  };
};
