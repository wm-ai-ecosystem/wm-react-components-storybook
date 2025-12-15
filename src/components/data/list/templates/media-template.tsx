import { Box, Typography, Button } from "@mui/material";
import React, { useContext } from "react";
import { ListItemContext } from "../components/ListItem";
import Image from "next/image";

// Default List Item Template Component
type ListItem = {
  picurl?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export const MediaWmListtemplate: React.FC = () => {
  const context = useContext(ListItemContext);
  const item: ListItem = context?.item || {};
  return (
    <Box component="div" className="media">
      <Box component="div" className="media-left">
        <Image
          src={item?.picurl || "/placeholder.png"}
          alt="Profile"
          className="media-object"
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
      </Box>
      <Box component="div" className="media-body">
        <Typography className="media-heading" variant="h6">
          {item?.title || "No Name"}
        </Typography>
        <Typography className="text-muted" variant="body2">
          {item?.description || "No Description"}
        </Typography>
      </Box>
      <Box component="div" className="media-right media-top">
        <Button className="btn-transparent" aria-label="Share">
          <i className="wi wi-share fa-2x" />
        </Button>
      </Box>
    </Box>
  );
};
