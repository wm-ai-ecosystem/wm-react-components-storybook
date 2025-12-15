import DialogActions from "@mui/material/DialogActions";
import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

export const WmDialogFooter = (props: BaseProps) => {
  const { children } = props;
  return <DialogActions className="app-dialog-footer modal-footer">{children}</DialogActions>;
};

export default withBaseWrapper(WmDialogFooter);
