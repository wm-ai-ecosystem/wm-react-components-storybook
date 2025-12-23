import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import isArray from "lodash-es/isArray";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmAccordionPane from "./accordion-pane";
import WmAccordionProps, { DEFAULT_PROPS } from "./props";
import WmAccordionPaneProps from "./accordion-pane/props";
import { getWidgetState, setWidgetState } from "@wavemaker/react-runtime/utils/state-persistance";

const DEFAULT_CLASS = "app-accordion panel-group";

const WmAccordion = memo(
  (Props: WmAccordionProps) => {
    const props = { ...DEFAULT_PROPS, ...Props };

    const isMounted = useRef<boolean>(false);
    const [activePaneIndex, setActivePaneIndex] = useState<number>(props.defaultpaneindex || 0);
    const [activePanes, setActivePanes] = useState<Set<number>>(new Set());
    const prevActivePaneIndex = useRef<number | null>(null);

    // Initialize active panes based on default pane index
    useEffect(() => {
      const initialIndex = props.defaultpaneindex || 0;
      setActivePaneIndex(initialIndex);
      setActivePanes(new Set([initialIndex]));
    }, [props.defaultpaneindex]);

    // State persistence functions
    const getStateFromStorage = useCallback(() => {
      if (!props.statehandler || props.statehandler === "none") return null;

      try {
        return getWidgetState({ name: props.name, type: "accordion", storage: props.statehandler });
      } catch (error) {
        console.warn("Error reading accordion state:", error);
        return null;
      }
    }, [props.statehandler, props.name]);

    const saveStateToStorage = useCallback(
      (currentActiveIndex: number) => {
        if (!props.statehandler || props.statehandler === "none") return;

        try {
          // Save the current active pane index
          setWidgetState(
            { name: props.name, type: "accordion", storage: props.statehandler },
            String(currentActiveIndex)
          );
        } catch (error) {
          console.warn("Error saving accordion state:", error);
        }
      },
      [props.statehandler, props.name]
    );

    function updateActivePane(index: number, name?: string) {
      if (props?.listener?.onChange) {
        props.listener.onChange(props.name, {
          activePane: { name: name, index: index },
          activePaneIndex: index,
          activePaneName: name,
        });
      }
    }

    // Handle pane expand/collapse
    const handlePaneToggle = useCallback(
      (paneIndex: number, isExpanding: boolean, event?: Event, name?: string) => {
        const newActivePanes = new Set(activePanes);
        if (isExpanding) {
          if (props.closeothers) {
            // Close all other panes
            newActivePanes.clear();
            newActivePanes.add(paneIndex);
          } else {
            // Add this pane to active panes
            newActivePanes.add(paneIndex);
          }
          updateActivePane(paneIndex, name);
          prevActivePaneIndex.current = activePaneIndex;
          setActivePaneIndex(paneIndex);

          // Trigger onChange callback
          if (event && props.onChange) {
            props.onChange({
              newPaneIndex: paneIndex,
              oldPaneIndex: prevActivePaneIndex.current || 0,
            });
          }
        } else {
          // Remove this pane from active panes
          newActivePanes.delete(paneIndex);

          // Update active pane index when collapsing
          if (newActivePanes.size > 0) {
            const firstActivePaneIndex = Array.from(newActivePanes)[0];
            setActivePaneIndex(firstActivePaneIndex);
          }
        }

        setActivePanes(newActivePanes);

        // Save state
        if (event) {
          if (isExpanding) {
            // Save the newly activated pane index
            saveStateToStorage(paneIndex);
          } else {
            // When collapsing, save the first remaining active pane or the current one
            const remainingActivePanes = Array.from(newActivePanes);
            const indexToSave =
              remainingActivePanes.length > 0 ? remainingActivePanes[0] : paneIndex;
            saveStateToStorage(indexToSave);
          }
        }
      },
      [activePanes, activePaneIndex, props.closeothers, saveStateToStorage]
    );

    // Restore state on mount
    useEffect(() => {
      const savedState = getStateFromStorage();
      if (savedState !== null && typeof savedState === "number") {
        setActivePaneIndex(savedState);
        setActivePanes(new Set([savedState]));
      }
    }, [getStateFromStorage]);

    // Accordion methods exposed via listener

    const expand = (index: number = 0) => {
      handlePaneToggle(index, true);
    };
    const collapse = (index: number = 0) => {
      handlePaneToggle(index, false);
    };
    const toggle = (index: number = 0) => {
      const isActive = activePanes.has(index);
      handlePaneToggle(index, !isActive);
    };

    // register the methods
    useEffect(() => {
      if (props?.listener?.onChange && !isMounted.current) {
        const activePaneName = React.Children.toArray(props.children)[activePaneIndex]?.props?.name;

        props.listener.onChange(props.name, {
          expand,
          collapse,
          toggle,
          activePane: {
            name: activePaneName,
          },
          activePaneIndex: activePaneIndex,
          activePaneName: activePaneName,
        });
        isMounted.current = true;
      }
    }, [activePaneIndex, expand, collapse, toggle, props.name, props.children]);

    // Render static panes from children
    const renderPanes = () => {
      if (props.type === "dynamic") {
        if (!props?.dataset || props?.dataset.length === 0 || !isArray(props?.dataset)) {
          return <div>{props.nodatamessage}</div>;
        }

        return props?.dataset?.map((item: any, index: number) => {
          return (
            <div
              className="app-repeat-item"
              key={`repeat-template-${index}-${item?.name || item?.id}`}
            >
              {props.render &&
                props.render(
                  {
                    ...item,
                    active: activePanes.has(index),
                    toggle: (event: any, name?: string) =>
                      handlePaneToggle(index, !activePanes.has(index), event, name),
                    collapse: (event: any, name?: string) =>
                      handlePaneToggle(index, false, event, name),
                    expand: (event: any, name?: string) =>
                      handlePaneToggle(index, true, event, name),
                  },
                  index,
                  props?.dataset
                )}
            </div>
          );
        });
      }

      return props.type === "static"
        ? React.Children.map(props.children, (child, index) => {
            if (React.isValidElement(child) && child.type === WmAccordionPane) {
              return React.cloneElement(child as React.ReactElement<WmAccordionPaneProps>, {
                active: activePanes.has(index),
                toggle: (event: any, name?: string) =>
                  handlePaneToggle(index, !activePanes.has(index), event, name),
                collapse: (event: any, name?: string) =>
                  handlePaneToggle(index, false, event, name),
                expand: (event: any, name?: string) => handlePaneToggle(index, true, event, name),
              });
            }
            return child;
          })
        : null;
    };

    return (
      <div
        className={clsx(DEFAULT_CLASS, props.className)}
        style={props.styles}
        id={props?.id || props?.name}
        data-type="accordion"
        data-statehandler={props.statehandler}
        name={props.name}
        hidden={props.hidden || false}
        show={props.show || true}
      >
        {renderPanes()}
      </div>
    );
  },
  (prevProps, nextProps) => {
    const keys: (keyof WmAccordionProps)[] = [
      "dataset",
      "defaultpaneindex",
      "closeothers",
      "children",
      "hidden",
      "show",
    ];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmAccordion.displayName = "WmAccordion";

export default withBaseWrapper(WmAccordion);
