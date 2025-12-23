import React, { useRef, useEffect } from "react";
import isArray from "lodash-es/isArray";
import clsx from "clsx";

// Form context
import { useFormContext } from "../form-context";

// Input components
import WmText from "@/components/input/text";

// Layout components
import WmLayoutGrid from "@/components/container/layout-grid";
import WmGridRow from "@/components/container/layout-grid/grid-row";
import WmGridColumn from "@/components/container/layout-grid/grid-column";

// Basic components
import WmLabel from "@/components/basic/label";

// Form field wrapper
import WmFormField from "@/components/data/form/form-field";

// Import types
import { FormFieldMetadata, DynamicFormProps } from "./props";
import { updateMetadata } from "./utils";
import { COMPONENT_MAP } from "./constant";

// Default CSS classes
const DEFAULT_FIELD_CLASS = "app-dynamic-form-field";

export default function DynamicForm(props: DynamicFormProps) {
  const {
    metadata,
    listener,
    layout = "1-column",
    noOfColumns = 1,
    isHorizontal = false,
    name = "dynamicForm",
    formRef,
    onBeforeRender,
  } = props;
  const formContext = useFormContext();
  const { captionposition } = formContext || {};
  const metadataRef = useRef(metadata);

  useEffect(() => {
    if (onBeforeRender) {
      const data: FormFieldMetadata[] = onBeforeRender(metadata, props);
      if (data) {
        metadataRef.current = updateMetadata(data, listener) || metadata;
      }
    } else metadataRef.current = metadata;
  }, [metadata, onBeforeRender]);

  // Return null if fields is not an array or empty
  if (!isArray(metadataRef.current) || metadataRef.current.length === 0) {
    return null;
  }

  // Calculate column width based on layout
  const getColumnWidth = (fieldColumnWidth?: number): number => {
    if (fieldColumnWidth) return fieldColumnWidth;

    // Calculate based on layout
    const columns = layout === "custom" ? noOfColumns : parseInt(layout.split("-")[0]);
    return Math.floor(12 / columns);
  };

  // Render individual form field
  const renderFormField = (field: FormFieldMetadata) => {
    const ComponentToRender = COMPONENT_MAP[field.widget] || WmText;

    // Prepare field props
    const fieldProps = {
      ...field,
      listener,
      captionposition: isHorizontal ? "horizontal" : captionposition,
      // Pass form context if available
      ...(formContext && {
        formContext,
        onChangeHandler: formContext.onChangeHandler,
      }),
    };

    return <ComponentToRender {...fieldProps} />;
  };

  // Render form field with label using FormField wrapper
  const renderFormFieldWithWrapper = (field: FormFieldMetadata) => {
    const columnWidth = getColumnWidth(field.columnwidth);

    return (
      <WmGridColumn
        key={field.name}
        name={`${field.name}Column`}
        columnwidth={columnWidth}
        listener={listener}
      >
        <WmFormField
          {...field}
          name={field.name}
          field="true"
          listener={listener}
          className={clsx(DEFAULT_FIELD_CLASS, field.className, " app-textbox")}
          formRef={formRef}
          required={field.required === true || String(field.required) === "true"}
          renderFormFields={($formField: any) => (
            <>
              <WmLabel
                name={`${$formField.name}_formLabel`}
                caption={$formField.displayname}
                required={$formField.required}
                listener={listener}
                className={clsx(
                  "app-label control-label formfield-label",
                  formRef?.captionCls || ""
                )}
                htmlFor={$formField.name}
              />
              {/* Render the actual form field */}
              {renderFormField({
                ...field,
                ...$formField,
                name: $formField.name + "_formWidget",
                className: clsx(field.className, formRef?.widgetCls || ""),
              })}
            </>
          )}
        />
      </WmGridColumn>
    );
  };

  // Group fields into rows based on column layout
  const groupFieldsIntoRows = (fields: FormFieldMetadata[]): FormFieldMetadata[][] => {
    const columns = layout === "custom" ? noOfColumns : parseInt(layout.split("-")[0]);
    const rows: FormFieldMetadata[][] = [];

    for (let i = 0; i < fields.length; i += columns) {
      rows.push(fields.slice(i, i + columns));
    }

    return rows;
  };

  // Render fields in grid layout
  const renderFieldsInGrid = () => {
    if (layout === "1-column") {
      // Single column layout - each field in its own row
      return metadataRef.current.map(field => (
        <WmGridRow key={field.name} name={`${field.name}Row`} listener={listener}>
          {renderFormFieldWithWrapper(field)}
        </WmGridRow>
      ));
    }

    // Multi-column layout - group fields into rows
    const fieldRows = groupFieldsIntoRows(metadataRef.current);
    return fieldRows.map((row, rowIndex) => (
      <WmGridRow key={`row-${rowIndex}`} name={`dynamicFormRow${rowIndex}`} listener={listener}>
        {row.map(field => renderFormFieldWithWrapper(field))}
      </WmGridRow>
    ));
  };

  return (
    <WmLayoutGrid name={name} listener={listener} className="dynamic-form-grid">
      {renderFieldsInGrid()}
    </WmLayoutGrid>
  );
}
