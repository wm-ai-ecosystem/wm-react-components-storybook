import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { formatNumber } from "../../utils";
import {
  tooltipContainerStyle,
  tooltipRowStyle,
  colorDotStyle,
  rowContainerStyle,
  labelContainerStyle,
} from "./styles";
import { ChartTooltipProps, getHeaderLabel } from "./utils";

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  xDataKeyArr,
  numberFormat,
}) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const headerLabel = useMemo(() => getHeaderLabel(label, xDataKeyArr), [label, xDataKeyArr]);

  return (
    <Box style={tooltipContainerStyle}>
      <Typography variant="subtitle2">{headerLabel}</Typography>
      {payload.map((entry, index) => (
        <Box key={`${entry.name}-${index}`} style={tooltipRowStyle}>
          <Box style={rowContainerStyle}>
            <Box style={labelContainerStyle}>
              <Box style={{ ...colorDotStyle, backgroundColor: entry.color }} />
              <Typography variant="caption">{entry.name}:</Typography>
            </Box>
            <Typography variant="body2">{formatNumber(entry.value, numberFormat)}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
