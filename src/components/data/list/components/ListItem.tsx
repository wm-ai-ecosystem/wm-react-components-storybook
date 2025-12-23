import React, { createContext, useRef, useMemo, useCallback, RefObject, MouseEvent } from "react";
import clsx from "clsx";
import { ListItemContextType, WmListItemProps, ListItemData } from "../props";
import { SortableItem } from "./ListDND";

// Create a default ref for the context
const defaultItemRef: RefObject<HTMLElement | null> = { current: null };

// Create context with better typing
export const ListItemContext = createContext<ListItemContextType>({
  item: {},
  index: -1,
  itemRef: defaultItemRef,
  isFirst: false,
  isLast: false,
  currentItemWidgets: {},
});

/**
 * Builds CSS classes for the list item
 */
const buildItemClasses = (
  itemClass: string,
  isActive: boolean,
  disableItem: boolean,
  isFirst: boolean,
  isLast: boolean
): string => {
  return clsx("app-list-item", itemClass, {
    active: isActive,
    disabled: disableItem,
    "disable-item": disableItem,
    "first-item": isFirst,
    "last-item": isLast,
  });
};

/**
 * List Item Component
 * Renders individual list items with context and drag-and-drop support
 */
export const WmListItem = <T extends ListItemData = ListItemData>({
  item,
  disableItem = false,
  itemClass = "",
  index = 0,
  isFirst = false,
  isLast = false,
  children,
  trackId,
  onItemClick,
  onItemDoubleClick,
  onItemMouseEnter,
  onItemMouseLeave,
  tabIndex,
  isActive = false,
  name,
  enableReorder = false,
  id,
  direction = "vertical",
}: WmListItemProps<T> & { item: T; direction?: "horizontal" | "vertical" }) => {
  const itemRef = useRef<HTMLLIElement>(null);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!disableItem && onItemClick) {
        onItemClick(event, item);
      }
    },
    [disableItem, onItemClick, item]
  );

  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      if (!disableItem && onItemDoubleClick) {
        onItemDoubleClick(event, item);
      }
    },
    [disableItem, onItemDoubleClick, item]
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent) => {
      if (!disableItem && onItemMouseEnter) {
        onItemMouseEnter(event, item);
      }
    },
    [disableItem, onItemMouseEnter, item]
  );

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      if (!disableItem && onItemMouseLeave) {
        onItemMouseLeave(event, item);
      }
    },
    [disableItem, onItemMouseLeave, item]
  );

  // Memoize CSS classes
  const itemClasses = useMemo(
    () => buildItemClasses(itemClass, isActive, disableItem, isFirst, isLast),
    [itemClass, isActive, disableItem, isFirst, isLast]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    (): ListItemContextType<T> => ({
      item,
      index,
      itemRef: itemRef as RefObject<HTMLElement>,
      isFirst,
      isLast,
      currentItemWidgets: {},
    }),
    [item, index, isFirst, isLast]
  );

  // Memoize the list item content
  const listItemContent = useMemo(
    () => (
      <li
        ref={itemRef}
        className={itemClasses}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={tabIndex}
        data-track-id={trackId}
        data-item-index={index}
        data-item-active={isActive}
        aria-selected={isActive}
        role="option"
        {...({ listitemindex: index } as any)}
      >
        <ListItemContext.Provider value={contextValue}>{children}</ListItemContext.Provider>
      </li>
    ),
    [
      itemClasses,
      handleClick,
      handleDoubleClick,
      handleMouseEnter,
      handleMouseLeave,
      tabIndex,
      trackId,
      index,
      isActive,
      contextValue,
      children,
    ]
  );

  // Wrap with SortableItem if enableReorder is true
  if (enableReorder) {
    const sortableId = id || trackId || `item_${index}`;
    return (
      <SortableItem
        id={sortableId}
        enableReorder={enableReorder}
        disableItem={disableItem}
        direction={direction}
      >
        {listItemContent}
      </SortableItem>
    );
  }

  return listItemContent;
};

// Add display name for debugging
WmListItem.displayName = "WmListItem";
