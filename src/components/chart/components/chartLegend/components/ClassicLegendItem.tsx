import React from "react";
import { Box } from "@mui/material";
import { LegendItem } from "../utils";

interface ClassicLegendItemProps {
  entry: LegendItem;
  index: number;
  selectedRegions: string[];
  onItemClick: (value: string, event: React.MouseEvent) => void;
}

export const ClassicLegendItem: React.FC<ClassicLegendItemProps> = ({
  entry,
  index,
  selectedRegions,
  onItemClick,
}) => (
  <Box
    component="div"
    key={`legend-${index}`}
    onClick={e => {
      e.preventDefault();
      onItemClick(entry.value, e);
    }}
    sx={{
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    }}
  >
    <Box
      component="span"
      sx={{
        width: 12,
        height: 12,
        backgroundColor: selectedRegions.includes(entry.value) ? entry.color : "transparent",
        marginRight: 1,
        borderRadius: "50%",
        border: `2px solid ${entry.color}`,
      }}
    />
    <span>{entry.value.length > 10 ? entry.value.slice(0, 10) + "..." : entry.value}</span>
  </Box>
);
