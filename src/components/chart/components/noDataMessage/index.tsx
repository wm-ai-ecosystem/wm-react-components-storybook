import React from "react";
import { Box } from "@mui/material";

interface NoDataMessageProps {
  children: React.ReactNode;
}

export const NoDataMessage: React.FC<NoDataMessageProps> = ({ children }) => (
  <Box
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      zIndex: 5,
    }}
  >
    {children}
  </Box>
);
