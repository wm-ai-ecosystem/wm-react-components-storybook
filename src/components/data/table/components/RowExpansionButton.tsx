import React from "react";
import { WmTableRowProps, RowExpansionButtonProps } from "../props";
import WmButton from "../../../form/button";
import WmAnchor from "../../../basic/anchor";

export const RowExpansionButton: React.FC<RowExpansionButtonProps> = ({
  rowId,
  rowData,
  isExpanded,
  onToggle,
  config,
}) => {
  if (!config.show) {
    return null;
  }

  const handleClick = (event?: React.MouseEvent<HTMLElement>, widget?: Record<string, any>) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!config.disabled) {
      onToggle(rowId, rowData);
    }
  };

  // Use the appropriate icon based on expanded state
  const currentIcon = isExpanded ? config.expandicon : config.collapseicon;
  const currentTitle = isExpanded ? config.collapsetitle : config.expandtitle;
  const ariaLabel = config.expandtitle || config["displayName"] || "Toggle row expansion";

  // Build common props with only defined values
  const commonProps: Record<string, any> = {
    name: `${config.name || "row_expansion"}_${rowId}`,
    onClick: handleClick,
    iconclass: currentIcon,
    "aria-label": ariaLabel,
    "aria-expanded": isExpanded,
    "aria-live": "polite",
    tabIndex: 0,
  };

  // Only add optional props if they have values
  if (config.listener) {
    commonProps.listener = config.listener;
  }

  if (config["displayName"]) {
    commonProps.caption = config["displayName"];
  }

  if (currentTitle) {
    commonProps.title = currentTitle;
  }

  if (config.className) {
    commonProps.className = `${config.className} row-expansion-button`;
  }

  if (config.disabled) {
    commonProps.disabled = config.disabled;
  }

  if (config.widgetType === "anchor") {
    return <WmAnchor {...(commonProps as any)} hyperlink="#" role="button" />;
  }

  return <WmButton {...(commonProps as any)} type="button" />;
};

export default RowExpansionButton;
