import React from "react";
import { DefaultEventHandler, IPaginationMeta } from "../components/props";
import {
  WmListProps,
  ListItemData,
  ListPaginationChangeHandler,
  ListSetRecordHandler,
  ListItemEventHandler,
} from "../props";

// Generic grouped data item type
export interface GroupedDataItem<T = ListItemData> {
  key: string;
  data: T[];
  originalDataLength?: number; // For pagination count display
  startIndexInGroup?: number; // For group item indexing
}

// Hook configuration type
export type UseListDataProps<T = ListItemData> = Pick<
  WmListProps<T>,
  "datafield" | "displayfield" | "displaylabel" | "getDisplayExpression" | "orderby" | "groupby"
>;

export interface UseListEventHandlersProps<T extends ListItemData = ListItemData> {
  items: T[];
  multiselect: boolean;
  disableitem: boolean;
  selectionlimit: number;
  collapsible: boolean;
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  activeItems: Set<T>;
  setActiveItems: (items: Set<T>) => void;
  firstSelectedItem: T | null;
  setFirstSelectedItem: (item: T | null) => void;
  groupCollapsed: Record<string, boolean>;
  setGroupCollapsed: (collapsed: Record<string, boolean>) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  visibleItems: number;
  setVisibleItems: (count: number) => void;
  isLoadingMore: boolean;
  setIsLoadingMore: (loading: boolean) => void;

  // Updated event callbacks with new signatures
  onClick?: ListItemEventHandler;
  onDblclick?: ListItemEventHandler;
  onMouseEnter?: ListItemEventHandler;
  onMouseLeave?: ListItemEventHandler;
  onSelect?: (widget: unknown, selectedItem: T | null) => void;
  onSelectionlimitexceed?: (event: React.MouseEvent | null, widget: unknown) => void;
  onPaginationchange?: (event: React.MouseEvent | null, widget: unknown, index: number) => void;
  onPageChange?: (event: React.MouseEvent | null, page: number) => void;
  onSetrecord?: (event: React.MouseEvent | null, widget: unknown, index: number, data: T) => void;
  userInitiatedSelectionRef?: React.RefObject<boolean>;
  datasource?: any; // For invoking API calls
  pagesize?: number; // For calculating next page
  navigation?: string; // To check if it's On-Demand
  onDemandCurrentPage?: number; // Current page for On-Demand navigation
  setOnDemandCurrentPage?: (page: number) => void; // Update page for On-Demand
  isServerSidePagination?: boolean; // Flag to indicate server-side pagination
  name?: string; // Name of the list
  listener?: any; // Listener for the list
}

export interface ListEventHandlers<T extends ListItemData = ListItemData> {
  handleListItemClick: DefaultEventHandler<T>;
  handleListItemDoubleClick: DefaultEventHandler<T>;
  handleListItemMouseEnter: DefaultEventHandler<T>;
  handleListItemMouseLeave: DefaultEventHandler<T>;
  handleHeaderClick: (groupKey: string) => void;
  handlePaginationChange: ListPaginationChangeHandler;
  handleSetRecord: ListSetRecordHandler<T>;
  handlePageChange: (page: number) => void;
  handleLoadMore: () => void;
}

export interface UseListPaginationProps<T extends ListItemData = ListItemData> {
  items: T[];
  groupedData?: GroupedDataItem<T>[];
  groupby?: string;
  pagesize: number;
  allowpagesizechange: boolean;
  pagesizeoptions: string;
  navigation: string;
  initialPage?: number;
  datasource?: any; // LiveVariable or ServiceVariable with pagination metadata
}

export interface ListPaginationState<T extends ListItemData = ListItemData> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentPageSize: number;
  setCurrentPageSize: (size: number) => void;
  totalPages: number;
  visibleItems: number;
  setVisibleItems: (count: number) => void;
  currentPageItems: {
    currentItems: T[];
    startIndex: number;
    endIndex: number;
  };
  effectiveTotalPages: number;
  totalItems: number;
  paginationMeta?: IPaginationMeta;
}
