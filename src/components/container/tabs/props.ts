import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

interface WmTabsProps extends BaseProps {
  dataset: any[];
  defaultpaneindex?: number;
  justified?: boolean;
  tabsposition?: "top" | "bottom" | "left" | "right";
  nodatamessage?: string;
  statehandler?: "none" | "URL" | "localStorage" | "sessionStorage";
  autotabactivation?: boolean;
  transition?: "none" | "slide" | "fade";
  type?: "static" | "dynamic";
  iconposition?: "top" | "start" | "end" | "bottom" | any;
  render?: ($item: any, $index: number, dataset: any[]) => React.ReactNode;
  selectedindex?: number;
  onChange?: (
    event: React.SyntheticEvent,
    props: WmTabsProps,
    newPaneIndex: number,
    oldPaneIndex: number
  ) => void;
}

export const DEFAULT_PROPS: WmTabsProps = {
  type: "static",
  dataset: [],
  defaultpaneindex: 0,
  tabsposition: "top",
  nodatamessage: "No Data Found",
  statehandler: "none",
  autotabactivation: true,
  transition: "none",
  iconposition: "left",
  enablescroll: false,
  listener: {},
  name: "",
};

export default WmTabsProps;
