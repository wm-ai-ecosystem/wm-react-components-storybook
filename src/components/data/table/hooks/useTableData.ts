import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { findIndex, filter, slice, isEqual } from "lodash-es";
import { UseTableDataProps, UseTableDataReturn } from "../props";
import { addUniqueRowIds, TABLE_MESSAGES } from "../utils";
import { cleanRowData } from "../utils";
import WmConfirmDialog from "../../../dialogs/confirm-dialog";
import { handleDeleteOperation } from "../utils/crud-handlers";

export const useTableData = ({
  dataset,
  onRowDelete,
  deleteoktext = TABLE_MESSAGES.deleteOkText,
  deletecanceltext = TABLE_MESSAGES.deleteCancelText,
  confirmdelete = TABLE_MESSAGES.deleteConfirmMessage,
  deletemessage = TABLE_MESSAGES.deleteSuccess,
  errormessage = TABLE_MESSAGES.deleteError,
  showToast,
  datasource,
  binddataset,
  onSuccess,
  onError,
  onRowdelete,
  isServerSidePagination,
}: UseTableDataProps): UseTableDataReturn => {
  // Add unique row IDs to the dataset if they don't already have them
  const processedDataset = useMemo(() => addUniqueRowIds(dataset || []), [dataset]);
  const [internalDataset, setInternalDataset] = useState<any[]>(processedDataset);

  // Update internalDataset when dataset prop changes
  useEffect(() => {
    if (!isEqual(internalDataset, processedDataset)) {
      setInternalDataset(processedDataset);
    }
  }, [processedDataset]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const pendingDeleteRef = useRef<{
    rowData: any;
    tableInstance?: any;
    resolve: (value: boolean) => void;
  } | null>(null);

  // Handle confirm deletion
  const handleConfirmDelete = useCallback(async () => {
    if (pendingDeleteRef.current) {
      const { rowData, tableInstance, resolve } = pendingDeleteRef.current;
      const result = await handleDeleteOperation({
        rowData,
        tableInstance,
        internalDataset,
        setInternalDataset,
        datasource,
        binddataset,
        onRowDelete,
        showToast,
        onSuccess,
        onError,
        onRowdelete,
        deletemessage,
        errormessage,
        isServerSidePagination,
      });
      resolve(result);
      pendingDeleteRef.current = null;
    }
    setShowDeleteConfirm(false);
  }, [
    internalDataset,
    setInternalDataset,
    datasource,
    binddataset,
    onRowDelete,
    showToast,
    onSuccess,
    onError,
    onRowdelete,
    deletemessage,
    errormessage,
    isServerSidePagination,
  ]);

  // Handle cancel deletion
  const handleCancelDelete = useCallback(() => {
    if (pendingDeleteRef.current) {
      pendingDeleteRef.current.resolve(false);
      pendingDeleteRef.current = null;
    }
    setShowDeleteConfirm(false);
  }, []);

  // Delete record functionality with confirmation
  const deleteRecord = useCallback(async (rowData: any, tableInstance?: any): Promise<boolean> => {
    return new Promise(resolve => {
      // Store the delete operation details
      pendingDeleteRef.current = {
        rowData,
        tableInstance,
        resolve,
      };

      // Show the confirmation dialog
      setShowDeleteConfirm(true);
    });
  }, []);

  // Render the confirmation dialog component
  const renderConfirmDialog = useCallback((): React.ReactElement | null => {
    if (!showDeleteConfirm) return null;

    return React.createElement(WmConfirmDialog, {
      name: "delete-row-confirm",
      isopen: showDeleteConfirm,
      title: TABLE_MESSAGES.deleteConfirmTitle,
      message: confirmdelete,
      iconclass: "wi wi-delete",
      oktext: deleteoktext,
      canceltext: deletecanceltext,
      onOk: handleConfirmDelete,
      onCancel: handleCancelDelete,
      onClose: handleCancelDelete,
      listener: {},
    });
  }, [
    showDeleteConfirm,
    handleConfirmDelete,
    handleCancelDelete,
    confirmdelete,
    deleteoktext,
    deletecanceltext,
  ]);

  return {
    internalDataset,
    setInternalDataset,
    deleteRecord,
    renderConfirmDialog,
  };
};
