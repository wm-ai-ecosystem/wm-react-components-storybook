import clsx from "clsx";
import Box from "@mui/material/Box";
import BaseProps from "@wavemaker/react-runtime/higherOrder/props";

const DEFAULT_CLASS = "basic-btn-grp form-action panel-footer clearfix";

const WmFormFooter = (props: BaseProps) => {
  const { className, children, ...rest } = props;
  return (
    <Box component="div" className={clsx(DEFAULT_CLASS, className)} {...rest}>
      {children}
    </Box>
  );
};

WmFormFooter.displayName = "WmFormFooter";

export default WmFormFooter;
