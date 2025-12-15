// @ts-ignore
import { isObject, isEqual, toString } from "lodash";
import { ChipItem, DataSetItem } from "./props";

export function generateStableKey(item: any, index: number, datafield: string) {
  if (typeof item === "string" || typeof item === "number" || item === null) {
    return `chip_${index}_${String(item)}`;
  }
  if (isObject(item)) {
    if (item.dataObject?.key) {
      return `chip_${index}_${String(item.dataObject?.key)}`;
    }
    if (datafield !== "All Fields" && item[datafield] !== undefined) {
      return `chip_${index}_${String(item[datafield])}`;
    }
    return `chip_${index}_${String(index)}`;
  }
  return `chip_${index}_${String(index)}`;
}

export function processDataset(
  data: any,
  displayfield: string,
  displayexpression: ((data: any) => string) | undefined,
  displayimagesrc: string | undefined,
  datafield: string,
  generateStableKeyFn: (item: any, index: number) => string
) {
  if (!data) return [];
  let normalizedData: any[] = [];
  if (typeof data === "string") {
    normalizedData = data.split(",").map(item => item.trim());
  } else if (Array.isArray(data)) {
    normalizedData = data;
  } else {
    normalizedData = [data];
  }
  return normalizedData.map((item, index) => {
    if (typeof item === "object" && item !== null) {
      const displayKey = displayfield || Object.keys(item)[0];
      return {
        key: generateStableKeyFn(item, index),
        value: item,
        label: item[displayKey] || "",
        displayValue: displayexpression ? displayexpression(item) : item[displayKey] || "",
        displayImage: displayimagesrc ? item[displayimagesrc] : null,
        dataObject: item,
      };
    } else {
      return {
        key: generateStableKeyFn(item, index),
        value: item,
        label: String(item),
        displayValue: String(item),
        displayImage: null,
        dataObject: item,
      };
    }
  });
}

export function getChipDisplayValue(chip: ChipItem, datafield: string) {
  if (datafield === "All Fields") {
    return chip.label || chip.displayValue;
  }
  return chip.value;
}

export function getItemDisplayValue(item: DataSetItem | string, datafield: string) {
  if (typeof item === "string") {
    return item;
  }
  if (datafield === "All Fields") {
    return item.label || item.displayValue;
  }
  return item.value;
}

export function isDuplicate(chipsList: ChipItem[], item: DataSetItem | string, datafield: string) {
  const itemDisplayValue = getItemDisplayValue(item, datafield);
  return chipsList.some(chip => {
    const chipDisplayValue = getChipDisplayValue(chip, datafield);
    if (datafield === "All Fields") {
      return toString(chipDisplayValue).toLowerCase() === toString(itemDisplayValue).toLowerCase();
    } else {
      if (typeof item === "string") {
        return toString(chipDisplayValue) === toString(itemDisplayValue);
      } else {
        const item_dataObject = itemDisplayValue.dataObject
          ? itemDisplayValue.dataObject
          : itemDisplayValue;
        return isEqual(chipDisplayValue, item_dataObject);
      }
    }
  });
}

export function updateMaxSize(
  maxsize: number,
  chipsList: ChipItem[],
  setSaturate: (val: boolean) => void
) {
  setSaturate(maxsize > 0 && chipsList.length === maxsize);
}

// Common functionality for updating chips list and triggering events
export function updateChipsListAndTriggerEvents(
  newChipsList: ChipItem[],
  newModelByValue: any[],
  setChipsList: (chips: ChipItem[]) => void,
  setModelByValue: (model: any[]) => void,
  updateMaxSizeFn: (length: number) => void,
  listener: any,
  name: string,
  event: any,
  onChange?: any,
  onAdd?: any,
  onRemove?: any,
  chipItem?: ChipItem,
  oldModelByValue?: any[],
  props?: any
) {
  // Update state
  setChipsList(newChipsList);
  setModelByValue(newModelByValue);
  updateMaxSizeFn(newChipsList.length);

  // Trigger onChange event
  if (onChange && listener?.Widgets && name && name in listener.Widgets) {
    onChange(event, listener.Widgets[name], newModelByValue, oldModelByValue);
  }

  // Trigger listener.onChange if available
  if (listener?.onChange) {
    listener.onChange(name, {
      ...props,
      datavalue: newModelByValue,
    });
  }

  // Trigger specific events (onAdd, onRemove)
  if (onAdd && chipItem && listener?.Widgets && name && name in listener.Widgets) {
    onAdd(event, listener.Widgets[name], chipItem);
  }

  if (onRemove && chipItem && listener?.Widgets && name && name in listener.Widgets) {
    onRemove(event, listener.Widgets[name], chipItem);
  }
}

// Common functionality for validation before operations
export function validateBeforeOperation(
  listener: any,
  name: string,
  beforeHandler: any,
  event: any,
  item: any
): boolean {
  if (beforeHandler && listener?.Widgets && name && name in listener.Widgets) {
    const allowOperation = beforeHandler(event, listener.Widgets[name], item);
    if (allowOperation === false) {
      return false;
    }
  }
  return true;
}

