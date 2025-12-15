import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { useAppSelector } from "@wavemaker/react-runtime/store";
import DialogService from "@wavemaker/react-runtime/core/dialog.service";

export interface Props extends BaseProps {
  isopen?: boolean;
  onClose?: (event?: React.SyntheticEvent) => void;
  onOk?: (event?: React.SyntheticEvent) => void;
  onOpen?: (event?: React.SyntheticEvent) => void;
  onCancel?: (event?: React.SyntheticEvent) => void;
  closable?: boolean;
  sheet?: boolean;
}

const BaseDialog = (Component: React.ComponentType<BaseProps>) => {
  const WrappedComponent = (props: Props) => {
    const { isopen = false, onClose, onOk, onOpened, name, ...restProps } = props;
    const [dialogOpen, setDialogOpen] = useState(!!isopen);
    const appLocale = useAppSelector(state => state.i18n.appLocale);
    const dialogInstanceRef = useRef<any>(null);
    const isDialogOpenRef = useRef<boolean>(isopen);

    useEffect(() => {
      setDialogOpen(!!isopen);
      isDialogOpenRef.current = !!isopen;
    }, [isopen]);

    const handleTransitionEntered = useCallback(() => {
      if (onOpened) {
        onOpened();
      }
    }, [onOpened, name]);

    const handleOpen = useCallback(() => {
      setDialogOpen(true);
      isDialogOpenRef.current = true;
    }, []);

    const handleClose = useCallback(
      (event?: React.SyntheticEvent) => {
        if (isDialogOpenRef.current) {
          setDialogOpen(false);
          isDialogOpenRef.current = false;
          onClose && onClose(event);
        }
      },
      [onClose]
    );

    const handleOk = useCallback(
      (event?: React.SyntheticEvent) => {
        setDialogOpen(false);
        isDialogOpenRef.current = false;
        onOk && onOk(event);
      },
      [onOk]
    );

    // Register/unregister dialog with DialogService
    useEffect(() => {
      if (name) {
        const dialogInstance = {
          open: handleOpen,
          close: handleClose,
          isOpen: dialogOpen,
          component: Component,
        };

        dialogInstanceRef.current = dialogInstance;
        DialogService.registerDialog(name, dialogInstance);

        return () => {
          DialogService.unregisterDialog(name);
        };
      }
    }, [name, handleOpen, handleClose, Component]);

    // Update dialog state in the service when dialogOpen changes
    useEffect(() => {
      if (name && dialogInstanceRef.current) {
        dialogInstanceRef.current.isOpen = dialogOpen;
      }
    }, [dialogOpen, name]);

    const updatedProps = useMemo(
      () => ({
        ...restProps,
        isopen: dialogOpen,
        open: handleOpen,
        close: handleClose,
        openDialog: handleOpen,
        closeDialog: handleClose,
        widgetType: "wm-dialog",
        onOkClick: handleOk,
        onTransitionEntered: handleTransitionEntered,
        dialogLocale: {
          LABEL_CLOSE: appLocale.LABEL_CLOSE,
        },
      }),
      [restProps, dialogOpen, handleOpen, handleClose, handleOk]
    );
    return <Component {...updatedProps} name={name} />;
  };

  WrappedComponent.displayName = `BaseDialog(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

export default BaseDialog;
