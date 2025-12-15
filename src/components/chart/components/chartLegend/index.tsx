import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { ChartLegendProps } from "./props";
import { mapLegendItems } from "./utils";
import { ClassicLegendItem } from "./components/ClassicLegendItem";
import { FuriousLegendItem } from "./components/FuriousLegendItem";

export const ChartLegend: React.FC<ChartLegendProps> = ({
  payload,
  selectedRegions,
  onLegendClick,
  legendPosition,
  style,
  availableRegions,
  legendtype,
  chartColors,
}) => {
  const handleClick = (dataKey: string, event: React.MouseEvent) => {
    onLegendClick(dataKey, event);
  };

  // Transform payload into legend items with proper color mapping
  const legendItems = useMemo(
    () => mapLegendItems(availableRegions, payload, chartColors),
    [availableRegions, payload, chartColors]
  );

  const containerStyles = {
    display: "flex",
    flexDirection: legendPosition === "right" ? "column" : "row",
    flexWrap: legendPosition === "right" ? "nowrap" : "wrap",
    gap: "8px",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: legendPosition === "right" ? "flex-start" : "center",
  } as const;

  if (legendtype === "classic") {
    return (
      <Box component="div" className="legend-container--classic" sx={containerStyles}>
        {legendItems.map((entry, index) => (
          <ClassicLegendItem
            key={`legend-${index}`}
            entry={entry}
            index={index}
            selectedRegions={selectedRegions}
            onItemClick={handleClick}
          />
        ))}
      </Box>
    );
  }

  return (
    <div className="legend-container--furious" style={containerStyles}>
      {legendItems.map((entry, index) => (
        <FuriousLegendItem
          key={`legend-${index}`}
          entry={entry}
          index={index}
          isSelected={selectedRegions.includes(entry.value)}
          onItemClick={handleClick}
        />
      ))}
    </div>
  );
};
