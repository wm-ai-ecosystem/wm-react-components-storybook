import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { PageSizeSelectorProps } from "./props";
import { APP_LOCALE } from "../../list/utils/constants";

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pagesizeoptions = "5,10,20,50,100",
  maxResults = 10,
  currentPage = 1,
  dataSize = 0,
  paginationMeta,
  onPageSizeChange,
}) => {
  // Parse page size options and include paginationMeta.size if available
  const options = useMemo(() => {
    const parsedOptions = pagesizeoptions
      .split(",")
      .map((opt: string) => parseInt(opt.trim(), 10))
      .filter((opt: number) => !isNaN(opt));

    // Add paginationMeta.size to options if it exists and is not already included
    if (paginationMeta?.size && !parsedOptions.includes(paginationMeta.size)) {
      parsedOptions.unshift(paginationMeta.size); // Add it to the beginning
      parsedOptions.sort((a, b) => a - b); // Sort in ascending order
    }

    return parsedOptions;
  }, [pagesizeoptions, paginationMeta?.size]);

  // Use paginationMeta.size as the effective maxResults if available
  const effectiveMaxResults = useMemo(() => {
    return paginationMeta?.size || maxResults;
  }, [paginationMeta?.size, maxResults]);

  // Calculate row summary
  const rowSummary = useMemo(() => {
    if (!dataSize) {
      return null;
    }

    const startIndex = Math.min((currentPage - 1) * effectiveMaxResults + 1, dataSize);
    const endIndex = Math.min(currentPage * effectiveMaxResults, dataSize);

    return {
      startIndex,
      endIndex,
      totalRecords: dataSize,
    };
  }, [currentPage, effectiveMaxResults, dataSize]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newValue = Number(event.target.value);
    if (onPageSizeChange) {
      onPageSizeChange(event as any, newValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
      }}
      className="pagination page-size-selector"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          component="label"
          sx={{
            fontSize: "14px",
            color: "text.primary",
            whiteSpace: "nowrap",
          }}
          title={APP_LOCALE.LABEL_ITEMS_PER_PAGE}
        >
          {APP_LOCALE.LABEL_ITEMS_PER_PAGE} :
        </Typography>

        <FormControl
          size="small"
          sx={{
            minWidth: 70,
            "& .MuiInputBase-root": {
              height: "auto",
            },
          }}
        >
          <Select
            id="page-size-select"
            value={effectiveMaxResults}
            onChange={handleChange}
            sx={{
              fontSize: "14px",
              minHeight: "auto",
              "& .MuiSelect-select": {
                paddingTop: "6px",
                paddingBottom: "6px",
                paddingLeft: "10px",
                paddingRight: "32px", // Space for dropdown arrow
                minHeight: "auto",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                  "& .MuiMenuItem-root": {
                    fontSize: "14px",
                    padding: "6px 16px", // Override any global padding
                    margin: 0, // Override any global margin
                  },
                  "& .MuiList-root": {
                    padding: "8px 0", // Ensure proper list padding
                  },
                  "& li": {
                    padding: 0, // Override global li padding
                    margin: 0, // Override global li margin
                  },
                },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            }}
          >
            {options.map((option: number) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {rowSummary && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.primary",
            }}
          >
            <Box component="span">
              {rowSummary.startIndex} - {rowSummary.endIndex}
            </Box>
            <Box component="span" sx={{ mx: 0.5 }}>
              &nbsp;of&nbsp;
            </Box>
            <Box component="span">{rowSummary.totalRecords}</Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
