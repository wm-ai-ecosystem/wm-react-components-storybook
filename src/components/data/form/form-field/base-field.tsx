import { useState, useMemo, useRef } from "react";
import clsx from "clsx";

import { WmComposite } from "@wavemaker/react-runtime/components/input/composite";
import { LIVE_CONSTANTS } from "@/components/data/utils/filter-field-util";
import FormFieldProps, { FieldDataSetProps } from "./props";
import { useFormContext } from "@wavemaker/react-runtime/components/data/form/form-context";

const DEFAULT_CLASS = "ng-pristine ng-invalid ng-touched";
const DEFAULT_COMPOSITE_CLASS = "app-composite-widget caption-left clearfix form-group live-field";

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
        setIsDataSetBound,
        isDataSetBound,
        updateFormWidgetDataset,
        setFieldDataSet,
        required: isRequired,
        ...(relatedData.dataset && relatedData.dataset?.length > 0
          ? {
              datafield: relatedData.datafield,
              dataset: relatedData.dataset,
              displayfield: relatedData.displayfield,
            }
          : {}),
      };
    }, [props, validators, asyncValidators, observe, observeOn, relatedData, isRequired]);

    return (
      <div
        className={clsx(props.className, DEFAULT_CLASS)}
        id={props.id}
        style={{ ...props.conditionalstyle }}
        data-displayname={props.displayname}
        data-name={props.name}
        data-placeholder={props.placeholder}
        name={props.name}
        displayname={props.displayname}
        placeholder={props.placeholder}
      >
        <WmComposite
          captionposition={captionposition || "left"}
          listener={{}}
          name=""
          className={DEFAULT_COMPOSITE_CLASS}
        >
          <WrappedComponent
            {...modifiedProps}
            validators={validators}
            asyncValidators={asyncValidators}
            setValidators={setValidators}
            datavalue={props.datavalue || props.defaultvalue}
            key={`${props.formKey}-${relatedData.displayfield || "initial"}`}
          />
        </WmComposite>
      </div>
    );
  };
  return FormField;
};

export default BaseField;
