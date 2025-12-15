import Box from "@mui/material/Box";
import clsx from "clsx";

import { withBaseWrapper, BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { memo } from "react";

const DEFAULT_CLASS = "app-partial clearfix";

const WmPartial = memo(
  (props: BaseProps) => {
    const { styles, children, className, id } = props;
    return (
      <Box
        component="section"
        sx={{
          ...styles,
          height: `${styles?.height || "auto"} !important`, // Ensure height overrides default
        }}
        className={clsx(DEFAULT_CLASS, className)}
        id={id}
      >
        {children}
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.children === nextProps.children;
  }
);

WmPartial.displayName = "WmPartial";

export default withBaseWrapper(WmPartial);
