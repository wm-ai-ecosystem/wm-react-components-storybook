import React, { useCallback } from "react";
import clsx from "clsx";
import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { WmDialog } from "@wavemaker/react-runtime/components/dialogs";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import { WmDialogContent } from "@wavemaker/react-runtime/components/dialogs/dialog-content";
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmIframe } from "@wavemaker/react-runtime/components/basic/iframe";
import BaseDialog from "@wavemaker/react-runtime/components/dialogs/withDialogWrapper";
import { WmDialogBody } from "../dialog-body";

interface WmIframeDialogProps extends BaseProps {
  open?: boolean;
  closable?: boolean;
  modal?: boolean;
  title?: string;
  headinglevel?: "h1" | "h2" | "h4";
  iconclass?: string;
  iconurl?: string;
  iconwidth?: string;
  iconheight?: string;
  iconmargin?: string;
  oktext?: string;
  showheader?: boolean;
  showactions?: boolean;
  url?: string;
  encodeurl?: boolean;
  hint?: string;
  onClose?: (event?: React.SyntheticEvent) => void;
  onOk?: (event: React.SyntheticEvent) => void;
}

const DEFAULT_CLASS = "app-dialog modal-dialog";

const WmIframeDialog = (props: WmIframeDialogProps) => {
  const {
    closable = true,
    title = "External Content",
    headinglevel = "h4",
    iconclass = "wi wi-globe",
    iconurl,
    iconwidth,
    iconheight,
    iconmargin,
    oktext = "OK",
    showheader = true,
    showactions = true,
    url = "//www.wavemaker.com",
    encodeurl = false,
    hint,
    onClose,
    onOk,
  } = props;

  const handleClose = useCallback(
    (event?: React.SyntheticEvent) => {
      if (onClose) {
        onClose(event);
      }
      props?.close?.(event);
    },
    [onClose]
  );

  const handleOk = useCallback(
    (event: React.MouseEvent) => {
      if (onOk) {
        onOk(event);
      }
      if (onClose) {
        onClose();
      }
      props?.close();
    },
    [onOk, onClose]
  );

  return (
    <WmDialog
      {...props}
      open={props.isopen}
      onClose={handleClose}
      className={clsx(DEFAULT_CLASS, props.className)}
      data-role="iframe-dialog"
      aria-labelledby={`iframe-dialog-${title}`}
      aria-describedby={`iframe-dialog-${title}-description`}
    >
      <WmDialogContent name="" listener={{}}>
        {showheader && (
          <WmDialogHeader
            closable={closable}
            iconclass={iconclass}
            iconurl={iconurl}
            iconwidth={iconwidth}
            iconheight={iconheight}
            iconmargin={iconmargin}
            heading={title}
            headinglevel={headinglevel}
            title={title}
            titleid={`iframe-dialog-${props.widgetId}`}
            onClose={handleClose}
            name=""
            listener={{}}
          />
        )}
        <WmDialogBody name="" listener={{}}>
          <WmIframe
            name=""
            listener={{}}
            iframesrc={url}
            encodeurl={encodeurl}
            width={props.width as string}
            height={props.height as string}
            hint={hint}
          />
        </WmDialogBody>
        {showactions && (
          <WmDialogFooter name="" listener={{}}>
            <WmButton
              onClick={props.onOkClick || handleOk}
              caption={oktext}
              aria-label={oktext}
              className="btn-primary ok-action"
              name=""
              listener={{}}
            />
          </WmDialogFooter>
        )}
      </WmDialogContent>
    </WmDialog>
  );
};

WmIframeDialog.displayName = "WmIframeDialog";

export default BaseDialog(withBaseWrapper(WmIframeDialog));
