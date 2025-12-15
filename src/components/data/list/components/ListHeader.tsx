import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DOMPurify from "dompurify";
import { ListHeaderProps } from "./props";

/**
 * List Header Component
 * Displays the header section of the list with title, subtitle, and icon
 */
export const ListHeader: React.FC<ListHeaderProps> = ({ title, subheading, iconclass }) => {
  if (!title && !subheading && !iconclass) return null;

  return (
    <Box component="div" className="panel-heading">
      <Typography className="panel-title" variant="h6" sx={{ all: "unset" }}>
        <span className="pull-left">
          {iconclass && <i className={`app-icon panel-icon ${iconclass}`} aria-hidden="true"></i>}
        </span>
        <span className="pull-left">
          {title && (
            <Typography
              className="heading"
              component="span"
              variant="h6"
              sx={{ all: "unset" }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
            />
          )}
          {subheading && (
            <Typography
              className="description"
              component="span"
              variant="body2"
              sx={{ all: "unset" }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subheading) }}
            />
          )}
        </span>
      </Typography>
    </Box>
  );
};
