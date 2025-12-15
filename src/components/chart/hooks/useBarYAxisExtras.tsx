import React, { useMemo } from "react";
import type { YAxisProps } from "recharts";

interface UseBarYAxisExtrasOptions {
  type: string;
  chartWidth?: number;
  yAxisWidthRatio?: number;
}

export function useBarYAxisExtras(
  typeOrOptions: string | UseBarYAxisExtrasOptions
): Partial<YAxisProps> {
  const options: UseBarYAxisExtrasOptions =
    typeof typeOrOptions === "string" ? { type: typeOrOptions } : typeOrOptions;
  const { type, chartWidth = 0, yAxisWidthRatio = 0.15 } = options;

  return useMemo<Partial<YAxisProps>>(() => {
    if (type !== "Bar") {
      return {};
    }
    const tickFontSize = 12;
    const avgCharWidth = 7;
    const calculateMaxChars = (): number => {
      const availableWidth = chartWidth * yAxisWidthRatio;
      const maxChars = Math.floor(availableWidth / avgCharWidth);
      return Math.max(5, Math.min(30, maxChars));
    };
    const maxChars = calculateMaxChars();
    const YTick: React.FC<any> = ({ x, y, payload }: any) => {
      const full = String(payload?.value ?? "");
      const text = full.length > maxChars ? full.slice(0, maxChars - 1) + "…" : full;
      return (
        <g transform={`translate(${x},${y})`}>
          <text dy={4} textAnchor="end" fontSize={tickFontSize} fill="currentColor">
            <title>{full}</title>
            {text}
          </text>
        </g>
      );
    };

    return {
      tick: <YTick />,
    };
  }, [type, chartWidth, yAxisWidthRatio]);
}
