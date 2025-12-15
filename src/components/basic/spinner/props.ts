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

export interface WmSpinnerProps {
  caption?: string;
  type?: string;
  servicevariabletotrack?: string;
  show?: boolean; // Handles string 'true'/'false' or boolean
  iconclass?: string;
  iconsize?: string;
  image?: string;
  imagewidth?: string;
  imageheight?: string;
  animation?: string;
  name?: string;
  styles?: React.CSSProperties;
  className?: string;
  id?: string;
  listener?: Record<string, any>; // For HOC compatibility
  hint?: string;
  arialabel?: string;
}
