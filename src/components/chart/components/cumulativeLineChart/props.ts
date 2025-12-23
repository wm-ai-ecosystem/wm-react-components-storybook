import { TChartInterpolation, TChartLegendPosition, TChartLegendType } from "../../props";

export interface CumulativeLineChartProps {
  offsettop?: number;
  offsetbottom?: number;
  offsetleft?: number;
  offsetright?: number;
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
  xAxisConfig: any;
  yAxisConfig: any;
  numberFormat: string;
  xDataKeyArr: string[];
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  tooltips?: boolean;
  interpolation: TChartInterpolation;
  strokeWidth: number;
  pointSize: number;
  onChartClick: (data: any, event: any) => void;
  showLegend: boolean;
  legendPosition: TChartLegendPosition;
  legendtype?: TChartLegendType;
  availableRegions?: string[];
}
