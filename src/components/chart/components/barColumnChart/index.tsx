import React, { memo, useCallback, useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import { ChartLegend } from "../chartLegend";
import { formatNumber, getBarSpacingValue, getLegendPopupStyle } from "../../utils";
import { BarColumnChartProps } from "./props";

export const BarColumnChart: React.FC<BarColumnChartProps> = memo(
  ({
    type,
    data,
    dataKeys,
    selectedRegions,
    chartColors,
    margin,
    barSpacing,
    showValues,
    legendPosition = "top",
    xAxisConfig,
    yAxisConfig,
    numberFormat,
    xDataKeyArr,
    onChartClick,
    onLegendClick,
    tooltips = true,
    showlegend = true,
    legendtype,
    availableRegions,
    viewtype = "Grouped",
    shouldShowLegend,
  }) => {
    const isBarChart = type === "Bar"; // Bar = horizontal bars, Column = vertical bars
    const isStacked = viewtype === "Stacked";

    const formatValue = useCallback(
      (label: React.ReactNode) => {
        if (typeof label === "number") {
          return formatNumber(label, numberFormat);
        }
        return String(label);
      },
      [numberFormat]
    );

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={margin}
          layout={isBarChart ? "vertical" : "horizontal"} // vertical layout = horizontal bars, horizontal layout = vertical bars
          barGap={isStacked ? 0 : getBarSpacingValue(barSpacing || "medium", "value")}
          barCategoryGap={isStacked ? 0 : undefined}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            {...(isBarChart
              ? { type: "number", ...xAxisConfig }
              : { dataKey: "x", ...xAxisConfig })}
          />

          <YAxis
            {...(isBarChart
              ? { dataKey: "x", type: "category", interval: 0, ...yAxisConfig }
              : yAxisConfig)}
          />

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
              shared={true}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
          )}

          {shouldShowLegend && (
            <Legend
              content={props => (
                <ChartLegend
                  selectedRegions={selectedRegions}
                  onLegendClick={onLegendClick}
                  legendPosition={legendPosition}
                  payload={(props?.payload ?? []).map(item => ({
                    value: item.value || "",
                    color: item.color || "#000",
                    dataKey: item.dataKey?.toString(),
                  }))}
                  legendtype={legendtype}
                  availableRegions={availableRegions}
                />
              )}
              wrapperStyle={{
                ...getLegendPopupStyle(legendPosition || "top"),
              }}
            />
          )}

          {dataKeys.map((dataKey, index) => {
            const isVisible = selectedRegions.includes(dataKey);

            return (
              <Bar
                key={dataKey}
                dataKey={dataKey}
                name={dataKey}
                fill={chartColors?.[index % chartColors?.length]}
                onClick={onChartClick}
                isAnimationActive={true}
                hide={!isVisible}
                stackId={isStacked && isVisible ? "stack" : undefined}
              >
                {showValues && (
                  <LabelList
                    dataKey={dataKey}
                    position={isStacked ? "center" : isBarChart ? "right" : "top"}
                    formatter={formatValue}
                  />
                )}
              </Bar>
            );
          })}
        </BarChart>
      </ResponsiveContainer>
    );
  }
);
