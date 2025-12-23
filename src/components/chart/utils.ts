//utils.ts

import forEach from "lodash-es/forEach";
import includes from "lodash-es/includes";
import split from "lodash-es/split";
import invert from "lodash-es/invert";
import isArray from "lodash-es/isArray";

import moment from "moment-timezone";
import { TBubbleChartShape, TChartLegendPosition } from "./props";

// Constants - COMPLETE from Angular
const chartTypes = ["Column", "Line", "Area", "Cumulative Line", "Bar", "Pie", "Donut", "Bubble"];
export const allShapes: TBubbleChartShape[] = [
  "circle",
  "square",
  "diamond",
  "cross",
  "triangle-up",
  "triangle-down",
];

const getCurrentAndPreviousYears = (numberOfYears = 3): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: numberOfYears }, (_, index) => {
    const year = currentYear - (numberOfYears - 1) + index;
    return `01/01/${year}`;
  });
};

const dateList = getCurrentAndPreviousYears();
// This will generate dates like ['01/01/2022', '01/01/2023', '01/01/2024'] if current year is 2024

const dataTypeJSON = ["Column", "Line", "Pie", "Bar", "Donut", "Bubble"];
const lineTypeCharts = ["Line", "Area", "Cumulative Line"];
const dataTypeArray = ["Cumulative Line", "Area"];

export const SAMPLE_DATA = {
  group1: "Europe",
  group2: "Asia",
  group3: "America",
  group4: "Australia",
};

export const NONE = "none";

const barSpacingMap = {
  small: 0.3,
  medium: 0.5,
  large: 0.8,
};

const barCategorySpacingPercentage = {
  0.3: "10%",
  0.5: "20%",
  0.8: "30%",
};

const donutRatioMap = {
  small: 0.3,
  medium: 0.6,
  large: 0.7,
};

const barSpacingMapInvert = invert(barSpacingMap);
const donutRatioMapInvert = invert(donutRatioMap);

const tickformats = {
  Thousand: {
    prefix: "K",
    divider: 1000,
  },
  Million: {
    prefix: "M",
    divider: 1000000,
  },
  Billion: {
    prefix: "B",
    divider: 1000000000,
  },
};

const aggregationFnMap = {
  average: "AVG",
  count: "COUNT",
  maximum: "MAX",
  minimum: "MIN",
  sum: "SUM",
};

const advanceDataProps = ["aggregation", "aggregationcolumn", "groupby", "orderby"];

// Chart type utility functions - COMPLETE from Angular
export const isPieChart = (type: string) => type === "Pie";
export const isLineChart = (type: string) => type === "Line";
export const isBarChart = (type: string) => type === "Bar";
export const isDonutChart = (type: string) => type === "Donut";
export const isBubbleChart = (type: string) => type === "Bubble";
export const isColumnChart = (type: string) => type === "Column";
export const isAreaChart = (type: string) => type === "Area";
export const isCumulativeLineChart = (type: string) => type === "Cumulative Line";
export const isPieType = (type: string) => isPieChart(type) || isDonutChart(type);
export const isChartDataJSON = (type: string) =>
  includes(dataTypeJSON, type) || !includes(chartTypes, type);
export const isChartDataArray = (type: string) => includes(dataTypeArray, type);
export const isLineTypeChart = (type: string) => includes(lineTypeCharts, type);
export const isAxisDomainSupported = (type: string) => isColumnChart(type) || isAreaChart(type);

// Enhanced number type checking to match Angular implementation
export const isNumberType = (type: string) => {
  const numberTypes = [
    "number",
    "integer",
    "float",
    "double",
    "long",
    "short",
    "byte",
    "decimal",
    "bigdecimal",
    "biginteger",
    "int",
    "Number",
  ];
  return numberTypes.includes(type?.toLowerCase());
};

// Helper functions - COMPLETE from Angular
export const isShowLegend = (value: any) => {
  if (value === "false" || value === false) {
    return false;
  }
  if (value === "true" || value === true) {
    return true;
  }
  return value === "hide" ? false : true;
};

export const triggerFn = (callback?: Function) => {
  if (typeof callback === "function") {
    callback();
  }
};

const getClonedObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const prettifyLabels = (label: string) => {
  if (!label) return "";
  return label.replace(/^./, str => str.toUpperCase()).trim();
};

