import React from "react";
import clsx from "clsx";
import { WmListItem } from "./ListItem";
import { MediaWmListtemplate } from "../templates/media-template";
import { ListItemData } from "../props";
import { ListItemWithTemplateProps } from "./props";

/**
 * Single list item component with template rendering
 */
export const ListItemWithTemplate = <T extends ListItemData = ListItemData>({
  item,
  index,
  globalIndex,
  itemId,
  isFirst,
  isLast,
  disableitem,
  itemclass,
  itemsPerRowClass,
  name,
  tabIndex,
  isActive,
  enablereorder,
  direction = "vertical",
  renderItem,
  itemTemplate,
  onItemClick,
  onItemDoubleClick,
  onItemMouseEnter,
  onItemMouseLeave,
}: ListItemWithTemplateProps<T>) => {
  const templateContent = renderItem
    ? renderItem(item, globalIndex ?? index)
    : itemTemplate || <MediaWmListtemplate />;

  // Resolve item class: support string or function callback
  const resolvedItemClass = typeof itemclass === "function" ? itemclass(item) : itemclass;

  return (
    <WmListItem
      key={itemId}
      item={item}
      disableItem={disableitem}
      itemClass={clsx(resolvedItemClass, itemsPerRowClass)}
      index={globalIndex ?? index}
      isFirst={isFirst}
      isLast={isLast}
      trackId={itemId}
      onItemClick={onItemClick}
      onItemDoubleClick={onItemDoubleClick}
      onItemMouseEnter={onItemMouseEnter}
      onItemMouseLeave={onItemMouseLeave}
      tabIndex={tabIndex}
      isActive={isActive}
      name={`${name}_item_${globalIndex ?? index}`}
      enableReorder={enablereorder}
      id={itemId}
      direction={direction as "horizontal" | "vertical"}
    >
      {templateContent}
    </WmListItem>
  );
};
