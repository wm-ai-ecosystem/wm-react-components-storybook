import React, { useRef } from "react";
import clsx from "clsx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { ClassicPaginationProps } from "./props";
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

const StyledPageInput = styled(InputBase)(() => ({
  width: "50px",
  textAlign: "center",
  "& input": {
    textAlign: "center",
    padding: "0 4px",
  },
}));

export const ClassicPagination: React.FC<ClassicPaginationProps> = ({
  currentPage,
  pageCount,
  dataSize,
  maxResults,
  navigationClass,
  showrecordcount = false,
  isDisableFirst,
  isDisablePrevious,
  isDisableNext,
  isDisableLast,
  isDisableCurrent,
  isDisableCount,
  onNavigate,
  onInputChange,
  onModelChange,
  onKeyDown,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <StyledPaginationList className={clsx("pagination", "advanced", navigationClass)}>
      {/* First button */}
      <StyledPaginationItem className={clsx({ disabled: isDisableFirst })}>
        <IconButton
          title={APP_LOCALE.LABEL_FIRST}
          name="first"
          onClick={e => onNavigate("first", e)}
          disabled={isDisableFirst}
          aria-disabled={isDisableFirst ? "true" : "false"}
          size="small"
        >
          <Box component="span" aria-hidden="true">
            <i className="wi wi-first-page"></i>
          </Box>
          <Box component="span" className="sr-only">
            Go to first page {isDisableFirst ? " , Disabled" : ""}
          </Box>
        </IconButton>
      </StyledPaginationItem>

      {/* Previous button */}
      <StyledPaginationItem className={clsx({ disabled: isDisablePrevious })}>
        <IconButton
          title={APP_LOCALE.LABEL_PREVIOUS}
          name="prev"
          onClick={e => onNavigate("prev", e)}
          disabled={isDisablePrevious}
          aria-disabled={isDisablePrevious ? "true" : "false"}
          size="small"
        >
          <Box component="span" aria-hidden="true">
            <i className="wi wi-chevron-left"></i>
          </Box>
          <Box component="span" className="sr-only">
            Go to previous page {isDisablePrevious ? ", Disabled" : ""}
          </Box>
        </IconButton>
      </StyledPaginationItem>

      {/* Page input */}
      <StyledPaginationItem className="pagecount">
        <Box component="span" aria-label="Change Page Number">
          <StyledPageInput
            value={currentPage}
            onChange={onInputChange}
            onBlur={onModelChange}
            onKeyDown={onKeyDown}
            disabled={isDisableCurrent}
            inputProps={{
              "aria-label": `Showing Page ${currentPage} of ${pageCount}`,
              type: "number",
              min: 1,
              max: pageCount,
            }}
            inputRef={inputRef}
          />
        </Box>
      </StyledPaginationItem>

      {/* Page count */}
      <StyledPaginationItem className="disabled">
        <Box component="span" sx={{ mx: 1 }} hidden={isDisableCount}>
          / {pageCount}
        </Box>
      </StyledPaginationItem>

      {/* Next button */}
      <StyledPaginationItem className={clsx({ disabled: isDisableNext })}>
        <IconButton
          title={APP_LOCALE.LABEL_NEXT}
          name="next"
          onClick={e => onNavigate("next", e)}
          disabled={isDisableNext}
          aria-disabled={isDisableNext ? "true" : "false"}
          size="small"
        >
          <Box component="span" aria-hidden="true">
            <i className="wi wi-chevron-right"></i>
          </Box>
          <Box component="span" className="sr-only">
            Go to next page {isDisableNext ? " , Disabled" : ""}
          </Box>
        </IconButton>
      </StyledPaginationItem>

      {/* Last button */}
      <StyledPaginationItem className={clsx({ disabled: isDisableLast })}>
        <IconButton
          title={APP_LOCALE.LABEL_LAST}
          name="last"
          onClick={e => onNavigate("last", e)}
          disabled={isDisableLast}
          aria-disabled={isDisableLast ? "true" : "false"}
          size="small"
        >
          <Box component="span" aria-hidden="true">
            <i className="wi wi-last-page"></i>
          </Box>
          <Box component="span" className="sr-only">
            Go to last page {isDisableLast ? " , Disabled" : ""}
          </Box>
        </IconButton>
      </StyledPaginationItem>

      {/* Total records */}
      {showrecordcount && (
        <StyledPaginationItem className="totalcount disabled">
          <Box
            component="span"
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
      )}
    </StyledPaginationList>
  );
};
