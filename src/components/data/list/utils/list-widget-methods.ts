import { useCallback, useMemo } from "react";
import { isEqual } from "lodash-es";
import { ListItemData } from "../props";
import { ListState, ListWidgetMethods } from "../props";

export const useListWidgetMethods = (
  items: ListItemData[],
  listState: ListState,
  multiselect: boolean,
  onSelect?: (widgetInstance: any, item: ListItemData) => void,
  widgetInstance?: any,
  listener?: any,
  userInitiatedSelectionRef?: React.MutableRefObject<boolean>,
  name?: string
): ListWidgetMethods => {
  // Helper function to find an item by index or model
  const getItemByIndexOrModel = useCallback(
    (val: number | ListItemData): ListItemData | undefined => {
      if (typeof val === "number") {
        return items[val];
      } else {
        return items.find((item: ListItemData) => item === val);
      }
    },
    [items]
  );

  // Selects an item in the list by index or model
  const selectItem = useCallback(
    (val: number | ListItemData, statePersistenceTriggered?: boolean) => {
      const item = getItemByIndexOrModel(val);
      if (!item) {
        return;
      }
      const isAlreadySelected = listState.activeItems.has(item);
      if (!isAlreadySelected) {
        if (!statePersistenceTriggered && userInitiatedSelectionRef) {
          userInitiatedSelectionRef.current = true;
        }
        if (multiselect) {
          const newSelectedItems = [...listState.selectedItems, item];
          const newActiveItems = new Set(listState.activeItems);
          newActiveItems.add(item);
          listState.setSelectedItems(newSelectedItems);
          listState.setActiveItems(newActiveItems);
          if (!listState.firstSelectedItem) {
            listState.setFirstSelectedItem(item);
          }
        } else {
          listState.setSelectedItems([item]);
          listState.setActiveItems(new Set([item]));
          listState.setFirstSelectedItem(item);
        }
        if (onSelect && widgetInstance && !statePersistenceTriggered) {
          onSelect(widgetInstance, item);
        }
      }
    },
    [listState.activeItems, getItemByIndexOrModel]
  );

  const deselectItem = useCallback(
    (val: number | ListItemData) => {
      const item = getItemByIndexOrModel(val);
      if (!item) {
        return;
      }
      const isSelected = Array.from(listState.activeItems).some(activeItem =>
        isEqual(activeItem, item)
      );
      if (isSelected) {
        if (userInitiatedSelectionRef) {
          userInitiatedSelectionRef.current = true;
        }
        const newSelectedItems = listState.selectedItems.filter(
          (selectedItem: ListItemData) => !isEqual(selectedItem, item)
        );
        const newActiveItems = new Set(
          Array.from(listState.activeItems).filter(activeItem => !isEqual(activeItem, item))
        );
        listState.setSelectedItems(newSelectedItems);
        listState.setActiveItems(newActiveItems);
        if (isEqual(listState.firstSelectedItem, item)) {
          listState.setFirstSelectedItem(newSelectedItems[0] || null);
        }
      }
    },
    [listState.activeItems, listState.selectedItems]
  );

  const getItem = useCallback((index: number): ListItemData | undefined => {
    return items[index];
  }, []);

  const getIndex = useCallback((item: ListItemData): number => {
    return items.findIndex((listItem: ListItemData) => isEqual(listItem, item));
  }, []);

  const clear = useCallback(() => {
    listState.setSelectedItems([]);
    listState.setActiveItems(new Set());
    listState.setFirstSelectedItem(null);
    const listener_instance = name && listener?.Widgets[name];
    if (listener_instance) {
      listener_instance.selecteditem = undefined;
    }
  }, [listState.setSelectedItems, listState.setActiveItems, listState.setFirstSelectedItem]);

  const getWidgets = useCallback((widgetName: string, index?: number) => {
    if (widgetInstance && widgetInstance[widgetName]) {
      return widgetInstance[widgetName];
    }
    return listener?.Widgets[widgetName];
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      getItemByIndexOrModel,
      selectItem,
      deselectItem,
      getItem,
      getIndex,
      clear,
      getWidgets,
    }),
    [getItemByIndexOrModel, selectItem, deselectItem, getItem, getIndex, clear, getWidgets]
  );
};
