import { Box, Container } from "@mui/material";
import clsx from "clsx";

import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-footer clearfix";

const Default_Styles = {
  minWidth: "100%",
};
function WmFooter(props: BaseProps) {
  const { styles, children, className, id } = props;
  return (
    <Box component="div" sx={styles} className={clsx(DEFAULT_CLASS, className)} id={id}>
      {children}
    </Box>
  );
}

WmFooter.displayName = "WmFooter";
export default withBaseWrapper(WmFooter);
