import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
export interface WmRadiosetProps extends BaseProps {
  collapsible?: boolean;
  compareby?: string[];
  datafield?: string;
  dataset?: any[] | string;
  datavalue?: string | number;
  disabled?: boolean;
  getDisplayExpression?: (data: any, index?: number) => string;
  displayfield?: string;
  displayValue?: string;
  groupby?: string;
  itemclass?: string;
  itemsperrow?: string;
  listclass?: string;
  match?: any;
  name: string;
  orderby?: string;
  readonly?: boolean;
  required?: boolean;
  showcount?: boolean;
  usekeys?: boolean;
  datasetItems?: DatasetItem[];
  selectedItems?: any[];
  validation?: any;
  groupedData?: any[];
  handleHeaderClick?: (key: string) => void;
  toggleAllHeaders?: () => void;
  isDestroyed?: boolean;
  [key: string]: any; // For any additional props
  dataPath?: string;
}
export interface DatasetItem {
  key: string | number;
  value: any;
  label: string;
  selected?: boolean;
}

export interface GroupedDataset {
  key: string;
  data?: DatasetItem[];
}

export interface StyledListProps {
  collapsible?: boolean;
  disabled?: boolean;
  width?: string | number;
}
