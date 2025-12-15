import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmTextProps extends BaseProps {
  datavaluesource?: any;
  floatinglabel?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  autotrim?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  type?: string;
  maxchars?: number;
  minvalue?: number;
  maxvalue?: number;
  step?: number;
  displayformat?: string;
  showdisplayformaton?: "keypress" | "blur";
  arialabel?: string;
  regexp?: string;
  required?: boolean;
  updateon?: "keypress" | "blur";
  tabindex?: number;
  shortcutkey?: string;
  datavalue?: string;
  updatedelay?: string;
  autocapitalize?: "none" | "sentence" | "words";
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    widget: Record<string, any>,
    newVal: string | null,
    oldVal: string | null
  ) => void;
}
