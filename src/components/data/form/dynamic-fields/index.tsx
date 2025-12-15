import React, { useRef, useEffect } from "react";
import isArray from "lodash-es/isArray";
import clsx from "clsx";

// Form context
import { useFormContext } from "../form-context";

// Input components
import WmText from "@/components/input/text";
import WmTextarea from "@/components/input/textarea";
import WmNumber from "@/components/input/number";
import WmCurrency from "@/components/input/currency";
import WmSelect from "@/components/input/select";
import WmSlider from "@/components/input/slider";
import WmRating from "@/components/input/rating";

// Default input components
import WmCheckbox from "@/components/input/default/checkbox";
import WmCheckboxset from "@/components/input/default/checkboxset";
import WmRadioset from "@/components/input/default/radioset";
import WmSwitch from "@/components/input/default/switch";

// Date/Time components
import WmDate from "@/components/input/epoch/date";
import WmDatetime from "@/components/input/epoch/datetime";
import WmTime from "@/components/input/epoch/time";

// Other input components
import WmChips from "@/components/input/chips";
import WmColorPicker from "@/components/input/color-picker";
import WmFileupload from "@/components/input/fileupload";
import WmCalendar from "@/components/input/calendar";

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
import { isEqual } from "lodash-es";

// Component mapping for dynamic rendering
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  text: WmText,
  textarea: WmTextarea,
  number: WmNumber,
  currency: WmCurrency,
  select: WmSelect,
  slider: WmSlider,
  rating: WmRating,
  checkbox: WmCheckbox,
  checkboxset: WmCheckboxset,
  radioset: WmRadioset,
  switch: WmSwitch,
  date: WmDate,
  datetime: WmDatetime,
  time: WmTime,
  chips: WmChips,
  colorpicker: WmColorPicker,
  fileupload: WmFileupload,
  calendar: WmCalendar,
};

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
    if (onBeforeRender) metadataRef.current = onBeforeRender(metadata, props);
    else metadataRef.current = metadata;
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
