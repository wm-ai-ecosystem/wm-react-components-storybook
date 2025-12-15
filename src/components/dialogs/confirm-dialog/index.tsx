import React from "react";
import clsx from "clsx";
import DialogContentText from "@mui/material/DialogContentText";

import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

// components
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import { WmDialogContent } from "@wavemaker/react-runtime/components/dialogs/dialog-content";
import { WmDialog } from "@wavemaker/react-runtime/components/dialogs";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmDialogBody } from "@wavemaker/react-runtime/components/dialogs/dialog-body";
import BaseDialog from "@wavemaker/react-runtime/components/dialogs/withDialogWrapper";

const DEFAULT_CLASS = "app-dialog modal-dialog app-confirm-dialog";

export interface WmConfirmDialogProps extends BaseProps {
  isopen?: boolean;
  onClose?: (event?: React.SyntheticEvent) => void;
  name: string;
  oktext?: string;
  canceltext?: string;
  title?: string;
  message?: string | React.ReactNode;
  text?: string | React.ReactNode;
  iconclass?: string;
  onOk?: (event?: React.SyntheticEvent) => void;
  onCancel?: (event?: React.SyntheticEvent) => void;
}

const WmConfirmDialog = (props: WmConfirmDialogProps) => {
  const {
    oktext = "OK",
    canceltext = "CANCEL",
    title = "Confirm",
    message = "I am confirm box!",
    iconclass = "wm-sl-l sl-check",
    onOk,
    onCancel,
    onClose,
    isDialog = true,
    close,
    onOkClick,
  } = props;

  const handleOk = (event?: React.SyntheticEvent) => {
    if (onOk) {
      onOk(event);
    }
    if (close) {
      close(event);
    }
  };

  const handleCancel = (event?: React.SyntheticEvent) => {
    if (onCancel) {
      onCancel(event);
    }
    if (close) {
      close(event);
    }
  };

  const handleClose = (event?: React.SyntheticEvent) => {
    if (onClose) {
      onClose(event);
    }
    if (close) {
      close(event);
    }
  };

  return (
    <WmDialog
      {...props}
      open={props.isopen}
      onClose={handleClose}
      className={clsx(DEFAULT_CLASS, props.className)}
      data-role="confirm-dialog"
      aria-labelledby={`confirm-dialog-${title}`}
      aria-describedby={`confirm-dialog-${title}-description`}
    >
      <WmDialogContent name="" listener={{}}>
        <WmDialogHeader
          {...props}
          isDialog={isDialog}
          titleid={`confirm-dialog-${title}`}
          heading={title}
          iconclass={iconclass}
          onClose={handleClose}
        />
        <WmDialogBody name="" listener={{}}>
          <DialogContentText className="app-dialog-message">{message}</DialogContentText>
        </WmDialogBody>

        <WmDialogFooter name="" listener={{}}>
          <WmButton
            name=""
            listener={{}}
            caption={canceltext}
            onClick={handleCancel}
            className="btn-default cancel-action"
            aria-label={canceltext}
          />
          <WmButton
            name=""
            listener={{}}
            caption={oktext}
            onClick={onOkClick || handleOk}
            className="btn-primary ok-action"
            aria-label={oktext}
          />
        </WmDialogFooter>
      </WmDialogContent>
    </WmDialog>
  );
};

WmConfirmDialog.displayName = "WmConfirmDialog";

export default BaseDialog(withBaseWrapper(WmConfirmDialog));
