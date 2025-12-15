import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface DataSetItem {
  key: string;
  value: any;
  label: string;
  selected?: boolean;
  dataObject?: any;
  [key: string]: any;
}
export interface WmSwitchProps extends BaseProps {
  // Dataset related props
  dataset?: string;
  datasetItems?: DataSetItem[];
  datafield?: string;
  datavaluesource?: any;
  datavalue?: string;
  displayExpression?: string;
  displayfield?: string;
  displaylabel?: string;
  displayimagesrc?: string;
  orderby?: string;
  groupby?: string;
  compareby?: string;
  usekeys?: boolean;
  allowempty?: boolean;
  acceptsArray?: boolean;

  // Switch specific props
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  name: string;
  hint?: string;
  iconclass?: string;
  checkediconclass?: string;
  value?: string | string[];
  toBeProcessedValue?: any;
  show?: boolean;
  tabindex?: number;
  arialabel?: string;
  className?: string;

  // Event handlers
  onChange?: (
    event: React.MouseEvent,
    widget: Record<string, any>,
    newVal: string | string[],
    oldVal: string | string[]
  ) => void;
  onBlur?: () => void;
  onClick?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onMouseEnter?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onMouseLeave?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onTouched?: () => void;
  listener: Record<string, any>;
  displayValue?: string;
  dataPath?: string;
}
