type SearchType = "search" | "autocomplete";
type SearchOn = "typing" | "onsearchiconclick";

export interface WmSearchProps extends DatasetAwareFormComponentProps {
  searchon?: SearchOn;
  showclear?: boolean | string;
  debouncetime?: number;
  searchkey?: string;
  matchmode?: string;
  minchars?: number;
  limit?: number;
  tabindex?: number;
  placeholder?: string;
  dropup?: boolean;
  type?: SearchType;
  showsearchicon?: boolean;
  showbackbutton?: boolean; // Added prop to control back button visibility
  imagewidth?: string;
  datacompletemsg?: string;
  loadingdatamsg?: string;
  clearsearchiconclass?: string;
  backsearchiconclass?: string;
  searchiconclass?: string;
  navsearchbar?: boolean;
  class?: any;
  shortcutkey?: string;
  hint?: string;
  arialabel?: string;
  width?: string | number; // Added width prop
  onBeforeservicecall?: (widget: any, inputData: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, widget: any) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    widget: any,
    newVal: any,
    oldVal: any
  ) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>, widget: any) => void;
  onSelect?: (event: React.MouseEvent<HTMLLIElement>, widget: any, selectedValue: any) => void;
  onSubmit?: (event: React.MouseEvent<HTMLDivElement>, widget: any) => void;
  onClear?: (event: any, widget: any) => void;
  onSearch?: (event: React.MouseEvent<HTMLButtonElement>, widget: any) => void;
  onDatasetready?: (widget: any, data: any[]) => void; // Added onDatasetready callback
  conditionalstyles?: any;
  styles?: any;
  listener: Record<string, any>;
  value?: any;
  // Props that should not be passed to DOM elements
  datasetItems?: any[];
  selectedItems?: any[];
  displayValue?: any;
  groupedData?: any[];
  handleHeaderClick?: (key: string) => void;
  toggleAllHeaders?: (props: any) => void;
  isUpdateRequired?: () => any;
  onQuerySearch?: (params: any, success: (val: any) => void, error: (err: any) => void) => void;
  autofocus?: boolean;
  dataPath?: string;
  getDisplayExpression?: (data: any) => string;
}

// Interface definitions remain the same...
interface DatasetAwareFormComponentProps {
  dataset?: any[] | string;
  datafield?: string;
  displayfield?: string;
  displaylabel?: string;
  displayimagesrc?: string;
  displayexpression?: (data: any) => string;
  usekeys?: boolean;
  orderby?: string;
  multiple?: boolean;
  readonly?: boolean;
  content?: string;
  collapsible?: boolean;
  groupby?: string;
  allowempty?: boolean;
  compareby?: any[];
  disabled?: boolean;
  required?: boolean;
  isDestroyed?: boolean;
  widgetType?: string;
  datavalue?: any;
  validation?: any;
  name?: string;
  viewParent?: any;
  casesensitive?: boolean;
}

export interface DataSetItem {
  key: any;
  value: any;
  label: any;
  displayValue: any;
  displayImage: any;
  selected?: boolean;
  dataObject?: any;
}

export interface DataProviderConfig {
  dataset?: any[];
  datafield?: string;
  query?: string;
  matchMode?: string;
  casesensitive?: boolean;
  searchKey?: string;
  isformfield?: boolean;
  limit?: number;
  page?: number;
  isLocalFilter?: boolean;
  onBeforeservicecall?: (widget: any, inputData: any) => void;
  searchkey?: string;
  component?: any;
}

export interface IDataProvider {
  filter(
    config: DataProviderConfig
  ): Promise<{ data: any[]; hasMoreData: boolean; isLastPage: boolean }>;
  createEmptyResult(): { data: any[]; hasMoreData: boolean; isLastPage: boolean };
  applyFilter(entry: any, queryText: any): boolean;
}
