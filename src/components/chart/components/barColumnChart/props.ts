import { TChartLegendType, TChartViewType } from "../../props";

export interface BarColumnChartProps {
  offsettop?: number;
  offsetbottom?: number;
  offsetleft?: number;
  offsetright?: number;
  type: "Bar" | "Column";
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
  barSpacing?: string;
  showValues?: boolean;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "right";
  xAxisConfig: any;
  yAxisConfig: any;
  numberFormat: string;
  xDataKeyArr: string[];
  onChartClick: (data: any, event: any) => void;
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  tooltips?: boolean;
  showlegend?: boolean;
  legendtype?: TChartLegendType;
  availableRegions?: string[];
  viewtype?: TChartViewType;
  shouldShowLegend?: boolean;
}
