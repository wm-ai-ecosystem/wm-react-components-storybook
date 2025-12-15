import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

// Type definitions for the component props
export interface WmProgressCircleProps extends BaseProps {
  datavalue?: string | number;
  minvalue?: number;
  maxvalue?: number;
  type?: "default" | "success" | "info" | "warning" | "danger";
  displayformat?: string;
  captionplacement?: "hidden" | "inside";
  title?: string;
  subtitle?: string;
  arialabel?: string;
  tabindex?: number;
  hint?: string;
  onBeforerender?: (listener: any, widget: any) => void;
}

// Map of progress-bar type and classes
export const TYPE_CLASS_MAP_PC = {
  default: "",
  success: "progress-circle-success",
  info: "progress-circle-info",
  warning: "progress-circle-warning",
  danger: "progress-circle-danger",
};
export type EProgressCircleType = "success" | "info" | "warning" | "danger";