// COMPLETE constructSampleData function from Angular
const constructSampleData = (dataType: string, yaxisLength: number, shape?: string) => {
  let first_series: any[] = [];
  let second_series: any[] = [];
  let third_series: any[] = [];
  let first_series_array: any[] = [];
  let second_series_array: any[] = [];
  let third_series_array: any[] = [];
  let first_series_bubble: any[] = [];
  let second_series_bubble: any[] = [];
  let third_series_bubble: any[] = [];
  let data: any[] = [];

  switch (dataType) {
    case "jsonFormat":
      first_series = [
        { x: "01/01/2001", y: 4000000 },
        { x: "01/01/2002", y: 1000000 },
        { x: "01/01/2003", y: 5000000 },
      ];
      second_series = [
        { x: "01/01/2001", y: 3000000 },
        { x: "01/01/2002", y: 4000000 },
        { x: "01/01/2003", y: 7000000 },
      ];
      third_series = [
        { x: "01/01/2001", y: 2000000 },
        { x: "01/01/2002", y: 8000000 },
        { x: "01/01/2003", y: 6000000 },
      ];
      data[0] = {
        values: first_series,
        key: SAMPLE_DATA.group1,
      };
      if (yaxisLength >= 2) {
        data[1] = {
          values: second_series,
          key: SAMPLE_DATA.group2,
        };
      }
      if (yaxisLength >= 3) {
        data[2] = {
          values: third_series,
          key: SAMPLE_DATA.group3,
        };
      }
      break;

    case "lineChartFormat":
      first_series = [
        { x: 1, y: 4000000 },
        { x: 2, y: 1000000 },
        { x: 3, y: 5000000 },
      ];
      second_series = [
        { x: 1, y: 3000000 },
        { x: 2, y: 4000000 },
        { x: 3, y: 7000000 },
      ];
      third_series = [
        { x: 1, y: 2000000 },
        { x: 2, y: 8000000 },
        { x: 3, y: 6000000 },
      ];
      data[0] = {
        values: first_series,
        key: SAMPLE_DATA.group1,
      };
      if (yaxisLength >= 2) {
        data[1] = {
          values: second_series,
          key: SAMPLE_DATA.group2,
        };
      }
      if (yaxisLength >= 3) {
        data[2] = {
          values: third_series,
          key: SAMPLE_DATA.group3,
        };
      }
      break;

    case "arrayFormat":
      first_series_array = [
        [1, 4000000],
        [2, 1000000],
        [3, 5000000],
      ];
      second_series_array = [
        [1, 3000000],
        [2, 4000000],
        [3, 7000000],
      ];
      third_series_array = [
        [1, 2000000],
        [2, 8000000],
        [3, 6000000],
      ];
      data[0] = {
        values: first_series_array,
        key: SAMPLE_DATA.group1,
      };
      if (yaxisLength >= 2) {
        data[1] = {
          values: second_series_array,
          key: SAMPLE_DATA.group2,
        };
      }
      if (yaxisLength >= 3) {
        data[2] = {
          values: third_series_array,
          key: SAMPLE_DATA.group3,
        };
      }
      break;

    case "bubbleFormat":
      shape = shape === "random" ? allShapes[Math.floor(Math.random() * allShapes.length)] : shape;
      first_series_bubble = [
        { x: 80.66, y: 33739900, size: 78, shape: shape },
        { x: 79.84, y: 81902300, size: 90, shape: shape },
        { x: 78.6, y: 5523100, size: 45, shape: shape },
      ];
      second_series_bubble = [
        { x: 72.73, y: 79716200, size: 98, shape: shape },
        { x: 80.05, y: 61801600, size: 20, shape: shape },
        { x: 72.49, y: 73137200, size: 34, shape: shape },
      ];
      third_series_bubble = [
        { x: 68.09, y: 33739900, size: 45, shape: shape },
        { x: 81.55, y: 7485600, size: 78, shape: shape },
        { x: 68.6, y: 141850000, size: 56, shape: shape },
      ];
      data[0] = {
        values: first_series_bubble,
        key: SAMPLE_DATA.group1,
      };
      if (yaxisLength >= 2) {
        data[1] = {
          values: second_series_bubble,
          key: SAMPLE_DATA.group2,
        };
      }
      if (yaxisLength >= 3) {
        data[2] = {
          values: third_series_bubble,
          key: SAMPLE_DATA.group3,
        };
      }
      break;

    case "pieChartFormat":
      data = [
        { x: SAMPLE_DATA.group1, y: 1000000 },
        { x: SAMPLE_DATA.group2, y: 2000000 },
        { x: SAMPLE_DATA.group3, y: 3000000 },
        { x: SAMPLE_DATA.group4, y: 4000000 },
      ];
      break;
  }

  // Ensure every point carries an _dataObj reference like real datasets -----------------
  if (Array.isArray(data)) {
    if (data.length && (data[0] as any)?.values) {
      // Series-based sample (Column/Line/Area/Bar/Bubble etc.)
      data.forEach(series => {
        if (Array.isArray(series.values)) {
          series.values = series.values.map((pt: any) => {
            // Skip array-format points ([x,y]) – they aren't objects
            if (Array.isArray(pt)) return pt;
            return { ...pt, _dataObj: pt._dataObj || { ...pt } };
          });
        }
      });
    } else {
      // Flat array (Pie/Donut sample)
      data = data.map((pt: any) => ({ ...pt, _dataObj: pt._dataObj || { ...pt } }));
    }
  }

  return data;
};

