import React from "react";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Box } from "@mui/material";
import { WmCardCommonProps } from "../props";

const WmCardFooter: React.FC<WmCardCommonProps> = props => {
  const { children, className, styles } = props;

  return (
    <Box
      className={`app-card-footer text-muted card-footer ${className || ""}`}
      style={{ ...styles }}
    >
      {children}
    </Box>
  );
};

export default withBaseWrapper(React.memo(WmCardFooter));
