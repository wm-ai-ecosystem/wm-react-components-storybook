import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Box, Typography } from "@mui/material";
import DOMPurify from "dompurify";

import { WmPanelProps } from "./props";
import {
  usePanelExpansion,
  usePanelFullscreen,
  usePanelDimensions,
  useChildrenClassification,
} from "./hooks";
import PanelHeader from "./components/panel-header";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const WmPanel = (props: WmPanelProps) => {
  const {
    actions,
    badgetype = "default",
    badgevalue,
    closable = false,
    collapsible = false,
    enablefullscreen = false,
    expanded = true,
    fullscreen = false,
    helptext,
    hint,
    iconclass,
    iconheight,
    iconmargin,
    iconurl,
    iconwidth,
    subheading,
    title,
    className,
    style,
    children,
    height,
    name,
    itemlabel,
    itemlink,
    itemicon,
    itemchildren,
    onActionsclick,
    onClose,
    onCollapse,
    onExpand,
    onExitfullscreen,
    onFullscreen,
    onLoad,
    onMouseenter,
    onMouseleave,
    onMouseout,
    onMouseover,
    // HOC related props - extract to prevent passing to DOM
    onPropertyChange,
    listener,
    Widgets,
    ...restProps
  } = props;

  const [helpVisible, setHelpVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelHeaderRef = useRef<HTMLDivElement | null>(null);
  const panelContentRef = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(true);
  const hasTriggeredOnLoadRef = useRef<boolean>(false);

  //   Manages expand/collapse state
  const { isExpanded, toggleExpand, isExpandedRef } = usePanelExpansion(
    expanded,
    onExpand,
    onCollapse,
    name,
    listener
  );

  //   Handles fullscreen functionality
  const { isFullscreen, toggleFullScreen } = usePanelFullscreen(
    fullscreen,
    enablefullscreen,
    onFullscreen,
    onExitfullscreen,
    name,
    listener
  );
  //  Classifies children into body and footer content
  const { bodyContent, footerContent } = useChildrenClassification(children);
  const hideFooter = !footerContent.length || !isExpanded;

  //   Calculates panel dimensions
  const { computeDimensions } = usePanelDimensions(
    height,
    isFullscreen,
    hideFooter,
    panelRef,
    panelContentRef,
    panelHeaderRef
  );

  // Event handlers
  const handleClose = (event: React.MouseEvent) => {
    setShow(false);
    if (onPropertyChange) {
      onPropertyChange("show", false);
    }

    // Call the onClose callback if provided
    if (onClose) {
      onClose(event, listener?.Widgets?.[name as string]);
    }
  };

  const toggleHelp = () => setHelpVisible(!helpVisible);

  const handleMouseEnter = (event: React.MouseEvent) => {
    onMouseenter?.(event, listener?.Widgets?.[name as string]);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    onMouseleave?.(event, listener?.Widgets?.[name as string]);
  };

  const handleMouseOver = (event: React.MouseEvent) => {
    onMouseover?.(event, listener?.Widgets?.[name as string]);
  };

  const handleMouseOut = (event: React.MouseEvent) => {
    onMouseout?.(event, listener?.Widgets?.[name as string]);
  };

  // onLoad handler
  useEffect(() => {
    if (hasTriggeredOnLoadRef.current || !isExpanded) return;
    hasTriggeredOnLoadRef.current = true;
    onLoad?.(listener?.Widgets?.[name as string]);
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      computeDimensions();
    }
  }, [isExpanded, height, isFullscreen, hideFooter, computeDimensions]);

  // Handle ESC key for closing panel
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closable && event.key === "Escape") {
        handleClose({} as React.MouseEvent);
      }
    };

    if (closable) {
      window.addEventListener("keydown", handleEscKey);
      return () => window.removeEventListener("keydown", handleEscKey);
    }
  }, [closable]);

  const showHeader = Boolean(
    iconurl ||
      iconclass ||
      collapsible ||
      (actions && (Array.isArray(actions) ? actions.length > 0 : true)) ||
      title ||
      subheading ||
      enablefullscreen
  );

  // Panel methods exposed via listener
  const collapse = () => {
    if (isExpandedRef.current) {
      toggleExpand();
    }
  };

  const expand = () => {
    if (!isExpandedRef.current) {
      toggleExpand();
    }
  };

  const close = () => {
    if (show) {
      handleClose({} as React.MouseEvent);
    }
  };

  const toggle = () => {
    toggleExpand();
  };

  // Register the methods
  useEffect(() => {
    if (listener?.onChange) {
      listener.onChange(name, {
        collapse,
        expand,
        close,
        toggle,
        toggleExpand,
        isExpanded,
        isFullscreen,
        toggleFullScreen,
        show,
      });
    }
  }, []);

  const componentProps = {
    subheading: subheading,
    iconclass: iconclass,
    autoclose: props.autoclose,
    title: title,
    name: name,
    badgevalue: badgevalue,
    badgetype: badgetype,
    hint: hint,
    enablefullscreen: enablefullscreen.toString(),
    animation: props.animation,
    show: props.show,
    "data-widget-id": props["data-widget-id"],
  };

  return (
    <Box
      ref={panelRef}
      className={clsx("app-panel panel", className, {
        fullscreen: isFullscreen,
        "show-help": helpVisible,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      hidden={!show}
      component="div"
      {...componentProps}
    >
      {showHeader && (
        <Box className={clsx("panel-heading", { "show-help": helpVisible })} ref={panelHeaderRef}>
          <PanelHeader
            title={title}
            subheading={subheading}
            iconclass={iconclass}
            iconurl={iconurl}
            iconwidth={iconwidth}
            iconheight={iconheight}
            iconmargin={iconmargin}
            badgevalue={badgevalue}
            badgetype={badgetype}
            actions={actions}
            helptext={helptext}
            isExpanded={isExpanded}
            isFullscreen={isFullscreen}
            collapsible={collapsible}
            enablefullscreen={enablefullscreen}
            closable={closable}
            listener={listener}
            itemlabel={itemlabel}
            itemlink={itemlink}
            itemicon={itemicon}
            itemchildren={itemchildren}
            onToggleExpand={toggleExpand}
            onToggleFullScreen={toggleFullScreen}
            onToggleHelp={toggleHelp}
            onClose={handleClose}
            onActionsclick={onActionsclick}
          />
        </Box>
      )}

      <Box hidden={!isExpanded} className="panel-content" ref={panelContentRef}>
        <Box className={clsx("panel-body", { "show-help": helpVisible })}>
          {props.renderPartial ? props.renderPartial(props) : bodyContent}
        </Box>

        {helptext && (
          <Box
            component="aside"
            className={clsx("panel-help-message", { "show-help": helpVisible })}
          >
            <Typography variant="h5" className="panel-help-header">
              Help
            </Typography>
            <Box
              className="panel-help-content"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(helptext) }}
            />
          </Box>
        )}
      </Box>

      {!hideFooter && footerContent}
    </Box>
  );
};

export const WmPanelFooter = ({ children, name }: { children: React.ReactNode; name?: string }) => {
  return (
    <div className="app-panel-footer panel-footer clearfix" aria-label={name} name={name}>
      {children}
    </div>
  );
};

WmPanelFooter.displayName = "WmPanelFooter";

WmPanel.displayName = "WmPanel";
export default withBaseWrapper(WmPanel);
