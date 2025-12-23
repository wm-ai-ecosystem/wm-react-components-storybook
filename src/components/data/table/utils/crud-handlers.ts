import { ToastType } from "../props";
import uniqueId from "lodash-es/uniqueId";
import filter from "lodash-es/filter";
import findIndex from "lodash-es/findIndex";
import slice from "lodash-es/slice";
import forEach from "lodash-es/forEach";
import some from "lodash-es/some";
import {
  SuccessHandlerOptions,
  DatasetUpdateOptions,
  ServerOperationOptions,
  DeleteOperationOptions,
} from "../props";
import { LiveVariableConfig } from "@wavemaker/react-runtime/variables/live-variable";
import { DataSource } from "../../types";

// ==================== DATASOURCE UTILITIES ====================

const getDatasourceInfo = async (datasource: LiveVariableConfig) => {
  const [supportsCrud, isApiAware] = await Promise.all([
    datasource.execute(DataSource.Operation.SUPPORTS_CRUD),
    datasource.execute(DataSource.Operation.IS_API_AWARE),
  ]);
  const currentPageNum = (datasource.pagination?.number ?? 0) + 1;
  const shouldUseServer = supportsCrud || !isApiAware || datasource.category === "wm.CrudVariable";

  return { supportsCrud, isApiAware, currentPageNum, shouldUseServer };
};

// ==================== OPERATION HANDLERS ====================

const handleOperationResult = (
  operation: "insert" | "update" | "delete",
  response: any,
  error: any,
  options: SuccessHandlerOptions & {
    errormessage?: string;
    onError?: (operation: string, error: any) => void;
  }
) => {
  const { showToast, onSuccess, onRowCallback, message, onError, errormessage } = options;

  if (error) {
    showToast?.(error || errormessage, "Error");
    onError?.(operation, error);
    return false;
  }

  if (!onRowCallback && showToast && message) {
    showToast(message, "Success");
  }
  onSuccess?.(operation, response);
  onRowCallback?.(null, response, response);
  return true;
};

// ==================== DATA MANAGEMENT ====================

const createCompleteRecord = (
  editingData: Record<string, any>,
  wmTableColumns: any[],
  serverResponse?: any
): Record<string, any> => {
  const completeRecord: Record<string, any> = {};

  forEach(wmTableColumns, column => {
    if (column.field) {
      completeRecord[column.field] = editingData[column.field] ?? column.defaultvalue ?? "";
    }
  });

  return { ...completeRecord, ...serverResponse, _wmTableRowId: uniqueId("new_row_") };
};

const hasValidData = (record: Record<string, any>): boolean =>
  some(record, value => value !== undefined && value !== null && value !== "");

const updateDataset = (
  isNewRow: boolean,
  rowId: string | null,
  editingData: Record<string, any>,
  wmTableColumns: any[],
  serverResponse: any | undefined,
  options: DatasetUpdateOptions
): boolean => {
  const {
    setInternalDataset,
    onNewRowAdded,
    onRowUpdate,
    showToast,
    insertmessage,
    updatemessage,
  } = options;

  if (isNewRow) {
    const completeRecord = createCompleteRecord(editingData, wmTableColumns, serverResponse);
    if (!hasValidData(completeRecord)) return false;

    setInternalDataset(prevDataset => {
      const updatedDataset = [...prevDataset, completeRecord];
      onNewRowAdded?.(completeRecord);
      if (showToast && insertmessage) showToast(insertmessage, "Success");
      return updatedDataset;
    });
  } else {
    setInternalDataset(prevDataset => {
      const rowIndex = findIndex(prevDataset, row => row._wmTableRowId === rowId);
      const updatedDataset = prevDataset.map(row =>
        row._wmTableRowId === rowId ? { ...row, ...editingData, ...serverResponse } : row
      );

      if (onRowUpdate && rowIndex !== -1) {
        setTimeout(() => onRowUpdate(editingData, rowIndex, updatedDataset), 0);
      }
      if (showToast && updatemessage) showToast(updatemessage, "Success");
      return updatedDataset;
    });
  }
  return true;
};

// ==================== FORM DATA PROCESSING ====================

