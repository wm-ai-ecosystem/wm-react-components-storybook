import { LIST_ALIGN } from "./constants";
import { IAlignment, IDirection, ListItemData } from "../props";
import {
  clearWidgetState,
  getWidgetState,
  setWidgetState,
  StorageType,
} from "@wavemaker/react-runtime/utils/state-persistance";
import { isObject, keys } from "lodash-es";

/**
 * Get items per row CSS classes based on configuration
 * @param itemsperrow - Items per row configuration
 * @param direction - List direction
 * @returns CSS class string
 */
export const getItemsPerRowClass = (itemsperrow?: string, direction?: IDirection): string => {
  if (direction === "horizontal") {
    return "";
  }
  if (!itemsperrow) {
    return "col-xs-12";
  }
  if (isNaN(parseInt(itemsperrow, 10))) {
    return itemsperrow
      .split(" ")
      .map(cls => {
        const [tier, value] = cls.split("-");
        const colSize = 12 / parseInt(value, 10);
        return `col-${tier}-${colSize}`;
      })
      .join(" ")
      .trim();
  }
  const numValue = parseInt(itemsperrow, 10);
  return `col-xs-${12 / numValue}`;
};

/**
 * Get text alignment class
 * @param align - Alignment value
 * @returns CSS class string
 */
export const getTextAlignClass = (align: IAlignment): string => {
  switch (align) {
    case LIST_ALIGN.CENTER:
      return "text-center";
    case LIST_ALIGN.RIGHT:
      return "text-right";
    case LIST_ALIGN.LEFT:
    default:
      return "text-left";
  }
};

/**
 * Get safe dataset ensuring it's always an array
 * @param dataset - Input dataset of any type
 * @returns Array dataset with proper typing
 */
export const getSafeDataset = <T extends ListItemData = ListItemData>(dataset: unknown): T[] => {
  if (typeof dataset === "string") {
    try {
      const parsedData = dataset.split(",").map(str => str.trim()) as unknown as T[];
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (e) {
      return [];
    }
  } else if (!(dataset instanceof Array) && isObject(dataset) && Object.keys(dataset).length > 0) {
    return dataset ? [dataset as T] : [];
  }
  return Array.isArray(dataset) ? dataset : [];
};

// Type definition for list state
export interface ListStateData {
  pagination: number;
  pagesize?: number; // Made optional for backward compatibility
  actualpagesize?: number;
  selectedItem: Array<{
    page: number;
    index: number;
  }>;
}

export const saveListState = (
  name: string,
  storage: StorageType,
  stateToSave: Partial<ListStateData>
) => {
  // Simply save the provided state
  setWidgetState(
    {
      name,
      type: "list",
      storage,
    },
    stateToSave
  );
};

export const getListState = (name: string, storage: StorageType): ListStateData | null => {
  const state = getWidgetState({
    name,
    type: "list",
    storage,
  });

  return state as ListStateData;
};

export const clearListState = (name: string, storage: StorageType) => {
  clearWidgetState({
    name,
    storage,
    type: "list",
  });
};

// Helper function to get all descendant elements with data-widget-id
const getAllDescendants = (element: any) => {
  const all: any[] = [];

  function traverse(node: any) {
    // include the node itself if it has data-widget-id
    if (node.nodeType === 1 && node.hasAttribute("data-widget-id")) {
      all.push(node);
    }
    // go deeper
    for (let child of node.children) {
      traverse(child);
    }
  }

  traverse(element);
  return all;
};

export const getSelectedItemWidgets = (
  event: React.MouseEvent<Element> | null,
  listener: any,
  name: string
) => {
  let listItem: Element | null = null;

  if (event) {
    // Manual selection - get from event
    listItem = event.currentTarget;
  } else {
    // Programmatic selection - find active item in DOM
    const activeItems = document.querySelectorAll(`[data-name="${name}"] .app-list-item.active`);
    if (activeItems.length > 0) {
      // Get the last active item (most recently selected)
      listItem = activeItems[activeItems.length - 1];
    }
  }

  const componentElements = listItem ? getAllDescendants(listItem) : [];

  const currentItemWidgets = componentElements.reduce((result: any, comp: any) => {
    // Try different attributes to get widget name
    const widgetName = comp.getAttribute("name");

    if (widgetName) {
      // Try to get the widget instance from the component or create a reference
      let widgetInstance = comp.widget;

      if (!widgetInstance) {
        // Create a basic widget reference with properties from the DOM element
        widgetInstance = {
          name: widgetName,
          caption: comp.getAttribute("caption") || comp.textContent || "",
          value: comp.value || comp.getAttribute("value") || "",
          // Add other common properties
          show: comp.getAttribute("show") !== "false",
          element: comp,
        };
      }

      result[widgetName] = widgetInstance;
    }
    return result;
  }, {});
  const currentItem = currentItemWidgets;
  if (listener && currentItem && Object.keys(currentItem).length > 0) {
    listener.onChange(name, {
      selectedItemWidgets: currentItem,
    });
  }
};
