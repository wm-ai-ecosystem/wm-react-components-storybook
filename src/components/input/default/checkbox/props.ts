import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmCheckboxProps extends BaseProps {
  caption?: string;
  checkedvalue?: string | boolean | number;
  uncheckedvalue?: string | boolean | number;
  datavalue?: string | boolean | number;
  disabled?: boolean;
  hint?: string;
  arialabel?: string;
  name: string;
  readonly?: boolean;
  required?: boolean;
  shortcutkey?: string;
  tabindex?: number;
  type?: string;
  className?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> | undefined,
    widget: Record<string, any>,
    newVal: string | number | boolean,
    oldVal: string | number | boolean
  ) => void;
  onClick?: (
    event?: React.MouseEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
    widget?: Record<string, any>,
    newVal?: string | number | boolean | null,
    oldVal?: string | number | boolean | null
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>,
    widget?: Record<string, any>,
    newVal?: string | number | boolean | null,
    oldVal?: string | number | boolean | null
  ) => void;
  listener: Record<string, any>;
  displayValue?: string;
}
