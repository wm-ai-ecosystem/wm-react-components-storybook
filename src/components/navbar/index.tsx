import { memo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "navbar navbar-default app-navbar";

const WmNavbar = memo(
  (props: BaseProps) => {
    const { className, children, styles, id, ...restProps } = props;

    return (
      <Box
        component="nav"
        sx={styles}
        className={clsx(DEFAULT_CLASS, className)}
        id={id}
        {...restProps}
      >
        <Box component="div" className="container-fluid">
          {/* Implement collapse for topnav ( mobile screen ) */}
          {/* <Box component="div" className="navbar-header"></Box> */}
          <Box component="div" className="collapse navbar-collapse">
            {children}
          </Box>
        </Box>
      </Box>
    );
  },
  () => true
);

WmNavbar.displayName = "WmNavbar";

export default memo(withBaseWrapper(WmNavbar));
