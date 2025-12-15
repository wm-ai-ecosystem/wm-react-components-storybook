import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
export interface WmCardProps extends BaseProps {
  // Card header properties
  title?: string;
  subheading?: string;
  iconclass?: string;
  iconurl?: string;
  actions?: string;

  // Card image properties
  picturesource?: string;
  picturetitle?: string;
  imageheight?: string;

  // Menu properties
  itemaction?: string;
  itemchildren?: string;
  itemicon?: string;
  itemlabel?: string;
  itemlink?: string;
  isactive?: string;
  cardItem?: any;

  // Other properties
  animation?: string;
  name: string;
  userrole?: string;
  autoclose?: string;
  children?: React.ReactNode;
  className?: string;
  height?: string | number;
  width?: string | number;

  // List/iteration properties
  isFirst?: boolean;
  isLast?: boolean;
  currentItemWidgets?: any;
  listener: any;

  // Event handlers
  onClick?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
  onDblclick?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
  onMouseover?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
  onMouseout?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
  onMouseenter?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
  onMouseleave?: (event: React.MouseEvent, widget: any, item: any, currentItemWidgets: any) => void;
}

export interface WmCardCommonProps {
  content?: string;
  children?: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
}
