import React from "react";
import Typography from "@mui/material/Typography";
import { NoDataMessageProps } from "./props";

/**
 * No data message component
 */
export const NoDataMessage: React.FC<NoDataMessageProps> = ({
  message,
  className = "no-data-message",
}) => (
  <Typography className={className} variant="body2">
    {message}
  </Typography>
);
