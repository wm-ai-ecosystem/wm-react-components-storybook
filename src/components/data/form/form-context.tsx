import React, { createContext, useContext } from "react";

export interface FormContextValue {
  control?: any;
  watch?: any;
  registerFormField?: (formKey: string, fieldName: string, fieldInstance: any) => void;
  registerFormWidget?: (widgetName: string, widgetInstance: any) => void;
  registerHeaderAction?: (actionName: string, action: any) => void;
  onChangeHandler?: (fieldName: string, value: any) => void;
  getFieldValue?: (fieldName: string) => any;
  trigger?: any;
  errors?: any;
  name?: string;
  captionposition?: string;
  captionCls?: string;
  widgetCls?: string;
  validationtype?: string;
  isViewMode?: boolean;
}

const FormContext = createContext<FormContextValue | null>(null);

export const FormProvider: React.FC<{
  value: FormContextValue;
  isViewMode: boolean;
  children: React.ReactNode;
}> = ({ value, isViewMode, children }) => {
  return <FormContext.Provider value={{ ...value, isViewMode }}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};

export const useIsViewMode = () => {
  const context = useFormContext();
  return context?.isViewMode;
};

export default FormContext;
