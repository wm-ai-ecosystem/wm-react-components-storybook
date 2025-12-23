import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import withBaseWrapper, { BaseProps } from "@/higherOrder/withBaseWrapper";
import WmDialog from "@/components/dialogs/dialog";
import { TableEditMode, WmTableProps } from "../props";
import WmLiveFormProps from "../../live-form/props";
import { WmDialogBody } from "@wavemaker/react-runtime/components/dialogs/dialog-body";
import Box from "@mui/material/Box";
import { useWidgetProxy } from "@wavemaker/react-runtime/context/WidgetProvider";

interface WmLiveTableProps extends BaseProps {
  formlayout?: TableEditMode;
  children: ReactNode;
  name: string;
  listener: any;
}

const WmLiveTable = (props: WmLiveTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force form re-creation
  const isDialogLayout = props.formlayout === "dialog";

  const { formlayout = "form", listener } = props;

  // Separate WmTable and WmLiveForm from children - optimized with early exit
  const { tableChild, formChild } = useMemo(() => {
    let tableChild: ReactElement<WmTableProps> | undefined;
    let formChild: ReactElement<WmLiveFormProps> | undefined;

    const childArray = Children.toArray(props.children);

    for (let i = 0; i < childArray.length; i++) {
      const child = childArray[i];
      if (isValidElement(child)) {
        const displayName = (child.type as any)?.displayName || (child.type as any)?.name || "";

        if (!tableChild && displayName === "WmTable") {
          tableChild = child as ReactElement<WmTableProps>;
        } else if (!formChild && displayName === "WmLiveForm") {
          formChild = child as ReactElement<WmLiveFormProps>;
        }

        // Early exit if both children found
        if (tableChild && formChild) break;
      }
    }

    return { tableChild, formChild };
  }, [props.children]);

  const tableWidget = tableChild?.props.name ? useWidgetProxy(tableChild.props.name) : null;
  const formWidget = formChild?.props.name ? useWidgetProxy(formChild.props.name) : null;

  const handleOpenDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    // Clear form data when dialog closes
    setFormData(null);
  }, []);

  // Helper to get form widget - always get fresh value from listener
  const getFormWidget = useCallback(() => {
    // Always get fresh value from listener to ensure we have the latest registered methods
    return formWidget;
  }, [formChild?.props.name]);

  const getTableWidget = useCallback(() => {
    return tableWidget;
  }, [tableWidget]);

  // Expose LiveTable methods through its own listener
  useEffect(() => {
    if (!listener?.onChange || !formChild?.props.name || !tableWidget) return;

    const liveTableContext = {
      addNewRow: (event: any, widget: any, row: any) => {
        const formWidget = getFormWidget();
        const tableWidget = getTableWidget();

        // Set flag to indicate we're adding a new row
        setIsAddingNewRow(true);

        if (isDialogLayout) {
          // Clear form data for new row and increment key to force form re-creation
          setFormData({});
          setFormKey(prev => prev + 1); // Force new form instance
          // Clear the global widget registry to prevent stale form values
          if (formChild?.props.name && listener?.Widgets?.[formChild.props.name]) {
            listener.Widgets[formChild.props.name].formdata = {};
            // Clear formfields to reset individual field values
            if (listener.Widgets[formChild.props.name].formfields) {
              Object.keys(listener.Widgets[formChild.props.name].formfields).forEach(key => {
                const field = listener.Widgets[formChild.props.name].formfields[key];
                if (field) {
                  field.datavalue = field.defaultvalue || "";
                  field.value = field.defaultvalue || "";
                }
              });
            }
          }
          handleOpenDialog();
        } else if (formlayout === "form") {
          // For non-dialog mode, clear form data by setting empty object
          setFormData({});
          // Also update the form widget's formdata in context
          if (formWidget && formChild?.props.name && listener?.Widgets) {
            listener.Widgets[formChild.props.name].formdata = {};
          }
          // Reset the form
          formWidget?.new();
        } else if (formlayout === "inline" || formlayout === "quickedit") {
          tableWidget?.addNewRow();
        }
      },
      editRow: (event: any, widget: any, row: any) => {
        const tableWidget = getTableWidget();

        // Reset flag since we're editing, not adding new
        setIsAddingNewRow(false);

        if (isDialogLayout) {
          // Set form data first, then open dialog
          setFormData(row);
          handleOpenDialog();
        } else if (formlayout === "form") {
          const formWidget = getFormWidget();
          formWidget?.edit(row);
        } else if (formlayout === "inline" || formlayout === "quickedit") {
          tableWidget?.editRow(event, widget, row);
        }
      },
      closeDialog: () => {
        if (isDialogLayout) {
          handleCloseDialog();
        }
      },
    };

    listener.onChange(props.name, liveTableContext);
  }, [props.name, formChild?.props.name]);

  // Create stable callbacks for form handlers
  const handleFormSuccess = useCallback(async () => {
    if (isDialogLayout) {
      handleCloseDialog();
    } else {
      // Set form to view mode after successful submission
      const formWidget = getFormWidget();
      formWidget?.setShowViewMode?.(true);
    }
    const tableWidget = getTableWidget();
    if (tableWidget && tableWidget.datasource) {
      try {
        // Use the table's refresh method to update data
        // Pass true if we were adding a new row
        if (tableWidget.refresh && typeof tableWidget.refresh === "function") {
          await tableWidget.refresh(isAddingNewRow);
        }
      } catch (error) {
        console.error("Error refreshing table data:", error);
      }
    }
    // Reset the flag after refresh
    setIsAddingNewRow(false);

    // Call original onSuccess if it exists
    formChild?.props?.onSuccess?.();
  }, [
    isDialogLayout,
    handleCloseDialog,
    getFormWidget,
    getTableWidget,
    formChild?.props,
    isAddingNewRow,
  ]);

  const handleFormCancel = useCallback(() => {
    handleCloseDialog();
    // Reset the flag when cancelling
    setIsAddingNewRow(false);
    // Call original cancel if it exists
    formChild?.props?.cancel?.();
    if (formlayout === "form") {
      // Set form to view mode after successful submission
      const formWidget = getFormWidget();
      formWidget?.setShowViewMode?.(true);
    }
  }, [handleCloseDialog, formChild?.props, formlayout, getFormWidget]);

  // Enhance form child with success/cancel handlers - memoized more efficiently
  const enhancedFormChild = useMemo(() => {
    if (!formChild || !isValidElement(formChild)) return formChild;

    const newProps = {
      ...formChild.props,
      isLayoutDialog: isDialogLayout,
      onSuccess: handleFormSuccess,
      cancel: handleFormCancel,
      // Pass form data for both dialog and form layouts when explicitly set
      ...(formData !== null && { formdata: formData }),
    };

    return cloneElement(formChild, newProps);
  }, [formChild, isDialogLayout, handleFormSuccess, handleFormCancel, formData, formKey]);

  const enhancedTableChild = useMemo(() => {
    if (!tableChild || !isValidElement(tableChild)) return tableChild;
    return cloneElement(tableChild, {
      ...tableChild.props,
      formName: formChild?.props.name,
    });
  }, [tableChild]);

  // Render based on formlayout
  if (isDialogLayout) {
    return (
      <>
        {enhancedTableChild}
        {formChild && (
          <WmDialog
            isopen={isDialogOpen}
            onClose={handleCloseDialog}
            name={`${props.name}_dialog`}
            listener={props.listener}
            modal={true}
            closable={true}
            title={formChild.props.title}
            iconclass={formChild.props.iconclass}
            dialogtype="design-dialog"
          >
            <WmDialogBody name="popup-body" listener={{}}>
              {/* Key on wrapper div forces complete form destruction and recreation */}
              <div key={`form-wrapper-${formKey}`}>{enhancedFormChild}</div>
            </WmDialogBody>
          </WmDialog>
        )}
      </>
    );
  }

  // Default: render as form
  return (
    <Box component="div" className="app-livegrid">
      {enhancedTableChild}
      {enhancedFormChild}
    </Box>
  );
};

export default withBaseWrapper(WmLiveTable);
