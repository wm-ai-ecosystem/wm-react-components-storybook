import LiveFormProps, { DEFAULT_PROPS } from "./props";
import Form from "../form";
import { isDataSetWidget } from "../utils/field-data-utils";
import replace from "lodash-es/replace";
import { useRef } from "react";
import FormFieldProps from "../form/form-field/props";
import { findOperationType } from "../utils";

const WmLiveForm = (prop: LiveFormProps) => {
  const props = {
    ...DEFAULT_PROPS,
    ...prop,
  };
  const dynamicFieldsRef = useRef<Record<string, any>[]>([]);
  const isDataSourceUpdatedRef = useRef<boolean>(false);
  const dataSource = props.datasource;

  function formSubmit(formData: any, success: any, error: any) {
    const primaryKeys = dataSource.execute("getPrimaryKey");
    const operationType = findOperationType(formData, primaryKeys);
    if (dynamicFieldsRef.current.length > 0) {
      dynamicFieldsRef.current.forEach((field: any) => {
        const item = field.formKey;
        formData[item] = field.dataset[formData[item] - 1];
      });
    }
    const successWithOperationType = (res: any) => {
      const payload =
        res && typeof res === "object" ? { ...res, operationType } : { operationType };
      if (typeof success === "function") {
        success(payload);
      }
      return payload;
    };

    if (operationType === "delete") {
      props.formSubmit(formData, operationType, successWithOperationType, error);
      return;
    }
    props.formSubmit({ inputFields: formData }, operationType, successWithOperationType, error);
  }

  function getRelatedTableData(formField: any) {
    dataSource &&
      dataSource
        .execute("getRelatedTableData", {
          relatedField: formField.formKey,
          pagesize: formField.limit,
          orderBy: formField.orderby ? replace(formField.orderby, /:/g, " ") : "",
          filterFields: {},
          filterExpr: formField.filterexpressions ? formField.filterexpressions : {},
        })
        .then((response: any) => {
          const primaryKeys = dataSource.execute("getRelatedTablePrimaryKeys", formField.formKey);
          const displayField = primaryKeys.length < 0 ? undefined : primaryKeys[0];

          // Check if updateFormWidgetDataset is a function before calling it
          if (typeof formField.updateFormWidgetDataset === "function") {
            formField.updateFormWidgetDataset(response, displayField);
          }

          dynamicFieldsRef.current.push({
            formKey: formField.formKey,
            dataset: response.data,
            displayField: displayField,
          });
        });
  }

  function onDataSourceChange(formFields: FormFieldProps[]) {
    if (isDataSourceUpdatedRef.current) return;

    if (formFields.length > 0) {
      isDataSourceUpdatedRef.current = true;
    }
    formFields.forEach((field: any) => {
      if (!field.isDataSetBound && isDataSetWidget(field.widget) && field["isRelated"]) {
        getRelatedTableData(field);
        // Check if setIsDataSetBound is a function before calling it
        if (typeof field.setIsDataSetBound === "function") {
          field.setIsDataSetBound(true);
        }
      }
    });
  }

  return (
    // @ts-ignore
    <Form
      {...props}
      formSubmit={formSubmit}
      onDataSourceChange={onDataSourceChange}
      widgettype="live-form"
      key={`live-form-${props.name}`}
    >
      {props.children}
    </Form>
  );
};

WmLiveForm.displayName = "WmLiveForm";

export default WmLiveForm;
