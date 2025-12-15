export const VALIDATOR = {
  REQUIRED: "required",
  MAXCHARS: "maxchars",
  MINVALUE: "minvalue",
  MAXVALUE: "maxvalue",
  REGEXP: "regexp",
  MINDATE: "mindate",
  MAXDATE: "maxdate",
  MINTIME: "mintime",
  MAXTIME: "maxtime",
  EXCLUDEDATES: "excludedates",
  EXCLUDEDAYS: "excludedays",
} as const;

type ValidatorType = (typeof VALIDATOR)[keyof typeof VALIDATOR] | string;

export interface BaseValidator {
  type: ValidatorType;
  errorMessage: string;
}
export interface RequiredValidator extends BaseValidator {
  type: typeof VALIDATOR.REQUIRED | "required";
  validator: boolean;
}

export interface MaxCharsValidator extends BaseValidator {
  type: typeof VALIDATOR.MAXCHARS | "maxchars";
  validator: number;
}

export interface MinValueValidator extends BaseValidator {
  type: typeof VALIDATOR.MINVALUE | "minvalue";
  validator: number;
}

export interface MaxValueValidator extends BaseValidator {
  type: typeof VALIDATOR.MAXVALUE | "maxvalue";
  validator: number;
}

export interface RegexpValidator extends BaseValidator {
  type: typeof VALIDATOR.REGEXP | "regexp";
  validator: RegExp | string; // Can be a RegExp object or a string representation
}

export interface MinDateValidator extends BaseValidator {
  type: typeof VALIDATOR.MINDATE | "mindate";
  validator: string | Date;
}

export interface MaxDateValidator extends BaseValidator {
  type: typeof VALIDATOR.MAXDATE | "maxdate";
  validator: string | Date;
}

export interface MinTimeValidator extends BaseValidator {
  type: typeof VALIDATOR.MINTIME | "mintime";
  validator: string;
}

export interface MaxTimeValidator extends BaseValidator {
  type: typeof VALIDATOR.MAXTIME | "maxtime";
  validator: string;
}

export interface ExcludeDatesValidator extends BaseValidator {
  type: typeof VALIDATOR.EXCLUDEDATES | "excludedates";
  validator: (string | Date)[];
}

export interface ExcludeDaysValidator extends BaseValidator {
  type: typeof VALIDATOR.EXCLUDEDAYS | "excludedays";
  validator: number[];
}

export interface FunctionValidator {
  (
    params: { value: any; fieldName?: string },
    form: any
  ):
    | string
    | undefined
    | null
    | boolean
    | { errorMessage: string }
    | Promise<string | undefined | null | boolean | { errorMessage: string }>;
}

export type ValidatorConfig =
  | RequiredValidator
  | MaxCharsValidator
  | MinValueValidator
  | MaxValueValidator
  | RegexpValidator
  | MinDateValidator
  | MaxDateValidator
  | MinTimeValidator
  | MaxTimeValidator
  | ExcludeDatesValidator
  | ExcludeDaysValidator
  | FunctionValidator;

export type ValidationTypes = "default" | "html" | "none";

export interface ErrorState {
  error: boolean;
  errorMessage?: string;
  fieldState?: any;
}

export interface ControlledFieldProps {
  validationType?: "default" | "html" | "none";
  formRef?: any;
  formKey?: string;
  name: string;
  validators?: ValidatorConfig[];
  asyncValidators?: ValidatorConfig[];
  required?: boolean;
  maxchars?: number;
  regexp?: string | RegExp;
  validationmessage?: string;
  hint?: string;
  defaultvalue?: any;
  value?: any;
  datavalue?: any;
  type?: string;
  enhancedProps?: any;
  observe?: any[];
  onChange?: (e: any, widget?: any, newValue?: any, oldValue?: any) => void;
  onBlur?: (e: any) => void;
  onChangeHandler?: (key: string, field: any) => void;
  renderFormFields?: (props: any) => React.ReactNode;
}

export interface WithFormControllerProps {
  formRef?: any;
  formKey?: string;
  name: string;
  datavalue?: any;
  defaultvalue?: any;
  validators?: ValidatorConfig[];
  asyncValidators?: ValidatorConfig[];
  required?: boolean;
  maxchars?: number;
  regexp?: string | RegExp;
  validationmessage?: string;
  hint?: string;
  type?: string;
  observe?: string[];
  onBlur?: (e: any) => void;
  [key: string]: any;
}
