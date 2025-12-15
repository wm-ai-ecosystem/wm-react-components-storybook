import clsx from "clsx";
import React, { memo, useCallback, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Accordion } from "@base-ui-components/react/accordion";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmAccordionPaneProps, { DEFAULT_PANE_PROPS } from "./props";

const DEFAULT_CLASS = "app-accordion-panel panel";

const WmAccordionPane = memo((Props: WmAccordionPaneProps) => {
  const props = { ...DEFAULT_PANE_PROPS, ...Props };
  const contentRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // Handle expand/collapse
  const handleToggle = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      props.toggle(event.nativeEvent, props.name);
      if (!props.active) {
        props.onExpand && props.onExpand(event.nativeEvent, props);
      } else {
        props.onCollapse && props.onCollapse(event.nativeEvent, props);
      }
    },
    [props.toggle, props.onExpand, props.onCollapse]
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle(event as any);
      }
    },
    [handleToggle]
  );

  useEffect(() => {
    if (!loadedRef.current) {
      props.onLoad && props.onLoad(props, props.onLoad);
      loadedRef.current = true;
    }
  }, [props.onLoad]);

  return (
    <Accordion.Root
      tabIndex={props.tabindex}
      className={clsx(DEFAULT_CLASS, props.className, { active: props.active })}
    >
      {/* Panel Header */}
      <AccordionSummary
        className="panel-heading clearfix"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={props.tabindex}
        aria-expanded={props.active}
        component="div"
        classes={{ content: "panel-title" }}
      >
        <div className="panel-title">
          {/* Icon */}
          {props.iconclass && (
            <div className="pull-left">
              <i className={clsx("app-icon panel-icon", props.iconclass)} />
            </div>
          )}

          {/* Title and Subheading */}
          <div className="pull-left" style={{ flex: 1 }}>
            <Typography className="heading" variant="h3" component="h3">
              {props.title}
            </Typography>
            {props.subheading && (
              <Typography className="description" variant="body2" component="div">
                {props.subheading}
              </Typography>
            )}
          </div>

          {/* Panel Actions */}
          <div className="panel-actions pull-right">
            {/* Badge */}
            {props.badgevalue && (
              <Typography
                variant="body2"
                component="span"
                className={`label label-${props.badgetype || "default"}`}
              >
                {props.badgevalue}
              </Typography>
            )}

            {/* Expand/Collapse Icon */}
            <Typography component="span" variant="body2" className="app-icon panel-action wi">
              <i className={clsx("app-icon wi", props.active ? "wi-minus" : "wi-plus")} />
            </Typography>
          </div>
        </div>
      </AccordionSummary>

      {/* Panel Body */}
      <AccordionDetails className={clsx("panel-collapse collapse", { in: props.active })}>
        <div ref={contentRef} className="panel-body">
          {props.render && props.active ? props.render(props, props.onLoad) : props.children}
        </div>
      </AccordionDetails>
    </Accordion.Root>
  );
});

WmAccordionPane.displayName = "WmAccordionPane";

export default withBaseWrapper(WmAccordionPane);
