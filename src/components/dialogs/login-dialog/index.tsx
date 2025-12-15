import React, { useEffect, useState, useRef, useCallback } from "react";
import includes from "lodash-es/includes";
import clsx from "clsx";

import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import { WmDialogContent } from "@wavemaker/react-runtime/components/dialogs/dialog-content";
import { WmDialog } from "@wavemaker/react-runtime/components/dialogs";
import { WmMessage } from "@wavemaker/react-runtime/components/basic/message";
import BaseDialog from "../withDialogWrapper";
import { WmDialogBody } from "../dialog-body";
import {
  FormRef,
  getFormData,
  IFormData,
  invokeFormEvent,
  loginErrorMessage,
} from "@wavemaker/react-runtime/utils/form-utils";
import { WmLoginDialogProps, ILoginMessage } from "./props";

// Constants
const DEFAULT_CLASS = "app-dialog modal-dialog app-login-dialog";
const FORM_SETUP_TIMEOUT = 100;

const WmLoginDialog = (props: WmLoginDialogProps) => {
  const {
    name,
    isopen = false,
    title = "Login",
    iconclass = "wi wi-user",
    errormessage,
    eventsource,
    onSubmit,
    onOpened,
    onClose,
    onSuccess,
    onError,
    logintext = "Login",
    canceltext = "Cancel",
    close,
    children,
    invokeEventCallback,
    appLocale,
    listener,
    ...rest
  } = props;

  const [loginMessage, setLoginMessage] = useState<ILoginMessage>({
    type: "",
    caption: "",
    show: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);

  const messageRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);
  const formRef = useRef<FormRef | null>(null);

  // Widget reference
  const dialogWidget = listener?.Widgets?.[name];

  const hideMsg = useCallback(() => {
    setLoginMessage({ type: "", caption: "", show: false });
  }, []);

  const showMessage = useCallback((caption: string, type: string) => {
    const message: ILoginMessage = { type, caption, show: true };
    setLoginMessage(message);
  }, []);

  const handleMessageClose = useCallback(() => {
    setLoginMessage(prev => ({ ...prev, show: false }));
  }, []);

  // Validation helpers
  const validateCredentials = useCallback(
    (formData: IFormData): boolean => {
      if (!formData.isValid) {
        formRef.current?.validateForm?.();
        return false;
      }

      if (!formData.values["j_username"] || !formData.values["j_password"]) {
        showMessage("Please enter username and password", "error");
        return false;
      }

      return true;
    },
    [showMessage]
  );

  // Main login logic
  const doLogin = useCallback(async (): Promise<void> => {
    if (isSubmitting || !eventsource || !formRef.current) {
      return;
    }

    const formData = getFormData(formRef);

    if (!validateCredentials(formData)) {
      return;
    }

    // Invoke before submit event
    const beforeSubmitResult = await invokeFormEvent(
      formRef,
      listener,
      "onBeforeSubmit",
      new Event("beforeSubmit"),
      formData
    );

    if (beforeSubmitResult === false) {
      return;
    }

    setIsSubmitting(true);
    showMessage("Loading...", "loading");
    formRef.current.clearErrors?.();

    const params = {
      formData: formData.values,
    };

    eventsource.invoke(
      params,
      async (data?: any) => {
        setIsSubmitting(false);
        hideMsg();

        // Invoke onSuccess event through form
        await invokeFormEvent(formRef, listener, "onSuccess", new Event("onSuccess"), formData);

        invokeEventCallback?.("success");
        onSuccess?.(new Event("success"), dialogWidget);
        close();
      },
      // Error callback
      async (error?: any) => {
        setIsSubmitting(false);
        showMessage(loginErrorMessage(error, appLocale, errormessage), "error");

        // Invoke onError event through form
        await invokeFormEvent(formRef, listener, "onError", new Event("onError"), formData);

        invokeEventCallback?.("error");
        onError?.(new Event("error"), dialogWidget);
      }
    );

    // Invoke onSubmit event
    await invokeFormEvent(formRef, listener, "onSubmit", new Event("submit"), formData);
  }, [
    isSubmitting,
    eventsource,
    validateCredentials,
    showMessage,
    hideMsg,
    invokeEventCallback,
    onSuccess,
    onError,
    errormessage,
    appLocale,
  ]);

  // Form setup effect
  useEffect(() => {
    if (!isopen) {
      setIsFormReady(false);
      return;
    }

    // Setup form reference with timeout to allow DOM rendering
    const setupTimeout = setTimeout(() => {
      const container = widgetRef.current;
      if (!container) return;

      // Find form element
      const formElement =
        container.querySelector("form") || container.querySelector('[role="form"]');

      if (formElement) {
        formRef.current = formElement;
        setIsFormReady(true);
      }
    }, FORM_SETUP_TIMEOUT);

    return () => clearTimeout(setupTimeout);
  }, [isopen]);

  // Form event handlers
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (onSubmit) {
        onSubmit(e.nativeEvent, dialogWidget);
      } else {
        await doLogin();
      }
    },
    [onSubmit, doLogin]
  );

  const handleKeyPress = useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && isFormReady) {
        e.preventDefault();
        e.stopPropagation();
        await doLogin();
      }
    },
    [doLogin, isFormReady]
  );

  const handleLoginButtonClick = useCallback(
    async (e: React.MouseEvent) => {
      let target = e.target as HTMLElement;
      let dataRole = "";
      if (target.tagName === "BUTTON") {
        dataRole = target.getAttribute("data-role") || "";
      } else if (target.tagName === "SPAN") {
        dataRole = target.parentElement?.getAttribute("data-role") || "";
        target = target.parentElement as HTMLElement;
      }

      if (dataRole.toLowerCase() === "loginbutton") {
        e.preventDefault();
        e.stopPropagation();

        const container = widgetRef.current;
        const hasContainerSubmitEvent = container?.hasAttribute("submit.event");
        const hasButtonClickEvent = target.hasAttribute("click.event");
        const hasButtonTapEvent = target.hasAttribute("tap.event");

        if (!hasContainerSubmitEvent && !hasButtonClickEvent && !hasButtonTapEvent) {
          await doLogin();
        }
      }
    },
    [doLogin]
  );

  // Early return if dialog is not open
  if (!isopen) {
    return null;
  }

  return (
    <WmDialog
      open={isopen}
      onClose={close}
      className={clsx(DEFAULT_CLASS, props.className)}
      closable={props.closable}
      sheet={props.sheet}
      name={props.name || ""}
      listener={listener}
    >
      <WmDialogContent name={`${name}_content`} listener={listener}>
        <WmDialogHeader
          name={`login-dialog-${title}`}
          listener={listener}
          titleid={`login-dialog-${title}`}
          heading={title}
          iconclass={iconclass}
          onClose={close}
        />

        <WmDialogBody name={`${name}_body`} listener={listener}>
          <div
            ref={widgetRef}
            className="login-dialog-content"
            onSubmit={handleFormSubmit}
            onKeyPress={handleKeyPress}
            onClick={handleLoginButtonClick}
          >
            <WmMessage
              ref={messageRef}
              className="app-login-message"
              name="LoginMessage"
              type={loginMessage.type || "info"}
              caption={loginMessage.caption}
              open={loginMessage.show}
              close={handleMessageClose}
              listener={listener}
            />

            {children}
          </div>
        </WmDialogBody>
      </WmDialogContent>
    </WmDialog>
  );
};

export default BaseDialog(withBaseWrapper(WmLoginDialog));
