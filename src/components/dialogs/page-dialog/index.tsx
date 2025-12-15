import clsx from "clsx";

import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import BaseDialog from "@wavemaker/react-runtime/components/dialogs/withDialogWrapper";
import { WmDialog } from "@wavemaker/react-runtime/components/dialogs";
import { WmDialogContent } from "@wavemaker/react-runtime/components/dialogs/dialog-content";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import { WmDialogBody } from "@wavemaker/react-runtime/components/dialogs/dialog-body";
import { WmButton } from "@wavemaker/react-runtime/components/form/button";
import { WmDialogFooter } from "@wavemaker/react-runtime/components/dialogs/dialog-actions";
import WmPartialContainer from "@wavemaker/react-runtime/components/page/partial-container";

interface WmPageDialogProps extends BaseProps {
  dialogtype?: "page-dialog";
  content?: string;
  prefab?: boolean;
  prefabName?: string;
}

const DEFAULT_CLASS = "app-dialog modal-dialog app-page-dialog";

const WmPageDialog = (props: WmPageDialogProps) => {
  const {
    showactions = true,
    iconclass = "wi wi-file",
    title = "Page Content",
    oktext = "OK",
  } = props;

  // const { isopen, onOk, onClose, close, title, content, prefab, prefabName } = props;
  const handleOk = (event?: React.SyntheticEvent) => {
    if (props.onOk) {
      props.onOk(event);
    }
    if (props.close) {
      props.close(event);
    }
  };

  const handleClose = (event?: React.SyntheticEvent) => {
    if (props.onClose) {
      props.onClose(event);
    }
    if (props.close) {
      props.close(event);
    }
  };

  if (!props.isopen) {
    return null;
  }
  return (
    <WmDialog
      open={props.isopen || false}
      onClose={handleClose}
      className={clsx(DEFAULT_CLASS, props.className)}
      closable={props.closable}
      sheet={props.sheet}
      data-role="page-dialog"
      aria-labelledby={`page-dialog-${props.title}`}
      aria-describedby={`page-dialog-${props.title}-description`}
      role="dialog"
      name={props.name || ""}
      listener={{}}
    >
      <WmDialogContent name="" listener={{}}>
        <WmDialogHeader
          titleid={`page-dialog-${props.title}`}
          heading={title}
          iconclass={iconclass}
          onClose={handleClose}
          closable={props.closable}
          name=""
          listener={{}}
        />
        <WmDialogBody name="" listener={{}}>
          {props.content && (
            <WmPartialContainer
              listener={{}}
              name=""
              content={props.content}
              prefab={props.prefab}
              prefabName={props.prefabName}
            />
          )}
        </WmDialogBody>

        {showactions && (
          <WmDialogFooter name="" listener={{}}>
            <WmButton
              aria-label={oktext}
              caption={oktext}
              onClick={props.onOkClick || handleOk}
              className="btn-primary ok-action"
              listener={{}}
              name="page-dialog-ok-button"
            />
          </WmDialogFooter>
        )}
      </WmDialogContent>
    </WmDialog>
  );
};

WmPageDialog.displayName = "WmPageDialog";

export default BaseDialog(withBaseWrapper(WmPageDialog));
