import React, { useMemo } from "react";
import { XAxisProps } from "recharts";
import { formatNumber } from "../utils";

type UseXAxisConfigParams = {
  type: string;
  processedData: any[];
  xDataKeyArr: any[];
  chartContainerRef: React.RefObject<HTMLDivElement | null>;
  getDefaultXAxisLabel: () => string;
  xnumberformat?: string;
  showxaxis: boolean;
  xaxislabeldistance: number;
};

export function useXAxisConfig({
  type,
  processedData,
  xDataKeyArr,
  chartContainerRef,
  getDefaultXAxisLabel,
  xnumberformat,
  showxaxis,
  xaxislabeldistance,
}: UseXAxisConfigParams): XAxisProps {
  const xAxisConfig = useMemo<XAxisProps>(() => {
    const tickFontSize = 12;
    const numTicks =
      type === "Bar"
        ? 5
        : Math.max(1, (processedData && processedData.length) || xDataKeyArr.length || 1);
    const containerWidth = chartContainerRef.current?.clientWidth || 300;
    const maxWidthPx = Math.max(40, Math.floor((containerWidth - 60) / numTicks));
    const approxCharWidth = tickFontSize * 0.8; // heuristic for average character width
    const maxChars = Math.max(3, Math.floor(maxWidthPx / approxCharWidth));

    // Estimate overlap risk from actual labels we will render
    const rawLabels: any[] = (processedData || []).map((d: any) => d?.x);
    const displayLabels: string[] =
      rawLabels.length > 0
        ? rawLabels.map((val: any, idx: number) => {
            let v: any = val;
            if (xnumberformat && typeof v === "number") {
              v = formatNumber(v, xnumberformat);
            } else if (xDataKeyArr.length > 0 && xDataKeyArr[idx] !== undefined) {
              v = xDataKeyArr[idx];
            }
            return String(v ?? "");
          })
        : (xDataKeyArr || []).map(v => String(v ?? ""));
    const maxLabelChars = displayLabels.length ? Math.max(...displayLabels.map(s => s.length)) : 0;
    const mayOverlap = maxLabelChars * approxCharWidth > maxWidthPx;
    const shouldStagger = type !== "Bar" && mayOverlap;

    const XAxisTickWithTooltip: React.FC<any> = ({ x, y, payload, index }: any) => {
      const rawValue = payload?.value;
      // Preserve existing mapping/formatting behavior
      let displayValue: any = rawValue;
      if (xnumberformat && typeof rawValue === "number") {
        displayValue = formatNumber(rawValue, xnumberformat);
      } else if (
        xDataKeyArr.length > 0 &&
        typeof index === "number" &&
        xDataKeyArr[index] !== undefined
      ) {
        displayValue = xDataKeyArr[index];
      }
      const fullText = String(displayValue ?? "");
      const needsEllipsis = fullText.length > maxChars;
      const truncatedText = needsEllipsis
        ? fullText.slice(0, Math.max(0, maxChars - 1)) + "…"
        : fullText;

      const textAnchor = "middle";
      return (
        <g transform={`translate(${x},${y})`}>
          <text textAnchor={textAnchor} fontSize={tickFontSize} fill="currentColor">
            <title>{fullText}</title>
            {truncatedText}
          </text>
        </g>
      );
    };

    return {
      hide: !showxaxis,
      label: {
        // value: getDefaultXAxisLabel(),
        position: "insideBottom",
        offset: xaxislabeldistance,
        fill: "#000",
      },
      // Ensure all x-axis labels render
      interval: 0,
      // Provide extra space only when staggering is needed
      height: type === "Bar" ? undefined : shouldStagger ? 40 : undefined,
      tickMargin: 8,
      // Custom tick that truncates with ellipsis and shows full text in native tooltip
      tick: <XAxisTickWithTooltip />,
    } as XAxisProps;
  }, [
    type,
    processedData,
    xDataKeyArr,
    chartContainerRef.current?.clientWidth,
    getDefaultXAxisLabel,
    xnumberformat,
    showxaxis,
    xaxislabeldistance,
  ]);

  return xAxisConfig;
}
