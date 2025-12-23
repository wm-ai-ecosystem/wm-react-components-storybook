import React, { memo, useEffect, useRef, useState, useMemo, useCallback } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { transformDataset } from "@wavemaker/react-runtime/utils/transformedDataset-utils";
import { WmMenuExtendedProps, AnimationType, PositionType, MenuNode } from "./props";
import {
  KEYBOARD_MOVEMENTS,
  POSITION,
  LAYOUT,
  AUTO_OPEN,
  AUTO_CLOSE,
  DEFAULT_DATASET,
  ANIMATION_CLASSES,
  TOOLTIP_ENTER_DELAY,
  CARET_CLS,
  menuAlignClass,
} from "./constants";
import { isEmpty } from "lodash";
import Link from "next/link";
import { buildMenuListClasses, CollapsibleMenu, MenuList } from "./components/ListItems";
import { triggerItemAction } from "@wavemaker/react-runtime/core/util/utils";
import { usePathname } from "next/navigation";
import { executeActionTaskFromItem } from "@wavemaker/react-runtime/components/navigation/menu/utils/action-task";

const isPathMatchingLink = (path: string, link: string): boolean => {
  return new RegExp(link.replace("#", "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(path);
};

const hasLinkToCurrentPage = (nodes: MenuNode[], currentPath: string): boolean => {
  if (!nodes || !Array.isArray(nodes)) return false;

  return nodes.some(node => {
    if (node.link === currentPath) return true;
    return node.children && hasLinkToCurrentPage(node.children, currentPath);
  });
};

// Custom hooks
const useKeyboardMovements = (menuposition: string) => {
  return useMemo(() => {
    switch (menuposition) {
      case POSITION.UP_RIGHT:
        return { ...KEYBOARD_MOVEMENTS, MOVE_UP: "DOWN-ARROW", MOVE_DOWN: "UP-ARROW" };
      case POSITION.UP_LEFT:
        return {
          ...KEYBOARD_MOVEMENTS,
          MOVE_UP: "DOWN-ARROW",
          MOVE_DOWN: "UP-ARROW",
          MOVE_LEFT: "RIGHT-ARROW",
          MOVE_RIGHT: "LEFT-ARROW",
        };
      case POSITION.DOWN_LEFT:
        return { ...KEYBOARD_MOVEMENTS, MOVE_LEFT: "RIGHT-ARROW", MOVE_RIGHT: "LEFT-ARROW" };
      default:
        return KEYBOARD_MOVEMENTS;
    }
  }, [menuposition]);
};

const useTransformedDataset = (
  dataset: any,
  itemlabel: string,
  orderby?: string,
  itemchildren?: string,
  dataPath?: string
) => {
  return useMemo(() => {
    if (!dataset) return DEFAULT_DATASET;
    return transformDataset(
      dataset,
      undefined,
      itemlabel,
      undefined,
      undefined,
      orderby,
      null,
      dataPath,
      itemchildren
    );
  }, [dataset, itemlabel, orderby]);
};

const useHoverState = () => {
  const [hoveredNodes, setHoveredNodes] = useState<Set<any>>(new Set());
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNodeMouseEnter = useCallback((node: any) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }

    // Clear any pending enter timer
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    // Add node to hovered set immediately
    setHoveredNodes(prev => new Set([...prev, node]));
  }, []);

  const handleNodeMouseLeave = useCallback((node: any, event: React.MouseEvent<HTMLElement>) => {
    const relatedTarget = event?.relatedTarget as HTMLElement;
    const isMovingToChild =
      relatedTarget &&
      (relatedTarget.classList?.contains("dropdown-menu") ||
        relatedTarget.closest?.(".dropdown-menu") !== null);

    // if (!isMovingToChild) {
    // Clear any pending enter timer
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    // Set a delay before removing the node from hovered set
    // leaveTimerRef.current = setTimeout(() => {
    setHoveredNodes(prev => {
      const newSet = new Set(prev);
      newSet.delete(node);
      return newSet;
    });
    // }, HOVER_LEAVE_DELAY);
    // }
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        clearTimeout(leaveTimerRef.current);
      }
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  return { hoveredNodes, handleNodeMouseEnter, handleNodeMouseLeave };
};

// Main component
const WmMenu = memo((props: WmMenuExtendedProps) => {
  const {
    menualign = "left",
    menuposition = "down,right",
    menulayout = "vertical",
    menuclass,
    linktarget = "_self",
    iconclass,
    type = "button",
    animateitems,
    disableMenuContext = false,
    showonhover = false,
    panelPosition,
    autoclose = "outsideClick",
    autoopen = "never",
    hint,
    arialabel,
    width,
    height,
    iconposition = "left",
    caption,
    shortcutkey,
    onClick,
    onSelect,
    navNodes = [],
    styles,
    conditionalstyles,
    className,
    children,
    listener,
    name,
    resetNavNodes,
    nodes$,
    dataset,
    orderby,
    itemlabel = "label",
    itemlink = "Link",
    itemicon = "Icon",
    itemaction,
    userrole,
    itemchildren = "children",
    isactive,
    displayValue,
    onActionsclick,
    dataPath,
    isFromNav = false,
    onNavItemActivate,
    ...restProps
  } = props;

  const path = usePathname();
  // State
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Custom hooks
  const keyboardMovements = useKeyboardMovements(menuposition);
  const transformedDataset = useTransformedDataset(
    dataset,
    itemlabel,
    orderby,
    itemchildren,
    dataPath
  );
  const { hoveredNodes, handleNodeMouseEnter, handleNodeMouseLeave } = useHoverState();

  // Hover handlers for showonhover functionality
  const handleContainerMouseEnter = useCallback(() => {
    if (showonhover) {
      setOpen(true);
    }
  }, [showonhover]);

  const handleContainerMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (!showonhover) return;

      const relatedTarget = event?.relatedTarget as HTMLElement;
      const isMovingToMenu =
        relatedTarget &&
        (relatedTarget.classList?.contains("dropdown-menu") ||
          relatedTarget.closest?.(".dropdown-menu") !== null ||
          relatedTarget.closest?.(".app-menu") !== null);

      if (!isMovingToMenu) {
        setOpen(false);
        setFocusedIndex(-1);
        setActiveItem(null);
      }
    },
    [showonhover]
  );

  // Memoized values
  const transformChildrenDataset = useCallback(
    (children: any[]) => {
      if (!children || !Array.isArray(children)) return [];
      return transformDataset(
        children,
        "",
        itemlabel,
        undefined,
        undefined,
        orderby,
        undefined,
        undefined,
        itemchildren
      );
    },
    [itemlabel, orderby]
  );

  const createRefsForNodes = useCallback(
    (nodes: MenuNode[]): MenuNode[] => {
      if (!nodes || !Array.isArray(nodes)) return [];

      return nodes.map(node => {
        const nodeWithRef = { ...node };
        if (!nodeWithRef.nodeRef) {
          nodeWithRef.nodeRef = React.createRef<HTMLDivElement | null>();
        }

        if (nodeWithRef.children && nodeWithRef.children.length) {
          nodeWithRef.children = createRefsForNodes(transformChildrenDataset(nodeWithRef.children));
        }

        return nodeWithRef;
      });
    },
    [transformChildrenDataset]
  );

  const nodesWithRefs = useMemo(
    () => createRefsForNodes(transformedDataset),
    [transformedDataset, createRefsForNodes]
  );

  const flattenNodes = useCallback((nodes: MenuNode[]): MenuNode[] => {
    if (!nodes || !Array.isArray(nodes)) return [];

    return nodes.reduce((acc: MenuNode[], node) => {
      acc.push(node);
      if (node.children && node.children.length) {
        acc.push(...flattenNodes(node.children));
      }
      return acc;
    }, []);
  }, []);

  const flattenedNodes = useMemo(() => flattenNodes(nodesWithRefs), [nodesWithRefs, flattenNodes]);

  const getNodeProperties = useCallback(
    (node: MenuNode) => {
      const dataObject = node.dataObject || {};
      let label;
      let children;

      // Handle itemlabel - can be a string (field name) or function (expression)
      if (typeof itemlabel === "function") {
        try {
          label = itemlabel(dataObject);
        } catch (error) {
          console.warn("Error evaluating itemlabel expression:", error);
          label = (node as any)?.["label"] || dataObject["label"];
        }
      } else {
        label = (node as any)?.[itemlabel] || dataObject[itemlabel];
      }

      // Handle itemchildren - can be a string (field name) or function (expression)
      if (typeof itemchildren === "function") {
        try {
          const childrenData = itemchildren(dataObject);
          if (Array.isArray(childrenData)) {
            children = transformChildrenDataset(childrenData);
          } else {
            children = childrenData;
          }
        } catch (error) {
          console.warn("Error evaluating itemchildren expression:", error);
          children = (node as any)?.["children"] || dataObject["children"];
        }
      } else {
        children = (node as any)?.[itemchildren] || dataObject[itemchildren];
      }

      return {
        label: label,
        icon: (node as any)?.[itemicon] || dataObject[itemicon],
        link: (node as any)?.[itemlink] || dataObject[itemlink] || dataObject["link"],
        hint: (node as any)?.[hint] || dataObject[hint],
        disabled: node?.disabled || dataObject.disabled,
        children: children,
      };
    },
    [itemlabel, itemicon, itemlink, hint, itemchildren]
  );

  // Computed styles
  const buttonStyles = useMemo(
    () => ({
      ...styles,
      ...conditionalstyles,
      ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
      ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
    }),
    [styles, conditionalstyles, width, height]
  );

  const menuContainerStyles = useMemo(
    () => ({
      textAlign: menualign as any,
      position: "relative" as const,
    }),
    [menualign]
  );

  const getMenuLayoutStyles = useCallback(() => {
    switch (menulayout) {
      case LAYOUT.HORIZONTAL:
        return {
          display: "flex",
          flexDirection: "row" as const,
        };
      case LAYOUT.GRID:
        return {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "8px",
        };
      case LAYOUT.VERTICAL:
      default:
        return {
          display: "block",
        };
    }
  }, [menulayout]);

  // Event handlers
  const handleMenuClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      event.preventDefault();
      if (onClick && listener?.Widgets && name && listener.Widgets[name]) {
        onClick(event, listener.Widgets[name]);
      }

      setOpen(prevState => !prevState);

      if (!open) {
        setActiveItem(null);
        setFocusedIndex(-1);
      }

      // If menu is from nav, notify nav to activate the nav item when menu button is clicked
      if (isFromNav && onNavItemActivate) {
        onNavItemActivate();
      }
    },
    [onClick, listener, name, open, isFromNav, onNavItemActivate]
  );

  const handleMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, item: MenuNode) => {
      const { label, icon, link } = getNodeProperties(item);

      // Only prevent default if item has children (submenu) or no valid link
      if ((item.children && item.children.length > 0) || !link || link === "#") {
        event.preventDefault();
      }

      setActiveItem(item);

      const index = flattenedNodes.findIndex(node => node === item);
      if (index !== -1) {
        setFocusedIndex(index);
      }
      executeActionTaskFromItem(item, listener);

      if (item.children && item.children.length > 0) {
        item.expanded = !item.expanded;
      }

      // Create a simplified item object with only the required properties
      const simplifiedItem = {
        label: label,
        dataValue: item.dataObject?.dataValue || label,
        value: item.dataObject?.dataValue || label,
        icon: icon,
        link: link,
        target: item.dataObject?.target,
      };

      if (onSelect) {
        onSelect(event, props, simplifiedItem);
      }

      // If menu is from nav, notify nav to activate the nav item
      if (isFromNav && onNavItemActivate) {
        onNavItemActivate();
      }

      if (name && listener?.Widgets[name]) {
        listener.Widgets[name].displayValue = label;
      }

      if (listener?.onChange) {
        listener.onChange(name, {
          datavalue: label,
        });
      }
      // Then trigger item action (executes action and/or navigates to link)
      // Use setTimeout to ensure onSelect navigation completes first, then dataset link navigation happens
      setTimeout(() => {
        triggerItemAction(simplifiedItem);
      }, 0);

      if (autoclose === AUTO_CLOSE.ALWAYS && (!item.children || item.children.length === 0)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
      onActionsclick?.(item);
    },
    [
      flattenedNodes,
      onSelect,
      props,
      name,
      listener,
      autoclose,
      getNodeProperties,
      isFromNav,
      onNavItemActivate,
    ]
  );

  // Keyboard navigation
  const focusNode = useCallback(
    (index: number) => {
      if (flattenedNodes[index]?.nodeRef?.current) {
        flattenedNodes[index].nodeRef.current.focus();
      }
    },
    [flattenedNodes]
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
    setActiveItem(null);
    buttonRef.current?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen(prevOpen => !prevOpen);
  }, []);

  const handleArrowDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboardMovements.MOVE_DOWN !== "DOWN-ARROW") return;

      event.preventDefault();

      if (!open) {
        setOpen(true);
        return;
      }

      const nextIndex = focusedIndex < 0 ? 0 : (focusedIndex + 1) % flattenedNodes.length;
      setFocusedIndex(nextIndex);
      focusNode(nextIndex);
    },
    [keyboardMovements, open, focusedIndex, flattenedNodes.length, focusNode]
  );

  const handleArrowUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboardMovements.MOVE_UP !== "UP-ARROW") return;

      event.preventDefault();

      if (!open) {
        setOpen(true);
        return;
      }

      if (focusedIndex === 0) {
        closeMenu();
        return;
      }

      const prevIndex =
        focusedIndex <= 0 ? flattenedNodes.length - 1 : (focusedIndex - 1) % flattenedNodes.length;
      setFocusedIndex(prevIndex);
      focusNode(prevIndex);
    },
    [keyboardMovements, open, focusedIndex, flattenedNodes.length, focusNode, closeMenu]
  );

  const handleEnterOrSpace = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboardMovements.ON_ENTER !== "ENTER") return;

      event.preventDefault();

      if (focusedIndex >= 0 && flattenedNodes[focusedIndex]) {
        handleMenuItemClick(event as any, flattenedNodes[focusedIndex]);
      } else if (open) {
        closeMenu();
      }
    },
    [keyboardMovements, focusedIndex, flattenedNodes, handleMenuItemClick, open, closeMenu]
  );

  const handleEscape = useCallback(
    (event: React.KeyboardEvent) => {
      if (keyboardMovements.ON_ESCAPE !== "ESC") return;
      event.preventDefault();
      closeMenu();
    },
    [keyboardMovements, closeMenu]
  );

  const moveFocusHorizontally = useCallback(
    (direction: 1 | -1) => {
      const nextIndex = (focusedIndex + direction + flattenedNodes.length) % flattenedNodes.length;
      setFocusedIndex(nextIndex);
      focusNode(nextIndex);
    },
    [focusedIndex, flattenedNodes.length, focusNode]
  );

  const expandAndFocusChild = useCallback(
    (currentItem: any) => {
      currentItem.expanded = true;
      const firstChild = currentItem.children[0];
      const childIndex = flattenedNodes.findIndex(node => node === firstChild);

      if (childIndex !== -1) {
        setFocusedIndex(childIndex);
        setActiveItem(flattenedNodes[childIndex]);
        focusNode(childIndex);
      }
    },
    [flattenedNodes, focusNode]
  );

  const collapseAndFocusParent = useCallback(
    (currentItem: any) => {
      const parentIndex = flattenedNodes.findIndex(node =>
        node.children?.some(child => child === currentItem)
      );

      if (parentIndex !== -1) {
        flattenedNodes[parentIndex].expanded = false;
        setFocusedIndex(parentIndex);
        setActiveItem(flattenedNodes[parentIndex]);
        focusNode(parentIndex);
      }
    },
    [flattenedNodes, focusNode]
  );

  const handleArrowRight = useCallback(
    (event: React.KeyboardEvent) => {
      if (menulayout === LAYOUT.HORIZONTAL || keyboardMovements.MOVE_RIGHT !== "RIGHT-ARROW")
        return;

      event.preventDefault();

      if (focusedIndex >= 0 && flattenedNodes[focusedIndex]) {
        const currentItem = flattenedNodes[focusedIndex];

        if (currentItem.children && currentItem.children.length > 0) {
          expandAndFocusChild(currentItem);
        } else if (menulayout === LAYOUT.HORIZONTAL) {
          moveFocusHorizontally(1);
        }
      }
    },
    [
      menulayout,
      keyboardMovements,
      focusedIndex,
      flattenedNodes,
      expandAndFocusChild,
      moveFocusHorizontally,
    ]
  );

  const handleArrowLeft = useCallback(
    (event: React.KeyboardEvent) => {
      if (menulayout === LAYOUT.HORIZONTAL || keyboardMovements.MOVE_LEFT !== "LEFT-ARROW") return;

      event.preventDefault();

      if (focusedIndex >= 0 && flattenedNodes[focusedIndex]) {
        const currentItem = flattenedNodes[focusedIndex];

        if (menulayout === LAYOUT.HORIZONTAL) {
          moveFocusHorizontally(-1);
        } else {
          collapseAndFocusParent(currentItem);
        }
      }
    },
    [
      menulayout,
      keyboardMovements,
      focusedIndex,
      flattenedNodes,
      moveFocusHorizontally,
      collapseAndFocusParent,
    ]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;

      if (key === "Enter" && document.activeElement === buttonRef.current) {
        event.preventDefault();
        toggleMenu();
        return;
      }

      if (!open && key === "Enter") {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (!open && !["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        return;
      }

      if (flattenedNodes.length === 0 && open) return;

      const keyHandlers = {
        ArrowDown: handleArrowDown,
        ArrowUp: handleArrowUp,
        Enter: handleEnterOrSpace,
        " ": handleEnterOrSpace,
        Escape: handleEscape,
        Tab: closeMenu,
        ArrowRight: handleArrowRight,
        ArrowLeft: handleArrowLeft,
      };

      const handler = keyHandlers[key as keyof typeof keyHandlers];
      if (handler) {
        handler(event);
      }
    },
    [
      open,
      flattenedNodes.length,
      toggleMenu,
      handleArrowDown,
      handleArrowUp,
      handleEnterOrSpace,
      handleEscape,
      closeMenu,
      handleArrowRight,
      handleArrowLeft,
    ]
  );

  // Render functions
  const renderMenuItems = useCallback(
    (nodes: MenuNode[]) => {
      if (!nodes || !Array.isArray(nodes)) return null;
      return nodes.map((node, index) => {
        const { label, icon, link, hint, disabled, children } = getNodeProperties(node);
        const nodeValueLink = (node as any)?.value?.link;
        const isActive =
          nodeValueLink && typeof nodeValueLink === "string"
            ? isPathMatchingLink(path, nodeValueLink)
            : link
              ? isPathMatchingLink(path, link)
              : false;

        const [verticalPos, horizontalPos] = menuposition.split(",");
        const isHovered = hoveredNodes.has(node);
        const isSubmenuOpen = node.expanded || hoveredNodes.has(node);

        const submenuClassName = buildMenuListClasses(
          iconposition,
          menulayout,
          horizontalPos,
          panelPosition,
          animateitems as AnimationType,
          menuposition as PositionType,
          isHovered
        );
        return (
          <Box
            component="li"
            key={index}
            className={clsx(
              children && children.length > 0 && "dropdown-submenu",
              "app-menu-item",
              {
                active: isActive,
                hovered: hoveredNodes.has(node),
              }
            )}
            onMouseEnter={() => handleNodeMouseEnter(node)}
            onMouseLeave={e => handleNodeMouseLeave(node, e)}
            style={{ position: "relative" }}
          >
            <Link
              title={label}
              className={disabled ? "disabled" : ""}
              href={"#"}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                handleMenuItemClick(event, node);
              }}
              prefetch={false}
            >
              {children && children.length > 0 && (
                <span
                  className={clsx(
                    "pull-right fa caret",
                    menuAlignClass[menualign as keyof typeof menuAlignClass] || "fa-caret-right"
                  )}
                />
              )}
              {icon && <i className={`app-icon ${icon}`}></i>}
              <span className="anchor-caption">{label || itemlabel}</span>
            </Link>
            {children &&
              children.length > 0 &&
              (type !== "anchor" ? (
                <CollapsibleMenu
                  isOpen={isSubmenuOpen}
                  verticalPos={verticalPos}
                  className={submenuClassName}
                  style={getMenuLayoutStyles()}
                  onMouseEnter={() => handleNodeMouseEnter(node)}
                  onMouseLeave={e => handleNodeMouseLeave(node, e)}
                >
                  {renderMenuItems(children)}
                </CollapsibleMenu>
              ) : (
                isSubmenuOpen &&
                open && (
                  <MenuList
                    className={submenuClassName}
                    style={getMenuLayoutStyles()}
                    onMouseEnter={() => handleNodeMouseEnter(node)}
                    onMouseLeave={e => handleNodeMouseLeave(node, e)}
                    onClick={(event: React.MouseEvent<HTMLElement>) => onActionsclick?.(node)}
                  >
                    {renderMenuItems(children)}
                  </MenuList>
                )
              ))}
          </Box>
        );
      });
    },
    [
      getNodeProperties,
      menuposition,
      hoveredNodes,
      handleNodeMouseEnter,
      handleNodeMouseLeave,
      hint,
      handleMenuItemClick,
      activeItem,
      linktarget,
      iconposition,
      animateitems,
      menualign,
      getMenuLayoutStyles,
      type,
      open,
      panelPosition,
    ]
  );

  // Effects
  useEffect(() => {
    if (!open) return;

    setActiveItem(null);
    setFocusedIndex(-1);
  }, [open]);

  useEffect(() => {
    if (autoopen === AUTO_OPEN.ALWAYS) {
      setOpen(true);
    } else if (autoopen === AUTO_OPEN.ACTIVE_PAGE) {
      const hasActiveItem = transformedDataset.some(node =>
        hasLinkToCurrentPage([node], window.location.pathname)
      );

      if (hasActiveItem) {
        setOpen(true);
      }
    }
  }, [transformedDataset, autoopen]);

  const notifiedPathRef = useRef<string | null>(null);
  useEffect(() => {
    if (
      !isFromNav ||
      !onNavItemActivate ||
      !transformedDataset ||
      transformedDataset.length === 0
    ) {
      return;
    }

    // Check if any menu item is active using the same logic as renderMenuItems
    const checkIfActive = (nodes: MenuNode[]): boolean => {
      if (!nodes || !Array.isArray(nodes)) return false;
      return nodes.some(node => {
        const { link, children } = getNodeProperties(node);
        const nodeValueLink = (node as any)?.value?.link;
        const isActive =
          nodeValueLink && typeof nodeValueLink === "string"
            ? isPathMatchingLink(path, nodeValueLink)
            : link
              ? isPathMatchingLink(path, link)
              : false;

        if (isActive) return true;
        if (children && children.length > 0) {
          return checkIfActive(children);
        }
        return false;
      });
    };

    const hasActiveItem = checkIfActive(transformedDataset);

    // Notify nav if there's an active item and we haven't notified for this path yet
    if (hasActiveItem && notifiedPathRef.current !== path) {
      onNavItemActivate();
      notifiedPathRef.current = path;
      setOpen(true);
    } else if (!hasActiveItem) {
      // Reset when no active item found
      notifiedPathRef.current = null;
    }
  }, [path, transformedDataset, isFromNav, onNavItemActivate, getNodeProperties]);

  useEffect(() => {
    // Handle outside click for both "outsideClick" and "always" autoclose modes
    if (!open || autoclose === AUTO_CLOSE.NEVER) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target) return;

      const clickedInsideMenu = menuRef.current?.contains(event.target as Node);
      const clickedOnButton = buttonRef.current?.contains(event.target as Node);

      if (!clickedInsideMenu && !clickedOnButton) {
        setOpen(false);
        setFocusedIndex(-1);
        setActiveItem(null);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, autoclose]);

  useEffect(() => {
    if (!shortcutkey) return;

    const handleShortcutKey = (event: KeyboardEvent) => {
      const isModifierKey =
        event.altKey || (navigator.platform.indexOf("Mac") !== -1 && event.ctrlKey && event.altKey);

      if (isModifierKey && event.key.toLowerCase() === shortcutkey.toLowerCase()) {
        event.preventDefault();
        setOpen(prev => !prev);
        buttonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcutKey);

    return () => {
      window.removeEventListener("keydown", handleShortcutKey);
    };
  }, [shortcutkey]);

  useEffect(() => {
    if (!nodes$ || typeof nodes$.subscribe !== "function") return;

    const datasetSubscription = nodes$.subscribe(() => {
      if (!dataset) return;

      let itemFound = false;

      const getItem = (nodes: MenuNode[]) => {
        if (!nodes || !Array.isArray(nodes)) return;

        nodes.forEach(item => {
          if (itemFound) return;

          if (item.isactive) {
            itemFound = true;

            if (listener?.Widgets && name && onSelect) {
              const widget = listener.Widgets[name];
              if (widget) {
                onSelect({} as React.MouseEvent<HTMLElement>, widget, item);
              }
            }
            return false;
          }

          if (item.children && !isEmpty(item.children)) {
            getItem(item.children);
          }
        });
      };

      getItem(dataset);
    });

    return () => {
      if (datasetSubscription && typeof datasetSubscription.unsubscribe === "function") {
        datasetSubscription.unsubscribe();
      }
    };
  }, [dataset, nodes$, name, listener, onSelect]);

  // Memoized class names and styles
  const [verticalPos, horizontalPos] = menuposition.split(",");

  const mainMenuClassName = useMemo(
    () =>
      buildMenuListClasses(
        iconposition,
        menulayout,
        horizontalPos,
        panelPosition,
        animateitems as AnimationType,
        menuposition as PositionType
      ),
    [iconposition, menulayout, horizontalPos, panelPosition, animateitems, menuposition]
  );
  const hoverEventHandlers = showonhover
    ? {
        onMouseEnter: handleContainerMouseEnter,
        onMouseLeave: handleContainerMouseLeave,
      }
    : {};

  // Render
  return (
    <div
      caption={caption}
      ref={menuRef}
      className={clsx(
        "dropdown",
        "app-menu",
        menuclass,
        className,
        `menu-layout-${menulayout}`,
        `menu-align-${menualign}`,
        open ? "open" : "",
        menuposition?.startsWith("up") ? "dropup" : "",
        menuposition === POSITION.INLINE ? "dropinline-menu" : ""
      )}
      {...hoverEventHandlers}
      style={{
        ...buttonStyles,
        ...menuContainerStyles,
      }}
      onKeyDown={handleKeyDown}
      role="menu"
      aria-label={arialabel || "Menu"}
      aria-expanded={open}
      type={type}
      name={name}
    >
      <Tooltip title={hint || ""} enterDelay={TOOLTIP_ENTER_DELAY} disableHoverListener={!hint}>
        {type === "anchor" ? (
          <a
            className={clsx("dropdown-toggle app-anchor")}
            icon-position="left"
            role="button"
            onClick={handleMenuClick}
            aria-label={arialabel || "Menu"}
            aria-expanded={open}
            aria-haspopup="true"
            accessKey={shortcutkey}
            tabIndex={props.tabindex}
            style={{
              width:
                width !== undefined
                  ? typeof width === "number"
                    ? `${width}px`
                    : width
                  : undefined,
              height:
                height !== undefined
                  ? typeof height === "number"
                    ? `${height}px`
                    : height
                  : undefined,
              textAlign: menualign as any,
            }}
            {...restProps}
          >
            {iconclass && <i className={clsx("app-icon", iconclass)} aria-hidden="true" />}
            <span className="sr-only">{`${caption} ${listener?.appLocale?.LABEL_ICON}`}</span>
            <span className="anchor-caption">{caption || ""}</span>
            <span
              className={clsx(
                "pull-right caret fa",
                menuposition?.startsWith("up") ? CARET_CLS.UP : CARET_CLS.DOWN
              )}
            />
          </a>
        ) : (
          <Button
            className={clsx("btn dropdown-toggle", `icon-position-${iconposition}`)}
            ref={buttonRef}
            onClick={handleMenuClick}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label={arialabel || "Menu"}
            accessKey={shortcutkey}
            tabIndex={props.tabindex}
            style={{
              width:
                width !== undefined
                  ? typeof width === "number"
                    ? `${width}px`
                    : width
                  : undefined,
              height:
                height !== undefined
                  ? typeof height === "number"
                    ? `${height}px`
                    : height
                  : undefined,
              textAlign: menualign as any,
            }}
            {...restProps}
          >
            {iconclass && <i className={clsx("app-icon", iconclass)} aria-hidden="true" />}
            <span className="caption">{children || caption || "Menu"}</span>
            <span
              className={clsx(
                "pull-right caret fa",
                menuposition?.startsWith("up") ? CARET_CLS.UP : CARET_CLS.DOWN
              )}
            />
          </Button>
        )}
      </Tooltip>
      {type !== "anchor" ? (
        <CollapsibleMenu
          isOpen={open}
          verticalPos={verticalPos}
          className={mainMenuClassName}
          style={getMenuLayoutStyles()}
          {...hoverEventHandlers}
        >
          {renderMenuItems(nodesWithRefs)}
        </CollapsibleMenu>
      ) : (
        open && (
          <MenuList
            className={mainMenuClassName}
            style={getMenuLayoutStyles()}
            {...hoverEventHandlers}
          >
            {renderMenuItems(nodesWithRefs)}
          </MenuList>
        )
      )}
    </div>
  );
});

WmMenu.displayName = "WmMenu";

export default withBaseWrapper(WmMenu);
