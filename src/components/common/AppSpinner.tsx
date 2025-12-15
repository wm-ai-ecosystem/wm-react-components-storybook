import React from "react";
import clsx from "clsx";
import { Box, Typography, CircularProgress } from "@mui/material";

interface AppSpinnerProps {
  show: boolean;
  spinnermessages?: string[];
  classname?: string;
  arialabel?: string;
}

export const AppSpinner: React.FC<AppSpinnerProps> = ({
  show,
  spinnermessages = [],
  classname,
  arialabel,
}) => {
  if (!show) {
    return null;
  }

  return (
    <Box className={clsx("app-spinner", classname)} aria-label={arialabel}>
      <Box className="spinner-message">
        <i className="spinner-image animated infinite fa fa-circle-o-notch fa-spin" />
        <Box className="spinner-messages">
          {spinnermessages.map((message, index) => (
            <Typography component="p" key={index}>
              {message}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
