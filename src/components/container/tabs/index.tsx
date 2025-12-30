import React, {
  createContext,
  HtmlHTMLAttributes,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import isEqual from "lodash-es/isEqual";
import { Tabs } from "@base-ui-components/react/tabs";
import Typography from "@mui/material/Typography";

import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmTabPane from "@wavemaker/react-runtime/components/container/tabs/tab-pane";

import WmTabsProps, { DEFAULT_PROPS } from "./props";
import { getWidgetState, setWidgetState } from "@wavemaker/react-runtime/utils/state-persistance";
import isArray from "lodash-es/isArray";
import { filterVisibleChildren, handleRemovePane } from "./utils";

const DEFAULT_CLASS = "nav nav-tabs";

// Helper function to check if a component is WmTabPane
const isTabPaneComponent = (child: any): boolean => {
  const displayName = child?.type?.type?.displayName;
  return displayName && (displayName.includes("WmTabpane") || displayName.includes("WmTabPane"));
};

const TabsContext = createContext<{
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}>({
  selectedIndex: 0,
  setSelectedIndex: () => {},
});

export const useTabsContext = () => {
  return useContext(TabsContext);
};

const WmTabs = memo(
  (Props: WmTabsProps) => {
    const props = { ...DEFAULT_PROPS, ...Props };

    // Destructure all used props
    const {
      defaultpaneindex,
      statehandler,
      name,
      listener,
      type,
      dataset,
      children,
      render,
      iconposition,
      tabsposition = "top",
      justified,
      nodatamessage,
      styles,
      className,
      onChange,
    } = props;

    const panesCount = useRef<number>(0);
    const prevSelectedIndex = useRef<number | null>(null);
    const currentSelectedIndex = useRef<number>(defaultpaneindex || 0);
    const [selectedIndex, setSelectedIndex] = useState<number>(defaultpaneindex || 0);
    const [hiddenTabNames, setHiddenTabNames] = useState<Set<string>>(new Set());

    // Keep currentSelectedIndex ref in sync with state
    useEffect(() => {
      currentSelectedIndex.current = selectedIndex;
    }, [selectedIndex]);

    // Helper function to change tab with proper state management
    const changeTab = (newIndex: number) => {
      if (
        newIndex >= 0 &&
        newIndex < panesCount.current &&
        newIndex !== currentSelectedIndex.current
      ) {
        prevSelectedIndex.current = currentSelectedIndex.current;
        setSelectedIndex(newIndex);
        saveStateToStorage(newIndex);
        return true;
      }
      return false;
    };

    // go to previous tab - using useCallback to ensure fresh closure
    const prev = React.useCallback(() => {
      const currentIndex = currentSelectedIndex.current;
      const targetIndex = currentIndex - 1;

      if (targetIndex >= 0) {
        changeTab(targetIndex);
      } else {
        // Wrap around to the last tab when at the first tab
        changeTab(panesCount.current - 1);
      }
    }, []);

    // go to next tab - using useCallback to ensure fresh closure
    const next = React.useCallback(() => {
      const currentIndex = currentSelectedIndex.current;
      const targetIndex = currentIndex + 1;

      if (targetIndex < panesCount.current) {
        changeTab(targetIndex);
      } else {
        // Wrap around to the first tab when at the last tab
        changeTab(0);
      }
    }, []);

    // go to specific tab - using useCallback to ensure fresh closure
    // Accepts 1-based index (1 = first tab, 2 = second tab, etc.)
    const goToTab = React.useCallback((tabNumber: number) => {
      // Convert from 1-based to 0-based index
      const index = tabNumber - 1;

      // Validate the tab number is within valid range
      if (
        tabNumber >= 1 &&
        tabNumber <= panesCount.current &&
        index !== currentSelectedIndex.current
      ) {
        changeTab(index);
      }
    }, []);

    // get the current active tab name
    const getActiveTabName = React.useCallback(() => {
      const currentIndex = currentSelectedIndex.current;

      if (type === "dynamic" && dataset?.length > 0) {
        return dataset[currentIndex]?.name || null;
      }

      // For static tabs, compute from visible children
      const visibleChildren = filterVisibleChildren(children, hiddenTabNames);
      const activeChild = visibleChildren[currentIndex] as any;
      return activeChild?.props?.name || null;
    }, [type, dataset, children, hiddenTabNames]);

    // get the active tab widget from listener
    const getActiveTab = React.useCallback(() => {
      const activeTabName = getActiveTabName();
      return activeTabName ? listener?.Widgets?.[activeTabName] : null;
    }, [getActiveTabName, listener]);

    const updateListener = () => {
      if (listener && listener.onChange) {
        listener.onChange(name, {
          prev,
          next,
          activeTab: getActiveTab(),
          panes: { length: panesCount.current },
          goToTab: (tabNumber: number) => {
            goToTab(tabNumber);
          },
          getActiveTabIndex: () => {
            return currentSelectedIndex.current;
          },
          removePane: (TabName: string) => {
            handleRemovePane({
              type,
              dataset,
              children,
              hiddenTabNames,
              TabName,
              selectedIndex,
              currentSelectedIndex,
              panesCountRef: panesCount,
              setHiddenTabNames,
              setSelectedIndex,
              saveStateToStorage,
            });
          },
        });
      }
    };

    // register the methods
    useEffect(() => {
      updateListener();
    }, [prev, next, goToTab]); // Add dependencies to ensure fresh functions

    // State handler functions
    const getStateFromStorage = () => {
      if (!statehandler || statehandler === "none") return null;
      return getWidgetState({ name, type: "tabs", storage: statehandler });
    };

    const saveStateToStorage = (index: number) => {
      if (!statehandler || statehandler === "none") return;
      setWidgetState({ name, type: "tabs", storage: statehandler }, String(index));
    };

    useEffect(() => {
      let targetIndex = defaultpaneindex || 0;

      // Try to restore from state handler first
      const savedState = getStateFromStorage();
      if (savedState) {
        targetIndex = savedState;
      } else {
        // Convert defaultpaneindex to number if it's a string
        if (defaultpaneindex !== undefined) {
          const parsedIndex = parseInt(defaultpaneindex.toString(), 10);
          targetIndex = isNaN(parsedIndex) ? 0 : parsedIndex;
        }
      }

      setSelectedIndex(targetIndex);
      currentSelectedIndex.current = targetIndex;
      // Don't set prevSelectedIndex here as it should remain null for initial state
    }, [defaultpaneindex, statehandler, name]);

    // ============================================================================
    // Rendering Helpers
    // ============================================================================

    const handleTabHeaderClick = React.useCallback(
      (e: React.SyntheticEvent, item: any, index: number) => {
        if (item?.disabled) {
          return;
        }
        if (item?.onHeaderclick) {
          item.onHeaderclick(e, listener?.Widgets[name], index);
        }
      },
      []
    );

    const renderTabHeader = React.useCallback(
      (item: any, index: number) => (
        <Tabs.Tab
          {...item}
          title={item.title || item.name || `Tab ${index + 1}`}
          name={item.name || `Tab ${index + 1}`}
          key={index}
          value={index}
          id={`tab-${index}`}
          aria-controls={`tabpanel-${index}`}
          disabled={item?.disabled}
          className={clsx("tab-header", item.className, {
            active: selectedIndex === index,
            disabled: item?.disabled,
          })}
          hidden={item.show === false}
          role="tab"
          aria-selected={selectedIndex === index}
          tabIndex={selectedIndex === index ? 0 : -1}
          render={prop => (
            <li {...prop}>
              <div
                style={{
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  gap: "var(--wm-anchor-gap)",
                }}
                className="tab-heading"
                icon-position={iconposition || "left"}
                title={item.title || item.name || `Tab ${index + 1}`}
                aria-selected={selectedIndex === index}
                aria-disabled={item.disabled}
                aria-hidden={item.show === false}
                aria-controls={`tabpanel-${index}`}
                onClick={e => handleTabHeaderClick(e, item, index)}
              >
                {item.paneicon && <i className={`app-icon ${item.paneicon}`} />}
                <Typography variant="body2" component="span">
                  {item.title || item.name || `Tab ${index + 1}`}
                </Typography>
                {item.badgevalue && (
                  <Typography
                    variant="body2"
                    component="span"
                    className={`label label-${item.badgetype || "default"}`}
                  >
                    {item.badgevalue}
                  </Typography>
                )}
              </div>
            </li>
          )}
        />
      ),
      [selectedIndex, iconposition]
    );

    const renderDynamicTabs = React.useCallback(() => {
      if (!dataset?.length) return null;

      const headers: React.ReactElement[] = [];
      let tabIndex = 0;

      const addTabHeader = (itemProps: any) => {
        headers.push(
          <React.Fragment key={tabIndex}>{renderTabHeader(itemProps, tabIndex)}</React.Fragment>
        );
        tabIndex++;
      };

      dataset.forEach((item, index) => {
        if (render) {
          const rendered = render(item, index, dataset) as any;
          const children = rendered?.props?.children;

          if (isArray(children)) {
            children.filter(isTabPaneComponent).forEach((child: any) => addTabHeader(child.props));
          } else if (children?.props) {
            addTabHeader(children.props);
          }
        } else {
          addTabHeader(item);
        }
      });

      panesCount.current = tabIndex;
      return headers;
    }, [dataset, render, renderTabHeader]);

    const renderStaticTabs = React.useCallback(() => {
      // Consider only panes with show !== false and not hidden via internal state
      const visibleChildren = filterVisibleChildren(children, hiddenTabNames) as any[];
      panesCount.current = visibleChildren.length;
      return visibleChildren.map((child: any, index: number) => {
        if (!child) return null;
        const paneName = child?.props?.name;
        const latestWidgetState = paneName ? (listener as any)?.Widgets?.[paneName] || {} : {};
        const itemProps = { ...child.props, ...latestWidgetState };
        return <React.Fragment key={index}>{renderTabHeader(itemProps, index)}</React.Fragment>;
      });
    }, [children, renderTabHeader, hiddenTabNames]);

    const renderTabs = React.useMemo(() => {
      return type === "dynamic" && dataset?.length > 0 ? renderDynamicTabs() : renderStaticTabs();
    }, [type, dataset, renderDynamicTabs, renderStaticTabs]);

    // for vertical tabs, we need to set the flex direction to row
    const orientation =
      tabsposition === "left" || tabsposition === "right" ? "vertical" : "horizontal";

    // Get the proper flex direction based on tab position
    const getFlexDirection = () => {
      switch (tabsposition) {
        case "left":
          return "row";
        case "right":
          return "row-reverse";
        case "bottom":
          return "column-reverse";
        case "top":
        default:
          return "column";
      }
    };

    const renderTabPanels = () => {
      if (type === "dynamic" && dataset?.length > 0) {
        return dataset?.map((item, index) => (
          <React.Fragment key={index}>
            {render ? (
              render(item, index, dataset)
            ) : (
              <WmTabPane
                {...item}
                key={index}
                value={selectedIndex}
                listener={listener} // Pass the updated listener context
                className={clsx("tab-pane", {
                  active: selectedIndex === index,
                  disabled: item.disabled,
                  hidden: item.show === false,
                })}
              />
            )}
          </React.Fragment>
        ));
      }

      // For static tabs, render only visible panes
      const visibleChildren = filterVisibleChildren(children, hiddenTabNames);
      return visibleChildren as any;
    };

    if (type === "dynamic" && dataset?.length <= 0) {
      return <div>{nodatamessage}</div>;
    }

    return (
      <TabsContext.Provider value={{ selectedIndex, setSelectedIndex }}>
        <Tabs.Root
          style={{
            ...styles,
            display: "flex",
            flexDirection: getFlexDirection(),
          }}
          {...({ name } as HtmlHTMLAttributes<HTMLDivElement>)}
          value={selectedIndex}
          onValueChange={value => {
            const newIndex = value as number;
            const oldIndex = currentSelectedIndex.current;

            // Update refs and state
            prevSelectedIndex.current = oldIndex;
            currentSelectedIndex.current = newIndex;
            setSelectedIndex(newIndex);
            saveStateToStorage(newIndex);
            onChange?.(null as any, props, newIndex, oldIndex);

            // Notify listener about tab change
            updateListener();
          }}
          orientation={orientation as "vertical" | "horizontal"}
          className={clsx("app-tabs clearfix", className, {
            vertical: orientation === "vertical",
            justified: justified,
          })}
        >
          <Tabs.List
            className={clsx(DEFAULT_CLASS, {
              "nav-stacked": orientation === "vertical",
              "nav-justified": justified,
            })}
            role="tablist"
            render={(props, state) => {
              return <ul {...props}>{renderTabs}</ul>;
            }}
          />
          <div
            className="tab-content"
            style={{
              flex: orientation === "vertical" ? 1 : undefined,
              minWidth: orientation === "vertical" ? 0 : undefined,
            }}
          >
            {renderTabPanels()}
          </div>
        </Tabs.Root>
      </TabsContext.Provider>
    );
  },
  (prev, next) => {
    const keys: (keyof WmTabsProps)[] = [
      "dataset",
      "defaultpaneindex",
      "justified",
      "tabsposition",
      "nodatamessage",
      "statehandler",
      "autotabactivation",
      "transition",
      "type",
      "iconposition",
      "render",
      "selectedindex",
      "children",
    ];
    return keys.every(key => {
      // Never deep-compare children; treat as referential bcz the children will have listener props attached cause infinite comparion.
      if (key === "children") {
        return prev[key] === next[key];
      }
      return isEqual(prev[key], next[key]);
    });
  }
);

WmTabs.displayName = "WmTabs";

export default withBaseWrapper(WmTabs);
