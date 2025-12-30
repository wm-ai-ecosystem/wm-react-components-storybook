import { TableStructureItem, TableGroup } from "./index";
import { HeaderCellData, WmTableColumnProps } from "../props";

/**
 * Calculate the colspan for a group based on visible child columns
 */
export const calculateColspan = (group: TableGroup): number => {
  const countVisibleColumns = (items: (TableGroup | WmTableColumnProps)[]): number => {
    let count = 0;

    items.forEach(item => {
      if ("isGroup" in item && item.isGroup) {
        // Recursively count columns in nested groups
        count += countVisibleColumns(item.columns);
      } else {
        // It's a column - check if it's visible
        const column = item as WmTableColumnProps;
        if (column.show !== false) {
          count++;
        }
      }
    });

    return count;
  };

  const colspan = countVisibleColumns(group.columns);
  return colspan || 1; // Return at least 1 to avoid invalid colspan
};

/**
 * Calculate the maximum depth of the hierarchical structure
 */
export const calculateMaxDepth = (structure: TableStructureItem[]): number => {
  let maxDepth = 1;

  structure.forEach(item => {
    if ("isGroup" in item && item.isGroup) {
      const groupDepth = 1 + calculateMaxDepth(item.columns);
      maxDepth = Math.max(maxDepth, groupDepth);
    }
  });

  return maxDepth;
};

/**
 * Generate header rows with proper colspan and rowspan values
 */
export const generateHeaderRows = (
  structure: TableStructureItem[],
  maxDepth: number
): HeaderCellData[][] => {
  const headerRows: HeaderCellData[][] = [];

  // Initialize empty rows
  for (let i = 0; i < maxDepth; i++) {
    headerRows.push([]);
  }

  const processStructure = (items: TableStructureItem[], currentLevel: number = 0) => {
    items.forEach(item => {
      if ("isGroup" in item && item.isGroup) {
        // It's a group - add to current level with colspan
        const groupItem = item as TableGroup;
        const colspan = calculateColspan(groupItem);

        headerRows[currentLevel].push({
          isGroup: true,
          field: groupItem.field,
          displayName: groupItem.displayName || "",
          colspan,
          textAlignment: groupItem.textAlignment,
          backgroundColor: groupItem.backgroundColor,
          class: groupItem.class,
          colClass: groupItem.colClass,
          styles: groupItem.styles,
        });

        // Process children at next level
        processStructure(groupItem.columns, currentLevel + 1);
      } else {
        // It's a column - add with rowspan to reach bottom
        const column = item as WmTableColumnProps;
        if (column.show !== false) {
          const rowspan = maxDepth - currentLevel;

          headerRows[currentLevel].push({
            isGroup: false,
            field: column.field || column.binding || "",
            displayName: column.caption || column.displayName || "",
            rowspan,
            column,
          });
        }
      }
    });
  };

  processStructure(structure);

  return headerRows;
};
/**
 * Check if the table has any groups
 */
export const hasTableGroups = (structure: TableStructureItem[]): boolean => {
  return structure.some(item => "isGroup" in item && item.isGroup);
};