const getDataType = (widgetContext: any) => {
  const type = widgetContext.type;
  if (isPieType(type)) {
    return "pieChartFormat";
  }
  if (isBubbleChart(type)) {
    return "bubbleFormat";
  }
  return isChartDataJSON(type) ? "jsonFormat" : "arrayFormat";
};

export const getSampleData = (widgetContext: any) =>
  constructSampleData(
    getDataType(widgetContext),
    split(widgetContext.yaxisdatakey || "", ",").length,
    widgetContext.shape
  );

// Enhanced formatNumber function - Fixed NaN issue (BUG FIX 7)
export const formatNumber = (value: number, format?: string): string => {
  // Handle NaN and invalid values
  if (!value && value !== 0) return "";
  if (isNaN(value) || !isFinite(value)) return "";

  let formattedData: string;
  let divider: number;
  let prefix: string;

  if (format) {
    try {
      if (format === "Thousand" || format === "Million" || format === "Billion") {
        divider = tickformats[format as keyof typeof tickformats]?.divider || 1;
        prefix = tickformats[format as keyof typeof tickformats]?.prefix || "";

        if (divider > 1) {
          const result = value / divider;
          formattedData = `${result.toFixed(2)}${prefix}`;
        } else {
          formattedData = value.toString();
        }
      } else if (format === "%") {
        formattedData = `${(value * 100).toFixed(2)}%`;
      } else if (format === ".f") {
        formattedData = value.toFixed(2);
      } else {
        formattedData = value.toString();
      }
    } catch (e) {
      formattedData = value.toString();
    }
  } else {
    // Auto formatting when no format option is chosen
    if (value >= 1000000000) {
      formattedData = `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      formattedData = `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      formattedData = `${(value / 1000).toFixed(1)}K`;
    } else {
      formattedData = value.toString();
    }
  }

  return removeTrailingZeros(formattedData);
};

// Remove trailing zeros function
const removeTrailingZeros = (value: string): string => {
  if (!value) {
    return value;
  }

  // Remove trailing zeros after decimal point
  return value.replace(/\.0+([A-Za-z]*)$/, "$1").replace(/\.([1-9]+)0+([A-Za-z]*)$/, ".$1$2");
};

// COMPLETE formatDate function from Angular
const formatDate = (date: string | Date, format?: string): string => {
  if (!date) return "";

  try {
    const momentDate = moment(date);
    if (!momentDate.isValid()) return "";

    if (format) {
      return momentDate.format(format);
    }
    return momentDate.format("MM/DD/YYYY");
  } catch (e) {
    return "";
  }
};

// COMPLETE helper functions from Angular
export const getLodashOrderByFormat = (orderby: string) => {
  let columns;
  const orderByColumns: string[] = [];
  const orders: string[] = [];

  forEach(split(orderby, ","), function (col: string) {
    columns = split(col, ":");
    orderByColumns.push(columns[0]);
    orders.push(columns[1]);
  });

  return {
    columns: orderByColumns,
    orders: orders,
  };
};

export const getBarSpacingValue = (value: string, prop: string) => {
  if (!isNaN(+value)) {
    if (Number.isFinite(+value)) {
      return (
        barCategorySpacingPercentage[+value as keyof typeof barCategorySpacingPercentage] ??
        +value * 100
      );
    }
  }
  if (prop === "value") {
    return barSpacingMap[value as keyof typeof barSpacingMap];
  }
  if (prop === "key") {
    return barSpacingMapInvert[value as keyof typeof barSpacingMapInvert];
  }
};

export const getRadiusValue = (value: string, prop: string) => {
  if (prop === "value") {
    return donutRatioMap[value as keyof typeof donutRatioMap];
  }
  if (prop === "key") {
    return donutRatioMapInvert[value as keyof typeof donutRatioMapInvert];
  }
};

const getLabelValues = (showlabels: string, showlabelsoutside: boolean) => {
  const labelsConfig: any = {};
  switch (showlabels) {
    case "hide":
      labelsConfig.showlabels = false;
      break;
    case "inside":
      labelsConfig.showlabels = true;
      labelsConfig.showlabelsoutside = false;
      break;
    case "outside":
      labelsConfig.showlabels = true;
      labelsConfig.showlabelsoutside = true;
      break;
  }
  return labelsConfig;
};

