import React, { useMemo, useCallback, memo } from "react";
import { Box } from "@mui/material";
import WmTableAction from "../table-action";
import { getButtonClasses } from "../utils";
import { TablePanelHeadingProps } from "../props";
import WmMenu from "@wavemaker/react-runtime/components/navigation/menu";
import { DataSource } from "@wavemaker/react-runtime/components/data/types";
import { isEmpty, values } from "lodash";

const TablePanelHeadingComponent: React.FC<TablePanelHeadingProps> = ({
  title,
  subheading,
  iconclass,
  exportformat = [],
  headerActions,
  spacing = "normal",
  isGridEditMode = false,
  isLoading = false,
  listener,
  datasource,
  columns = [],
  sortInfo,
  filterInfo = [],
  exportdatasize,
  onBeforeExport,
}) => {
  const ROW_OPS_FIELD = "rowOperations";

  const exportIconMapping: Record<string, string> = {
    EXCEL: "fa fa-file-excel-o",
    CSV: "fa fa-file-text-o",
  };

  // Parse exportformat if it's a comma-separated string
  const exportOptions: string[] = useMemo(() => {
    if (Array.isArray(exportformat)) {
      return exportformat;
    }
    const formatStr = exportformat as string;
    if (typeof formatStr === "string") {
      return formatStr
        .split(",")
        .map((opt: string) => opt.trim())
        .filter(Boolean);
    }
    return [];
  }, [exportformat]);

  // Transform export options into dataset format for WmMenu
  const exportDataset = useMemo(() => {
    return exportOptions.map((format: string) => ({
      label: format,
      icon: exportIconMapping[format] || "fa fa-file-o",
      dataValue: format,
    }));
  }, [exportOptions]);

  const handleExportSelect = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      widget: Record<string, unknown>,
      item: { label: string; dataValue: string }
    ) => {
      if (!datasource) {
        console.warn("No datasource available for export");
        return;
      }

      const sortOptions = isEmpty(sortInfo) ? "" : `${sortInfo.field} ${sortInfo.direction}`;
      const columnsMap: Record<string, { header: string; expression?: string; field?: string }> =
        {};

      // Build columns map from fieldDefs (columns)
      columns.forEach(fieldDef => {
        // Do not add the row operation actions column to the exported file.
        if (fieldDef.field === ROW_OPS_FIELD || fieldDef.show === false) {
          return;
        }

        const option: { header: string; expression?: string; field?: string } = {
          header: fieldDef.displayName || fieldDef.field || "",
        };

        // If column has exportexpression, then send the expression as required by backend.
        // otherwise send the field name.
        if (fieldDef.exportexpression) {
          option.expression = fieldDef.exportexpression;
        } else {
          option.field = fieldDef.field;
        }

        if (fieldDef.field) {
          columnsMap[fieldDef.field] = option;
        }
      });

      const requestData = {
        matchMode: "anywhereignorecase",
        filterFields: filterInfo,
        orderBy: sortOptions,
        exportType: item.label,
        logicalOp: "AND",
        exportSize: exportdatasize,
        columns: columnsMap,
      };

      // Call beforeexport callback if provided
      let isValid = true;
      if (onBeforeExport) {
        isValid = onBeforeExport({ $data: requestData }) !== false;
      }

      if (isValid === false) {
        return;
      }

      // Convert columns map to fields array
      const requestDataWithFields = {
        ...requestData,
        fields: values(requestData.columns),
      };

      // Execute download operation
      try {
        datasource?.execute(DataSource.Operation.DOWNLOAD, { data: requestDataWithFields });
      } catch (error) {
        console.error("Error exporting data:", error);
        if (listener?.App?.notifyApp) {
          listener.App.notifyApp("Failed to export data", "Error");
        }
      }
    },
    [datasource, columns, sortInfo, filterInfo, exportdatasize, onBeforeExport, listener]
  );

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
        {(exportformat?.length > 0 || headerActions.length > 0) && (
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
            {exportOptions.length > 0 && (
              <WmMenu
                caption={listener?.appLocale?.LABEL_EXPORT || "Export"}
                dataset={exportDataset}
                itemlabel="label"
                itemicon="icon"
                menuposition="down,left"
                autoclose="always"
                onSelect={handleExportSelect}
                listener={listener}
                name="export-menu"
                tabindex={0}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

TablePanelHeadingComponent.displayName = "TablePanelHeading";

export const TablePanelHeading = memo(TablePanelHeadingComponent, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.title === nextProps.title &&
    prevProps.subheading === nextProps.subheading &&
    prevProps.iconclass === nextProps.iconclass &&
    prevProps.exportformat === nextProps.exportformat &&
    prevProps.headerActions === nextProps.headerActions &&
    prevProps.spacing === nextProps.spacing &&
    prevProps.isGridEditMode === nextProps.isGridEditMode &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.listener === nextProps.listener &&
    prevProps.datasource === nextProps.datasource &&
    prevProps.columns === nextProps.columns &&
    prevProps.sortInfo === nextProps.sortInfo &&
    prevProps.filterInfo === nextProps.filterInfo &&
    prevProps.exportdatasize === nextProps.exportdatasize &&
    prevProps.onBeforeExport === nextProps.onBeforeExport
  );
});
