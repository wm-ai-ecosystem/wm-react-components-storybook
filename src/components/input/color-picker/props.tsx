import BaseProps from "@/higherOrder/props";

export type ColorPickerProps = BaseProps &
  CommonProps & {
    datavalue: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    required?: boolean;
    name: string;
    shortcutkey?: string;
    show?: boolean;
    tabindex?: number;
    styles?: React.CSSProperties;
    className?: string;
    autoclose?: "always" | "outsideClick" | "disabled";
    arialabel?: string; // Added aria-label prop
    onDoubleClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent, widget: ColorPickerProps) => void;
    onMouseLeave?: (event: React.MouseEvent, widget: ColorPickerProps) => void;
    onFocus?: (event: React.FocusEvent, widget: ColorPickerProps) => void;
    onBlur?: (event: React.FocusEvent, widget: ColorPickerProps) => void;
    onClick?: (event: React.MouseEvent, widget: ColorPickerProps) => void;
    onKeydown?: (event: React.KeyboardEvent) => void;
    onKeyup?: (event: React.KeyboardEvent) => void;
    onPropertyChange?: (property: string, value: any) => void;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement> | any,
      widget: ColorPickerProps,
      value: any,
      target: any
    ) => void;
    listener?: any;
    fieldName?: string;
  };
interface CommonProps {
  datavalue: any;
  binddatavalue?: string;
  datavaluesource?: any;
  context?: any;
  viewParent?: any;
  prevDatavalue?: any;
}
export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface PickerPosition {
  top: number | string;
  left: number;
}
