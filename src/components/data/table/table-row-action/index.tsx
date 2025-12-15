import React from "react";
import { Button } from "@mui/material";
import { WmTableRowActionProps } from "../props";
import { WmAnchor } from "@wavemaker/react-runtime/components/basic/anchor";

const WmTableRowActionComponent: React.FC<WmTableRowActionProps> = ({
  displayName,
  title,
  iconclass,
  action,
  row,
  rowIndex,
  listener,
  children,
  onClick,
  widgettype,
  show = true,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onClick) {
      // Pass rowData as part of widget parameter
      onClick(event, {}, row);
    }
  };

  if (!show) {
    return null;
  }
  if (widgettype === "anchor") {
    return (
      <WmAnchor
        {...props}
        title={displayName}
        caption={displayName}
        name={props.name || displayName}
        listener={listener}
        onClick={handleClick}
        iconclass={iconclass}
        show={show.toString()}
        className={`wm-table-row-action ${props.className || ""}`}
      />
    );
  }

  return (
    <Button
      variant="text"
      size="small"
      className={`wm-table-row-action ${props.className || ""}`}
      onClick={handleClick}
      title={title}
      startIcon={iconclass ? <i className={iconclass} /> : undefined}
      sx={{
        ...props.styles,
        padding: "0.25rem 0.5rem",
        marginRight: "0.25rem",
        minWidth: "auto",
        textTransform: "none",
      }}
    >
      {displayName}
    </Button>
  );
};

WmTableRowActionComponent.displayName = "WmTableRowAction";

export const WmTableRowAction = WmTableRowActionComponent;
export default WmTableRowAction;
