import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { APP_LOCALE, LIST_NAVIGATION_TYPES } from "../../list/utils/constants";
import { TotalRecordsProps } from "./props";

const StyledPaginationList = styled("ul")(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  padding: 0,
  margin: 0,
  listStyle: "none",
}));

const StyledPaginationItem = styled("li")(() => ({
  margin: "0 2px",
}));

export const TotalRecords: React.FC<TotalRecordsProps> = ({
  dataSize,
  variant = LIST_NAVIGATION_TYPES.BASIC,
}) => {
  return (
    <StyledPaginationList className="pagination">
      <StyledPaginationItem
        className={`totalcount disabled ${variant === LIST_NAVIGATION_TYPES.BASIC ? "basiccount" : ""}`}
      >
        <Box
          component={variant === LIST_NAVIGATION_TYPES.BASIC ? "a" : "span"}
          href={variant === LIST_NAVIGATION_TYPES.BASIC ? "#" : undefined}
          tabIndex={-1}
          aria-disabled="true"
          sx={{
            display: "block",
            padding: "6px 12px",
            fontSize: "14px",
            userSelect: "none",
          }}
        >
          {APP_LOCALE.LABEL_TOTAL_RECORDS}: {dataSize}
        </Box>
      </StyledPaginationItem>
    </StyledPaginationList>
  );
};
