import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import get from "lodash-es/get";
import set from "lodash-es/set";
import isEqual from "lodash-es/isEqual";
import BaseFormProps, { defaultProps } from "./props";
import { getFieldLayoutConfig } from "./utils";
import { FormProvider } from "../form-context";
import { debounce } from "lodash-es";
import { findOperationType } from "../../utils";
import { getItemsPerRowClass } from "../../list/utils/list-helpers";

const DEFAULT_CLASS = "panel app-panel app-form";

type MessageType = {
  caption: string;
  type?: string;
};
const BaseForm = (WrappedComponent: React.ComponentType<any>) => {
  const ControlledForm = (FormProps: BaseFormProps) => {
    // setting up default props for form
    const props = { ...defaultProps, ...FormProps };
    const isInsideWizard = props.isInsideWizard || false;

    const formRef = useRef<HTMLFormElement>(null);
    const [formfields, setFormfields] = useState<Record<string, any>>({});
    const [headerActions, setHeaderActions] = useState<any>({});
    const [initialValues] = useState({});
    const [expanded, setExpanded] = useState(props.expanded);
    const [showmessage, setShowMessage] = useState(false);
    const [statusMessage, setStatusMessage] = useState<MessageType | null>({
      caption: "",
      type: "",
    });
    const parentFormData = props.listener?.Widgets?.[props.parentForm]?.formdata;
    const [childFormData, setChildFormData] = useState<any>();

    const messageRef = useRef<any>(null);
    const [showViewMode, setShowViewMode] = useState(false);

    const lastResetFormDataRef = useRef<any>(null);
    const widgetFormData =
      props.name &&
      props.listener?.Widgets?.[props.name]?.formdata &&
      Object.keys(props.listener.Widgets[props.name].formdata).length > 0
        ? props.listener.Widgets[props.name].formdata
        : props.formdata;

    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      watch,
      trigger,
      getValues,
      clearErrors,
    } = useForm({
      defaultValues: props.formdata,
      mode: "onTouched",
      reValidateMode: "onBlur",
    });

    // Track the last formdata that was used to reset the form
    // This prevents unnecessary resets when formdata prop reference changes but values are the same

    useEffect(() => {
      if (parentFormData) {
        let childData;

        if (props?.childdatasetnode) {
          // Use childdatasetnode if provided
          childData = get(parentFormData, props.childdatasetnode);
        } else {
          // Fallback to form name
          childData = parentFormData[props?.name];
        }
        setChildFormData(childData);
      }
    }, [parentFormData, props?.dataKey, props?.childdatasetnode, props?.name]);

    // update the form data when the formdata prop changes
    useEffect(() => {
      // For child forms, prioritize childFormData over widgetFormData
      const formDataToUse = props.parentForm
        ? childFormData || widgetFormData || props.formdata
        : widgetFormData || childFormData || props.formdata;

      if (formDataToUse && typeof formDataToUse === "object" && !Array.isArray(formDataToUse)) {
        // Get current form values to compare
        const currentFormValues = getValues();

        // Deep compare with the last formdata that was used to reset
        // Only reset if formdata has actually changed (not just reference change)
        const hasFormDataChanged = !isEqual(formDataToUse, lastResetFormDataRef.current);

        // Also check if formDataToUse differs from current form values
        // This prevents resetting when form is already in the correct state
        const differsFromCurrentValues = !isEqual(formDataToUse, currentFormValues);

        if (hasFormDataChanged && differsFromCurrentValues) {
          // when adding new row if the formdata is empty it should be reset here this code is added to not avoid the empty formdata case
          // Reset to empty if formdata is empty object (for new records)
          if (Object.keys(formDataToUse).length === 0) {
            // Get all currently registered field names and create explicit empty values
            const currentValues = getValues();
            const emptyValues: Record<string, any> = {};
            Object.keys(currentValues).forEach(key => {
              emptyValues[key] = currentValues[key]; // Explicitly set each field to empty string
            });
            reset(emptyValues);
            lastResetFormDataRef.current = emptyValues;
          } else {
            // Reset with actual data (for editing)
            reset(formDataToUse);
            lastResetFormDataRef.current = formDataToUse;
            if (props["form-type"] === "live-filter") {
              debouncedFilter();
            }
          }
        }
      }
    }, [props.formdata, widgetFormData, childFormData, reset, getValues, props.parentForm]);

    function debouncedFilter() {
      const debouncedFilter = debounce(filter, 250);
      debouncedFilter();
    }

    const formreset = () => {
      Object.keys(formfields).forEach(key => {
        formfields[key].datavalue = formfields[key].defaultvalue;
        formfields[key].value = formfields[key].defaultvalue;
      });

      setTimeout(() => {
        setFormfields(prev => {
          Object.keys(prev).forEach(key => {
            prev[key].datavalue = prev[key].defaultvalue;
            prev[key].value = prev[key].defaultvalue;
          });
          trigger(Object.keys(prev));
          return prev;
        });
      }, 100);
      reset(initialValues);
    };

    const isElementInViewport = (el: HTMLElement) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const scrollToElement = (el: HTMLElement) => {
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const checkAppServiceErrorMsg = (type?: string) => {
      const notificationAction = get(props.listener, "Actions.appNotification");
      if (notificationAction && type === "error") {
        return notificationAction?.getMessage?.();
      }
      return;
    };

    const clearMessage = () => {
      toggleMessage(false);
    };

    const toggleMessage = (state: boolean, msg?: string, type?: string, header?: string) => {
      let template = msg;
      if (state && msg) {
        if (type === "error" && props.errormessage && props.errormessage.length > 0) {
          template = props.errormessage;
        }
        if (props.messagelayout === "Inline") {
          template = checkAppServiceErrorMsg(type) || template;
          setStatusMessage({ caption: template || "", type });
          setShowMessage(true);
          if (messageRef.current && messageRef.current.showMessage) {
            messageRef.current.showMessage(template, type);
          }
          // Scroll to top if not in viewport
          const formEl = formRef.current;
          if (formEl && !isElementInViewport(formEl)) {
            scrollToElement(formEl);
          }
        } else {
          props?.listener?.App?.notifyApp(template, type);
        }
      } else {
        setStatusMessage({ caption: "" });
        setShowMessage(false);
      }
      if (formRef.current) {
        scrollToElement(formRef.current);
      }
    };

    const validateFieldsOnSubmit = useCallback(() => {
      return trigger();
    }, [trigger]);

    const handleFormSubmit = async (data: any, e: any, operationType?: string) => {
      if (!e) {
        e = new Event("submit");
      }
      // check form is valid or not
      const isValid = await validateFieldsOnSubmit();
      if (!isValid) {
        props?.listener?.onChange(props.name, {
          valid: false,
          errors: errors,
        });
        return;
      }

      if (props.onBeforeSubmit) {
        const result = await props.onBeforeSubmit(e, props, data);
        if (result === false) {
          return;
        }
      }

      const FormData: Record<string, any> | any = {};
      Object.keys(data).forEach(key => {
        set(FormData, key, data[key]);
      });

      // form submit
      if (props.formSubmit) {
        if (props.listener?.onChange) {
          props.listener.onChange(props.name, {
            dataoutput: data,
          });
        }

        // get the operation type
        const primaryKeys = props?.datasource?.execute("getPrimaryKey");
        let firstParam = FormData;
        if (props?.datasource?.name?.toLowerCase?.() === "crudvariable") {
          const operation = findOperationType(FormData, primaryKeys);
          firstParam = {
            inputFields: FormData,
            operation: operation === "insert" ? "create" : operation,
          };
        }

        props.formSubmit(
          firstParam,
          (data: any) => {
            if (
              props.widgettype === "live-form" &&
              (data.operationType === "insert" || data.operationType === "delete")
            ) {
              reset(data);
              setShowViewMode(false);
            }
            onResultCb(get(data, "params"), "success");
            const hasCustomOnSuccess = props.onSuccess !== defaultProps.onSuccess;

            if (!hasCustomOnSuccess && props.widgettype === "live-form") {
              let successMsg =
                (data.operationType === "insert" && props.insertmessage) ||
                (data.operationType === "update" && props.updatemessage) ||
                (data.operationType === "delete" && props.deletemessage) ||
                props.postmessage;
              toggleMessage(true, successMsg, "success");
              return;
            }
            toggleMessage(true, props.postmessage, "success");
          },
          (error: any) => {
            toggleMessage(true, props.errormessage || error || error.message, "error");
            onResultCb(error, "");
          },
          operationType
        );
      }
      if (props?.onSubmit) {
        props.onSubmit(e, props, FormData);
      }
    };

    const formfieldsRef = useRef(formfields);

    const submit = handleSubmit((data, e) => handleFormSubmit(data, e));
    const deleteEntry = handleSubmit((data, e) => handleFormSubmit(data, e, "delete"));
    const livefilterFn = props.Livefilter || (() => {});
    const filter = handleSubmit((data, e) => livefilterFn(data, false, formfieldsRef.current));
    const clearFilter = handleSubmit((data, e) => {
      formreset();
      livefilterFn(data, true, formfieldsRef.current);
    });

    const highlightInvalidFields = () => {
      const fieldsName = Object.keys(formfieldsRef.current);
      trigger(fieldsName);
    };
    const saveAndNew = () => {
      submit();
      reset(initialValues);
    };
    const saveAndView = () => {
      submit();
      setShowViewMode(true);
    };

    const onResultCb = async (data: any, status: any, event?: any) => {
      const params = {
        $event: event,
        $data: data,
        $operation: props.operationType,
      };

      if (props.onResult) {
        props.onResult(event, props, data);
      }

      // whether service call success or failure call this method
      if (status) {
        // if service call is success call this method
        props.onSuccess(event, props, data);
        if (props.messagelayout === "Inline") {
          toggleMessage(true, props.successmessage, "success");
        }
      } else {
        // if service call fails call this method
        props.onError(event, props, data);
        if (props.messagelayout === "Inline") {
          toggleMessage(true, props.errormessage, "error");
        }
      }
    };

    // register header action
    const registerHeaderAction = (actionName: string, action: any) => {
      if (!action || !actionName) {
        return;
      }
      if (!headerActions[actionName]) {
        setHeaderActions((prev: any) => ({ ...prev, [actionName]: action }));
      }
    };

    // form onChange
    const onChangeHandler = (fieldName: string, value: any) => {
      if (!fieldName || !value) {
        return;
      }
      setFormfields(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          value,
          datavalue: value,
        },
      }));
    };

    // get the classes according to the captionwidth and captionposition
    const { captionCls, widgetCls } = useMemo(
      () => getFieldLayoutConfig(props.captionwidth, props.captionposition, "os"),
      [props.captionwidth, props.captionposition]
    );

    const itemsPerRow = useMemo(() => {
      return getItemsPerRowClass(props.itemsperrow);
    }, [props.itemsperrow]);

    function expandCollapsePanel() {
      if (props.collapsible) {
        // flip the active flag
        setExpanded(!expanded);
      }
    }

    const getFieldValue = (fieldName: string) => {
      return watch(fieldName);
    };

    const ref = {
      control,
      watch,
      registerHeaderAction,
      onChangeHandler,
      trigger,
      errors,
      name: props.name,
      captionposition: props.captionposition,
      captionCls,
      widgetCls,
      validationtype: props.validationtype,
      showViewMode,
      formdata: widgetFormData || childFormData || props.formdata,
      getFieldValue,
      itemsPerRow,
      saveAndNew,
      saveAndView,
      highlightInvalidFields,
    };

    const conditionalProps = {
      ...(props.target && { target: props.target }),
      ...(props.method && { method: props.method }),
      ...(props.encType && { encType: props.encType }),
      ...(props.action && { action: props.action }),
    };

    useEffect(() => {
      if (formRef.current) {
        formRef.current.getFormData = () => {
          return {
            values: watch(),
            isValid,
          };
        };
        formRef.current.validateForm = () => {
          return trigger();
        };
        formRef.current.clearErrors = () => {
          clearErrors();
        };
        formRef.current.getProps = () => {
          return props;
        };
        formRef.current.formWidgets = formfields;
      }
    }, [watch, trigger, isValid, errors, formfields]);

    function create() {
      formreset();
      setShowViewMode(false);
    }

    function edit(data: any) {
      if (data) {
        // Convert null values to empty strings to avoid React Hook Form using old defaultValues
        const cleanedData: Record<string, any> = {};
        Object.keys(data).forEach(key => {
          cleanedData[key] = data[key] === null ? "" : data[key];
        });
        reset(cleanedData);
        // Update the ref to track this as the last reset formdata
        lastResetFormDataRef.current = cleanedData;
      }
      setShowViewMode(false);
    }

    function setFormData(data: any) {
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return;
      }
      const cleanedData: Record<string, any> = {};
      Object.keys(data).forEach(key => {
        cleanedData[key] = data[key] === null ? "" : data[key];
      });
      reset(cleanedData);
      // Update the ref to track this as the last reset formdata
      lastResetFormDataRef.current = cleanedData;
      if (props.listener?.Widgets && props.name) {
        props.listener.Widgets[props.name].formdata = cleanedData;
      }
      if ((props as any)["form-type"] === "live-filter") {
        debouncedFilter();
      }
    }

    function cancel() {
      setShowViewMode(true);
    }

    const fields = useMemo(() => {
      const newFields: any[] = [];
      const Widgets = props.listener?.Widgets?.[props.name]?.formfields || {};
      Object.keys(Widgets).forEach(key => {
        if (!key.includes("formWidget") && Widgets[key as any]) {
          newFields.push(Widgets[key as any]);
        }
      });
      return newFields;
    }, [props.listener?.Widgets[props.name], props.name]);

    // Call onDataSourceChange when formfields change
    useEffect(() => {
      if (props.onDataSourceChange && fields.length > 0) {
        props.onDataSourceChange(fields);
      }
    }, [fields, props.onDataSourceChange]);

    // Determine form classes based on wizard context
    const formClassName = useMemo(() => {
      if (isInsideWizard) {
        return clsx(props.className);
      }

      return clsx(DEFAULT_CLASS, props.className);
    }, [isInsideWizard, props.className]);

    // Keep track of last emitted values to avoid redundant emissions
    const lastEmittedValuesSerialized = useRef<string>("");
    useEffect(() => {
      // Added for wizard validations please do not remove the blow emit code changes.
      // Notify parent containers (wizard) about validity changes
      const el = formRef.current;
      if (!el) return;
      const emit = () => {
        el.dispatchEvent(
          new CustomEvent("wm:form-validity", {
            bubbles: true,
            detail: { isValid },
          })
        );
      };
      emit();
      const unsubscribe = watch(values => {
        emit();
        const serialized = JSON.stringify(values);
        if (serialized !== lastEmittedValuesSerialized.current) {
          lastEmittedValuesSerialized.current = serialized;
          // For child forms, update parent form data at the childdatasetnode path
          if (
            props.parentForm &&
            props.childdatasetnode &&
            props.listener?.Widgets?.[props.parentForm]
          ) {
            const parentFormWidget = props.listener.Widgets[props.parentForm];
            // Get the current parent form values to include any user-entered data
            let currentParentData =
              parentFormWidget.getValues?.() || parentFormWidget.formdata || {};

            // Update the parent form's data at the childdatasetnode path
            const updatedParentData = { ...currentParentData };
            set(updatedParentData, props.childdatasetnode, values);

            // Update the parent form's React Hook Form state
            if (parentFormWidget.ref?.current?.updateFormDataAndRef) {
              parentFormWidget.ref.current.updateFormDataAndRef(updatedParentData);
            } else if (parentFormWidget.reset) {
              parentFormWidget.reset(updatedParentData);
            }

            // Update parent form references
            parentFormWidget.formdata = updatedParentData;
            if (props.listener?.Widgets?.[props.parentForm]) {
              props.listener.Widgets[props.parentForm].formdata = updatedParentData;
            }

            // Emit the updated parent form data
            props.listener?.onChange?.(props.parentForm, { dataoutput: updatedParentData });
          }

          // Emit current form's dataoutput
          if (props?.listener?.onChange && props?.name) {
            props.listener.onChange(props.name, {
              dataoutput: values,
            });
          }
        }
      });
      return () => {
        if (typeof unsubscribe === "function") {
          (unsubscribe as any)();
        }
      };
    }, [watch, isValid, props.parentForm, props.childdatasetnode, props.listener, props.name]);

    const formProps = {
      ...props,
      ...conditionalProps,
      submit,
      formreset,
      formfields,
      formWidgets: formfields,
      headerActions,
      ref,
      formElementRef: formRef,
      toggleMessage,
      clearMessage,
      expandCollapsePanel,
      expanded,
      showmessage,
      statusMessage,
      showViewMode,
      filter,
      clearFilter,
      validateFieldsOnSubmit,
      valid: isValid,
      errors,
      delete: deleteEntry,
      cancel,
      new: create,
      edit,
      setShowViewMode,
      dataoutput: getValues(),
      save: submit,
      setFormData,
      reset,
      numberoffields: Object.keys(formfields).length,
      className: formClassName,
      saveAndNew,
      saveAndView,
      highlightInvalidFields,
      formdata: widgetFormData || childFormData || props.formdata,
    };

    return (
      <FormProvider value={ref} isViewMode={showViewMode}>
        <WrappedComponent
          {...formProps}
          valid={isValid}
          formWidgets={formfields}
          formfields={formfields}
        />
      </FormProvider>
    );
  };
  return ControlledForm;
};

export default BaseForm;
