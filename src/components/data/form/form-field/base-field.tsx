import { useState, useMemo, useRef } from "react";
import { LIVE_CONSTANTS } from "@/components/data/utils/filter-field-util";
import FormFieldProps, { FieldDataSetProps } from "./props";
import { useFormContext } from "@wavemaker/react-runtime/components/data/form/form-context";

const BaseField = (WrappedComponent: any) => {
  const FormField = (props: FormFieldProps) => {
    const fieldRef = useRef<any>(null);
    const [validators, setValidators] = useState(props.validators || []);
    const [asyncValidators, setAsyncValidators] = useState([]);
    const [observe, observeOn] = useState([]);
    const [isDataSetBound, setIsDataSetBound] = useState(false);
    const [relatedData, setRelatedData] = useState<FieldDataSetProps>({
      dataset: [],
      displayfield: "",
      displaylabel: "",
      datafield: "",
      searchkey: "",
    });
    const formContext = useFormContext();
    const { widgetCls, captionCls, captionposition } = formContext || {};

    function updateFormWidgetDataset(dataset: any, displayField: any) {
      setRelatedData({
        dataset: dataset.data,
        displayfield: displayField || props.displayfield,
        datafield: "All Fields",
      });

      // After updating the dataset, we need to ensure the form field value is synced
      // This is especially important for related fields where the datafield changes
      if (formContext?.trigger && props.formKey) {
        // Trigger validation for this field to force react-hook-form to re-evaluate
        setTimeout(() => {
          formContext.trigger(props.formKey);
        }, 0);
      }
    }

    function setFieldDataSet(dataset: any, options?: any) {
      setRelatedData({
        displaylabel: (props.displayfield = options.aliasColumn || LIVE_CONSTANTS.LABEL_VALUE),
        displayfield: (props.displayfield = options.aliasColumn || LIVE_CONSTANTS.LABEL_VALUE),
        datafield: options.aliasColumn || LIVE_CONSTANTS.LABEL_KEY,
        searchkey: options.distinctField || LIVE_CONSTANTS.LABEL_KEY,
        dataset: dataset,
      });
    }

    // Check if there's a required validator and update the required prop
    const hasRequiredValidator = useMemo(() => {
      return (
        validators.some(
          (validator: any) => validator.type === "required" && validator.validator === true
        ) ||
        asyncValidators.some(
          (validator: any) => validator.type === "required" && validator.validator === true
        )
      );
    }, [validators]);

    // Use the required prop from validators if present, otherwise use the original required prop
    const isRequired = props.required ?? hasRequiredValidator;

    // Transform formKey to match actual data keys
    const transformedFormKey = useMemo(() => {
      // Check if this is a child form (has parentForm or formKey contains child form pattern)
      const isChildForm = props.parentForm;

      if (isChildForm) {
        // For child forms, use searchkey directly as it contains the actual field name
        if (props.searchkey) {
          return props.searchkey;
        }
      }

      // For any field where searchkey exists and differs from formKey, use searchkey
      // This handles cases where searchkey contains the actual data key
      if (props.searchkey && props.searchkey !== props.formKey) {
        return props.searchkey;
      }

      // For parent forms or when no transformation needed, use original formKey
      return props.formKey;
    }, [props.formKey, props.searchkey, props.formName, props.name, props.parentForm]);

    const modifiedProps = useMemo(() => {
      return {
        ...props,
        formRef: formContext,
        validators,
        asyncValidators,
        observe,
        observeOn,
        setValidators,
        setAsyncValidators,
        widgetCls,
        captionCls,
        fieldRef,
        fieldName: props.name,
        formKey: transformedFormKey, // Use transformed formKey
        setIsDataSetBound,
        isDataSetBound,
        updateFormWidgetDataset,
        setFieldDataSet,
        required: isRequired,
        captionposition,
        ...(relatedData.dataset && relatedData.dataset?.length > 0
          ? {
              datafield: relatedData.datafield,
              dataset: relatedData.dataset,
              displayfield: relatedData.displayfield,
            }
          : {}),
      };
    }, [
      props,
      validators,
      asyncValidators,
      observe,
      observeOn,
      relatedData,
      isRequired,
      transformedFormKey,
    ]);

    return (
      <WrappedComponent
        {...modifiedProps}
        validators={validators}
        asyncValidators={asyncValidators}
        setValidators={setValidators}
        datavalue={props.datavalue || props.defaultvalue}
        key={`${props.formKey}-${relatedData.displayfield || "initial"}`}
      />
    );
  };
  return FormField;
};

export default BaseField;
