import React from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { IAlignment, INavigation } from "../../list/props";
import { INavigationSize } from "../components/props";
import { IPaginationMeta } from "../../list/components/props";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";

export interface UseNavigationSizeProps {
  navigation?: INavigation;
  navigationsize?: INavigationSize;
}

export interface UsePaginationProps {
  dataset?: any[];
  maxResults?: number;
  currentPage?: number; // Add this prop to allow initial page setting
  navigation?: INavigation;
  name: string;
  listener?: any; // Keep for backward compatibility
  onPaginationChange?: (event: React.MouseEvent | null, widget: unknown, index: number) => void;
  onSetRecord?: (event: React.MouseEvent | null, widget: unknown, index: number, data: any) => void;
  onPageSizeChange?: (pageSize: number) => void;
  paginationMeta?: IPaginationMeta; // Add pagination metadata
  totalItems?: number; // Add total items count
  datasource?: LiveVariableConfig; // LiveVariable or ServiceVariable for pagination operations
  isLoadingMore?: boolean;
  setIsLoadingMore?: (loading: boolean) => void;
  isServerSidePagination?: boolean; // Flag to indicate server-side pagination
  datasourceInvokeOptions?: {
    orderBy?: string;
    filterFields?: Record<string, any>;
    condition?: string;
  }; // Additional options to pass when invoking datasource
}

export interface PaginationState {
  currentPage: number;
}

export interface PageInfo {
  currentPage: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface EventCallbackData {
  $event: Event | undefined;
  $data?: any;
  $index?: number;
  pageInfo?: PageInfo;
  data?: any;
}

export interface WmPaginationProps extends BaseProps {
  dataset?: any[];
  maxResults?: number;
  currentPage?: number; // Add this prop to allow initial page setting
  navigation?: INavigation;
  navigationsize?: INavigationSize;
  navigationalign?: IAlignment;
  showrecordcount?: boolean;
  maxsize?: number;
  boundarylinks?: boolean;
  directionlinks?: boolean;
  datasource?: any;
  binddataset?: string;
  allowpagesizechange?: boolean;
  pagesizeoptions?: string;
  paginationMeta?: IPaginationMeta; // Add pagination metadata
  totalItems?: number; // Add total items count
  listener: any; // Keep required to match BaseProps
  // Direct handler props
  onPaginationChange?: (event: React.MouseEvent | null, widget: unknown, index: number) => void;
  onSetRecord?: (event: React.MouseEvent | null, widget: unknown, index: number, data: any) => void;
  onDataUpdate?: (data: any[]) => void; // Callback to notify parent component of data changes
  datasourceInvokeOptions?: {
    orderBy?: string;
    filterFields?: Record<string, any>;
    condition?: string;
  }; // Additional options to pass when invoking datasource
  onPageSizeChange?: (pageSize: number) => void;
  // Loading state management
  isLoadingMore?: boolean;
  setIsLoadingMore?: (loading: boolean) => void;
  isServerSidePagination?: boolean; // Flag to indicate server-side pagination
}
