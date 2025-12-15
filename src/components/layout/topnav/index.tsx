import clsx from "clsx";
import Box from "@mui/material/Box";
import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-top-nav";

function WmTopNav(props: BaseProps) {
  const { styles, children, className, id, ...restProps } = props;
  return (
    <Box
      component="section"
      sx={styles}
      className={clsx(DEFAULT_CLASS, className)}
      id={id}
      role="navigation"
      aria-label="Second level navigation"
      data-role="page-topnav"
      {...restProps}
    >
      {children}
    </Box>
  );
}

WmTopNav.displayName = "WmTopNav";
export default withBaseWrapper(WmTopNav);
