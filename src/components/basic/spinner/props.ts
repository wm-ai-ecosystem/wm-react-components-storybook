import BaseProps from "@/higherOrder/props";
import React from "react";

export interface Subscription {
  variable: any;
  event: string;
  handler: () => void;
}

export const VariableEvents = {
  BEFORE_INVOKE: "beforeInvoke",
  SUCCESS: "success",
  ERROR: "error",
  AFTER_INVOKE: "afterInvoke",
};

export interface WmSpinnerProps extends BaseProps {
  caption?: string;
  type?: string;
  servicevariabletotrack?: string;
  iconclass?: string;
  iconsize?: string;
  image?: string;
  imagewidth?: string;
  imageheight?: string;
  animation?: string;
  arialabel?: string;
}
