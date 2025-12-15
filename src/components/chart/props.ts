import { BaseProps } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import { StackOffsetType } from "recharts/types/util/types";

// COMPLETE Type definitions from Angular
interface SeriesData {
  values: ChartDataPoint[];
  key: string;
}

interface ChartDataPoint {
  x: string | number;
  y: number;
  size?: number;
  shape?: string;
  _dataObj?: any;
}

export type TChartType =
  | "Line"
  | "Bar"
  | "Column"
  | "Pie"
  | "Donut"
  | "Bubble"
  | "Area"
  | "Cumulative Line";

export type TChartLegendPosition = "top" | "bottom" | "right" | "hide";

export type TChartLegendType = "classic" | "furious";

export type TBubbleChartShape =
  | "circle"
  | "cross"
  | "diamond"
  | "square"
  | "triangle-up"
  | "triangle-down"
  | "random";

export type TChartInterpolation = "linear" | "step" | "cardinal";

export type TChartViewType = "Stacked" | "Grouped";

export type TChartShowValues = "hide" | "inside" | "outside";

export type TChartValuesDisplay = "key" | "percent" | "value" | "key-value";

type ChartData = ChartDataPoint[] | SeriesData[];

export interface WmChartProps extends BaseProps {
  title?: string;
  type: string;
  subheading?: string;
  datavalue?: string;
  groupby?: string;
  aggregation?: string;
  aggregationcolumn?: string;
  orderby?: string;
  xaxisdatakey?: string;
  xaxislabel?: string;
  xnumberformat?: string;
  xdigits?: number;
  xdateformat?: string;
  xaxislabeldistance?: number;
  xunits?: string;
  yaxisdatakey?: string;
  yaxislabel?: string;
  ynumberformat?: string;
  ydigits?: number;
  yaxislabeldistance?: number;
  yunits?: string;
  iconclass?: string;
  nodatamessage?: string;
  loadingdatamsg?: string;
  tooltips?: boolean;
  showlegend?: string;
  showlabels?: TChartShowValues;
  showlabelsoutside?: boolean;
  showvalues?: boolean;
  staggerlabels?: boolean;
  reducexticks?: boolean;
  labeltype?: TChartValuesDisplay;
  barspacing?: string;
  donutratio?: string;
  bubblesize?: string;
  showxdistance?: boolean;
  showydistance?: boolean;
  areaviewtype?: StackOffsetType;
  interpolation?: TChartInterpolation;
  centerlabel?: string;
  customcolors?: string[];
  theme?: string;
  offset?: number;
  offsettop?: number;
  offsetbottom?: number;
  offsetright?: number;
  offsetleft?: number;
  showxaxis?: boolean;
  showyaxis?: boolean;
  linethickness?: string;
  highlightpoints?: boolean;
  formattype?: string;
  dataset?: any;
  datasource?: any;
  width?: string;
  height?: string;
  shape?: TBubbleChartShape;
  deferload?: boolean;
  onSelect?: (
    event: React.MouseEvent,
    widget: any,
    selectedItem: any,
    selectedChartItem: any
  ) => void;
  onTransform?: (event: React.MouseEvent, widget: any) => any;
  onBeforerender?: (widget: any, chartInstance: any) => any;
  xdomain?: string;
  ydomain?: string;
  labelthreshold?: number;
  legendtype?: TChartLegendType;
  viewtype?: TChartViewType;
  fontsize?: string;
  fontunit?: string;
  color?: string;
  fontfamily?: string;
  fontweight?: string;
  fontstyle?: string;
  textdecoration?: string;
  class?: string;
  show?: boolean;
  styles?: React.CSSProperties;
}
