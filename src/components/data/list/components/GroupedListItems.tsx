import React from "react";
import clsx from "clsx";
import { GroupHeader } from "./GroupHeader";
import { ListItemWithTemplate } from "./ListItemWithTemplate";
import { NoDataMessage } from "./NoDataMessage";
import { LIST_DIRECTION } from "../utils/constants";
import { ListItemData } from "../props";
import { GroupedListItemsProps } from "./props";

/**
 * Grouped list items renderer for grouped lists
 */
export const GroupedListItems = <T extends ListItemData = ListItemData>({
  groupedData,
  paginatedGroupedData,
  direction,
  disableitem,
  itemclass,
  itemsPerRowClass,
  name,
  tabIndex,
  activeItems,
  collapsible,
  showcount,
  groupCollapsed,
  renderItem,
  itemTemplate,
  nodatamessage,
  onItemClick,
  onItemDoubleClick,
  onItemMouseEnter,
  onItemMouseLeave,
  onHeaderClick,
}: GroupedListItemsProps<T>) => {
  if (!groupedData || !Array.isArray(groupedData) || groupedData.length === 0) {
    return <NoDataMessage message={nodatamessage} />;
  }

  const groupsToRender = paginatedGroupedData;

  if (groupsToRender.length === 0) {
    return <NoDataMessage message={nodatamessage} />;
  }

  return (
    <>
      {groupsToRender.map(groupObj => {
        const isGroupCollapsed = groupCollapsed[groupObj.key] || false;
        const displayCount = groupObj.originalDataLength || groupObj.data.length;
        // Build itemclass for grouped items: if function, wrap to append group class
        const groupedItemClass =
          typeof itemclass === "function"
            ? (it: T) => clsx(itemclass(it), "group-list-item")
            : clsx(itemclass, "group-list-item");

        return (
          <li key={`group_${groupObj.key}`} className="app-list-item-group clearfix">
            <ul tabIndex={tabIndex} className={clsx("list-group item-group")}>
              <GroupHeader
                groupKey={groupObj.key}
                displayCount={displayCount}
                isCollapsed={isGroupCollapsed}
                collapsible={collapsible}
                showcount={showcount}
                onHeaderClick={onHeaderClick}
              />

              {!isGroupCollapsed && (
                <li className="list-group-container">
                  <ul
                    className={clsx(
                      "list-group clearfix",
                      direction === LIST_DIRECTION.HORIZONTAL ? "app-horizontal-list" : ""
                    )}
                  >
                    {groupObj.data.map((item: T, index: number) => {
                      const actualIndexInGroup = groupObj.startIndexInGroup + index;
                      const itemId = `group_${groupObj.key}_item_${actualIndexInGroup}`;
                      const isFirst = index === 0;
                      const isLast = index === groupObj.data.length - 1;

                      return (
                        <ListItemWithTemplate<T>
                          key={itemId}
                          item={item}
                          index={actualIndexInGroup}
                          itemId={itemId}
                          isFirst={isFirst}
                          isLast={isLast}
                          disableitem={disableitem}
                          itemclass={groupedItemClass}
                          itemsPerRowClass={itemsPerRowClass}
                          name={`${name}_group_${groupObj.key}`}
                          tabIndex={tabIndex}
                          isActive={activeItems.has(item)}
                          direction={direction}
                          renderItem={renderItem}
                          itemTemplate={itemTemplate}
                          onItemClick={onItemClick}
                          onItemDoubleClick={onItemDoubleClick}
                          onItemMouseEnter={onItemMouseEnter}
                          onItemMouseLeave={onItemMouseLeave}
                        />
                      );
                    })}
                  </ul>
                </li>
              )}
            </ul>
          </li>
        );
      })}
    </>
  );
};
