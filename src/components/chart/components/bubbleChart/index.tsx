import React, { useMemo } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";
import { ChartTooltip } from "../chartTooltip";
import { ChartLegend } from "../chartLegend";
import { getLegendPopupStyle } from "../../utils";
import { BubbleChartProps } from "./props";

// Define valid scatter shapes
const VALID_SHAPES = ["circle", "diamond", "square", "triangle"] as const;
type ValidShape = (typeof VALID_SHAPES)[number];

export const BubbleChart: React.FC<BubbleChartProps> = props => {
  const {
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
    onLegendClick,
    onChartClick,
    tooltips = true,
    shape = "circle",
  } = props;
  const calculateDomain = () => {
    const allValues = data.flatMap(item =>
      dataKeys.map(key => item[`${key}_size`] || item[key] || 0)
    );
    return [0, Math.max(...allValues)];
  };

  const domain = calculateDomain();
  const range: [number, number] = [16, 225]; // Min and max bubble sizes

  // Function to get a random shape
  const getRandomShape = (): ValidShape => {
    const randomIndex = Math.floor(Math.random() * VALID_SHAPES.length);
    return VALID_SHAPES[randomIndex];
  };

  // Memoize random shapes for each data point to maintain consistency during rerenders
  const randomShapes = useMemo(() => {
    if (shape !== "random") return {};
    return data.reduce(
      (acc, _, index) => {
        acc[index] = getRandomShape();
        return acc;
      },
      {} as Record<number, ValidShape>
    );
  }, [data.length, shape]);

  // Modified xAxis config to handle string values
  // For bubble charts, x values are numeric indices (0, 1, 2...) with labels stored in xDataKeyArr
  const modifiedXAxisConfig = {
    ...xAxisConfig,
    // Explicitly set ticks to only appear at valid data indices
    ticks: xDataKeyArr && xDataKeyArr.length > 0 ? xDataKeyArr.map((_, i) => i) : undefined,
    tickFormatter: (value: any, index: number) => {
      // Use the value (x coordinate = data index) to look up the label, not the tick index
      const dataIndex = Math.round(value);
      if (
        xDataKeyArr &&
        Number.isInteger(dataIndex) &&
        dataIndex >= 0 &&
        dataIndex < xDataKeyArr.length &&
        xDataKeyArr[dataIndex] !== undefined
      ) {
        const label = xDataKeyArr[dataIndex];
        // Truncate long labels
        return typeof label === "string" && label.length > 20
          ? label.substring(0, 17) + "..."
          : label;
      }
      // Fallback to original formatter
      return xAxisConfig.tickFormatter ? xAxisConfig.tickFormatter(value, index) : value;
    },
  };

  const commonChartElements = (
    <>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" dataKey="x" name="X" {...modifiedXAxisConfig} />
      <YAxis type="number" dataKey="y" name="Y" {...yAxisConfig} />
      <ZAxis type="number" dataKey="z" domain={domain} range={range} />
      {tooltips && (
        <RechartsTooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;

            // Get the x value and its corresponding label
            const xValue = payload[0].payload.x;
            const xLabel = xDataKeyArr[xValue] || xValue;

            // Create transformed payload for each series
            const transformedPayload = dataKeys
              .filter(key => selectedRegions.includes(key))
              .map((dataKey, index) => {
                const seriesPayload = payload.find(
                  p => p.payload.seriesName === dataKey && p.payload.x === xValue
                );

                if (!seriesPayload) return null;

                return {
                  name: dataKey,
                  value: Number(seriesPayload.payload.y) || 0,
                  color: chartColors?.[index % (chartColors?.length || 1)] || "#8884d8",
                  dataKey: dataKey,
                };
              })
              .filter(
                (item): item is { name: string; value: number; color: string; dataKey: string } =>
                  item !== null
              );

            return (
              <ChartTooltip
                active={active}
                payload={transformedPayload}
                label={xLabel}
                xDataKeyArr={xDataKeyArr}
                numberFormat={numberFormat}
              />
            );
          }}
          cursor={{ strokeDasharray: "3 3" }}
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
              position={legendPosition}
            />
          )}
          wrapperStyle={{
            ...getLegendPopupStyle(legendPosition),
          }}
        />
      )}
    </>
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        margin={margin}
        style={{
          transform: `translate(calc(${props.offsetleft ?? 0}px - ${props.offsetright ?? 0}px), calc(${props.offsettop ?? 0}px - ${props.offsetbottom ?? 0}px))`,
        }}
      >
        {commonChartElements}
        {dataKeys.map((dataKey, index) => {
          const color = chartColors?.[index % (chartColors?.length || 1)] || "#8884d8";
          const seriesData = selectedRegions.includes(dataKey)
            ? data.map((item, itemIndex) => ({
                x: item.x,
                y: item[dataKey],
                z: item[`${dataKey}_size`],
                color,
                seriesName: dataKey,
                dataKey,
                shape: shape === "random" ? randomShapes[itemIndex] : shape,
              }))
            : [];

          return (
            <Scatter
              key={dataKey}
              name={dataKey}
              data={seriesData}
              fill={color}
              onClick={(data, event: any) => onChartClick(data, index, event)}
              shape={shape === "random" ? seriesData[0]?.shape || "circle" : shape}
            />
          );
        })}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
