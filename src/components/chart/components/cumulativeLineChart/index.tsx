import React, { useMemo } from "react";
import {
  LineChart,
  Line,
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
import { CumulativeLineChartProps } from "./props";
import { calculateCumulativeData } from "./utils";

export const CumulativeLineChart: React.FC<CumulativeLineChartProps> = ({
  data,
  dataKeys,
  selectedRegions,
  chartColors,
  margin,
  xAxisConfig,
  yAxisConfig,
  numberFormat,
  xDataKeyArr,
  onLegendClick,
  tooltips = true,
  interpolation,
  strokeWidth,
  pointSize,
  onChartClick,
  showLegend,
  legendPosition,
  legendtype,
  availableRegions,
}) => {
  const cumulativeData = useMemo(() => calculateCumulativeData(data, dataKeys), [data, dataKeys]);

  const commonProps = {
    data: cumulativeData,
    margin,
  };

  const commonChartElements = (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis {...xAxisConfig} />
      <YAxis {...yAxisConfig} />
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

      {showLegend && (
        <Legend
          content={props => (
            <ChartLegend
              {...(props as any)}
              selectedRegions={selectedRegions}
              onLegendClick={onLegendClick}
              legendPosition={legendPosition}
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
            activeDot={false}
            onClick={onChartClick}
            isAnimationActive={true}
            hide={!selectedRegions.includes(dataKey)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
