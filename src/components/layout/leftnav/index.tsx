import { useEffect } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "app-nav-drawer app-left-panel left-panel-collapsed ";

interface LeftNavProps extends BaseProps {
  columnwidth?: string;
  navheight?: string;
  onNavHeightChange?: (isFull: boolean) => void;
}

function WmLeftPanel(props: LeftNavProps) {
  const {
    styles,
    children,
    className,
    columnwidth = 2,
    id,
    navtype,
    navheight,
    onNavHeightChange,
  } = props;

  useEffect(() => {
    if (onNavHeightChange) {
      onNavHeightChange(navheight === "full");
    }
    return () => {
      if (onNavHeightChange) {
        onNavHeightChange(false);
      }
    };
  }, [navheight, onNavHeightChange]);

  return (
    <Box
      id={id}
      component="div"
      sx={styles}
      className={clsx(
        DEFAULT_CLASS,
        className,
        `col-sm-${columnwidth} ${navtype ? `app-nav-${navtype}` : ""} ${navheight ? `app-nav-${navheight}` : ""}`
      )}
    >
      {children}
    </Box>
  );
}

WmLeftPanel.displayName = "WmLeftPanel";
export default withBaseWrapper(WmLeftPanel);
