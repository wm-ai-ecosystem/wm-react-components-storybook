import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

type IconPositionType = "left" | "top" | "right";

interface WmAnchorProps extends BaseProps {
  iconclass?: string;
  encodeurl?: string;
  hyperlink?: string;
  iconheight?: string;
  iconwidth?: string;
  iconurl?: string;
  caption?: any;
  iconmargin?: string;
  iconposition?: IconPositionType;
  badgevalue?: string | number;
  shortcutkey?: string;
  arialabel?: string;
  target?: string;
}

export default WmAnchorProps;
