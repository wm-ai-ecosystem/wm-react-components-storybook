import clsx from "clsx";
import Box from "@mui/material/Box";

import { BaseProps, withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-header clearfix app-header-shrink";

function WmHeader(props: BaseProps) {
  const { styles, children, className, id } = props;

  return (
    <Box component="header" className={clsx(DEFAULT_CLASS, className)} id={id} style={styles}>
      {/* TODO: Implement Hamburger menu for mobile phones */}
      <Box component="div" className="app-header-container">
        {children}
      </Box>
    </Box>
  );
}

WmHeader.displayName = "WmHeader";
export default withBaseWrapper(WmHeader);
