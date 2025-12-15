import React from "react";
import { GroupedDataItem } from "../hooks";
import {
  INavigation,
  IDirection,
  IAlignment,
  ListItemData,
  ListPaginationChangeHandler,
  ListSetRecordHandler,
  ListBeforeDataRenderHandler,
} from "../props";
import { DragEndEvent } from "@dnd-kit/core";

export type DefaultEventHandler<T = ListItemData> = (event: React.MouseEvent, item: T) => void;
// Pagination component props
export interface ListPaginationProps {
  name: string;
  navigation: INavigation;
  orderedDataset: ListItemData[];
  pagesize: number;
  currentPage?: number; // Add this prop to pass current page to pagination
  navigationalign: IAlignment;
  showrecordcount: boolean;
  maxsize: number;
  boundarylinks: boolean;
  paginationclass: string;
  allowpagesizechange?: boolean;
  pagesizeoptions?: string;
  widgetInstance?: unknown;
  onPaginationChange: ListPaginationChangeHandler;
  onSetRecord: ListSetRecordHandler<ListItemData>;
  onPageSizeChange?: (pageSize: number) => void;
  listener: any;
  // Pagination metadata
  paginationMeta?: IPaginationMeta;
  totalItems?: number; // Total items count from pagination metadata
  // Data fetching
  datasource?: any;
  isLoadingMore?: boolean;
  setIsLoadingMore?: (loading: boolean) => void;
  isServerSidePagination?: boolean;
}

export interface IPaginationMeta {
  totalPages: number;
  totalElements: number;
  last: boolean;
  sort: Array<any>;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
}

// List items container component props
export interface ListItemsProps<T = ListItemData> {
  items: T[];
  groupedData?: GroupedDataItem<T>[];
  groupby?: string;
  navigation: INavigation;
  currentPage: number;
  pagesize: number;
  visibleItems: number;
  orderby?: string;
  startIndex?: number;
  endIndex?: number;
  disableitem: boolean;
  itemclass: string | ((item: T) => string | null | undefined);
  itemsPerRowClass: string;
  direction: IDirection;
  enablereorder: boolean;
  activeItems: Set<T>;
  name: string;
  tabIndex?: number;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemTemplate?: React.ReactNode;
  nodatamessage: string;
  ondemandmessage: string;
  loadingicon: string;
  loadingdatamsg: string;
  paginationclass: string;
  isLoadingMore: boolean;
  collapsible: boolean;
  showcount: boolean;
  groupCollapsed: Record<string, boolean>;
  handleListItemClick: DefaultEventHandler;
  handleListItemDoubleClick: DefaultEventHandler;
  handleListItemMouseEnter: DefaultEventHandler;
  handleListItemMouseLeave: DefaultEventHandler;
  handleDragEnd: (event: DragEndEvent) => void;
  handleLoadMore: () => void;
  handleHeaderClick: (groupKey: string) => void;
  onBeforedatarender?: ListBeforeDataRenderHandler<T>;
  onRender?: ListBeforeDataRenderHandler<T>;
  widgetInstance?: unknown;
  rawDataset?: T[]; // For unsorted data
  datasource?: any; // For detecting server-side pagination
  totalItems?: number; // Total items count from pagination metadata
  isServerSidePagination?: boolean; // Flag to indicate server-side pagination
  showNavigation?: boolean; // Flag to control pagination visibility
}

// List header component props
export interface ListHeaderProps {
  title?: string;
  subheading?: string;
  iconclass?: string;
}

// List template component props
export interface ListTemplateProps {
  children: React.ReactNode;
  layout?: string;
  name?: string;
}

// Drag and drop wrapper props
export interface DndWrapperProps<T = ListItemData> {
  items: T[];
  direction: IDirection;
  startIndex: number;
  onDragEnd: (event: DragEndEvent) => void;
  children: React.ReactNode;
}

// Sortable item props for drag and drop
export interface SortableItemProps {
  id: string;
  index: number;
  children: React.ReactNode;
}

// Component-specific prop interfaces

// No data message component props
export interface NoDataMessageProps {
  message: string;
  className?: string;
}

