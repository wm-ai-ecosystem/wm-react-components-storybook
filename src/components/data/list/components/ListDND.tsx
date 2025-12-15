import React, { ReactNode, useEffect, useState, useCallback, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IDirection } from "../props";

// Utility function to get a unique ID for an item
export const getItemId = (item: any, index: number): string => {
  // Always include index to ensure uniqueness in accumulated data scenarios
  if (item?.id !== undefined) {
    // If item has an id, use it with index for guaranteed uniqueness
    return `item_${item.id}_${index}`;
  }

  if (typeof item === "object" && item !== null) {
    // Create a hash from the first few properties to keep the ID shorter
    const keys = Object.keys(item).slice(0, 3); // Use first 3 properties
    const hashStr = keys
      .map(key => {
        const val = item[key];
        if (typeof val !== "object" && val !== null && val !== undefined) {
          return `${key}:${val}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("_");

    // Always include index for uniqueness
    return hashStr ? `item_${hashStr}_idx${index}` : `item_idx${index}`;
  }

  return `item_idx${index}`;
};

// Enhanced styles for drag and drop - simplified
export const dragStyles = {
  draggable: {
    touchAction: "none",
    userSelect: "none" as const,
  },
  dragging: {
    opacity: 0.5,
    cursor: "grabbing",
    zIndex: 1,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  handle: {
    cursor: "grab",
  },
};

// Direction-aware sortable wrapper component
export const SortableItem = ({
  id,
  children,
  enableReorder,
  disableItem,
  direction = "vertical",
}: {
  id: string;
  children: ReactNode;
  enableReorder?: boolean;
  disableItem?: boolean;
  direction?: IDirection;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: !enableReorder || disableItem,
  });

  // Direction-aware transform constraints - minimal drift allowance
  const getConstrainedTransform = () => {
    if (!transform) return null;

    if (direction === "horizontal") {
      // For horizontal lists, allow horizontal movement but minimal vertical drift
      return {
        ...transform,
        y: Math.max(-5, Math.min(5, transform.y)), // Minimal vertical drift
        scaleX: transform.scaleX || 1,
        scaleY: transform.scaleY || 1,
      };
    } else {
      // For vertical lists, allow vertical movement but minimal horizontal drift
      return {
        ...transform,
        x: Math.max(-5, Math.min(5, transform.x)), // Minimal horizontal drift
        scaleX: transform.scaleX || 1,
        scaleY: transform.scaleY || 1,
      };
    }
  };

  const constrainedTransform = getConstrainedTransform();

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(constrainedTransform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: enableReorder && !disableItem ? "grab" : undefined,
    touchAction: "none",
    position: "relative",
    willChange: "transform",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-draggable={enableReorder && !disableItem}
      data-dragging={isDragging}
      data-direction={direction}
    >
      {children}
    </div>
  );
};

// DnD wrapper component
export const DndWrapper = ({
  children,
  items,
  direction,
  startIndex,
  onDragEnd,
}: {
  children: ReactNode;
  items: any[];
  direction: IDirection;
  startIndex: number;
  onDragEnd: (event: DragEndEvent) => void;
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Standard sensors - simplified
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    onDragEnd(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item, index) => getItemId(item, startIndex + index))}
        strategy={
          direction === "horizontal" ? horizontalListSortingStrategy : verticalListSortingStrategy
        }
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { direction } as any);
          }
          return child;
        })}
      </SortableContext>
      <DragOverlay>{activeId ? <></> : null}</DragOverlay>
    </DndContext>
  );
};

// Hook for managing drag and drop state with performance optimizations
export const useDragAndDrop = (
  initialItems: any[],
  onReorder?: (event: any, data: any, changes: any) => void,
  orderby?: string
) => {
  const [items, setItems] = useState<any[]>(() => initialItems || []);
  const [hasBeenReordered, setHasBeenReordered] = useState<boolean>(false);
  const previousOrderByRef = useRef<string | undefined>(orderby);
  const previousItemsRef = useRef<any[]>(initialItems || []);

  useEffect(() => {
    // Check if orderby has changed
    const orderByChanged = orderby !== previousOrderByRef.current;

    if (orderByChanged) {
      // Reset everything when orderby changes
      setItems(initialItems || []);
      setHasBeenReordered(false);
      previousOrderByRef.current = orderby;
      previousItemsRef.current = initialItems || [];
    } else if (!hasBeenReordered) {
      // Only update items if they have actually changed
      const newItems = initialItems || [];
      const prevItems = previousItemsRef.current;
      const itemsChanged =
        newItems.length !== prevItems.length ||
        newItems.some((item, index) => item !== prevItems[index]);

      if (itemsChanged) {
        setItems(newItems);
        previousItemsRef.current = newItems;
      }
    }
  }, [initialItems, orderby, hasBeenReordered]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setItems(currentItems => {
          const oldIndex = currentItems.findIndex(
            (item, index) => getItemId(item, index) === active.id
          );
          const newIndex = currentItems.findIndex(
            (item, index) => getItemId(item, index) === over.id
          );

          if (oldIndex !== -1 && newIndex !== -1) {
            const newItems = arrayMove(currentItems, oldIndex, newIndex);
            setHasBeenReordered(true);

            // Call onReorder with the new items
            if (onReorder) {
              onReorder(event, newItems, {
                item: currentItems[oldIndex],
                oldIndex,
                newIndex,
              });
            }

            return newItems;
          }
          return currentItems;
        });
      }
    },
    [onReorder]
  );

  return {
    items,
    setItems,
    handleDragEnd,
    hasBeenReordered,
  };
};
