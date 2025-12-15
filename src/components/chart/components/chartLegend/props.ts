import { TChartLegendPosition, TChartLegendType } from "../../props";
import { LegendProps } from "recharts";

export interface ChartLegendProps extends Omit<LegendProps, "payload"> {
  payload?: Array<{
    value: string;
    color: string;
    dataKey?: string;
  }>;
  selectedRegions: string[];
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  legendPosition: TChartLegendPosition;
  availableRegions?: string[];
  legendtype?: TChartLegendType;
  chartColors?: string[];
}
