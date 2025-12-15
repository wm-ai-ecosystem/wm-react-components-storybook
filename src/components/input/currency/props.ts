import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmCurrencyProps extends Omit<BaseProps, "name"> {
  listener: Record<string, any>;
  currency?: string;
  currencySymbol?: string;
  currencySymbolPosition?: "left" | "right";
  currencySymbolWidth?: string;
  class?: string;
  disabled?: boolean;
  name: string;
  shortcutkey?: string;
  autofocus?: boolean;
  arialabel?: string;
  inputProps?: any;
  displayValue?: string;
  hint?: string;
}
