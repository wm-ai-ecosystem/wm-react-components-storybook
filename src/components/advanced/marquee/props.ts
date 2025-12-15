import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmMarqueeProps extends BaseProps {
  direction?: "up" | "down" | "left" | "right";
  scrollamount?: number;
  scrolldelay?: number;
}

export default WmMarqueeProps;