// Common functionality for creating chip items
export function createChipItem(
  itemToAdd: DataSetItem | string,
  generateUniqueKey: () => string,
  datafield: string,
  displayfield: string,
  createCustomDataModel: (val: string) => any
): DataSetItem {
  if (typeof itemToAdd === "string") {
    if (datafield === "All Fields") {
      const dataObj = createCustomDataModel(itemToAdd);
      if (!dataObj) throw new Error("Failed to create custom data model");
      const newItem: DataSetItem = {
        key: generateUniqueKey(),
        value: dataObj,
        label: itemToAdd,
        displayValue: itemToAdd,
        displayImage: null,
        dataObject: dataObj,
      };
      (newItem as any).iscustom = true;
      return newItem;
    } else {
      const newItem: DataSetItem = {
        key: generateUniqueKey(),
        value: itemToAdd,
        label: itemToAdd,
        displayValue: itemToAdd,
        displayImage: null,
        dataObject: itemToAdd,
      };
      (newItem as any).iscustom = true;
      return newItem;
    }
  } else {
    return itemToAdd;
  }
}

// Common functionality for creating chip items with proper structure
export function createChipItemWithStructure(itemToAdd: DataSetItem): ChipItem {
  return {
    ...itemToAdd,
    active: false,
    isDuplicate: false,
    imgSrc: itemToAdd.displayImage,
    iscustom: (itemToAdd as any).iscustom || false,
  };
}

// Common functionality for validation before adding items
export function validateAddItem(
  newItem: DataSetItem | string,
  chipsList: ChipItem[],
  maxsize: number,
  datafield: string
): boolean {
  if (maxsize && chipsList.length >= maxsize) {
    return false;
  }
  if (isDuplicate(chipsList, newItem, datafield)) {
    return false;
  }
  return true;
}

// Common functionality for search validation
export function validateSearchInput(
  query: string,
  allowonlyselect: boolean,
  maxsize: number,
  chipsList: ChipItem[]
): boolean {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return false;
  if (allowonlyselect) return false;
  if (maxsize && chipsList.length >= maxsize) return false;
  return true;
}

// Common functionality for add item operation
export function performAddItem(
  newItem: DataSetItem | string,
  chipsList: ChipItem[],
  modelByValue: any[],
  setChipsList: (chips: ChipItem[]) => void,
  setModelByValue: (model: any[]) => void,
  setSearchQuery: (query: string) => void,
  updateMaxSizeFn: (length: number) => void,
  listener: any,
  name: string,
  datafield: string,
  displayfield: string,
  createCustomDataModel: (val: string) => any,
  generateUniqueKey: () => string,
  maxsize: number,
  onBeforeadd?: any,
  onChange?: any,
  onAdd?: any,
  props?: any
): boolean {
  // Validate before adding
  if (!validateAddItem(newItem, chipsList, maxsize, datafield)) {
    setSearchQuery("");
    return false;
  }

  // Create item to add
  const itemToAdd = createChipItem(
    newItem,
    generateUniqueKey,
    datafield,
    displayfield,
    createCustomDataModel
  );

  // Validate before operation
  if (
    !validateBeforeOperation(listener, name, onBeforeadd, new MouseEvent("click") as any, itemToAdd)
  ) {
    return false;
  }

  // Create chip item with proper structure
  const chipItem = createChipItemWithStructure(itemToAdd);
  const newChipsList = [...chipsList, chipItem];
  const newModelByValue = [...modelByValue, itemToAdd.value];

  // Update chips list and trigger events
  updateChipsListAndTriggerEvents(
    newChipsList,
    newModelByValue,
    setChipsList,
    setModelByValue,
    updateMaxSizeFn,
    listener,
    name,
    new MouseEvent("change") as any,
    onChange,
    onAdd,
    undefined,
    chipItem,
    modelByValue,
    props
  );

  setSearchQuery("");
  return true;
}

// Common functionality for remove item operation
export function performRemoveItem(
  event: React.MouseEvent,
  item: ChipItem,
  index: number,
  chipsList: ChipItem[],
  modelByValue: any[],
  setChipsList: (chips: ChipItem[]) => void,
  setModelByValue: (model: any[]) => void,
  updateMaxSizeFn: (length: number) => void,
  listener: any,
  name: string,
  onBeforeremove?: any,
  onChange?: any,
  onRemove?: any,
  props?: any
): boolean {
  event.stopPropagation();

  // Validate before operation
  if (!validateBeforeOperation(listener, name, onBeforeremove, event as any, item)) {
    return false;
  }

  const newChipsList = [...chipsList];
  const newModelByValue = [...modelByValue];
  newChipsList.splice(index, 1);
  newModelByValue.splice(index, 1);

  // Update chips list and trigger events
  updateChipsListAndTriggerEvents(
    newChipsList,
    newModelByValue,
    setChipsList,
    setModelByValue,
    updateMaxSizeFn,
    listener,
    name,
    event as any,
    onChange,
    undefined,
    onRemove,
    item,
    modelByValue,
    props
  );

  return true;
}
