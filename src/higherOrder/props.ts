import { CSSProperties } from "react";

export interface Props {
  name: string;
  listener: Record<string, any>;
  ref?: React.RefObject<HTMLElement> | React.RefObject<null>;
  animation?: string;
  show?: boolean | string;
  padding?: string;
  margin?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  conditionalstyle?: CSSProperties;
  conditionalclass?: string;
  showindevice?: ("xs" | "sm" | "md" | "lg" | "all")[];
  onClick?: (
    event?: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onDoubleClick?: (
    event: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onMouseEnter?: (
    event: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onMouseLeave?: (
    event: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onKeydown?: (
    event: React.KeyboardEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onKeyup?: (
    event: React.KeyboardEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onKeypress?: (
    event: React.KeyboardEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  hint?: string;
  arialabel?: string;
  tabindex?: number;
  styles?: CSSProperties;
  children?: React.ReactNode;
  [key: string]: any;
}

export default Props;
