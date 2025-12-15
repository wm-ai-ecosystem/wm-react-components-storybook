import {
  TChartLegendPosition,
  TChartLegendType,
  TChartShowValues,
  TChartValuesDisplay,
} from "../../props";

export interface PieDonutChartProps {
  type: "Pie" | "Donut";
  data: any[];
  dataKeys: string[];
  selectedRegions: string[];
  chartColors: string[];
  margin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  showlabels: TChartShowValues;
  labeltype: TChartValuesDisplay;
  tooltips: boolean;
  legendPosition: TChartLegendPosition;
  legendtype: TChartLegendType;
  availableRegions: string[];
  donutratio?: string;
  ynumberformat?: string;
  centerlabel?: string;
  shouldShowLegend: boolean;
  onChartClick: (data: any, index: any, event: any) => void;
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  showLegend: boolean;
  xDataKeyArr: string[];
  numberFormat: string;
}
