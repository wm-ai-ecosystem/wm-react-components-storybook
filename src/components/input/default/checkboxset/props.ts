import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
// Define proper interfaces for the component
export interface DatasetItem {
  key: string | number;
  value: any;
  label: string;
  selected?: boolean;
}

export interface GroupedDataset {
  key: string;
  data: DatasetItem[];
}

// Create the component props interface
interface DatasetAwareFormComponentProps extends BaseProps {
  layout?: "inline" | "stacked";
  itemclass?: string;
  listclass?: string;
  showcount?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  type?: "button" | "submit" | "reset";
  dataset?: any;
  datafield?: string;
  displayfield?: string;
  getDisplayExpression?: (data: any) => string;
  datavalue?: any[] | any; // Fixed to accept both array and single values
  usekeys?: boolean;
  groupby?: string;
  match?: string;
  orderby?: string;
  name: string;
  onClick?: (
    event: React.ChangeEvent<HTMLInputElement> | any,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | any,
    widget: Record<string, any>,
    value: any,
    target: any
  ) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  required?: boolean;
  label?: string;
  collapsed?: boolean;
  show?: boolean;
  tabIndex?: number;
  styles?: React.CSSProperties;
  conditionalstyles?: React.CSSProperties;
  listener: Record<string, any>;
  collapsible?: boolean;
  compareby?: string[];

  // Added items from HOC that are needed
  datasetItems?: any[];
  selectedItems?: any[];
  transformFormData?: (containerWidget: any, dataset: any[], options: any) => any[];
  groupedData?: any[];
  onchange?: (value: any) => void;
  onblur?: () => void;
  validation?: any;
  isDestroyed?: boolean;
  [key: string]: any; // For any additional props
  height: string | number;
  width: string | number;
  dataPath?: string;
}

export interface WmCheckboxsetProps extends DatasetAwareFormComponentProps {
  // Props specific to WmCheckboxset
  itemsperrow?: string;
}
