import React from "react";
import { IPaginationMeta } from "../../list/components/props";

export type INavigationSize = "small" | "large";

export interface BasicPaginationProps {
  pageCount: number;
  currentPage: number;
  dataSize: number;
  maxResults: number;
  boundarylinks?: boolean;
  directionlinks?: boolean;
  navigationsize?: INavigationSize;
  navigationClass: string;
  maxsize?: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export interface ClassicPaginationProps {
  currentPage: number;
  pageCount: number;
  dataSize: number;
  maxResults: number;
  navigationClass: string;
  showrecordcount?: boolean;
  isDisableFirst: boolean;
  isDisablePrevious: boolean;
  isDisableNext: boolean;
  isDisableLast: boolean;
  isDisableCurrent: boolean;
  isDisableCount: boolean;
  onNavigate: (direction: "first" | "prev" | "next" | "last", event?: React.SyntheticEvent) => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onModelChange: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => boolean;
}

export interface PagerNavigationProps {
  navigationClass: string;
  isDisablePrevious: boolean;
  isDisableNext: boolean;
  onNavigate: (direction: "prev" | "next", event?: React.SyntheticEvent) => void;
}

export interface TotalRecordsProps {
  dataSize?: number;
  variant?: "Basic" | "Classic";
}

export interface PageSizeSelectorProps {
  pagesizeoptions?: string;
  maxResults?: number;
  currentPage?: number;
  dataSize?: number;
  paginationMeta?: IPaginationMeta;
  onPageSizeChange?: (event: React.MouseEvent<HTMLElement>, pageSize: number) => void;
  appLocale?: {
    LABEL_ITEMS_PER_PAGE?: string;
  };
}
