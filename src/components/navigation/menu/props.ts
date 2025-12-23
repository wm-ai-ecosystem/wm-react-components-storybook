import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface WmMenuProps extends BaseProps {
  menualign?: string;
  menuposition?: string;
  menulayout?: string;
  menuclass?: string;
  linktarget?: string;
  iconclass?: string;
  animateitems?: string;
  disableMenuContext?: boolean;
  showonhover?: boolean;
  autoclose?: string;
  autoopen?: string;
  hint?: string;
  arialabel?: string;
  width?: string | number;
  height?: string | number;
  iconposition?: string;
  caption?: string;
  shortcutkey?: string;
  onClick?: (
    event?: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => void;
  onSelect?: ($event: React.MouseEvent<HTMLElement>, widget: any, $item: any) => void;
  navNodes?: Array<any>;
  resetNavNodes?: () => void;
  orderby?: string;
  // New properties
  name: string;
  dataset?: any;
  itemlabel?: string | any;
  itemlink?: string;
  itemicon?: string;
  itemaction?: string;
  userrole?: string;
  isactive?: string;
  itemchildren?: string | any;
  isFromNav?: boolean;
  onNavItemActivate?: () => void;
}
export type AnimationType = "scale" | "fade" | "slide";
export type PositionType = "down,right" | "down,left" | "up,right" | "up,left";

export interface MenuNode {
  label?: string;
  icon?: string;
  link?: string;
  hint?: string;
  disabled?: boolean;
  children?: MenuNode[];
  expanded?: boolean;
  nodeRef?: React.RefObject<HTMLDivElement | null>;
  dataObject?: any;
  isactive?: boolean;
}

export interface WmMenuExtendedProps extends Omit<WmMenuProps, "name"> {
  styles?: React.CSSProperties;
  conditionalstyles?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  listener: Record<string, any>;
  name?: string;
  displayValue?: string;
  onActionsclick?: (item: any) => void;
  nodes$?: {
    subscribe: (callback: () => void) => { unsubscribe: () => void };
  };
  dataPath?: string;
}