const processFieldValue = (value: any, column: any, isNewRow: boolean): any => {
  const fields = column.field.split(".");

  if (fields.length === 1 && column.editWidgetType?.toLowerCase() === "wmupload") return value;
  if (value === "null") value = null;

  // Validate and transform
  if (value === null || value === undefined) value = column.defaultvalue ?? "";
  if (column.editWidgetType === "WmCheckbox" || column.editWidgetType === "WmSwitch")
    return Boolean(value);
  if (column.editWidgetType === "WmNumber" || column.editWidgetType === "WmCurrency") {
    const numValue = Number(value);
    return isNaN(numValue) ? 0 : numValue;
  }

  if (value === null) {
    if (fields.length > 1) return null;
    return isNewRow ? null : "";
  }

  return value;
};

const collectFormData = (
  currentEditingData: Record<string, any>,
  wmTableColumns: any[],
  isNewRow: boolean
): Record<string, any> => {
  const formData: Record<string, any> = {};

  forEach(wmTableColumns, column => {
    if (!column.field) return;

    const fields = column.field.split(".");
    const processedValue = processFieldValue(currentEditingData[column.field], column, isNewRow);

    if (processedValue === null && fields.length > 1) {
      formData[fields[0]] = null;
    } else if (processedValue !== undefined) {
      formData[column.field] = processedValue;
    }
  });

  return formData;
};

// ==================== PAGINATION UTILITIES ====================

const adjustPaginationAfterDelete = async (
  tableInstance: any,
  internalDataset: any[],
  datasource: any,
  isServerSidePagination: boolean
): Promise<{ shouldRefresh: boolean; targetPage: number }> => {
  if (!tableInstance) return { shouldRefresh: false, targetPage: 0 };

  const {
    pagination: { pageIndex: currentPage, pageSize },
  } = tableInstance.getState();

  if (isServerSidePagination && datasource?.pagination) {
    const { numberOfElements, totalElements } = datasource.pagination;

    if (numberOfElements === 1 && currentPage > 0) {
      tableInstance.setPageIndex(currentPage - 1);
      return { shouldRefresh: true, targetPage: currentPage };
    }

    if (totalElements === 1) {
      tableInstance.setPageIndex(0);
      return { shouldRefresh: true, targetPage: 1 };
    }

    return { shouldRefresh: true, targetPage: currentPage + 1 };
  }

  // Client-side pagination
  const pageItems = slice(internalDataset, currentPage * pageSize, (currentPage + 1) * pageSize);
  if (pageItems.length === 1 && currentPage > 0) {
    tableInstance.setPageIndex(currentPage - 1);
  }

  return { shouldRefresh: false, targetPage: currentPage };
};

// ==================== NON-API AWARE OPERATIONS ====================

const handleNonApiAwareOperation = async (
  datasource: LiveVariableConfig,
  binddataset: string,
  formData: Record<string, any>,
  operation: "ADD_ITEM" | "SET_ITEM" | "REMOVE_ITEM"
): Promise<any> => {
  const path = binddataset.split(".");
  const parentIndex = parseInt(path[path.length - 1]);
  const parentPath = path.slice(0, -1).join(".");

  return datasource.execute(DataSource.Operation[operation], {
    item: formData,
    path: parentPath,
    parentIndex,
  });
};

// ==================== EXPORTED FUNCTIONS ====================

export const refreshDataSource = async (
  datasource: LiveVariableConfig,
  options: {
    filterFields?: Record<string, any>;
    orderBy?: string;
    page?: number;
    condition?: string;
    pagesize?: number;
  }
): Promise<any> => {
  if (!datasource) throw new Error("Datasource is required");

  return datasource.execute(DataSource.Operation.LIST_RECORDS, {
    filterFields: options.filterFields || {},
    orderBy: options.orderBy,
    page: options.page || 1,
    logicalOp: options.condition || "",
  });
};

