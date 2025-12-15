import React from "react";
import DialogContentText from "@mui/material/DialogContentText";
import clsx from "clsx";

import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

// components
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import { WmDialogContent } from "@wavemaker/react-runtime/components/dialogs/dialog-content";
import { WmDialog } from "@wavemaker/react-runtime/components/dialogs";
import BaseDialog from "../withDialogWrapper";
import { WmDialogBody } from "../dialog-body";

const DEFAULT_CLASS = "";

interface WmConfirmDialogProps extends BaseProps {
  name: string;
  oktext?: string;
  title?: string;
  alerttype?: string;
  iconclass?: string;
  text?: string;
  onOk?: () => void;
  onOkClick?: () => void;
}

const WmConfirmDialog = (props: WmConfirmDialogProps) => {
  const {
    isopen,
    onClose,
    oktext = "OK",
    title = "Alert",
    alerttype = "error",
    iconclass = "wi wi-warning",
    text = "I am Alert Box!",
    message,
    close,
    onOkClick,
  } = props;

  const handleClose = (event?: React.SyntheticEvent) => {
    if (onClose) {
      onClose(event);
    }
    if (close) {
      close(event);
    }
  };

  // Don't render if not open
  if (!isopen) {
    return null;
  }

  return (
    <WmDialog
      {...props}
      open={isopen}
      onClose={handleClose}
      className={clsx(DEFAULT_CLASS, props.className)}
    >
      <div className="app-alert-dialog app-dialog modal-dialog">
        <WmDialogContent {...props}>
          <WmDialogHeader
            {...props}
            titleid={`alert-dialog-${title}`}
            heading={title}
            onClose={close}
            iconclass={iconclass}
          />
          <WmDialogBody name="" listener={{}}>
            <DialogContentText className={`app-dialog-message text-${alerttype}`}>
              {message || text}
            </DialogContentText>
          </WmDialogBody>
          <WmDialogFooter name="" listener={{}}>
            <WmButton
              aria-label={oktext}
              caption={oktext}
              onClick={onOkClick}
              className="btn-primary ok-action "
              listener={{}}
              name=""
            />
          </WmDialogFooter>
        </WmDialogContent>
      </div>
    </WmDialog>
  );
};

WmConfirmDialog.displayName = "WmConfirmDialog";

export default BaseDialog(withBaseWrapper(WmConfirmDialog));
