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
  // Track if mousedown already triggered the action to prevent double-firing
  const actionTriggeredRef = React.useRef(false);

  // Use onMouseDown to trigger action BEFORE blur event fires
  // This prevents the click from being lost when input has focus
  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onClick && !actionTriggeredRef.current) {
      actionTriggeredRef.current = true;
      onClick(event, {}, row);
      // Reset the flag after a short delay to allow subsequent clicks
      setTimeout(() => {
        actionTriggeredRef.current = false;
      }, 100);
    }
  };

  const handleClick = (
    event?: React.MouseEvent<HTMLElement>,
    widget?: Record<string, any>,
    newVal?: string | number | null,
    oldVal?: string | number | null
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    // Only trigger if mousedown didn't already trigger (fallback for edge cases)
    if (onClick && !actionTriggeredRef.current) {
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
        onMouseDown={handleMouseDown}
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
      onMouseDown={handleMouseDown}
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
