import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export interface WmSelectProps extends BaseProps {
  autofocus?: boolean;
  class?: string;
  datafield?: string;
  dataset?: any;
  dataPath?: string;
  datavalue?: any;
  displayExpression?: any;
  displayfield?: string;
  groupby?: string;
  match?: string;
  arialabel?: string;
  multiple?: boolean;
  name: string;
  orderby?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  shortcutkey?: string;
  hint?: string;
  listener: any;
  onChange?: (event: any, listener: any, value: any, prevDatavalue: any) => void;
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onEnter?: (event: any) => void;
  onMouseEnter?: (event: any) => void;
  onMouseLeave?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  [key: string]: any;
}
