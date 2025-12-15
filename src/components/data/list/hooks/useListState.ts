import { useState, useEffect, useRef } from "react";
import { ListItemData } from "../props";
import { getSelectedItemWidgets } from "../utils/list-helpers";

/**
 * Custom hook for managing list state
 * @param dataset - The dataset array
 * @param pagesize - Number of items per page
 * @param selectfirstitem - Whether to select the first item by default
 * @param selectionlimit - Maximum number of items that can be selected
 * @param listener - Widget listener for widget updates
 * @param name - Widget name
 * @returns State management object for the list
 */
export const useListState = <T extends ListItemData = ListItemData>(
  dataset: T[],
  pagesize: number,
  selectfirstitem: boolean,
  selectionlimit: number,
  listener?: any,
  name?: string
) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [activeItems, setActiveItems] = useState<Set<T>>(new Set());
  const [firstSelectedItem, setFirstSelectedItem] = useState<T | null>(null);
  const [groupCollapsed, setGroupCollapsed] = useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = useState<number>(pagesize);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const isInitialMount = useRef(true);
  const rafRef1 = useRef<number | null>(null);
  const rafRef2 = useRef<number | null>(null);

  useEffect(() => {
    // Ensure dataset is a valid array
    const validDataset = Array.isArray(dataset) ? dataset : [];
    const pageCount = Math.ceil(validDataset.length / (pagesize || 10));
    setTotalPages(prev => (prev !== pageCount ? pageCount : prev));
  }, [dataset, pagesize]);

  // Sync visibleItems with pagesize when pagesize changes
  useEffect(() => {
    setVisibleItems(pagesize);
  }, [pagesize]);

  // Separate effect for select first item to ensure it runs after data is ready
  useEffect(() => {
    const validDataset = Array.isArray(dataset) ? dataset : [];

    // Only select first item on initial mount or when dataset changes from empty to having data
    if (selectfirstitem && validDataset.length > 0) {
      if (isInitialMount.current) {
        const firstItem = validDataset[0];
        setSelectedItems([firstItem]);
        setActiveItems(new Set([firstItem]));
        setFirstSelectedItem(firstItem);
        isInitialMount.current = false;

        // Update selected item widgets after DOM is painted
        if (listener?.onChange && name) {
          rafRef1.current = requestAnimationFrame(() => {
            // getSelectedItemWidgets(null, listener, name);
            rafRef2.current = requestAnimationFrame(() => {
              getSelectedItemWidgets(null, listener, name);
            });
          });
        }
      }
    }
    return () => {
      if (rafRef1.current) {
        cancelAnimationFrame(rafRef1.current);
      }
      if (rafRef2.current) {
        cancelAnimationFrame(rafRef2.current);
      }
    };
  }, [dataset, selectfirstitem, name]);

  return {
    selectedItems,
    setSelectedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    activeItems,
    setActiveItems,
    firstSelectedItem,
    setFirstSelectedItem,
    groupCollapsed,
    setGroupCollapsed,
    visibleItems,
    setVisibleItems,
    isLoadingMore,
    setIsLoadingMore,
  };
};
