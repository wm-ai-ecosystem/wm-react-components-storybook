import React, { useEffect, useRef, useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { includes } from "lodash-es";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmMessage } from "../../basic/message";
import {
  FormRef,
  getFormData,
  getFormProps,
  invokeFormEvent,
  loginErrorMessage,
} from "@wavemaker/react-runtime/utils/form-utils";
import { ILoginMessage } from "../../dialogs/login-dialog/props";
import { WmLoginProps } from "./props";

// Constants
const DEFAULT_CLASS = "app-login";

// Styled Components
const StyledLoginContainer = styled(Box)(({ theme }) => ({
  "&.app-login": {
    display: "block",
    position: "relative",
  },
}));

const WmLogin = (props: WmLoginProps) => {
  const {
    name,
    show = true,
    errormessage,
    children,
    className,
    styles,
    invokeEventCallback,
    appLocale,
    onSubmit,
    onBeforerender,
    onSuccess,
    onError,
    listener,
    eventSource,
    ...rest
  } = props;

  // State management
  const [loginMessage, setLoginMessage] = useState<ILoginMessage>({
    type: "",
    caption: "",
    show: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const widgetRef = useRef<any>(null);
  const formRef = useRef<FormRef | null>(null);
  const loginButtonRef = useRef<HTMLElement | null>(null);
  const cleanupFunctionsRef = useRef<Array<() => void>>([]);

  useEffect(() => {
    if (listener.onChange && formRef.current && loginButtonRef.current) {
      const formProps = getFormProps(formRef);
      if (!formProps) return;

      const { name: formName } = formProps;
      listener.onChange(name, {
        formCmp: listener.Widgets[formName],
        loginBtnCmp:
          listener.Widgets[loginButtonRef?.current?.getAttribute("name") || "loginButton"],
      });
    }
  }, [formRef.current]);

  // Callback handlers
  const onSuccessCB = useCallback(() => {
    const formData = getFormData(formRef);
    invokeFormEvent(formRef, listener, "onSuccess", new Event("onSuccess"), formData);
    setIsSubmitting(false);
    invokeEventCallback?.("success");
    onSuccess?.(new Event("success"), widgetRef.current);
  }, [invokeEventCallback, onSuccess, listener]);

  const onErrorCB = useCallback(
    (error?: any) => {
      const formData = getFormData(formRef);
      invokeFormEvent(formRef, listener, "onError", new Event("onError"), formData);
      setIsSubmitting(false);

      const message: ILoginMessage = {
        type: "error",
        caption: loginErrorMessage(error, appLocale, errormessage),
        show: true,
      };
      setLoginMessage(message);

      invokeEventCallback?.("error");
      onError?.(new Event("error"), widgetRef.current);
    },
    [errormessage, appLocale, invokeEventCallback, onError, listener]
  );

  const doLogin = useCallback(
    async (e: Event) => {
      // Prevent multiple submissions
      if (isSubmitting || !formRef.current) {
        return;
      }

      if (!eventSource) {
        console.warn(
          'Default action "loginAction" does not exist. Either create the Action or assign an event to onSubmit of the login widget'
        );
        return;
      }
      handleMessageClose();
      const formData = getFormData(formRef);

      // Check if form is valid
      if (!formData.isValid) {
        formRef.current.validateForm?.();
        return;
      }

      // Invoke before submit event
      const beforeSubmitResult = await invokeFormEvent(
        formRef,
        listener,
        "onBeforeSubmit",
        e,
        formData
      );

      if (beforeSubmitResult === false) {
        return;
      }

      formRef.current.clearErrors?.();
      setIsSubmitting(true);

      eventSource.invoke({ formData: formData.values }, onSuccessCB, onErrorCB);

      invokeFormEvent(formRef, listener, "onSubmit", e || new Event("submit"), formData);
    },
    [eventSource, listener, onSuccessCB, onErrorCB, isSubmitting]
  );

  // Cleanup all event listeners
  const cleanupEventListeners = useCallback(() => {
    cleanupFunctionsRef.current.forEach(cleanup => cleanup());
    cleanupFunctionsRef.current = [];
  }, []);

  // Handle message close
  const handleMessageClose = useCallback(() => {
    setLoginMessage(prev => ({ ...prev, show: false }));
  }, []);

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();
      e.stopPropagation();

      if (onSubmit) {
        onSubmit(e, widgetRef.current);
      } else if (!widgetRef.current?.hasAttribute("submit.event")) {
        await doLogin(e);
      }
    },
    [onSubmit, doLogin]
  );

  // Handle login button click
  const handleLoginButtonClick = useCallback(
    async (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      const button = event.target as HTMLElement;
      const container = widgetRef.current;

      const hasContainerSubmitEvent = container?.hasAttribute("submit.event");
      const hasButtonClickEvent = button?.hasAttribute("click.event");
      const hasButtonTapEvent = button?.hasAttribute("tap.event");

      // If no event is attached, invoke default login action
      if (!hasContainerSubmitEvent && !hasButtonClickEvent && !hasButtonTapEvent) {
        await doLogin(event);
      }
    },
    [doLogin]
  );

  // Handle beforerender event
  useEffect(() => {
    onBeforerender?.(new Event("beforerender"), widgetRef.current);
  }, []);

  // Main setup effect
  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Clear previous event listeners
    cleanupEventListeners();

    // Find and set form reference
    const formElement = container.querySelector("form") || container.querySelector('[role="form"]');

    if (formElement) {
      formRef.current = formElement;

      // Add form submit event listener
      formElement.addEventListener("submit", handleFormSubmit);
      cleanupFunctionsRef.current.push(() => {
        formElement.removeEventListener("submit", handleFormSubmit);
      });
    }

    // Find and setup login button
    const buttons = container.querySelectorAll('button, [role="button"]');
    let loginButtonFound = false;

    buttons.forEach((button: Element) => {
      if (loginButtonFound) return;

      const name = button.getAttribute("name");
      const classList = Array.from(button.classList);

      if (name === "loginButton" || includes(classList, "app-login-button")) {
        loginButtonFound = true;
        loginButtonRef.current = button as HTMLElement;

        // Add click event listener
        button.addEventListener("click", handleLoginButtonClick);
        cleanupFunctionsRef.current.push(() => {
          button.removeEventListener("click", handleLoginButtonClick);
        });
      }
    });

    // Return cleanup function
    return cleanupEventListeners;
  }, [children, handleFormSubmit, handleLoginButtonClick, cleanupEventListeners]);

  return (
    <StyledLoginContainer
      ref={widgetRef}
      className={`${DEFAULT_CLASS} ${className || ""}`}
      sx={styles}
    >
      <WmMessage
        className="app-login-message"
        name="LoginMessage"
        type={loginMessage.type || "info"}
        caption={loginMessage.caption}
        open={loginMessage.show}
        close={handleMessageClose}
        listener={listener}
      />
      {children}
    </StyledLoginContainer>
  );
};

WmLogin.displayName = "WmLogin";

export default withBaseWrapper(WmLogin);
