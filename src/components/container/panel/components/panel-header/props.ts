import { ActionItem } from "../../props";

export type BadgeType =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export interface PanelHeaderProps {
  title?: string;
  subheading?: string;
  iconclass?: string;
  iconurl?: string;
  iconwidth?: string | number;
  iconheight?: string | number;
  iconmargin?: string;
  badgevalue?: string | number;
  badgetype?: BadgeType;
  actions?: ActionItem[];
  helptext?: string;
  isExpanded: boolean;
  isFullscreen: boolean;
  collapsible?: boolean;
  enablefullscreen?: boolean | string;
  closable?: boolean;
  itemlabel?: string;
  itemlink?: string;
  itemicon?: string;
  itemchildren?: string;
  listener?: any;
  onToggleExpand: (event: React.MouseEvent) => void;
  onToggleFullScreen: (event: React.MouseEvent) => void;
  onToggleHelp: () => void;
  onClose: (event: React.MouseEvent) => void;
  onActionsclick?: (item: ActionItem) => void;
}
