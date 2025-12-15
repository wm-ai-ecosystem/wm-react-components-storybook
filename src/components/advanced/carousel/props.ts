import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

export type CarouselAnimationType = "auto" | "none";
export type CarouselControlsType = "navs" | "indicators" | "both" | "none";

export interface WmCarouselProps extends BaseProps {
  animation?: CarouselAnimationType;
  animationinterval?: number;
  controls?: CarouselControlsType;
  dataset?: any[];
  nodatamessage?: string;
  onChange?: (
    event: any,
    widget?: Record<string, any>,
    newIndex?: number,
    oldIndex?: number
  ) => void;
  currentslide?: any;
  previousslide?: any;
  render?: (item: any, index: number) => React.ReactNode;
}

export default WmCarouselProps;
