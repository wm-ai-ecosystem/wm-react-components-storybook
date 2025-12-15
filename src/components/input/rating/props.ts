import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

// Define DatasetAwareFormComponentProps interface
interface DatasetAwareFormComponentProps extends BaseProps {
  dataset?: any;
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
  name: string;
  viewParent?: any;
  handleHeaderClick?: () => void;
  toggleAllHeaders?: (props: any) => void;
  datasetItems?: any[];
  selectedItems?: any[];
  displayValue?: any;
  value?: any;
  // onchange?: (value: any) => void;
  onblur?: () => void;
  groupedData?: any[];
  className?: string;
  styles?: React.CSSProperties;
  onChange?: (event: any, widget: any, newVal: any, oldVal: any) => void;
  invokeEventCallback?: (eventName: string, eventData: any) => void;
  width?: string;
  height?: string;
}

type RatingItem = {
  key: any;
  value: number;
  index: number;
  label: string;
  selected?: boolean;
};

interface WmRatingProps extends DatasetAwareFormComponentProps {
  maxvalue?: number;
  name: string;
  caption?: string;
  readonly?: boolean;
  showcaptions?: boolean;
  iconcolor?: string;
  iconsize?: string;
  activeiconclass?: string;
  inactiveiconclass?: string;
  setDatasetItems?: (items: any[]) => void;
}

export type { WmRatingProps, RatingItem };
