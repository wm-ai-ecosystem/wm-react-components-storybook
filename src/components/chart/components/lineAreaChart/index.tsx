import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import { ChartLegend } from "../chartLegend";
import { getLegendPopupStyle } from "../../utils";
import { LineAreaChartProps } from "./props";

export const LineAreaChart: React.FC<LineAreaChartProps> = ({
  type,
  data,
  dataKeys,
  selectedRegions,
  chartColors,
  margin,
  showLegend,
  legendPosition,
  xAxisConfig,
  yAxisConfig,
  numberFormat,
  xDataKeyArr,
  interpolation,
  strokeWidth,
  pointSize,
  areaViewType = "none",
  onChartClick,
  onLegendClick,
  tooltips = true,
  legendtype,
  availableRegions,
}) => {
  const commonProps = {
    data,
    margin,
  };

  const commonChartElements = (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis {...xAxisConfig} />
      <YAxis {...yAxisConfig} />
      {tooltips && (
        <RechartsTooltip
          content={({ active, payload, label }) => {
            return (
              <ChartTooltip
                active={active}
                payload={payload}
                label={label}
                xDataKeyArr={xDataKeyArr}
                numberFormat={numberFormat}
              />
            );
          }}
          wrapperStyle={{ zIndex: 9999 }}
        />
      )}

      {showLegend && (
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
              chartColors={chartColors}
            />
          )}
          wrapperStyle={{
            ...getLegendPopupStyle(legendPosition),
          }}
        />
      )}
    </>
  );

  const getInterpolationType = useMemo(() => {
    switch (interpolation) {
      case "cardinal":
        return "monotone";
      case "step":
        return "step";
      default:
        return "linear";
    }
  }, [interpolation]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      {type === "Line" ? (
        <LineChart {...commonProps}>
          {commonChartElements}
          {dataKeys.map((dataKey, index) => (
            <Line
              key={dataKey}
              type={getInterpolationType}
              dataKey={dataKey}
              name={dataKey}
              stroke={chartColors?.[index % chartColors?.length]}
              strokeWidth={strokeWidth}
              dot={{
                r: pointSize,
                strokeWidth: 1,
                fill: chartColors?.[index % chartColors?.length],
                onClick: onChartClick,
              }}
              onClick={onChartClick}
              isAnimationActive={true}
              hide={!selectedRegions.includes(dataKey)}
            />
          ))}
        </LineChart>
      ) : (
        <AreaChart {...commonProps} stackOffset={areaViewType}>
          {commonChartElements}
          {dataKeys.map((dataKey, index) => (
            <Area
              key={dataKey}
              type={getInterpolationType}
              dataKey={dataKey}
              name={dataKey}
              stroke={chartColors?.[index % chartColors?.length]}
              fill={chartColors?.[index % chartColors?.length]}
              fillOpacity={0.6}
              dot={{
                r: pointSize,
                strokeWidth: 1,
                fill: chartColors?.[index % chartColors?.length],
                onClick: onChartClick,
              }}
              isAnimationActive={true}
              hide={!selectedRegions.includes(dataKey)}
            />
          ))}
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};
