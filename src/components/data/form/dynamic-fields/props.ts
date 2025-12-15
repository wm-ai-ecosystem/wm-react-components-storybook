export type WidgetType =
  | "text"
  | "textarea"
  | "number"
  | "currency"
  | "select"
  | "slider"
  | "rating"
  | "checkbox"
  | "checkboxset"
  | "radioset"
  | "switch"
  | "date"
  | "datetime"
  | "time"
  | "chips"
  | "colorpicker"
  | "fileupload"
  | "calendar";

export type CaptionPosition = "left" | "top" | "floating" | "right";
export type FormLayout = "1-column" | "2-column" | "3-column" | "custom";

export interface FormFieldMetadata {
  name: string;
  widget: WidgetType;
  displayname?: string;
  label?: string;
  placeholder?: string;
  required?: boolean | string;
  disabled?: boolean;
  readonly?: boolean;
  datavalue?: any;
  defaultvalue?: any;

  // Common field properties
  maxchars?: number;
  minvalue?: number;
  maxvalue?: number;
  step?: number;

  // Select/Choice field properties
  dataset?: any[];
  datafield?: string;
  displayfield?: string;
  displayExpression?: string;
  multiple?: boolean;

  // Layout properties
  columnwidth?: number;

  // Validation properties
  regexp?: string;
  regexpmessage?: string;

  // Style properties
  className?: string;
  styles?: React.CSSProperties;

  // Event handlers (optional - can be provided via listener)
  onChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;

  // Custom properties
  [key: string]: any;
}

export interface DynamicFormProps {
  metadata: FormFieldMetadata[];
  listener?: any;
  captionposition?: CaptionPosition;
  layout?: FormLayout;
  noOfColumns?: number;
  isHorizontal?: boolean;
  className?: string;
  name?: string;
  formRef?: any;

  // WaveMaker onBeforeRender callback
  onBeforeRender?: (metadata: FormFieldMetadata[], widget: DynamicFormProps) => FormFieldMetadata[];

  // Form-level event handlers
  onFieldChange?: (fieldName: string, value: any) => void;
  onFormChange?: (formData: Record<string, any>) => void;
  onValidation?: (errors: Record<string, string>) => void;
}

// Utility types for API responses
export interface APIFieldResponse {
  name: string;
  type: string; // This will be mapped to widget
  label?: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{
    value: any;
    label: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

// Helper function type for transforming API response to form fields
export type APIResponseTransformer = (apiResponse: APIFieldResponse[]) => FormFieldMetadata[];
