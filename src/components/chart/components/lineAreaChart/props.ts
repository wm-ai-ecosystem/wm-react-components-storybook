import { DotProps } from "recharts";
import { TChartInterpolation, TChartLegendPosition, TChartLegendType } from "../../props";
import { StackOffsetType } from "recharts/types/util/types";

export interface LineAreaChartProps {
  offsettop?: number;
  offsetbottom?: number;
  offsetleft?: number;
  offsetright?: number;
  type: "Line" | "Area";
  data: any[];
  dataKeys: string[];
  selectedRegions: string[];
  chartColors?: string[];
  margin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  showLegend: boolean;
  legendPosition: TChartLegendPosition;
  xAxisConfig: any;
  yAxisConfig: any;
  numberFormat: string;
  xDataKeyArr: string[];
  interpolation: TChartInterpolation;
  strokeWidth: number;
  pointSize: number;
  areaViewType?: StackOffsetType;
  tooltips?: boolean;
  legendtype?: TChartLegendType;
  availableRegions?: string[];
  onChartClick: (data: any, event: any) => void;
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  onAreaSelect?: (dotProp: DotProps, series: any) => void;
}
