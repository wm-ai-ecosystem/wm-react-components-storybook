import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmTextareaProps extends BaseProps {
  readonly?: boolean;
  required?: boolean;
  disabled?: boolean;
  maxchars?: number;
  tabindex?: number;
  placeholder?: string;
  shortcutkey?: string;
  autofocus?: boolean;
  arialabel?: string;
  limitdisplaytext?: string;
  datavalue?: string;
  regexp?: string;
  updatedelay?: string;
  updateon?: "keypress" | "blur";
  autocapitalize?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    widget: Record<string, any>,
    newVal: string | null,
    oldVal: string | null
  ) => void;
  [key: string]: any;
}
