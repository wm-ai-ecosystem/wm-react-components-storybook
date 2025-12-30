import { memo, useState, useCallback, useRef, useMemo } from "react";
import clsx from "clsx";
import List from "@mui/material/List";
import { WmNavItem } from "@wavemaker/react-runtime/components/navbar/nav-item";
import { WmAnchor } from "@wavemaker/react-runtime/components/basic/anchor";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import WmNavProps from "@wavemaker/react-runtime/components/navbar/nav/props";
import WmMenu from "@wavemaker/react-runtime/components/navigation/menu";
import { triggerItemAction } from "@wavemaker/react-runtime/core/util/utils";
import { getCurrentPath, getItemLink } from "@wavemaker/react-runtime/core/util/utils";
import { getOrderedDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";

const NavClassTypes: Record<string, string> = {
  pills: "nav-pills",
  tabs: "nav-tabs",
  navbar: "navbar-nav",
};

const DEFAULT_CLASS = "nav app-nav";

const WmNav = memo(
  (props: WmNavProps) => {
    const {
      layout,
      type = "navbar",
      className,
      children,
      name,
      styles,
      id,
      dataset,
      orderby,
    } = props;
    const path = getCurrentPath();
    const [activeNavItemIndex, setActiveNavItemIndex] = useState<number | null>(null);
    const [hoveredNavItemIndex, setHoveredNavItemIndex] = useState<number | null>(null);
    const activeNavItemIndexRef = useRef<number | null>(null);

    // Apply orderby to dataset
    // Format: "field:direction" or "field1:direction1,field2:direction2"
    // Example: "name:asc" or "priority:desc,name:asc"
    const orderedDataset = useMemo(() => {
      if (!dataset || !Array.isArray(dataset)) {
        return dataset;
      }
      return getOrderedDataset(dataset, orderby);
    }, [dataset, orderby]);

    const triggerActionClickForAnchor = (
      e: React.MouseEvent<HTMLElement> | undefined,
      item: any
    ) => {
      e?.preventDefault();
      triggerItemAction({
        label: getItemLabel(item),
        link: item[props.itemlink || "link"],
        target: item[props.itemtarget],
      });
    };

    // Helper function to get the label - handles both string and function
    const getItemLabel = (item: any): string => {
      const { itemlabel } = props;

      if (typeof itemlabel === "function") {
        try {
          return itemlabel(item);
        } catch (error) {
          console.warn("Error in itemlabel function:", error);
        }
      }

      // If itemlabel is a string, use it as property name
      if (typeof itemlabel === "string") {
        return item[itemlabel];
      }

      // Fallback
      return item["label"];
    };

    // Handler to activate nav item when menu detects active item or menu item is clicked
    const handleNavItemActivate = useCallback((navItemIndex: number) => {
      return () => {
        activeNavItemIndexRef.current = navItemIndex;
        setActiveNavItemIndex(navItemIndex);
      };
    }, []);

    // Handler for nav item hover enter
    const handleNavItemMouseEnter = useCallback((index: number) => {
      return (event?: React.MouseEvent<HTMLElement>) => {
        setHoveredNavItemIndex(index);
      };
    }, []);

    // Handler for nav item hover leave
    const handleNavItemMouseLeave = useCallback((event?: React.MouseEvent<HTMLElement>) => {
      setHoveredNavItemIndex(null);
    }, []);

    // Check if nav item should be active - menu handles its own active detection
    const isNavItemActive = useCallback(
      (item: any, index: number): boolean => {
        const currentActiveIndex = activeNavItemIndexRef.current;
        if (currentActiveIndex !== null && currentActiveIndex !== undefined) {
          return currentActiveIndex === index;
        }

        const subActions = item["itemchildren"] || item["children"] || item["SubActions"];
        const hasSubactions = Array.isArray(subActions) && subActions.length > 0;

        if (hasSubactions) {
          return false;
        }

        const itemLink = getItemLink(item, props);
        if (itemLink) {
          const currentRoute = `#/${path.split("/").filter(Boolean).pop() || ""}`;
          if (itemLink === currentRoute || path === itemLink.replace("#", "")) {
            return true;
          }
        }
        return false;
      },
      [activeNavItemIndex, path]
    );

    const renderNavItem = () => {
      if (orderedDataset && orderedDataset.length > 0) {
        return orderedDataset.map((item: any, index: number) => {
          const label = getItemLabel(item);
          const isActive = isNavItemActive(item, index);

          const subActions = item["itemchildren"] || item["children"] || item["SubActions"];
          const hasSubactions = Array.isArray(subActions) && subActions.length > 0;
          const childComponent = hasSubactions ? (
            <WmMenu
              name=""
              itemlabel={props.itemlabel}
              itemlink={props.itemlink}
              itemicon={props.itemicon}
              listener={{}}
              iconclass={item[props.itemicon]}
              caption={label}
              dataset={subActions}
              type="anchor"
              isFromNav={true}
              onNavItemActivate={handleNavItemActivate(index)}
              onSelect={props.onSelect}
              isNavFromMenu={true}
            />
          ) : (
            <WmAnchor
              name={""}
              listener={{}}
              caption={label}
              iconclass={item[props.itemicon]}
              iconposition={item[props.iconposition]}
              iconheight={item[props.iconheight]}
              iconwidth={item[props.iconwidth]}
              iconmargin={item[props.iconmargin]}
              hyperlink={"#"}
              onClick={e => triggerActionClickForAnchor(e, item)}
              target={item[props.itemtarget]}
              action={item[props.itemaction]}
              badgevalue={item[props.itembadge]}
              children={item[props.itemchildren]}
              hint={item[props.itemhint]}
            />
          );

          return (
            <WmNavItem
              key={index}
              name=""
              listener={{}}
              className={clsx(
                hasSubactions ? `nav-${type}` : "",
                isActive ? "active" : "",
                hoveredNavItemIndex === index ? "active" : ""
              )}
              hint={item[props.itemhint]}
              onMouseEnter={handleNavItemMouseEnter(index)}
              onMouseLeave={handleNavItemMouseLeave}
            >
              {childComponent}
            </WmNavItem>
          );
        });
      }
      return children;
    };

    const { backgroundImage, backgroundRepeat, backgroundPosition, textAlign } = styles || {};

    return (
      <List
        disablePadding
        sx={{
          "&": {
            width: props.styles?.width || "auto",
            height: props.styles?.height || "auto",
            justifyContent: "normal",
          },
          " & .MuiListItem-root": {
            width: "auto",
          },
        }}
        style={{
          ...styles,
          backgroundImage: backgroundImage,
          backgroundRepeat: backgroundRepeat,
          backgroundPosition: backgroundPosition,
        }}
        role="navigation"
        className={clsx(DEFAULT_CLASS, className, `nav-${layout} ${NavClassTypes[type]}`)}
        id={id}
        name={props.name}
        hidden={props.hidden ?? false}
      >
        {renderNavItem()}
      </List>
    );
  },
  (prev, current) => {
    const keys: (keyof WmNavProps)[] = [
      "layout",
      "type",
      "className",
      "styles",
      "children",
      "dataset",
      "orderby",
    ];
    return keys.every(key => prev[key] === current[key]);
  }
);

WmNav.displayName = "WmNav";

export default memo(withBaseWrapper(WmNav));
