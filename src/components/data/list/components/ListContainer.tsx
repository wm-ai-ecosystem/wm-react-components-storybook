import React from "react";
import clsx from "clsx";
import { DndWrapper } from "./ListDND";
import { LIST_DIRECTION } from "../utils/constants";
import { ListItemData } from "../props";
import { ListContainerProps } from "./props";

/**
 * List container wrapper that optionally includes drag and drop functionality
 */
export const ListContainer = <T extends ListItemData = ListItemData>({
  direction,
  enablereorder,
  items,
  startIndex,
  children,
  onDragEnd,
}: ListContainerProps<T>) => (
  <>
    {enablereorder ? (
      <DndWrapper
        items={items}
        direction={direction as "horizontal" | "vertical"}
        startIndex={startIndex}
        onDragEnd={onDragEnd}
      >
        {children}
      </DndWrapper>
    ) : (
      children
    )}
  </>
);
