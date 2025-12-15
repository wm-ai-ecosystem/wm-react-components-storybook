import { ReactNode } from "react";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmAccordionPaneProps extends BaseProps {
  title?: string;
  subheading?: string;
  iconclass?: string;
  badgevalue?: string;
  badgetype?: "default" | "primary" | "success" | "info" | "warning" | "danger";
  isdefaultpane?: boolean;
  content?: string;
  active: boolean;
  smoothscroll?: boolean;
  onExpand: (event?: Event, props?: WmAccordionPaneProps) => void;
  onCollapse: (event?: Event, props?: WmAccordionPaneProps) => void;
  toggle: (event?: Event, name?: string) => void;
  onLoad?: (props: any, onLoadCallback?: any) => void;
  render?: (props: any, onLoadCallback?: any) => ReactNode;
  className?: string;
  tabindex?: number;
}

export const DEFAULT_PANE_PROPS: Partial<WmAccordionPaneProps> = {
  title: "Title",
  badgetype: "default",
  smoothscroll: false,
};
export default WmAccordionPaneProps;
