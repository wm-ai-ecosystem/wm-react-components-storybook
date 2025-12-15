import React from "react";
import withBaseWrapper from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { Box, CardContent } from "@mui/material";
import { WmCardCommonProps } from "../props";

const WmCardContent: React.FC<WmCardCommonProps> = props => {
  const { content, children, className, styles } = props;

  return (
    <CardContent
      className={`app-card-content card-body card-block ${className || ""}`}
      sx={{
        padding: "0",
        margin: "0",
        backgroundColor: "transparent",
        "&:last-child": {
          paddingBottom: "0",
        },
      }}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      <Box style={{ ...styles }}>{children}</Box>
    </CardContent>
  );
};

export default withBaseWrapper(React.memo(WmCardContent));
