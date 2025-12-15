import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmNumberProps extends BaseProps {
  required?: boolean;
  regexp?: string;
  disabled?: boolean;
  arialabel?: string;
  tabindex?: number;
  inputmode?: "natural" | "financial";
  trailingzero?: boolean;
  step?: number;
  minvalue?: number;
  maxvalue?: number;
  placeholder?: string;
  shortcutkey?: string;
  autofocus?: boolean;
  datavalue?: number | null;
  updatedelay?: string;
  updateon?: "blur" | "keypress";
  readonly?: boolean;
  decimalplaces?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    widget: Record<string, any>,
    newVal: number | string | null,
    oldVal: number | string | null
  ) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>, widget: Record<string, any>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>, widget: Record<string, any>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement>, widget: Record<string, any>) => void;
  [key: string]: any;
}
