import React from "react";
import withBaseWrapper from "../../../../higherOrder/withBaseWrapper";
import { WmTableRowProps } from "../props";

const WmTableRowComponent: React.FC<WmTableRowProps> = ({
  displayName,
  widgetType = "button",
  expandicon = "wi wi-expand-more",
  collapseicon = "wi wi-chevron-right",
  expandtitle,
  collapsetitle,
  position = "0",
  closeothers = false,
  onBeforerowexpand,
  onRowexpand,
  onBeforerowcollapse,
  onRowcollapse,
  show = true,
  disabled = false,
  columnwidth = "50px",
  content,
  listener,
  children,
  renderPartial,
  ...props
}) => {
  // This is a configuration component that defines row expansion behavior.
  // It doesn't render anything directly - the table parses its props
  // and uses them to render expansion controls and expanded content.
  // The renderPartial function receives props (including rowData) and an onLoad callback.
  // The renderPartial prop or children will be rendered when a row is expanded.
  return null;
};

WmTableRowComponent.displayName = "WmTableRow";

export const WmTableRow = withBaseWrapper(WmTableRowComponent as any);
export default WmTableRow;
