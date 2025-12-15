import React from "react";
import Button from "@mui/material/Button";
import withBaseWrapper from "../../../../higherOrder/withBaseWrapper";
import { WmTableActionProps } from "../props";

const WmTableActionComponent: React.FC<WmTableActionProps> = ({
  widgetType,
  displayName,
  iconclass,
  action,
  position = "footer",
  shortcutkey,
  listener,
  children,
  variant = "contained",
  color = "primary",
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (shortcutkey) {
      const key = event.key.toLowerCase();
      const shortcut = shortcutkey.toLowerCase();

      if (
        key === shortcut ||
        (shortcut.includes("ctrl") && event.ctrlKey && key === shortcut.replace("ctrl+", "")) ||
        (shortcut.includes("alt") && event.altKey && key === shortcut.replace("alt+", "")) ||
        (shortcut.includes("shift") && event.shiftKey && key === shortcut.replace("shift+", ""))
      ) {
        event.preventDefault();
        handleClick(event as any);
      }
    }
  };

  const renderIcon = () => {
    if (iconclass) {
      return <i className={iconclass} />;
    }
    return null;
  };

  return (
    <Button
      variant={variant}
      color={color}
      className={`wm-table-action ${props.className || ""}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      title={props.title || displayName || ""}
      disabled={props.disabled}
      tabIndex={props.tabindex}
      startIcon={renderIcon()}
      sx={{
        ...props.styles,
        display: props.show === "false" ? "none" : undefined,
        "& .MuiButton-startIcon": {
          marginRight: displayName ? 1 : 0,
        },
      }}
    >
      {displayName}
    </Button>
  );
};

WmTableActionComponent.displayName = "WmTableAction";

export const WmTableAction = withBaseWrapper(WmTableActionComponent as any);
export default WmTableAction;
