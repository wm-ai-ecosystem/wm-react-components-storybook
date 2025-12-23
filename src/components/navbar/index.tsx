import { memo, useMemo } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";

const DEFAULT_CLASS = "navbar navbar-default app-navbar";

const WmNavbar = memo(
  (props: BaseProps) => {
    const { className, children, styles, id, ...restProps } = props;

    // Process backgroundImage to ensure it has url() wrapper
    const processedStyles = useMemo(() => {
      if (!styles) return styles;

      if (styles?.backgroundImage) {
        styles.backgroundImage = `${styles.backgroundImage.includes("url(") ? styles.backgroundImage : "url(" + styles.backgroundImage + ")"}`;
      }

      return { ...styles };
    }, [styles]);

    return (
      <Box
        component="nav"
        style={processedStyles}
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
