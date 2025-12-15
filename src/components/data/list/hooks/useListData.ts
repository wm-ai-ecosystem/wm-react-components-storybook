import { useMemo } from "react";
import { orderBy, get } from "lodash-es";
import { UseListDataProps } from "./props";
import { ListItemData } from "../props";

/**
 * Custom hook for processing and ordering list data
 * @param dataset - The dataset to process
 * @param config - Configuration options for data processing
 * @returns Processed and ordered dataset
 */
export const useListData = <T extends ListItemData = ListItemData>(
  dataset: T[],
  config: UseListDataProps<T>
): T[] => {
  const { orderby, groupby } = config;

  return useMemo(() => {
    // Ensure dataset is a valid array
    const validDataset = Array.isArray(dataset) ? dataset : [];

    if (!validDataset.length) return [];

    // If no ordering or grouping is required, return as-is
    if (!orderby && !groupby) {
      return validDataset;
    }

    // Apply ordering if specified
    if (orderby) {
      // Parse orderby string to extract fields and directions
      const orderFields = orderby.split(",").map(field => {
        const [fieldName, direction = "asc"] = field.trim().split(":");
        return {
          field: fieldName.trim(),
          direction: direction.trim().toLowerCase() as "asc" | "desc",
        };
      });

      // Extract field names and directions for lodash orderBy
      const fields = orderFields.map(
        ({ field }) =>
          (item: T) =>
            get(item, field)
      );
      const directions = orderFields.map(({ direction }) => direction);

      return orderBy(validDataset, fields, directions);
    }

    return validDataset;
  }, [dataset, orderby, groupby]);
};
