import React, { useMemo, ReactNode } from "react";
import { WmTableColumnProps } from "../props";
import { generateColumnsFromData, isValidDataForColumns } from "../utils/dynamic-columns";

/**
 * Props for useDynamicColumns hook
 */
interface UseDynamicColumnsProps {
  dataset: any[];
  children: ReactNode;
  listener?: any;
}

/**
 * Return type for useDynamicColumns hook
 */
interface UseDynamicColumnsReturn {
  dynamicColumns: WmTableColumnProps[];
  isDynamicTable: boolean;
}

/**
 * Hook to generate dynamic table columns when no wmTableColumns children are provided
 *
 * This hook automatically detects when:
 * - No children columns are provided (React.Children.count(children) === 0)
 * - Dataset contains valid data
 *
 * When both conditions are met, it generates column definitions from the data,
 * similar to Angular's dynamic table behavior.
 *
 * @param dataset - Array of data objects
 * @param children - React children (wmTableColumns)
 * @param listener - Component listener for event handling
 * @returns Object containing dynamicColumns and isDynamicTable flag
 */
export const useDynamicColumns = ({
  dataset,
  children,
  listener,
}: UseDynamicColumnsProps): UseDynamicColumnsReturn => {
  const { dynamicColumns, isDynamicTable } = useMemo(() => {
    // Check if children are provided (static columns exist)
    const hasChildren = React.Children.count(children) > 0;

    // If children exist, don't generate dynamic columns
    if (hasChildren) {
      return {
        dynamicColumns: [],
        isDynamicTable: false,
      };
    }

    // Check if data is valid for column generation
    if (!isValidDataForColumns(dataset)) {
      // For dynamic tables, return an empty state but mark as dynamic
      // This prevents falling back to static columns when data is just loading
      return {
        dynamicColumns: [],
        isDynamicTable: hasChildren === false, // Only true if explicitly no children
      };
    }

    // Generate columns from data
    const generatedColumns = generateColumnsFromData(dataset);

    // Set listener on all generated columns
    const columnsWithListener = generatedColumns.map(col => ({
      ...col,
      listener,
    }));

    return {
      dynamicColumns: columnsWithListener,
      isDynamicTable: true,
    };
  }, [dataset, children, listener]);

  return { dynamicColumns, isDynamicTable };
};

export default useDynamicColumns;
