import { getSelectedRowIds, setSelectedRowIds } from "../hooks";
import { CellStateReturn } from "../props";
import {
  INTERACTIVE_CLASSES,
  INTERACTIVE_ROLES,
  INTERACTIVE_DATA_ROLES,
  INTERACTIVE_TAG_NAMES,
} from "./constants";

/**
 * Check if an element has any of the interactive classes
 */
export const hasInteractiveClass = (element: HTMLElement): boolean => {
  if (!element.className || typeof element.className !== "string") return false;

  const className = element.className;
  for (const interactiveClass of INTERACTIVE_CLASSES) {
    if (className.includes(interactiveClass)) {
      return true;
    }
  }
  return false;
};

/**
 * Check if an element has interactive attributes
 */
export const hasInteractiveAttributes = (element: HTMLElement): boolean => {
  // Check contenteditable
  if (element.getAttribute("contenteditable") === "true") {
    return true;
  }

  // Check role attribute
  const role = element.getAttribute("role");
  if (role && INTERACTIVE_ROLES.includes(role as any)) {
    return true;
  }

  // Check data-role attribute
  const dataRole = element.getAttribute("data-role");
  if (dataRole) {
    for (const interactiveRole of INTERACTIVE_DATA_ROLES) {
      if (dataRole.includes(interactiveRole)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Check if element or its ancestors are interactive
 */
export const isInteractiveElement = (event: React.MouseEvent): boolean => {
  const target = event.target as HTMLElement;

  // Check if it's a standard interactive HTML element
  if (INTERACTIVE_TAG_NAMES.includes(target.tagName as any)) {
    return true;
  }

  // Check element and its ancestors
  let element: HTMLElement | null = target;
  while (element) {
    if (hasInteractiveClass(element) || hasInteractiveAttributes(element)) {
      return true;
    }
    element = element.parentElement;
  }

  return false;
};

/**
 * Get row IDs from dataset
 */
export const getRowIdsFromDataset = (dataset: any[]): string[] => {
  return dataset.map(row => row._wmTableRowId || String(row.id));
};

/**
 * Check if a row exists in dataset
 */
export const rowExistsInDataset = (rowId: string, dataset: any[]): boolean => {
  return dataset.some(row => row._wmTableRowId === rowId || String(row.id) === rowId);
};

/**
 * Unified selection state management functions
 * Uses a single selectedRowIds array for both radio and multiselect modes:
 * - Radio select: array contains at most 1 item (replaces on new selection)
 * - Multiselect: array can contain multiple items (add/remove on selection)
 */
export const selectionStateHelpers = {
  // Get current selection (works for both modes)
  getSelection: (cellState: CellStateReturn): string[] => {
    return getSelectedRowIds(cellState);
  },

  // Set selection - replaces entire selection (for radio select)
  setSelection: (cellState: CellStateReturn, rowId: string) => {
    setSelectedRowIds(cellState, [rowId]);
  },

  // Add to selection (for multiselect)
  addToSelection: (cellState: CellStateReturn, rowId: string) => {
    const current = getSelectedRowIds(cellState);
    if (!current.includes(rowId)) {
      setSelectedRowIds(cellState, [...current, rowId]);
    }
  },

  // Remove from selection (for multiselect)
  removeFromSelection: (cellState: CellStateReturn, rowId: string) => {
    const current = getSelectedRowIds(cellState);
    setSelectedRowIds(
      cellState,
      current.filter(id => id !== rowId)
    );
  },

  // Toggle selection (for multiselect - adds if not present, removes if present)
  toggleSelection: (cellState: CellStateReturn, rowId: string): boolean => {
    const current = getSelectedRowIds(cellState);
    const isSelected = current.includes(rowId);

    if (isSelected) {
      selectionStateHelpers.removeFromSelection(cellState, rowId);
    } else {
      selectionStateHelpers.addToSelection(cellState, rowId);
    }

    return !isSelected;
  },

  // Set all selections (for select all in multiselect)
  setAllSelection: (cellState: CellStateReturn, rowIds: string[]) => {
    setSelectedRowIds(cellState, rowIds);
  },

  // Clear all selections
  clearSelection: (cellState: CellStateReturn) => {
    setSelectedRowIds(cellState, []);
  },

  // Check if a row is selected
  isRowSelected: (cellState: CellStateReturn, rowId: string): boolean => {
    return getSelectedRowIds(cellState).includes(rowId);
  },
};
