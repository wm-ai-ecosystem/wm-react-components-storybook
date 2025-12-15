import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
import WmAnchorProps from "../../basic/anchor/props";

type InteractionType = "click" | "hover" | "click and hover";
type PopoverPlacementType = "top" | "bottom" | "left" | "right";
type ContentSourceType = "partial" | "inline";
type AutoCloseType = "outsideClick" | "always" | "disabled";
type IconPositionType = "left" | "top" | "right";

interface WmPopoverProps extends BaseProps, WmAnchorProps {
  content?: string;
  contentsource?: ContentSourceType;
  interaction?: InteractionType;
  popoverplacement?: PopoverPlacementType;
  popoverarrow: boolean | string;
  popoverheight: string;
  popoverwidth: string;
  title?: string;
  adaptiveposition?: boolean;
  autoclose?: AutoCloseType;
  contentanimation?: string;
  onLoad?: (widget: WmPopoverProps) => void | Function;
  onShow?: (event: Event, widget: WmPopoverProps) => void;
  onHide?: (event: Event, widget: WmPopoverProps) => void;
  render?: (props: WmPopoverProps, onLoad: () => void) => React.ReactNode;
}

export const DEFAULT_PROPS: Partial<WmPopoverProps> = {
  contentsource: "partial",
  interaction: "click",
  popoverplacement: "bottom",
  popoverarrow: true,
  popoverheight: "360px",
  popoverwidth: "240px",
  autoclose: "outsideClick",
};

export default WmPopoverProps;
