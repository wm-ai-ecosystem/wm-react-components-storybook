import Box from "@mui/material/Box";
import clsx from "clsx";
import withBaseWrapper, { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-dialog-body modal-body";

export const WmDialogBody = (props: BaseProps) => {
  const { children } = props;
  return (
    <Box component="div" className={clsx(DEFAULT_CLASS, props.className)}>
      {children}
    </Box>
  );
};

export default withBaseWrapper(WmDialogBody);
