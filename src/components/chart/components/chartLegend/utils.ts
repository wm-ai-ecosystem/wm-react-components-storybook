import { LegendPayload } from "recharts";

export interface LegendItem {
  value: string;
  color: string;
  dataKey?: string;
}

export const mapLegendItems = (
  availableRegions: string[] | undefined,
  payload: LegendPayload[] | undefined,
  chartColors: string[] | undefined
): LegendItem[] => {
  if (!availableRegions?.length || (payload?.length ?? 0) > (availableRegions?.length ?? 0)) {
    return (payload || []).map(item => ({
      value: item.value || "",
      color: item.color || "#000",
      dataKey: item.dataKey?.toString(),
    }));
  }

  return availableRegions.map((region, idx) => {
    // Default color from the chart colors array
    const defaultColor = chartColors?.[idx % (chartColors?.length || 1)] || "#000";

    // Try to find matching color from payload
    const matchingPayloadItem = Array.isArray(payload)
      ? payload.find(entry => entry.value === region)
      : null;

    return {
      value: region,
      color: matchingPayloadItem?.color || defaultColor,
    };
  });
};
