export interface WmTimeProps {
  name?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  arialabel?: string;
  tabindex?: number;
  shortcutkey?: string;
  datavalue?: string | Date | null;
  timepattern?: string;
  hourstep?: number;
  minutestep?: number;
  outputformat?: string;
  mintime?: string | Date;
  maxtime?: string | Date;
  autofocus?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  showdropdownon?: string;
  secondsstep?: number;
  dataentrymode?: string;
  styles?: React.CSSProperties;
  className?: string;
  // Props from HOC
  invokeOnChange?: (value: any, event: any) => void;
  setShowPicker?: (show: boolean) => void;
  showPicker?: boolean;
  [key: string]: any;
  listener?: Record<string, any>;
  //callbacks
  onChange?: (
    event: React.SyntheticEvent,
    widget: Record<string, any>,
    newVal: any,
    oldVal: any
  ) => void;
  onClick?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onFocus?: (event: React.FocusEvent, widget: Record<string, any>) => void;
  onBlur?: (event: React.FocusEvent, widget: Record<string, any>) => void;
  onMouseEnter?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onMouseLeave?: (event: React.MouseEvent, widget: Record<string, any>) => void;
  onBeforeload?: (event: React.SyntheticEvent, widget: Record<string, any>) => void;
}
export interface TimeFormatOptions {
  format: string;
  hasSeconds: boolean;
  is12Hour: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errorType?: "mintime" | "maxtime" | "format" | "range";
  message?: string;
}
