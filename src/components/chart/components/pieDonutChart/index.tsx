import React from "react";
import {
  formatNumber,
  getLegendPopupStyle,
  getRadiusValue,
  normalizeDonutRatio,
} from "../../utils";
import {
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Text,
} from "recharts";
import { ChartLegend } from "../chartLegend";
import { ChartTooltip } from "../chartTooltip";
import { PieDonutChartProps } from "./props";
import { PieLabelProps } from "recharts/types/polar/Pie";

const RADIAN = Math.PI / 180;

// Custom label component for percentage-only labels
const renderCustomizedLabel = (
  { cx, cy, midAngle = 0, innerRadius, outerRadius, percent, index, name, value }: PieLabelProps,
  labeltype: string,
  ynumberformat: string,
  total: number,
  showlabels: string
) => {
  // Don't render if showlabels is 'hide'
  if (showlabels === "hide") return null;

  // Calculate radius based on label position
  const radius =
    showlabels === "inside"
      ? ((innerRadius ?? 0) + (outerRadius ?? 0)) / 2 // For inside labels, position in middle of slice
      : (outerRadius ?? 0) + 10; // For outside labels, position 10px outside

  const x = (cx ?? 0) + radius * Math.cos(-midAngle * RADIAN);
  const y = (cy ?? 0) + radius * Math.sin(-midAngle * RADIAN);

  let labelText = "";
  if (labeltype === "key") {
    labelText = name;
  } else if (labeltype === "value") {
    labelText = formatNumber(value ?? 0, ynumberformat);
  } else if (labeltype === "percent") {
    labelText = `${((percent ?? 0) * 100).toFixed(0)}%`;
  } else if (labeltype === "key-value") {
    labelText = `${name}: ${formatNumber(value ?? 0, ynumberformat)}`;
  }

  return (
    <text
      x={x}
      y={y}
      fill={showlabels === "inside" ? "#000" : "currentColor"}
      textAnchor={x > (cx ?? 0) ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
    >
      {labelText}
    </text>
  );
};

export const PieDonutChart: React.FC<PieDonutChartProps> = ({
  type,
  data,
  selectedRegions,
  chartColors,
  margin,
  showlabels = "outside",
  labeltype = "percent",
  tooltips,
  legendPosition,
  legendtype,
  availableRegions,
  donutratio,
  ynumberformat,
  centerlabel,
  shouldShowLegend,
  onChartClick,
  onLegendClick,
  showLegend,
  xDataKeyArr,
  numberFormat,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const filteredData = data.filter(item => selectedRegions.includes(item.name));

  const commonProps = {
    data: filteredData,
    margin,
  };

  // Create legend payload for external rendering
  const legendPayload = filteredData.map((entry, index) => ({
    value: entry.name,
    color: chartColors[index % chartColors.length],
    dataKey: entry.name,
  }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Chart Container */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart {...commonProps}>
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={
              type === "Donut" ? `${Math.round(normalizeDonutRatio(donutratio) * 100)}%` : 0
            }
            outerRadius="80%"
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            onClick={(data, index, event) => onChartClick(data, index, event)}
            isAnimationActive={true}
            labelLine={false}
            label={
              showlabels !== "hide"
                ? props =>
                    renderCustomizedLabel(props, labeltype, ynumberformat ?? "", total, showlabels)
                : false
            }
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>

          {tooltips && (
            <RechartsTooltip
              content={({ active, payload, label }) => (
                <ChartTooltip
                  active={active}
                  payload={payload}
                  label={label}
                  xDataKeyArr={xDataKeyArr}
                  numberFormat={numberFormat}
                />
              )}
              wrapperStyle={{ zIndex: 9999 }}
            />
          )}

          {/* Center text alignment for Donut */}
          {centerlabel && type === "Donut" && (
            <text
              x="49%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="16"
              fill="#13c4f996"
            >
              {centerlabel}
            </text>
          )}
        </PieChart>
      </ResponsiveContainer>

      {/* External Legend */}
      {shouldShowLegend && showLegend && (
        <div
          style={{
            position: "absolute",
            ...getLegendPopupStyle(legendPosition),
            pointerEvents: "auto",
            zIndex: 1000,
          }}
        >
          <ChartLegend
            payload={legendPayload}
            selectedRegions={selectedRegions}
            onLegendClick={onLegendClick}
            legendPosition={legendPosition}
            legendtype={legendtype}
            availableRegions={availableRegions}
            chartColors={chartColors}
          />
        </div>
      )}
    </div>
  );
};
