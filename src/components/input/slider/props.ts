import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface WmSliderProps extends BaseProps {
  class?: string;
  disabled?: boolean;
  hint?: string;
  name: string;
  shortcutkey?: string;
  show?: boolean;
  readonly?: boolean;
  tabindex?: number;
  datavalue?: number;
  minvalue?: number;
  maxvalue?: number;
  step?: number;
  onChange?: (
    event: React.ChangeEvent<any>,
    widget: Record<string, any>,
    newDatavalue: number,
    oldDatavalue: number
  ) => void;
  // Add these props that will be passed from BaseFormHOC
  invokeOnChange?: (newValue: any, $event?: React.ChangeEvent<any>) => void;
  invokeOnTouched?: () => void;
  invokeOnFocus?: (event: React.FocusEvent<{}>) => void;
  invokeOnBlur?: (event: React.FocusEvent<{}>) => void;
  width?: string;
  height?: string;
  listener: Record<string, any>;
  displayValue?: string;
}
