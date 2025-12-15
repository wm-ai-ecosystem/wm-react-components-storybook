import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

export interface IProgressInfo {
  cls: string;
  progressBarWidth: string;
  displayValue: string;
}

export type ProgressBarType =
  | "default"
  | "default-striped"
  | "success"
  | "success-striped"
  | "info"
  | "info-striped"
  | "warning"
  | "warning-striped"
  | "danger"
  | "danger-striped";

export type CaptionPlacement = "hidden" | "inside";

export const TYPE_CLASS_MAP: Record<ProgressBarType, string> = {
  default: "progress-bar",
  "default-striped": "progress-bar progress-bar-striped",
  success: "progress-bar progress-bar-success",
  "success-striped": "progress-bar progress-bar-success progress-bar-striped",
  info: "progress-bar progress-bar-info",
  "info-striped": "progress-bar progress-bar-info progress-bar-striped",
  warning: "progress-bar progress-bar-warning",
  "warning-striped": "progress-bar progress-bar-warning progress-bar-striped",
  danger: "progress-bar progress-bar-danger",
  "danger-striped": "progress-bar progress-bar-danger progress-bar-striped",
};

export interface WmProgressBarProps extends BaseProps {
  type?: ProgressBarType;
  displayformat?: string;
  datavalue?: string | number;
  minvalue?: number;
  maxvalue?: number;
  captionplacement?: CaptionPlacement;
  dataset?: any[];
  onStart?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    widget: WmProgressBarProps
  ) => void;
  onComplete?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    widget: WmProgressBarProps
  ) => void;
  onBeforeupdate?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    widget: WmProgressBarProps
  ) => void;
}
