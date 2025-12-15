import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import get from "lodash-es/get";
import set from "lodash-es/set";
import BaseFormProps, { defaultProps } from "./props";
import { getFieldLayoutConfig } from "./utils";
import { FormProvider } from "../form-context";
import { debounce } from "lodash-es";
import { DataSource } from "@/components/data/types";

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

    const messageRef = useRef<any>(null);
    const [showViewMode, setShowViewMode] = useState(false);

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
      defaultValues: props.formData,
      mode: "onTouched",
      reValidateMode: "onBlur",
    });

    // update the form data when the formdata prop changes
    useEffect(() => {
      if (
        props.formdata &&
        typeof props.formdata === "object" &&
        !Array.isArray(props.formdata) &&
        Object.keys(props.formdata).length > 0
      ) {
        reset(props.formdata);
        if (props["form-type"] === "live-filter") {
          debouncedFilter();
        }
      }
    }, [props.formdata, reset]);

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

    const handleFormSubmit = async (data: any, e: any, operation?: string) => {
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
        props.formSubmit(
          FormData,
          (data: any) => {
            if (props.widgettype === "live-form" && data.operationType === "insert") {
              reset(data);
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
          }
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
      formdata: props.formdata,
      getFieldValue,
    };

    const formProps = {
      ...props,
      submit,
      formreset,
      formfields,
      formWidgets: formfields,
      headerActions,
      ref,
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
      reset,
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
        reset(data);
      }
      setShowViewMode(false);
    }

    function cancel() {
      setShowViewMode(true);
    }

    const fields = get(props.listener?.Widgets[props.name], "formfields", {});
    const FormFields = useMemo(() => {
      const newFields: any[] = [];
      Object.keys(fields).forEach(key => {
        if (!key.includes("formWidget") && fields[key]) {
          newFields.push(fields[key]);
        }
      });
      return newFields;
    }, [fields]);

    // Call onDataSourceChange when formfields change
    useEffect(() => {
      if (props.onDataSourceChange && FormFields.length > 0) {
        props.onDataSourceChange(FormFields);
      }
    }, [FormFields, props.onDataSourceChange]);

    // Determine form classes based on wizard context
    const formClassName = useMemo(() => {
      if (isInsideWizard) {
        return clsx(props.className);
      }

      return clsx(DEFAULT_CLASS, props.className);
    }, [isInsideWizard, props.className]);

    // Notify parent containers (wizard) about validity changes
    useEffect(() => {
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
      const unsubscribe = watch(() => emit());
      return () => {
        if (typeof unsubscribe === "function") {
          (unsubscribe as any)();
        }
      };
    }, [watch, isValid]);

    return (
      <form
        name={props.name}
        defaultmode={props.defaultmode}
        captionposition={props.captionposition}
        captionalign={props.captionalign}
        numberoffields={Object.keys(formfields).length}
        ref={formRef}
        className={formClassName}
        id={props.id}
        onSubmit={submit}
        {...conditionalProps}
        style={{ ...props.styles, ...props.conditionalstyle }}
      >
        <FormProvider value={ref} isViewMode={showViewMode}>
          <WrappedComponent
            {...formProps}
            valid={isValid}
            formWidgets={formfields}
            formfields={formfields}
          />
        </FormProvider>
      </form>
    );
  };
  return ControlledForm;
};

export default BaseForm;
