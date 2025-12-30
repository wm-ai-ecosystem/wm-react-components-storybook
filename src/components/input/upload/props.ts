export interface WmUploadProps {
  name: string;
  formField?: any;
  datavalue?: any;
  readonly?: boolean;
  required?: boolean;
  accept?: string;
  type?: "blob" | "file";
  // Base component props
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  hidden?: boolean;
  listener?: any;
  // Additional form-related props
  tabindex?: number;
  arialabel?: string;
  hint?: string;
  onChange?: (
    event: React.ChangeEvent<any>,
    widget: Record<string, any>,
    newDatavalue: any,
    oldVal: any
  ) => void;
  originalOnChange?: (
    event: React.ChangeEvent<any>,
    widget: Record<string, any>,
    newDatavalue: any,
    oldVal: any
  ) => void;
  onFocus?: (event: any, Widget: Record<string, any>) => void;
  onBlur?: (event: any, Widget: Record<string, any>) => void;
}
