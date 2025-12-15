import React from "react";
import { Box, Typography } from "@mui/material";

export default function LoadingComponent({ message }: { message?: string }) {
  return (
    <Box
      className="overlay"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
    >
      <Box className="status">
        <i className="fa fa-circle-o-notch fa-spin"></i>
        <Typography component="span" className="message">
          {message || "Loading..."}
        </Typography>
      </Box>
    </Box>
  );
}
