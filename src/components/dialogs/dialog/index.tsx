import { memo } from "react";
import clsx from "clsx";
import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import Dialog from "@wavemaker/react-runtime/components/dialogs";
import BaseDialog from "@wavemaker/react-runtime/components/dialogs/withDialogWrapper";
import { WmDialogHeader } from "@wavemaker/react-runtime/components/dialogs/dialog-header";
import DialogContent from "@wavemaker/react-runtime/components/dialogs/dialog-content";

export const WmDialog = memo(
  (props: BaseProps) => {
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
      <Dialog
        {...props}
        open={props.isopen}
        onClose={handleClose}
        className={clsx("app-dialog modal-dialog  dialog-view", props.className)}
      >
        <DialogContent {...props}>
          {props.dialogtype === "design-dialog" && props.showheader !== false && (
            <WmDialogHeader
              name=""
              listener={{}}
              titleid={`design-dialog-${props.title}`}
              heading={props.title}
              onClose={handleClose}
              iconclass={props.iconclass}
              iconurl={props.iconurl}
              iconwidth={props.iconwidth}
              iconheight={props.iconheight}
              iconmargin={props.iconmargin}
              iconstyle={props.iconstyle}
              closable={props.closable}
            />
          )}

          {props.children}
        </DialogContent>
      </Dialog>
    );
  },
  (prevProps, nextProps) => {
    const keys: (keyof BaseProps)[] = [
      "isopen",
      "sheetposition",
      "sheet",
      "styles",
      "dialogtype",
      "showheader",
      "title",
      "onClose",
      "close",
      "children",
      "modal",
      "closable",
    ];
    return keys.every(key => prevProps[key] === nextProps[key]);
  }
);

WmDialog.displayName = "WmDialog";

export default BaseDialog(withBaseWrapper(WmDialog));