const isAxisDomainValid = (widgetContext: any, axis: string) => {
  if (widgetContext[axis + "domain"] === "Min" && isAxisDomainSupported(widgetContext.type)) {
    return true;
  }
  return false;
};

// Enhanced convertToRechartsFormat function - FIXED to handle proper data conversion
export const convertToRechartsFormat = (data: any[], type: string): any[] => {
  if (!data || data.length === 0) return [];

  if (isPieType(type)) {
    return data.map(item => ({
      name: item.x,
      value: item.y,
      _dataObj: item._dataObj,
    }));
  }

  // For other chart types
  if (isArray(data[0]?.values)) {
    const result: any[] = [];
    const xValuesSet = new Set<string | number>();

    // Collect all unique x values
    data.forEach(series => {
      if (series.values) {
        series.values.forEach((point: any) => {
          const xValue = isChartDataJSON(type) ? point.x : point[0];
          xValuesSet.add(xValue);
        });
      }
    });

    // Create data points for each x value in the preserved order
    Array.from(xValuesSet).forEach(x => {
      const resultPoint: any = { x };

      data.forEach(series => {
        if (series.values) {
          const point = series.values.find((p: any) => {
            const pointX = isChartDataJSON(type) ? p.x : p[0];
            return pointX === x;
          });

          if (point) {
            const key = prettifyLabels(series.key);
            const yValue = isChartDataJSON(type) ? point.y : point[1];

            // Ensure we have a valid number
            resultPoint[key] = typeof yValue === "number" ? yValue : parseFloat(yValue) || 0;
            resultPoint[`${key}_dataObj`] = point._dataObj;

            if (isBubbleChart(type) && point.size) {
              resultPoint[`${key}_size`] = point.size;
            }
          } else {
            // Fill missing values with 0 for consistency
            const key = prettifyLabels(series.key);
            resultPoint[key] = 0;
          }
        }
      });

      result.push(resultPoint);
    });

    return result;
  }

  // If data is already in the correct format
  return data;
};

// Additional utility functions to match Angular functionality
export const getDateFormatedData = (dateFormat: string, d: any) => {
  if (!d) return "";

  try {
    const date = moment(d);
    if (!date.isValid()) return d;

    // Handle different date format patterns
    let format = dateFormat || "MM/DD/YYYY";

    // Convert D3 format patterns to moment.js patterns
    if (format === "%x") format = "MM/DD/YYYY";
    if (format === "%c") format = "ddd MMM DD HH:mm:ss YYYY";

    return date.format(format);
  } catch (e) {
    return d;
  }
};

export const getNumberFormatedData = (numberFormat: string, d: number) => {
  return formatNumber(d, numberFormat);
};

// Get date list for sample data
export const getDateList = () => dateList;

// Utility to check if value is empty object
export const isEmptyObject = (obj: any) => {
  return obj && typeof obj === "object" && Object.keys(obj).length === 0;
};

export const getLegendPopupStyle = (position: TChartLegendPosition) => {
  // base styles for all positions
  const baseStyle = {
    position: "absolute" as const,
    zIndex: 10,
    borderRadius: "4px",
    padding: "8px",
  };

  // position-specific styles
  switch (position) {
    case "top":
      return {
        ...baseStyle,
        right: "3%",
        bottom: "100%",
        width: "80%",
        display: "flex",
        flexWrap: "wrap" as const,
        gap: "8px",
        justifyContent: "flex-end",
      };
    case "bottom":
      return {
        ...baseStyle,
        right: "3%",
        bottom: "0%",
        width: "80%",
        display: "flex",
        flexWrap: "wrap" as const,
        gap: "8px",
        justifyContent: "flex-end",
      };
    case "right":
      return {
        ...baseStyle,
        right: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        maxHeight: "100%",
        overflowY: "auto" as const,
        display: "flex",
        flexDirection: "column" as const,
        gap: "8px",
        maxWidth: "200px", // limit the width of right legend
      };
    case "hide":
    default:
      return {
        display: "none",
      };
  }
};

export const truncateText = (text: string, maxLength: number = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

// Normalize donut ratio from various inputs to a numeric ratio (0-1)
export const normalizeDonutRatio = (value: any): number => {
  const fallback = 0.6;
  if (value === undefined || value === null) {
    return fallback;
  }
  if (typeof value === "number") {
    return value > 1 ? value / 100 : value;
  }
  const val = String(value).toLowerCase().trim();
  if (val === "small") return 0.3;
  if (val === "medium") return 0.6;
  if (val === "large") return 0.7;
  const parsed = parseFloat(val);
  if (!isNaN(parsed)) {
    return parsed > 1 ? parsed / 100 : parsed;
  }
  return fallback;
};
