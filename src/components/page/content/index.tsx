import clsx from "clsx";
import { Container, Box } from "@mui/material";
import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-content clearfix";

function WmContent(props: BaseProps) {
  const { styles, children, className } = props;
  return (
    <Box sx={styles} className={clsx(DEFAULT_CLASS, className)} component="main">
      <Box component="div" className="app-content-row">
        {children}
      </Box>
    </Box>
  );
}

WmContent.displayName = "WmContent";

export default withBaseWrapper(WmContent);
