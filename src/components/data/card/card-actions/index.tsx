import React from "react";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Box, CardActions } from "@mui/material";
import { WmCardCommonProps } from "../props";

const WmCardActions: React.FC<WmCardCommonProps> = props => {
  const { children, className, styles } = props;

  return (
    <CardActions className={`app-card-actions ${className || ""}`} style={{ ...styles }}>
      {children}
    </CardActions>
  );
};

export default withBaseWrapper(React.memo(WmCardActions));
