import React from "react";
import { TableCell } from "@mui/material";
import withBaseWrapper from "../../../../higherOrder/withBaseWrapper";
import { WmTableColumnProps } from "../props";

const WmTableColumnComponent: React.FC<WmTableColumnProps> = ({
  binding,
  caption,
  widgetType,
  pcdisplay = "true",
  mobiledisplay = "true",
  tabletdisplay = "true",
  index,
  headerindex,
  children,
  listener,
  ...props
}) => {
  return <TableCell className={`wm-table-column ${props.className || ""}`}>{children}</TableCell>;
};

WmTableColumnComponent.displayName = "WmTableColumn";

export const WmTableColumn = withBaseWrapper(WmTableColumnComponent);
export default WmTableColumn;
