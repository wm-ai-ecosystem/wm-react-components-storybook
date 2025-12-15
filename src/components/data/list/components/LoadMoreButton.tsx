import React from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LoadMoreButtonProps } from "./props";

/**
 * Load more button component for on-demand pagination
 */
export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  paginationclass,
  isLoadingMore,
  loadingicon,
  loadingdatamsg,
  ondemandmessage,
  onLoadMore,
}) => (
  <Box component="div" className="panel-footer" style={{ textAlign: "center", padding: "16px" }}>
    <Button
      className={clsx("app-button btn", paginationclass)}
      variant="contained"
      onClick={onLoadMore}
      disabled={isLoadingMore}
    >
      {isLoadingMore ? (
        <>
          <i className={`app-icon ${loadingicon} fa-spin me-2`} aria-hidden="true" />
          {loadingdatamsg}
        </>
      ) : (
        ondemandmessage
      )}
    </Button>
  </Box>
);
