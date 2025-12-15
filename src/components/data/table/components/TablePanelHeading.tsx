import React from "react";
import { Box } from "@mui/material";
import WmTableAction from "../table-action";
import { getButtonClasses } from "../utils";
import { TablePanelHeadingProps } from "../props";

export const TablePanelHeading: React.FC<TablePanelHeadingProps> = ({
  title,
  subheading,
  iconclass,
  exportOptions = [],
  headerActions,
  spacing = "normal",
  isGridEditMode = false,
  isLoading = false,
  listener,
}) => {
  return (
    <Box className="panel-heading">
      <Box component="h3" className="panel-title">
        <Box className="pull-left">
          {iconclass && <Box component="i" className={`app-icon panel-icon ${iconclass}`} />}
        </Box>
        <Box className="pull-left">
          {title && (
            <Box component={"div"} className="heading">
              {title}
            </Box>
          )}
          {subheading && (
            <Box component={"div"} className="description">
              {subheading}
            </Box>
          )}
        </Box>
        {(exportOptions?.length > 0 || headerActions.length > 0) && (
          <Box className="panel-actions app-datagrid-actions">
            {headerActions.map((action, index) => (
              <WmTableAction
                key={`header-action-${index}-${action.key || action.name}`}
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
                  typeof action.tabindex === "string"
                    ? parseInt(action.tabindex, 10)
                    : action.tabindex
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
            {exportOptions?.length > 0 && (
              <Box>
                {/* Export menu would go here - implement based on requirements */}
                Export Options Available
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
