import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmTabPaneProps extends BaseProps {
  caption?: string;
  smoothscroll?: any;
  content?: string;
  heading?: string;
  title?: string;
  disabled?: boolean;
  badgevalue?: string;
  badgetype?: string;
  paneicon?: string;
  isdynamic?: boolean;
  index?: number;
  children?: React.ReactNode;
  onSelect?: (event: React.SyntheticEvent | null, widgetOrProps: any, paneIndex?: number) => void;
  onDeselect?: (event: React.SyntheticEvent | null, widgetOrProps: any, paneIndex?: number) => void;
  onLoad?: (event: React.SyntheticEvent | null, widgetOrProps: any) => void;
  onHeaderClick?: (event: React.SyntheticEvent, props: WmTabPaneProps, paneIndex: number) => void;
  renderPartial?: (props: any, onLoad?: any) => React.ReactNode;
}

export default WmTabPaneProps;
