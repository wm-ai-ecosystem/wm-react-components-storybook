import React from "react";
import { Box } from "@mui/material";
import WmTableAction from "../table-action";
import { getButtonClasses } from "../utils";
import { TableFooterActionsProps } from "../props";

export const TableFooterActions: React.FC<TableFooterActionsProps> = ({
  footerActions,
  spacing = "normal",
  isGridEditMode = false,
  isLoading = false,
  listener,
}) => {
  if (footerActions.length === 0) {
    return null;
  }

  return (
    <Box className="app-datagrid-actions">
      {footerActions.map((action, index) => (
        <WmTableAction
          key={`footer-action-${index}-${action.key || action.name}`}
          className={getButtonClasses(action, spacing, isGridEditMode, isLoading)}
          data-action-key={action.key}
          onClick={action.onClick}
          name={action["displayName"] || action.name || "Action"}
          displayName={action["displayName"]}
          title={action.title}
          iconclass={action.iconclass}
          action={action.action}
          position={action.position}
          shortcutkey={action.shortcutkey}
          tabindex={
            typeof action.tabindex === "string" ? parseInt(action.tabindex, 10) : action.tabindex
          }
          widgetType={action.widgetType}
          listener={listener}
          disabled={
            action.disabled || (action.key === "addNewRow" && (isGridEditMode || isLoading))
          }
          show={action.show}
          styles={action.styles}
        >
          {action.children}
        </WmTableAction>
      ))}
    </Box>
  );
};
