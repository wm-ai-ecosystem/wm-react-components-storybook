import { Controller } from "react-hook-form";
import clsx from "clsx";
import { useMemo, useCallback, memo, useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { createValidationRules } from "@wavemaker/react-runtime/components/data/form/form-controller/validation-contrustor";
import { useWidgetProxy } from "@wavemaker/react-runtime/context/WidgetProvider";
import { useFormContext } from "@wavemaker/react-runtime/components/data/form/form-context";
import {
  ControlledFieldProps,
  ErrorState,
  ValidationTypes,
  ValidatorConfig,
  WithFormControllerProps,
} from "../form-controller/props";

// Custom hooks for better separation of concerns
const useFormRegistration = (name: string, fieldProxy: any, contextFormRef: any) => {
  const hasRegisteredRef = useRef(false);

  useEffect(() => {
    if (contextFormRef?.registerFormWidget && fieldProxy && !hasRegisteredRef.current) {
      contextFormRef.registerFormWidget(name, fieldProxy);
      hasRegisteredRef.current = true;
    }
  }, [fieldProxy, name, contextFormRef]);
};

const useExternalDataSync = (datavalue: any, fieldRef: React.RefObject<any>) => {
  useEffect(() => {
    if (fieldRef.current && datavalue !== undefined) {
      const currentValue = fieldRef.current.value;
      if (currentValue !== datavalue) {
        fieldRef.current.onChange(datavalue);
      }
    }
  }, [datavalue]);
};

const useValidationRules = (
  validationType: ValidationTypes,
  validators?: ValidatorConfig[],
  asyncValidators?: ValidatorConfig[],
  required?: boolean,
  maxchars?: number,
  regexp?: string | RegExp,
  validationmessage?: string,
  minvalue?: number | string,
  maxvalue?: number | string,
  form?: any
) => {
  return useMemo(() => {
    if (validationType === "none") {
      return {};
    }

    const combinedValidators: ValidatorConfig[] = [
      ...(validators || []),
      ...(asyncValidators || []),
    ];

    if (required) {
      combinedValidators.push({
        type: "required",
        validator: true,
        errorMessage: validationmessage || "This field is required",
      });
    }

    if (maxchars !== undefined) {
      combinedValidators.push({
        type: "maxchars",
        validator: maxchars,
        errorMessage: validationmessage || `Maximum length is ${maxchars} characters.`,
      });
    }

    const normalizedMin =
      minvalue !== undefined && minvalue !== null && minvalue !== "" ? Number(minvalue) : undefined;
    const normalizedMax =
      maxvalue !== undefined && maxvalue !== null && maxvalue !== "" ? Number(maxvalue) : undefined;

    if (normalizedMin !== undefined && !Number.isNaN(normalizedMin)) {
      combinedValidators.push({
        type: "minvalue",
        validator: normalizedMin,
        errorMessage:
          validationmessage || `Value must be greater than or equal to ${normalizedMin}.`,
      });
    }

    if (normalizedMax !== undefined && !Number.isNaN(normalizedMax)) {
      combinedValidators.push({
        type: "maxvalue",
        validator: normalizedMax,
        errorMessage: validationmessage || `Value must be less than or equal to ${normalizedMax}.`,
      });
    }

    if (regexp) {
      combinedValidators.push({
        type: "regexp",
        validator: regexp,
        errorMessage: validationmessage || "Invalid format.",
      });
    }

    return createValidationRules(combinedValidators, form);
  }, [
    validators,
    asyncValidators,
    required,
    maxchars,
    regexp,
    validationmessage,
    minvalue,
    maxvalue,
    form,
    validationType,
  ]);
};

const useHTMLValidationProps = (
  validationType: ValidationTypes,
  required?: boolean,
  maxchars?: number,
  regexp?: string | RegExp
) => {
  return useMemo(() => {
    if (validationType !== "html") {
      return {};
    }

    const htmlProps: any = {};

    if (required) {
      htmlProps.required = true;
    }

    if (maxchars) {
      htmlProps.maxLength = maxchars;
    }

    if (regexp) {
      htmlProps.pattern = typeof regexp === "string" ? regexp : regexp.source;
    }

    return htmlProps;
  }, [validationType, required, maxchars, regexp]);
};

// Utility functions
const processFieldValue = (fieldValue: any, type?: string, datafield?: string) => {
  // If fieldValue is an object and datafield is specified, extract the value
  if (fieldValue && typeof fieldValue === "object" && !Array.isArray(fieldValue) && datafield) {
    fieldValue = fieldValue[datafield];
  }

  if (type === "number") {
    return fieldValue === "" || fieldValue === null || fieldValue === undefined ? "" : fieldValue;
  }
  return fieldValue;
};

const getErrorState = (
  fieldState: any,
  validationType: ValidationTypes,
  touched: boolean
): ErrorState => {
  switch (validationType) {
    case "default":
      return {
        error: touched && !!fieldState.error,
        errorMessage: touched && fieldState.error ? fieldState.error.message : undefined,
        fieldState: fieldState,
      };
    case "html":
      return {
        error: touched && !!fieldState.error,
        errorMessage: touched && fieldState.error ? fieldState.error.message : undefined,
        fieldState: fieldState,
      };
    case "none":
      return {
        error: false,
        errorMessage: undefined,
        fieldState: { ...fieldState, error: undefined },
      };
    default:
      return {
        error: false,
        errorMessage: undefined,
        fieldState: undefined,
      };
  }
};

const shouldShowErrorMessage = (
  validationType: ValidationTypes,
  fieldState: any,
  touched: boolean
): boolean => {
  return (
    validationType !== "none" &&
    ((validationType === "default" && fieldState.error) ||
      (validationType === "html" && fieldState.error))
  );
};

// HOC function
const withFormController = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithFormControllerComponent = memo<WithFormControllerProps & P>(props => {
    const {
      formRef: propsFormRef,
      formKey,
      name,
      datavalue,
      defaultvalue,
      validators,
      asyncValidators,
      required,
      maxchars,
      regexp,
      validationmessage,
      hint,
      type,
      observe,
      onBlur,
      fieldName,
      ...wrappedComponentProps
    } = props;

    // State and refs
    const [touched, setTouched] = useState(false);
    const fieldRef = useRef<any>(null);
    const observeRef = useRef(observe);

    // Context and proxy setup
    const inputFieldName = fieldName || name;
    const contextFormRef = useFormContext();
    const formRef = propsFormRef || contextFormRef;
    const fieldProxy = useWidgetProxy(name);
    const form = useWidgetProxy(formRef?.name);

    // Form properties
    const trigger = formRef?.trigger;
    const validationType: ValidationTypes =
      form?.validationtype || formRef?.validationtype || "default";

    // Custom hooks
    useFormRegistration(name, fieldProxy, contextFormRef);
    useExternalDataSync(datavalue, fieldRef);

    const validationRules = useValidationRules(
      validationType,
      validators,
      asyncValidators,
      required,
      maxchars,
      regexp,
      validationmessage,
      props.minvalue,
      props.maxvalue,
      form
    );

    const extractedValidatorProps = useMemo(() => {
      const result: {
        maxchars?: number;
        regexp?: string | RegExp;
        minvalue?: number | string;
        maxvalue?: number | string;
      } = {
        maxchars,
        regexp,
        minvalue: props.minvalue,
        maxvalue: props.maxvalue,
      };

      if (!validators?.length) return result;

      validators.forEach(validator => {
        if (typeof validator === "function") return;

        if (result.maxchars === undefined && validator.type === "maxchars") {
          result.maxchars = validator.validator as number;
        }
        if (result.regexp === undefined && validator.type === "regexp") {
          result.regexp = validator.validator as string | RegExp;
        }
        if (result.minvalue === undefined && validator.type === "minvalue") {
          result.minvalue = validator.validator as number;
        }
        if (result.maxvalue === undefined && validator.type === "maxvalue") {
          result.maxvalue = validator.validator as number;
        }
      });

      return result;
    }, [validators, maxchars, regexp, props.minvalue, props.maxvalue]);

    const htmlValidationProps = useHTMLValidationProps(validationType, required, maxchars, regexp);

    // Update observeRef when observe changes
    useEffect(() => {
      observeRef.current = observe;
    }, [observe]);

    // Event handlers
    const createOnChangeHandler = useCallback(
      (field: any) => {
        return (e: any, componentProps?: any, newValue?: any, oldValue?: any) => {
          let valueToSet;

          if (newValue !== undefined) {
            valueToSet = newValue;
          } else if (e && e.target) {
            valueToSet = e.target.value;
          } else if (e !== undefined) {
            valueToSet = e;
          }

          // If the incoming value is an object and we have a datafield, extract the value
          if (
            valueToSet &&
            typeof valueToSet === "object" &&
            !Array.isArray(valueToSet) &&
            props.datafield &&
            props.datafield !== "All Fields"
          ) {
            valueToSet = valueToSet[props.datafield];
          }

          if (type === "number") {
            field.onChange(valueToSet === "" || valueToSet === null ? "" : valueToSet);
          } else {
            field.onChange(valueToSet);
          }
          props.onChange?.(e, field, newValue, oldValue);
        };
      },
      [type, props.datafield]
    );

    const createOnBlurHandler = useCallback(
      (field: any, fieldState: any) => {
        return (e: any) => {
          setTouched(true);
          field.onBlur();

          const shouldTriggerValidation =
            (validationType === "html" && trigger && !!fieldState.error) ||
            (validationType !== "none" && observeRef.current?.length && trigger);

          if (shouldTriggerValidation) {
            setTimeout(() => {
              trigger(formKey || inputFieldName);
            });
          }

          onBlur?.(e);
        };
      },
      [trigger, formKey, inputFieldName, onBlur, validationType]
    );

    // Render without Controller if no formRef
    if (!formRef?.control) {
      return <WrappedComponent {...(props as P)} />;
    }

    return (
      <Controller
        control={formRef.control}
        name={formKey || inputFieldName}
        rules={validationRules}
        defaultValue={datavalue !== undefined ? datavalue : defaultvalue}
        render={({ field, fieldState }) => {
          // Store field reference for external updates
          fieldRef.current = field;

          // Process field value and get error state
          const processedValue = processFieldValue(field.value, type, props.datafield);
          const errorState = getErrorState(fieldState, validationType, touched);

          // Build controlled props
          const controlledProps: P & ControlledFieldProps = {
            ...props,
            ...extractedValidatorProps,
            ...(validationType === "html" ? htmlValidationProps : {}),
            value: processedValue !== undefined ? processedValue : defaultvalue,
            datavalue: processedValue !== undefined ? processedValue : defaultvalue,
            onChange: createOnChangeHandler(field),
            onBlur: createOnBlurHandler(field, fieldState),
            ref: field.ref,
            ...errorState,
            required: validationType === "html" || !propsFormRef ? required : undefined,
            isControlled: true,
            formfield: true,
            fieldName: inputFieldName,
            name: name,
            isRequiredLabel: required,
            className: clsx(wrappedComponentProps.className, {
              hidden: contextFormRef?.isViewMode,
            }),
          } as P & ControlledFieldProps;

          return (
            <div style={{ width: "100%" }}>
              <WrappedComponent
                {...controlledProps}
                dataset={props.dataset}
                displayfield={props.displayfield}
              />
              <span
                style={{
                  alignSelf: "flex-start",
                }}
                className="form-control-static app-label"
                hidden={!contextFormRef?.isViewMode}
              >
                {(() => {
                  let value = controlledProps.datavalue;

                  if (value && typeof value === "object") {
                    if (props.datafield || props.displayfield) {
                      value = value[props.datafield || props.displayfield];
                    } else {
                      value = JSON.stringify(value);
                    }
                  }

                  return value;
                })()}
              </span>

              {/* Help Text */}
              {hint && !shouldShowErrorMessage(validationType, fieldState, touched) && (
                <p
                  className="help-block"
                  aria-hidden="true"
                  role="alert"
                  aria-live="polite"
                  sx={{
                    textAlign: "start",
                    width: "100%",
                  }}
                >
                  {hint}
                </p>
              )}

              {/* Error Messages */}
              {shouldShowErrorMessage(validationType, fieldState, touched) && (
                <p
                  className="help-block text-danger"
                  aria-hidden="false"
                  role="alert"
                  aria-live="assertive"
                  style={{
                    textAlign: "start",
                    width: "100%",
                  }}
                >
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  });

  WithFormControllerComponent.displayName = `withFormController(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithFormControllerComponent;
};

export default withFormController;
