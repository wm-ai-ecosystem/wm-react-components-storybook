import { useMemo } from "react";
import { groupBy, get, sortBy, map } from "lodash-es";
import { GroupedDataItem } from "./index";
import { ListItemData } from "../props";

/**
 * Custom hook for grouping data
 * @param orderedDataset - The dataset to group
 * @param groupby - The field to group by (supports dot notation for nested properties)
 * @returns Grouped data array
 */
export const useGroupedData = <T extends ListItemData = ListItemData>(
  orderedDataset: T[],
  groupby?: string
): GroupedDataItem<T>[] => {
  return useMemo(() => {
    // Ensure orderedDataset is a valid array
    const validDataset = Array.isArray(orderedDataset) ? orderedDataset : [];
    if (!groupby || !validDataset.length) return [];

    // Group data using lodash groupBy with safe property access
    const grouped = groupBy(validDataset, item => {
      const value = get(item, groupby);
      // If the nested value doesn't exist, group under "Others"
      return value !== undefined ? String(value || "None") : "Others";
    });

    // Convert to sorted array format expected by the component
    return sortBy(
      map(grouped, (data, key) => ({
        key,
        data,
        originalDataLength: data.length,
      })),
      "key"
    );
  }, [orderedDataset, groupby]);
};
