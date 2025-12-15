import { IPaginationMeta } from "../components/props";

/**
 * Default classes and constants for the List component
 */
export const DEFAULT_CLS = "app-livelist app-panel" as const;

// Strongly typed defaults
export const LIST_DEFAULTS = {
  // updated to 20 from 10 as per angular code
  PAGESIZE: 20,
  PAGESIZE_FOR_MODAL_VARIABLE: 5,
  MAX_SIZE: 5,
  BOUNDARY_LINKS: false,
  COLLAPSIBLE: false,
  MULTISELECT: false,
  SELECT_FIRST_ITEM: false,
  SELECTION_LIMIT: 0,
  SHOW_COUNT: false,
  SHOW_RECORD_COUNT: false,
} as const;

// Application locale strings
export const APP_LOCALE = {
  LABEL_FIRST: "First",
  LABEL_PREVIOUS: "Previous",
  LABEL_NEXT: "Next",
  LABEL_LAST: "Last",
  LABEL_TOTAL_RECORDS: "Total Records",
  LABEL_ICON: "Icon",
  LABEL_ITEMS_PER_PAGE: "Items per page",
} as const;

// List messages
export const LIST_MESSAGES = {
  LOADING: "Loading...",
  NO_DATA: "No data found",
  LOAD_MORE: "Load More",
} as const;

// Navigation types enum with const assertion for better type inference
export const LIST_NAVIGATION_TYPES = {
  NONE: "None",
  BASIC: "Basic",
  PAGER: "Pager",
  CLASSIC: "Classic",
  ADVANCED: "Advanced",
  INLINE: "Inline",
  ON_DEMAND: "On-Demand",
  SCROLL: "Scroll",
} as const;

// Direction types
export const LIST_DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
} as const;

// Alignment types
export const LIST_ALIGN = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

// Default pagination metadata for when none is provided
export const DEFAULT_PAGINATION_META: IPaginationMeta = {
  totalPages: 1,
  totalElements: 0,
  last: true,
  sort: [],
  numberOfElements: 0,
  first: true,
  size: 0,
  number: 0,
  empty: true,
};
