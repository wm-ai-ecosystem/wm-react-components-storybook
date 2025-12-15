import React from "react";
import { getItemId } from "./ListDND";
import { ListItemWithTemplate } from "./ListItemWithTemplate";
import { ListContainer } from "./ListContainer";
import { NoDataMessage } from "./NoDataMessage";
import { ListItemData } from "../props";
import { StandardListItemsProps } from "./props";
import isEqual from "lodash-es/isEqual";
import some from "lodash-es/some";

/**
 * Standard list items renderer for non-grouped lists
 */
export const StandardListItems = <T extends ListItemData = ListItemData>({
  items,
  currentPageItems,
  direction,
  enablereorder,
  disableitem,
  itemclass,
  itemsPerRowClass,
  name,
  tabIndex,
  activeItems,
  renderItem,
  itemTemplate,
  nodatamessage,
  onItemClick,
  onItemDoubleClick,
  onItemMouseEnter,
  onItemMouseLeave,
  onDragEnd,
}: StandardListItemsProps<T>) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return <NoDataMessage message={nodatamessage} />;
  }

  const { currentItems, startIndex } = currentPageItems;

  const listItems = currentItems.map((item: T, index: number) => {
    const globalIndex = startIndex + index;
    const itemId = getItemId(item, globalIndex);
    const isFirst = index === 0;
    const isLast = index === currentItems.length - 1;
    const isActive =
      Array.isArray(activeItems) || activeItems instanceof Set
        ? some(Array.from(activeItems), active => isEqual(active, item))
        : false;
    return (
      <ListItemWithTemplate<T>
        key={itemId}
        item={item}
        index={index}
        globalIndex={globalIndex}
        itemId={itemId}
        isFirst={isFirst}
        isLast={isLast}
        disableitem={disableitem}
        itemclass={itemclass}
        itemsPerRowClass={itemsPerRowClass}
        name={name}
        tabIndex={tabIndex}
        isActive={isActive}
        enablereorder={enablereorder}
        direction={direction}
        renderItem={renderItem}
        itemTemplate={itemTemplate}
        onItemClick={onItemClick}
        onItemDoubleClick={onItemDoubleClick}
        onItemMouseEnter={onItemMouseEnter}
        onItemMouseLeave={onItemMouseLeave}
      />
    );
  });

  return (
    <ListContainer<T>
      direction={direction}
      enablereorder={enablereorder}
      items={currentItems}
      startIndex={startIndex}
      onDragEnd={onDragEnd}
    >
      {listItems}
    </ListContainer>
  );
};
