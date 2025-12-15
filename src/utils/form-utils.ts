/**
 * Form utility functions for centralizing form operations across widgets
 */

export interface IFormData {
  values: Record<string, any>;
  isValid: boolean;
}

export interface FormRef {
  getProps?: () => {
    name: string;
    onSubmit?: (event: Event, widget: any, formData: Record<string, any>) => void;
    onBeforeSubmit?: (event: Event, widget: any, formData: Record<string, any>) => void;
    [key: string]: any; // Allow other properties
  };
  getFormData?: () => IFormData;
  validateForm?: () => void;
  clearErrors?: () => void;
}

/**
 * The `loginErrorMessage` function handles various scenarios to generate an appropriate error message
 * for login failures, including extracting from standard error response structures and providing
 * fallback options.
 * @param {any} error - The `error` parameter in the `loginErrorMessage` function is used to handle
 * different types of errors that may occur during the login process. It can be of any type, such as a
 * string, object, or other data types, and the function provides different logic to extract and handle
 * error messages based
 * @param [appLocale] - The `appLocale` parameter is an optional object that contains localized strings
 * for different languages or regions. It is used to provide localized error messages based on the
 * user's preferred language or region. If a specific error message is not provided, the function will
 * fallback to a default error message stored in the `
 * @param {string} [errorMessage] - The `errorMessage` parameter in the `loginErrorMessage` function is
 * a string that can be passed directly to override any other error message handling logic in the
 * function. If a value is provided for `errorMessage`, it will be returned immediately without going
 * through the other error handling steps in the function.
 * @returns The function `loginErrorMessage` returns a string message based on the provided error
 * object, appLocale object, and optional errorMessage string. The function follows these steps to
 * determine the message to return:
 */
export const loginErrorMessage = (
  error: any,
  appLocale?: Record<string, string>,
  errorMessage?: string
): string => {
  // 1. If a direct error message is passed, use it
  if (errorMessage) return errorMessage;

  // 2. If it's a plain string error
  if (typeof error === "string") {
    return error;
  }

  // 3. Try extracting from standard error response structure
  if (error && typeof error === "object") {
    const serverError = error?.data?.errors?.error?.[0];

    if (serverError) {
      const { message, parameters = [] } = serverError;

      if (typeof message === "string") {
        // Replace {0}, {1}, {2}, ... with corresponding parameters dynamically
        return message.replace(/{(\d+)}/g, (match, index) => {
          const param = parameters[+index];
          return param !== undefined ? param : match;
        });
      }

      // If no message, but parameters exist, just join them
      if (parameters.length) {
        return parameters.join(", ");
      }
    }

    // Fallback to error.message or .toString()
    return error.message || error.toString();
  }

  // 4. Fallback to localized or default error message
  return appLocale?.LABEL_INVALID_USERNAME_OR_PASSWORD || "Invalid username or password";
};

/**
 * Get form properties safely from a form reference
 */
export const getFormProps = (formRef: React.RefObject<FormRef | null>) => {
  if (!formRef.current?.getProps) {
    return null;
  }
  return formRef.current.getProps();
};

/**
 * Get form widget from listener widgets collection
 */
export const getFormWidget = (formName: string, listener: any) => {
  return listener?.Widgets?.[formName];
};

/**
 * Get form data from form reference with fallback
 */
export const getFormData = (formRef: React.RefObject<FormRef | null>): IFormData => {
  if (!formRef.current) return { values: {}, isValid: false };

  if (formRef.current.getFormData) {
    return formRef.current.getFormData();
  }

  // Fallback for legacy forms
  return {
    values: {},
    isValid: true,
  };
};

export const formValidate = async (formRef: React.RefObject<FormRef | null>): Promise<boolean> => {
  if (!formRef.current) return false;
  return (await formRef.current.validateForm?.()) || false;
};

/**
 * Invoke form events in a centralized way
 * @param formRef - Reference to the form element
 * @param listener - Widget listener containing form widgets
 * @param eventName - Name of the event to invoke ('onSubmit', 'onBeforeSubmit', etc.)
 * @param event - The event object
 * @param formData - Optional form data to pass to the event handler
 * @returns The result from the event handler (boolean, string, object, or undefined)
 */
export const invokeFormEvent = async (
  formRef: React.RefObject<FormRef | null>,
  listener: any,
  eventName: string,
  event: Event,
  formData: IFormData
): Promise<any> => {
  const formProps = getFormProps(formRef);
  if (!formProps) return;

  const { name: formName, [eventName]: eventHandler } = formProps;
  if (eventHandler && formName) {
    const formWidget = getFormWidget(formName, listener);
    const result = await eventHandler(event, formWidget, formData.values || {});
    return result;
  }
};
