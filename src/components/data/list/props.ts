import React from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { DefaultEventHandler } from "./components/props";
import { StorageType } from "@wavemaker/react-runtime/utils/state-persistance";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";

// Navigation types
export type INavigation =
  | "None"
  | "Basic"
  | "Pager"
  | "Classic"
  | "Advanced"
  | "Inline"
  | "On-Demand"
  | "Scroll";
export type IDirection = "horizontal" | "vertical";
export type IAlignment = "left" | "center" | "right";
export type IColumnAlignment = "start" | "center" | "end";

// Generic type for list item data
export type ListItemData = Record<string, unknown> & {
  _wmListItemId?: string;
};

// Updated event handler types
export type ListItemEventHandler = (event: React.MouseEvent, widget: unknown) => void;
export type ListPageEventHandler = (event: React.MouseEvent | null, page: number) => void;
export type ListReorderEventHandler<T = ListItemData> = (
  event: React.MouseEvent | null,
  data: T[],
  changedItem: T
) => void;
export type ListSelectionLimitExceededHandler = (
  event: React.MouseEvent | null,
  widget: unknown
) => void;
export type ListBeforeDataRenderHandler<T = ListItemData> = (widget: unknown, data: T[]) => void;
export type ListSelectHandler<T = ListItemData> = (widget: unknown, selectedItem: T | null) => void;
export type ListPaginationChangeHandler = (
  event: React.MouseEvent | null,
  widget: unknown,
  index: number
) => void;
export type ListSetRecordHandler<T = ListItemData> = (
  event: React.MouseEvent | null,
  widget: unknown,
  index: number,
  data: T
) => void;
export type ListRenderItemHandler<T = ListItemData> = (item: T, index: number) => React.ReactNode;

// Enhanced props interface with proper generics
export interface WmListProps<T = ListItemData>
  extends Omit<BaseProps, "onClick" | "onDoubleClick" | "onMouseEnter" | "onMouseLeave"> {
  name: string; // Required to match BaseProps
  boundarylinks?: boolean;
  collapsible?: boolean;
  dateformat?: string;
  dataset?: T[]; // Generic array type
  datasource?: LiveVariableConfig;
  direction?: IDirection;
  disableitem?: boolean;
  enablereorder?: boolean;
  groupby?: string;
  iconclass?: string;
  itemclass?: string | ((item: T) => string | null | undefined);
  itemsperrow?: string;
  listclass?: string;
  horizontalalign?: IAlignment;
  columnalign?: IColumnAlignment;
  multiselect?: boolean;
  loadingdatamsg?: string;
  loadingicon?: string;
  maxsize?: number;
  statehandler?: StorageType;
  navigation?: INavigation;
  navigationalign?: IAlignment;
  nodatamessage?: string;
  ondemandmessage?: string;
  orderby?: string;
  paginationclass?: string;
  pagesize?: number;
  selectfirstitem?: boolean;
  selectionlimit?: number;
  showcount?: boolean;
  showrecordcount?: boolean;
  allowpagesizechange?: boolean;
  pagesizeoptions?: string;
  subheading?: string;
  title?: string;
  hidehorizontalscrollbar?: boolean;
  children?: React.ReactNode;
  selectedItemWidgets?: Array<any> | any;

  // Updated event handlers with new signatures
  onSelect?: ListSelectHandler<T>;
  onClick?: ListItemEventHandler;
  onDblclick?: ListItemEventHandler;
  onMouseEnter?: ListItemEventHandler;
  onMouseLeave?: ListItemEventHandler;
  onReorder?: ListReorderEventHandler<T>;
  onSelectionlimitexceed?: ListSelectionLimitExceededHandler;
  onBeforedatarender?: ListBeforeDataRenderHandler<T>;
  onRender?: ListBeforeDataRenderHandler<T>;
  onPaginationchange?: ListPaginationChangeHandler;
  onSetrecord?: ListSetRecordHandler<T>;
  onPageChange?: ListPageEventHandler;
  renderItem?: ListRenderItemHandler<T>;

  tabIndex?: number;
  pulltorefresh?: boolean;
  className?: string;
  datafield?: string;
  displayfield?: string;
  getDisplayExpression?: (data: T, index?: number) => string;
  displaylabel?: string;
  deferload?: boolean;
  showNavigation?: boolean;
}

// List item context type
export interface ListItemContextType<T = ListItemData> {
  item: T;
  index: number;
  itemRef: React.RefObject<HTMLElement | null>;
  isFirst: boolean;
  isLast: boolean;
  currentItemWidgets: Record<string, unknown>;
}

// List item props
export interface WmListItemProps<T = ListItemData> extends Omit<BaseProps, "listener"> {
  listener?: Record<string, unknown>; // Make listener optional for list items
  item?: T;
  disableItem?: boolean;
  itemClass?: string;
  index?: number;
  isFirst?: boolean;
  isLast?: boolean;
  children?: React.ReactNode;
  trackId?: string;
  onItemClick?: DefaultEventHandler;
  onItemDoubleClick?: DefaultEventHandler;
  onItemMouseEnter?: DefaultEventHandler;
  onItemMouseLeave?: DefaultEventHandler;
  tabIndex?: number;
  isActive?: boolean;
  enableReorder?: boolean;
  id?: string;
}

// Selection state type
export interface ListSelectionState<T = ListItemData> {
  selectedItems: T[];
  activeItems: Set<T>;
  firstSelectedItem: T | null;
}

export interface ListState {
  selectedItems: ListItemData[];
  setSelectedItems: (items: ListItemData[]) => void;
  activeItems: Set<ListItemData>;
  setActiveItems: (items: Set<ListItemData>) => void;
  firstSelectedItem: ListItemData | null;
  setFirstSelectedItem: (item: ListItemData | null) => void;
}

export interface ListWidgetMethods {
  getItemByIndexOrModel: (val: number | ListItemData) => ListItemData | undefined;
  selectItem: (val: number | ListItemData, statePersistenceTriggered?: boolean) => void;
  deselectItem: (val: number | ListItemData) => void;
  getItem: (index: number) => ListItemData | undefined;
  getIndex: (item: ListItemData) => number;
  clear: () => void;
  getWidgets: (widgetName: string, index?: number) => any;
}