// Load more button component props
export interface LoadMoreButtonProps {
  paginationclass: string;
  isLoadingMore: boolean;
  loadingicon: string;
  loadingdatamsg: string;
  ondemandmessage: string;
  onLoadMore: () => void;
}

// Group header component props
export interface GroupHeaderProps {
  groupKey: string;
  displayCount: number;
  isCollapsed: boolean;
  collapsible: boolean;
  showcount: boolean;
  onHeaderClick: (groupKey: string) => void;
}

// List container component props
export interface ListContainerProps<T extends ListItemData = ListItemData> {
  direction: string;
  enablereorder: boolean;
  items: T[];
  startIndex: number;
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
}

// List item with template component props
export interface ListItemWithTemplateProps<T extends ListItemData = ListItemData> {
  item: T;
  index: number;
  globalIndex?: number;
  itemId: string;
  isFirst: boolean;
  isLast: boolean;
  disableitem: boolean;
  itemclass: string | ((item: T, index?: number) => string | null | undefined);
  itemsPerRowClass: string;
  name: string;
  tabIndex?: number;
  isActive: boolean;
  enablereorder?: boolean;
  direction?: string;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemTemplate?: React.ReactNode;
  onItemClick: DefaultEventHandler;
  onItemDoubleClick: DefaultEventHandler;
  onItemMouseEnter: DefaultEventHandler;
  onItemMouseLeave: DefaultEventHandler;
}

// Standard list items component props
export interface StandardListItemsProps<T extends ListItemData = ListItemData> {
  items: T[];
  currentPageItems: CurrentPageItemsResult<T>;
  direction: string;
  enablereorder: boolean;
  disableitem: boolean;
  itemclass: string | ((item: T, index?: number) => string | null | undefined);
  itemsPerRowClass: string;
  name: string;
  tabIndex?: number;
  activeItems: Set<T>;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemTemplate?: React.ReactNode;
  nodatamessage: string;
  onItemClick: DefaultEventHandler;
  onItemDoubleClick: DefaultEventHandler;
  onItemMouseEnter: DefaultEventHandler;
  onItemMouseLeave: DefaultEventHandler;
  onDragEnd: (event: DragEndEvent) => void;
}

// Grouped list items component props
export interface GroupedListItemsProps<T extends ListItemData = ListItemData> {
  groupedData: GroupedDataItem<T>[];
  paginatedGroupedData: PaginatedGroupedDataItem<T>[];
  direction: string;
  disableitem: boolean;
  itemclass: string | ((item: T, index?: number) => string | null | undefined);
  itemsPerRowClass: string;
  name: string;
  tabIndex?: number;
  activeItems: Set<T>;
  collapsible: boolean;
  showcount: boolean;
  groupCollapsed: Record<string, boolean>;
  renderItem?: (item: T, index: number) => React.ReactNode;
  itemTemplate?: React.ReactNode;
  nodatamessage: string;
  onItemClick: DefaultEventHandler;
  onItemDoubleClick: DefaultEventHandler;
  onItemMouseEnter: DefaultEventHandler;
  onItemMouseLeave: DefaultEventHandler;
  onHeaderClick: (groupKey: string) => void;
}

// Hook-specific interfaces and types

// Current page items hook props
export interface UseCurrentPageItemsProps<T extends ListItemData = ListItemData> {
  items: T[];
  navigation: string;
  currentPage: number;
  pagesize: number;
  visibleItems: number;
  isServerPaginated?: boolean; // Flag to indicate if pagination is handled by server
}

// Current page items result
export interface CurrentPageItemsResult<T extends ListItemData = ListItemData> {
  currentItems: T[];
  startIndex: number;
  endIndex: number;
}

// Paginated grouped data hook props
export interface UsePaginatedGroupedDataProps<T extends ListItemData = ListItemData> {
  groupedData: GroupedDataItem<T>[];
  navigation: string;
  currentPage: number;
  pagesize: number;
  visibleItems: number;
}

// Paginated grouped data item
export interface PaginatedGroupedDataItem<T extends ListItemData = ListItemData>
  extends GroupedDataItem<T> {
  startIndexInGroup: number;
}
