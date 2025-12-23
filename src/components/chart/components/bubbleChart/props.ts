import { TBubbleChartShape } from "../../props";
import { ScatterCustomizedShape } from "recharts/types/cartesian/Scatter";

export interface BubbleChartProps {
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
  showLegend: boolean;
  legendPosition: "top" | "bottom" | "right";
  xAxisConfig: any;
  yAxisConfig: any;
  numberFormat: string;
  xDataKeyArr: string[];
  onLegendClick: (region: string, e: React.MouseEvent) => void;
  tooltips?: boolean;
  onChartClick: (data: any, index: number, event: React.MouseEvent) => void;
  shape?: TBubbleChartShape | ScatterCustomizedShape;
}
