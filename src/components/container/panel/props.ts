import { ReactNode } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { BadgeType } from "./components/panel-header";

export interface ActionItem {
  itemicon?: string;
  itemlabel?: string;
  label?: string;
  [key: string]: any;
}

export interface PanelWidget {
  redraw?: () => void;
  collapse?: () => void;
  expand?: () => void;
  close?: () => void;
  toggle?: () => void;
  toggleExpand?: (event: React.MouseEvent) => void;
  isExpanded?: boolean;
  isFullscreen?: boolean;
  toggleFullScreen?: (event: React.MouseEvent) => void;
  show?: boolean;
  Widgets?: Record<string, PanelWidget>;
}

export interface PanelListener extends Record<string, any> {
  Widgets?: Record<string, PanelWidget>;
}

export interface WmPanelProps extends BaseProps {
  actions?: ActionItem[];
  badgetype?: BadgeType;
  badgevalue?: string | number;
  closable?: boolean;
  collapsible?: boolean;
  enablefullscreen?: boolean;
  expanded?: boolean;
  fullscreen?: boolean;
  helptext?: string;
  hint?: string;
  iconclass?: string;
  iconheight?: string | number;
  iconmargin?: string;
  iconurl?: string;
  iconwidth?: string | number;
  subheading?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  height?: string | number;
  name: string;

  // Event handlers
  onActionsclick?: (event: React.MouseEvent, item: ActionItem) => void;
  onClose?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onCollapse?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onExpand?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onExitfullscreen?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onFullscreen?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onLoad?: (widget?: PanelWidget) => void;
  onMouseenter?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onMouseleave?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onMouseout?: (event: React.MouseEvent, widget?: PanelWidget) => void;
  onMouseover?: (event: React.MouseEvent, widget?: PanelWidget) => void;

  // HOC related props
  onPropertyChange?: (prop: string, value: any) => void;
  menuRefQL?: any;
  menuRef?: any;
  Widgets?: Record<string, PanelWidget>;
  content?: any;
  itemlabel?: string;
  itemicon?: string;
  itemlink?: string;
  itemaction?: string;
  itemchildren?: any;
  userrole?: string;
  binditemlabel?: string;
  binditemicon?: string;
  binditemaction?: string;
  binditemlink?: string;
  binditemchildren?: any;
  binduserrole?: string;
  styles?: any;
}

export interface WmPanelComponent {
  WmPanelFooter?: boolean;
  displayName?: string;
}

export interface WmPanelChildProps {
  wmPanelFooter?: boolean;
  [key: string]: any;
}
