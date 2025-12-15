import React, { useCallback } from "react";
import { getWidgetMappingForType, getBooleanDataset } from "../utils";

// Import form widgets
import WmText from "../../../input/text";
import WmTextarea from "../../../input/textarea";
import WmNumber from "../../../input/number";
import WmCurrency from "../../../input/currency";
import WmDateTime from "../../../input/epoch/datetime";
import WmTime from "../../../input/epoch/time";
import WmDate from "../../../input/epoch/date";
import WmSelect from "../../../input/select";
import WmSlider from "../../../input/slider";
import WmRating from "../../../input/rating";
import WmColorPicker from "../../../input/color-picker";
import WmFileUpload from "../../../input/fileupload";
import WmChips from "../../../input/chips";
import WmRichTextEditor from "../../../basic/richtexteditor";
import WmSearch from "../../../basic/search";
import WmCheckbox from "../../../input/default/checkbox";
import WmSwitch from "../../../input/default/switch";
import WmCheckboxset from "../../../input/default/checkboxset";
import WmRadioset from "../../../input/default/radioset";
import { UseFormWidgetProps, UseFormWidgetReturn } from "../props";

export const useFormWidget = ({ listener }: UseFormWidgetProps): UseFormWidgetReturn => {
  // Function to render the appropriate form widget based on editWidgetType
  const renderFormWidget = useCallback(
    (
      fieldName: string,
      widgetType: string,
      value: any,
      fieldChangeCallback?: (newValue: any) => void,
      widgetProps?: {
        required?: boolean;
        disabled?: boolean;
        placeholder?: string;
        defaultvalue?: string | number | boolean;
        sessionKey?: string | number; // Add session key to force widget recreation
        rowData?: any;
        column?: any;
      }
    ): React.ReactElement => {
      // Use defaultvalue if value is null/undefined and defaultvalue is provided
      const effectiveValue =
        value !== undefined && value !== null ? value : widgetProps?.defaultvalue || "";

      const sessionSuffix = widgetProps?.sessionKey ? `_${widgetProps.sessionKey}` : "";
      const uniqueName = `edit_${fieldName}${sessionSuffix}`;

      const commonProps: any = {
        key: uniqueName, // Add key to force component recreation
        name: uniqueName,
        datavalue: effectiveValue,
        required: widgetProps?.required || false,
        disabled: widgetProps?.disabled || false,
        placeholder: widgetProps?.placeholder || `Enter ${fieldName}`,
        onChange: (event: any, widget: any, newVal: any) => {
          if (fieldChangeCallback) {
            fieldChangeCallback(newVal);
          }
          // Call the custom onChange handler from column if provided
          if (widgetProps?.column?.onChange) {
            widgetProps.column.onChange(event, {}, widgetProps?.rowData);
          }
        },
        listener,
        rowData: widgetProps?.rowData,
        column: widgetProps?.column,
      };

      // Helper function to wrap event handlers with the correct parameters
      const wrapEventHandler = (handler: Function) => {
        return (event: any) => {
          // Pass event, widget (empty for now), and rowData
          handler(event, {}, widgetProps?.rowData);
        };
      };

      // Extract event handlers from column if they exist and wrap them
      const column = widgetProps?.column;
      if (column) {
        if (column.onClick) {
          commonProps.onClick = wrapEventHandler(column.onClick);
        }
        if (column.onFocus) {
          commonProps.onFocus = wrapEventHandler(column.onFocus);
        }
        if (column.onBlur) {
          commonProps.onBlur = wrapEventHandler(column.onBlur);
        }
        if (column.onKeypress) {
          commonProps.onKeypress = wrapEventHandler(column.onKeypress);
        }
        if (column.onKeydown) {
          commonProps.onKeydown = wrapEventHandler(column.onKeydown);
        }
        if (column.onKeyup) {
          commonProps.onKeyup = wrapEventHandler(column.onKeyup);
        }
        if (column.onMouseEnter) {
          commonProps.onMouseEnter = wrapEventHandler(column.onMouseEnter);
        }
        if (column.onMouseLeave) {
          commonProps.onMouseLeave = wrapEventHandler(column.onMouseLeave);
        }
      }

      const mappedWidgetType = getWidgetMappingForType(widgetType);

      // Widget mapping with proper components
      switch (mappedWidgetType) {
        case "WmText":
          // Check if column has editinputtype property
          const editInputType = column?.editinputtype || "text";
          return <WmText {...commonProps} type={editInputType} updateon="keypress" />;

        case "WmPassword":
          return <WmText {...commonProps} type="password" updateon="keypress" />;

        case "WmTextarea":
          return <WmTextarea {...commonProps} updateon="keypress" />;

        case "WmCheckbox":
          const checkboxDataset = getBooleanDataset();
          return <WmCheckbox {...commonProps} dataset={checkboxDataset} />;

        case "WmToggle":
        case "WmSwitch":
          const switchDataset = getBooleanDataset();
          return <WmSwitch {...commonProps} dataset={switchDataset} />;

        case "WmNumber":
          return <WmNumber {...commonProps} />;

        case "WmCurrency":
          return <WmCurrency {...commonProps} />;

        case "WmSlider":
          return <WmSlider {...commonProps} />;

        case "WmRichtext":
        case "WmRichtexteditor":
          return <WmRichTextEditor {...commonProps} />;

        case "WmSelect":
          return <WmSelect {...commonProps} dataset={[]} />;

        case "WmCheckboxset":
          return <WmCheckboxset {...commonProps} dataset={[]} />;

        case "WmRadioset":
          return <WmRadioset {...commonProps} dataset={[]} />;

        case "WmDate":
          return <WmDate {...commonProps} />;

        case "WmTime":
          return <WmTime {...commonProps} />;

        case "WmTimestamp":
        case "WmDatetime":
        case "WmDateTime":
          return <WmDateTime {...commonProps} />;

        case "WmRating":
          return <WmRating {...commonProps} />;

        case "WmAutocomplete":
          return <WmSearch {...commonProps} dataset={[]} />;

        case "WmChips":
          return <WmChips {...commonProps} dataset={[]} />;

        case "WmColorpicker":
        case "WmColorPicker":
          return <WmColorPicker {...commonProps} />;

        case "WmFileupload":
          return <WmFileUpload {...commonProps} />;

        default:
          // Unknown widget types fallback to text input
          console.warn(`Unknown widget type: ${widgetType}, falling back to WmText`);
          return <WmText {...commonProps} />;
      }
    },
    []
  );

  return {
    renderFormWidget,
  };
};
