import React from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { PagerNavigationProps } from "./props";
import { APP_LOCALE } from "../../list/utils/constants";

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
  "&.disabled": {
    opacity: 0.38,
    pointerEvents: "none",
  },
}));

export const PagerNavigation: React.FC<PagerNavigationProps> = ({
  navigationClass,
  isDisablePrevious,
  isDisableNext,
  onNavigate,
}) => {
  return (
    <StyledPaginationList className={clsx("pager", navigationClass)}>
      <StyledPaginationItem className={clsx("previous", { disabled: isDisablePrevious })}>
        <Box
          component="a"
          href="#"
          onClick={e => {
            e.preventDefault();
            onNavigate("prev", e);
          }}
          aria-disabled={isDisablePrevious ? "true" : "false"}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "6px 12px",
            textDecoration: "none",
            cursor: isDisablePrevious ? "not-allowed" : "pointer",
            opacity: isDisablePrevious ? 0.5 : 1,
            color: "inherit",
          }}
        >
          <Box component="span" aria-hidden="true" sx={{ mr: 1 }}>
            <i className="wi wi-chevron-left"></i>
          </Box>
          {APP_LOCALE.LABEL_PREVIOUS}
          <Box component="span" className="sr-only">
            {isDisablePrevious ? " , Disabled" : ""}
          </Box>
        </Box>
      </StyledPaginationItem>

      <StyledPaginationItem className={clsx("next", { disabled: isDisableNext })}>
        <Box
          component="a"
          href="#"
          onClick={e => {
            e.preventDefault();
            onNavigate("next", e);
          }}
          aria-disabled={isDisableNext ? "true" : "false"}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "6px 12px",
            textDecoration: "none",
            cursor: isDisableNext ? "not-allowed" : "pointer",
            opacity: isDisableNext ? 0.5 : 1,
            color: "inherit",
          }}
        >
          {APP_LOCALE.LABEL_NEXT}
          <Box component="span" aria-hidden="true" sx={{ ml: 1 }}>
            <i className="wi wi-chevron-right"></i>
          </Box>
          <Box component="span" className="sr-only">
            {isDisableNext ? " , Disabled" : ""}
          </Box>
        </Box>
      </StyledPaginationItem>
    </StyledPaginationList>
  );
};
