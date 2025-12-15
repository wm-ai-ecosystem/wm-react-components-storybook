import { ReactNode } from "react";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";
import { StateHandler } from "../util";

export interface WmAccordionProps extends BaseProps {
  closeothers?: boolean;
  defaultpaneindex?: number;
  statehandler?: StateHandler;
  dataset?: any[];
  nodatamessage?: string;
  children?: React.ReactNode;
  onChange?: (event: { newPaneIndex: number; oldPaneIndex: number }) => void;
  onLoad?: (props: any, onLoadCallback?: any) => void;
  render?: (props: any, index?: number, dataset?: any[]) => ReactNode;
  type?: "static" | "dynamic";
}

export const DEFAULT_PROPS: Partial<WmAccordionProps> = {
  closeothers: true,
  defaultpaneindex: 0,
  statehandler: "none",
  nodatamessage: "No Data Found",
  type: "static",
};

export default WmAccordionProps;