export const handleServerOperation = async (options: ServerOperationOptions): Promise<boolean> => {
  const {
    datasource,
    binddataset,
    isNewRow,
    rowId,
    currentEditingData,
    wmTableColumns,
    setInternalDataset,
    onNewRowAdded,
    onRowUpdate,
    showToast,
    insertmessage,
    updatemessage,
    onRowinsert,
    onRowupdate,
    onSuccess,
    onError,
    errormessage,
    tableInstance,
    isServerSidePagination,
  } = options;

  try {
    const formData = collectFormData(currentEditingData, wmTableColumns, isNewRow);
    let response = currentEditingData;

    if (datasource) {
      const { isApiAware, currentPageNum, shouldUseServer } = await getDatasourceInfo(datasource);

      if (shouldUseServer) {
        if (!isApiAware && binddataset) {
          await handleNonApiAwareOperation(
            datasource,
            binddataset,
            formData,
            isNewRow ? "ADD_ITEM" : "SET_ITEM"
          );
        } else {
          response = await datasource.execute(
            isNewRow ? DataSource.Operation.INSERT_RECORD : DataSource.Operation.UPDATE_RECORD,
            { row: formData, skipNotification: true }
          );

          if (response.error) throw response.error;

          // Handle pagination for new rows
          if (isNewRow && isServerSidePagination && datasource.pagination) {
            const { totalElements, size = 10 } = datasource.pagination;
            if (totalElements !== undefined && size > 0) {
              const lastPage = Math.ceil((totalElements + 1) / size);
              if (tableInstance && lastPage > currentPageNum) {
                tableInstance.setPageIndex(lastPage - 1);
              } else {
                await refreshDataSource(datasource, { page: currentPageNum, pagesize: size });
              }
            }
          } else {
            // Always refresh data source after successful operation, regardless of pagination type
            await refreshDataSource(datasource, {
              page: currentPageNum,
              pagesize: datasource.pagination?.size || 10,
            });
          }
        }
      }
    }

    updateDataset(isNewRow, rowId, currentEditingData, wmTableColumns, response, {
      setInternalDataset,
      onNewRowAdded,
      onRowUpdate,
      showToast,
      insertmessage,
      updatemessage,
    });

    return handleOperationResult(isNewRow ? "insert" : "update", response, null, {
      showToast,
      onSuccess,
      onRowCallback: isNewRow ? onRowinsert : onRowupdate,
      message: isNewRow ? insertmessage : updatemessage,
      onError,
    });
  } catch (error: any) {
    return handleOperationResult(isNewRow ? "insert" : "update", null, error, {
      showToast,
      onError,
      errormessage,
    });
  }
};

export const handleDeleteOperation = async (options: DeleteOperationOptions): Promise<boolean> => {
  const {
    rowData,
    tableInstance,
    internalDataset,
    setInternalDataset,
    datasource,
    binddataset,
    onRowDelete,
    showToast,
    deletemessage,
    onSuccess,
    onRowdelete,
    onError,
    errormessage,
    isServerSidePagination,
  } = options;

  try {
    // Find row first
    const rowIndex = findIndex(
      internalDataset,
      row =>
        row._wmTableRowId === rowData._wmTableRowId ||
        (row.id !== undefined && row.id === rowData.id)
    );

    if (rowIndex === -1) {
      console.warn("Row not found for deletion");
      return false;
    }

    let response = rowData;

    // Handle server operations first, before updating local dataset
    if (datasource) {
      const { isApiAware, currentPageNum, shouldUseServer } = await getDatasourceInfo(datasource);

      if (shouldUseServer) {
        if (!isApiAware && binddataset) {
          await handleNonApiAwareOperation(datasource, binddataset, rowData, "REMOVE_ITEM");
        } else {
          response = await datasource.execute(DataSource.Operation.DELETE_RECORD, {
            row: rowData,
            skipNotification: true,
          });

          if (response.error) throw response.error;
        }
      }
    }

    // Only update dataset after successful server operation
    const newDataset = filter(
      internalDataset,
      row =>
        row._wmTableRowId !== rowData._wmTableRowId &&
        (row.id === undefined || row.id !== rowData.id)
    );

    setInternalDataset(() => newDataset);

    // Handle pagination
    const paginationResult = await adjustPaginationAfterDelete(
      tableInstance,
      internalDataset,
      datasource,
      isServerSidePagination || false
    );

    if (isServerSidePagination && paginationResult.shouldRefresh && datasource) {
      await datasource.invoke({
        page: paginationResult.targetPage,
        pagesize: datasource.pagination?.size || 10,
      });
    }

    onRowDelete?.(rowData, rowIndex, newDataset);

    return handleOperationResult("delete", response, null, {
      showToast,
      onSuccess,
      onRowCallback: onRowdelete,
      message: deletemessage,
      onError,
    });
  } catch (error: any) {
    return handleOperationResult("delete", null, error, {
      showToast,
      onError,
      errormessage,
    });
  }
};
