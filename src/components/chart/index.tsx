import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { YAxisProps } from "recharts";
import { withBaseWrapper } from "@wavemaker/react-runtime/higherOrder/withBaseWrapper";
import DOMPurify from "dompurify";
import {
  isArray,
  split,
  isEmpty,
  groupBy,
  orderBy,
  map,
  first,
  fill,
  max,
  forEach,
  uniq,
  isString,
  get,
  forEachRight,
  isEqual,
  isObject,
} from "lodash";
import { TChartLegendPosition, WmChartProps } from "./props";
import {
  allShapes,
  convertToRechartsFormat,
  formatNumber,
  getBarSpacingValue,
  getLodashOrderByFormat,
  getSampleData,
  isAreaChart,
  isBubbleChart,
  isChartDataArray,
  isChartDataJSON,
  isLineTypeChart,
  isNumberType,
  isPieType,
  isShowLegend,
  NONE,
  prettifyLabels,
  SAMPLE_DATA,
  triggerFn,
  getRadiusValue,
  getLegendPopupStyle,
  truncateText,
} from "./utils";
import { themes } from "./constant";
import { NoDataMessage } from "./components/noDataMessage";
import { BarColumnChart } from "./components/barColumnChart";
import { LineAreaChart } from "./components/lineAreaChart";
import { BubbleChart } from "./components/bubbleChart";
import { CumulativeLineChart } from "./components/cumulativeLineChart";
import { PieDonutChart } from "./components/pieDonutChart";
import { useXAxisConfig } from "./hooks/useXAxisConfig";
import { useBarYAxisExtras } from "./hooks/useBarYAxisExtras";

const WmChart: React.FC<WmChartProps> = props => {
  const {
    title,
    type = "Column",
    subheading,
    datavalue,
    groupby,
    aggregation = "none",
    aggregationcolumn,
    orderby,
    xaxisdatakey,
    xaxislabel,
    xnumberformat,
    xdigits,
    xdateformat,
    xaxislabeldistance = -12,
    xunits,
    yaxisdatakey,
    yaxislabel,
    ynumberformat,
    ydigits,
    yaxislabeldistance = 12,
    yunits,
    iconclass,
    nodatamessage = "No Data Available.",
    loadingdatamsg = "Loading...",
    tooltips = true,
    showlegend = "top",
    showlabelsoutside = true,
    showvalues = false,
    staggerlabels = false,
    reducexticks = true,
    showlabels = "outside",
    labeltype = "percent",
    barspacing = "medium",
    donutratio = "small",
    bubblesize,
    showxdistance = false,
    showydistance = false,
    areaviewtype = "none",
    interpolation = "linear",
    centerlabel,
    customcolors,
    theme = "Azure",
    offset,
    offsettop = 25,
    offsetbottom = 55,
    offsetright = 25,
    offsetleft = 75,
    showxaxis = true,
    showyaxis = true,
    linethickness,
    highlightpoints = false,
    formattype,
    dataset,
    datasource,
    width,
    height = "400px",
    shape = "circle",
    onSelect,
    onTransform,
    onBeforerender,
    xdomain = "Default",
    ydomain = "Default",
    labelthreshold = 0.01,
    legendtype = "furious",
    viewtype = "Grouped",
    fontsize,
    fontunit,
    color,
    fontfamily,
    fontweight,
    fontstyle,
    textdecoration,
    className,
    show = true,
    styles = {},
    name,
    ...otherProps
  } = props;

  // const muiTheme = useTheme();
  const [isLoadInProgress, setIsLoadInProgress] = useState<boolean>(false);
  const [showContentLoadError, setShowContentLoadError] = useState<boolean>(false);
  const [invalidConfig, setInvalidConfig] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [chartData, setChartData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [xDataKeyArr, setXDataKeyArr] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isVisuallyGrouped, setIsVisuallyGrouped] = useState<boolean>(false);
  const [xAxisDataType, setXAxisDataType] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartColors: string[] = useMemo(() => {
    if (customcolors) {
      if (isString(customcolors)) {
        return split(customcolors, ",");
      }
      if (isArray(customcolors)) {
        return customcolors;
      }
    }
    return themes[theme as keyof typeof themes]?.colors || themes["Terrestrial"].colors;
  }, [customcolors, theme]);

  /**
   * Timeout ref used to distinguish a single click from a double click on legend items.
   * When the first click occurs we start a timer; if a second click arrives before the
   * timer fires we treat it as a double-click and cancel the pending single-click logic.
   */
  const legendClickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // COMPLETE binddataset logic from Angular
  const binddataset = useMemo(() => dataset !== undefined, [dataset]);

  const shouldShowLegend = useMemo(() => isShowLegend(showlegend), [showlegend]);

  const legendPosition: TChartLegendPosition = useMemo(() => {
    // For line charts, only allow 'hide', 'top', and 'bottom'
    if (type === "Line") {
      if (showlegend === "top") return "top";
      if (showlegend === "bottom") return "bottom";
      return "top"; // default to top for any other value
    }

    // For other chart types, keep existing logic
    if (showlegend === "top") return "top";
    if (showlegend === "bottom") return "bottom";
    if (showlegend === "right") return "right";
    return "top";
  }, [showlegend, type]);

  // BUG FIX 1: Default caption visible in UI
  const getDefaultXAxisLabel = useCallback(() => {
    // In a horizontal Bar chart the numeric series (yaxisdatakey) is plotted along X.
    if (type === "Bar") {
      if (yaxislabel) {
        return `${yaxislabel}${yunits ? ` (${yunits})` : ""}`;
      }
      if (yaxisdatakey) {
        const keys = yaxisdatakey.split(",").map(k => prettifyLabels(k.trim()));
        return `${keys.join(" ")}${yunits ? ` (${yunits})` : ""}`;
      }
    }
    if (xaxislabel) {
      return `${xaxislabel}${xunits ? ` (${xunits})` : ""}`;
    }
    if (xaxisdatakey) {
      return `${prettifyLabels(xaxisdatakey)}${xunits ? ` (${xunits})` : ""}`;
    }
    return "x caption";
  }, [type, xaxislabel, xaxisdatakey, xunits, yaxislabel, yaxisdatakey, yunits]);

  // BUG FIX 3: YAxis caption updating properly
  const getDefaultYAxisLabel = useCallback(() => {
    // In a horizontal Bar chart the categorical series (xaxisdatakey) is plotted along Y.
    if (type === "Bar") {
      if (xaxislabel) {
        return `${xaxislabel}${xunits ? ` (${xunits})` : ""}`;
      }
      if (xaxisdatakey) {
        return `${prettifyLabels(xaxisdatakey)}${xunits ? ` (${xunits})` : ""}`;
      }
    }
    if (yaxislabel) {
      return `${yaxislabel}${yunits ? ` (${yunits})` : ""}`;
    }
    if (yaxisdatakey) {
      const keys = yaxisdatakey.split(",").map(key => prettifyLabels(key.trim()));
      return `${keys.join(" ")}${yunits ? ` (${yunits})` : ""}`;
    }
    return "y caption";
  }, [type, yaxislabel, yaxisdatakey, yunits, xaxislabel, xaxisdatakey, xunits]);

  // COMPLETE Angular helper functions
  const isGroupByEnabled = useCallback(() => {
    return !!(groupby && groupby !== NONE);
  }, [groupby]);

  const isAggregationEnabled = useCallback(() => {
    return !!(isGroupByEnabled() && aggregation !== NONE && aggregationcolumn);
  }, [aggregation, aggregationcolumn, isGroupByEnabled]);

  const isDataFilteringEnabled = useCallback(() => {
    return isAggregationEnabled() || (!isVisuallyGrouped && orderby);
  }, [isAggregationEnabled, isVisuallyGrouped, orderby]);

  // BUG FIX 2 & 8: getxAxisVal function - Fixed to properly handle xaxisdatakey
  const getxAxisVal = useCallback(
    (dataObj: any, xKey: string, index?: number) => {
      const value = get(dataObj, xKey);

      // For bubble charts with non-numeric x values, use indices
      if (isBubbleChart(type) && typeof value === "string") {
        // Store the actual value for display
        if (value !== undefined && value !== null) {
          setXDataKeyArr(prev => {
            const newArr = [...prev];
            if (index !== undefined) {
              newArr[index] = value;
            }
            return newArr;
          });
        }
        return index !== undefined ? index : 0;
      }

      // For line type charts with non-numeric data, use indices but store original values
      if (isLineTypeChart(type) && !isNumberType(xAxisDataType)) {
        // Store the actual value for display
        if (value !== undefined && value !== null) {
          setXDataKeyArr(prev => {
            const newArr = [...prev];
            if (index !== undefined) {
              newArr[index] = value;
            }
            return newArr;
          });
        }

        if (value instanceof Date) {
          return value;
        } else {
          return index !== undefined ? index : value;
        }
      }
      return value;
    },
    [type, xAxisDataType]
  );

  // COMPLETE valueFinder function from Angular
  const valueFinder = useCallback(
    (dataObj: any, xKey: string, yKey: string, index?: number, shapeVal?: string) => {
      const xVal = getxAxisVal(dataObj, xKey, index);
      const value = get(dataObj, yKey);
      const yVal = parseFloat(value) || value;
      const size = parseFloat(dataObj[bubblesize || ""]) || 2;

      let dataPoint: any = {};

      if (isChartDataJSON(type)) {
        dataPoint.x = xVal;
        dataPoint.y = yVal;
        if (isBubbleChart(type)) {
          dataPoint.size = size;
          dataPoint.shape = shapeVal || "circle";
        }
      } else if (isChartDataArray(type)) {
        dataPoint = [xVal, yVal];
      }

      dataPoint._dataObj = dataObj;
      return dataPoint;
    },
    [getxAxisVal, bubblesize, type]
  );

  const getValidData = useCallback((values: any[]) => {
    return values.length === 1 && values[0] === undefined ? [] : values;
  }, []);

  // COMPLETE processChartData function from Angular - FIXED to avoid state updates
  const processChartData = useCallback(
    (processedDataset: any[]) => {
      if (!binddataset) {
        const sampleData = getSampleData({
          type,
          yaxisdatakey,
          shape,
        });
        return sampleData;
      }

      if (!processedDataset || processedDataset.length === 0) {
        return [];
      }

      let datum: any[] = [];
      let yAxisKey: string;
      const shapes: any = [];
      let values: any = [];
      const xAxisKey = xaxisdatakey;
      const yAxisKeys = yaxisdatakey ? yaxisdatakey.split(",").map(k => k.trim()) : [];
      const dataSet = processedDataset;

      if (isArray(dataSet)) {
        if (isPieType(type)) {
          yAxisKey = yAxisKeys[0];
          datum = map(dataSet, (dataObj, index) => {
            if (!isEmpty(dataSet[index])) {
              return valueFinder(dataSet[index], xAxisKey || "", yAxisKey);
            }
            return undefined;
          });
          datum = getValidData(datum);
        } else {
          if (isBubbleChart(type)) {
            shapes.push(shape === "random" ? allShapes : shape);
          }

          yAxisKeys.forEach((yAxisKey, series) => {
            values = map(dataSet, (dataObj, index) => {
              if (!isEmpty(dataSet[index])) {
                return valueFinder(
                  dataSet[index],
                  xAxisKey || "",
                  yAxisKey,
                  index,
                  (isArray(shapes) && shapes[series]) || shape
                );
              }
              return undefined;
            });
            values = getValidData(values);
            datum.push({
              values: values,
              key: prettifyLabels(yAxisKey),
            });
          });
        }
      }
      return datum;
    },
    [binddataset, type, xaxisdatakey, yaxisdatakey, shape, valueFinder, getValidData]
  );

  // COMPLETE getVisuallyGroupedData function from Angular - FIXED to avoid state updates
  const getVisuallyGroupedData = useCallback(
    (queryResponse: any[], groupingColumn: string) => {
      let groupData: any = {};
      let groupValues: any = [];
      let orderByDetails;
      let maxLength: number;
      const chartDataResult: any[] = [];
      const _isAreaChart = isAreaChart(type);
      const yAxisKey = first(split(yaxisdatakey || "", ","));

      let processedResponse = orderBy(queryResponse, split(groupby || "", ","));

      if (orderby) {
        orderByDetails = getLodashOrderByFormat(orderby);
        processedResponse = orderBy(
          processedResponse,
          orderByDetails.columns,
          orderByDetails.orders as any[]
        );
      }

      const groupedResponse = groupBy(processedResponse, groupingColumn);

      if (_isAreaChart) {
        maxLength = max(map(groupedResponse, obj => obj.length)) || 0;
      }

      forEach(groupedResponse, (values, groupKey) => {
        groupValues = _isAreaChart ? fill(new Array(maxLength || 0), [0, 0]) : [];
        forEachRight(values, (value, index) => {
          groupValues[index] = valueFinder(value, xaxisdatakey || "", yAxisKey || "", index);
        });
        groupData = { key: groupKey, values: groupValues };
        chartDataResult.push(groupData);
      });

      return chartDataResult;
    },
    [groupby, orderby, type, xaxisdatakey, yaxisdatakey, valueFinder]
  );

  // COMPLETE getGroupingDetails function from Angular
  const getGroupingDetails = useCallback(() => {
    if (isGroupByEnabled() && !isAggregationEnabled()) {
      let isVisuallyGroupedResult = false;
      let visualGroupingColumn;
      let groupingColumnIndex;
      const columns: string[] = [];
      const groupbyColumns = groupby && groupby !== NONE ? groupby.split(",") : [];
      const yAxisKeys = yaxisdatakey ? yaxisdatakey.split(",").map(k => k.trim()) : [];

      if (groupbyColumns.length > 1) {
        for (let i = 0; i < groupbyColumns.length; i++) {
          const column = groupbyColumns[i];
          if (xaxisdatakey !== column && !yAxisKeys.includes(column)) {
            isVisuallyGroupedResult = true;
            visualGroupingColumn = column;
            groupingColumnIndex = i;
            groupbyColumns.splice(groupingColumnIndex, 1);
            break;
          }
        }

        if (visualGroupingColumn) {
          columns.push(visualGroupingColumn);
        }

        if (groupbyColumns.length) {
          columns.push(...groupbyColumns);
        }
      }

      if (xaxisdatakey !== aggregationcolumn) {
        columns.push(xaxisdatakey || "");
      }

      yAxisKeys.forEach(key => {
        if (key !== aggregationcolumn) {
          columns.push(key);
        }
      });

      const groupingExpression = columns.join(",");
      setIsVisuallyGrouped(isVisuallyGroupedResult);

      return {
        expression: groupingExpression,
        isVisuallyGrouped: isVisuallyGroupedResult,
        visualGroupingColumn: visualGroupingColumn,
      };
    }

    return {
      expression: "",
      isVisuallyGrouped: false,
      visualGroupingColumn: "",
    };
  }, [
    aggregationcolumn,
    groupby,
    isAggregationEnabled,
    isGroupByEnabled,
    xaxisdatakey,
    yaxisdatakey,
  ]);

  const transformForRecharts = useCallback(
    (data: any[]) => {
      if (!data || data.length === 0) return [];
      return convertToRechartsFormat(data, type);
    },
    [type]
  );

  // COMPLETE getAggregatedData function from Angular (simplified for React)
  const getAggregatedData = useCallback((callback: Function) => {
    // This would typically make API calls in a real implementation
    // For now, we'll process the data directly
    triggerFn(callback);
  }, []);

  const filterDataByRegions = useCallback(
    (data: any[]) => {
      if (!data || data.length === 0) return [];

      if (isPieType(type)) {
        return data.filter(item => selectedRegions.includes(item.x));
      } else {
        return data.filter(series => selectedRegions.includes(series.key));
      }
    },
    [selectedRegions, type]
  );

  // BUG FIX 9: Get available regions considering groupBy
  const getAvailableRegions = useCallback(
    (data: any[]) => {
      if (!data || data.length === 0) return [];

      if (isPieType(type)) {
        return uniq(data.map(item => item.x));
      } else {
        // For grouped data, use the group keys
        if (isGroupByEnabled() && groupby) {
          const groupKeys = uniq(data.map(series => series.key));
          return groupKeys;
        }
        return uniq(data.map(series => series.key));
      }
    },
    [type, isGroupByEnabled, groupby]
  );

  // Handle beforerender event
  useEffect(() => {
    setTimeout(() => {
      onBeforerender?.(props, renderChart);
    }, 10);
  }, []);

  // COMPLETE _plotChartProxy function from Angular - FIXED to avoid infinite loops
  const _plotChartProxy = useCallback(() => {
    setShowContentLoadError(false);
    setInvalidConfig(false);
    setIsLoadInProgress(true);

    try {
      const groupingDetails = getGroupingDetails();
      let data;

      const isValidAxis = binddataset ? !!(xaxisdatakey && yaxisdatakey) : true;

      if (!isValidAxis) {
        setProcessedData([]);
      } else if (groupingDetails.isVisuallyGrouped && !isPieType(type)) {
        data = getVisuallyGroupedData(chartData, groupingDetails.visualGroupingColumn || "");
        const filteredData = filterDataByRegions(data);
        setProcessedData(transformForRecharts(filteredData));
      } else {
        data = processChartData(chartData);
        const filteredData = filterDataByRegions(data);
        setProcessedData(transformForRecharts(filteredData));
      }
    } catch (error) {
      console.error("Error processing chart data:", error);
      setShowContentLoadError(true);
      setInvalidConfig(true);
      setErrMsg("Error processing chart data");
    } finally {
      setIsLoadInProgress(false);
    }
  }, [
    binddataset,
    chartData,
    getGroupingDetails,
    getVisuallyGroupedData,
    processChartData,
    transformForRecharts,
    type,
    xaxisdatakey,
    yaxisdatakey,
    filterDataByRegions,
    props,
  ]);

  const handleTransform = useCallback(() => {
    if (onTransform) {
      const transformedData = onTransform({} as React.MouseEvent, props);
      if (transformedData) {
        setChartData(transformedData);
        return; // Exit early if data is transformed
      }
    }
  }, [onTransform, props]);

  // Memoize the data processing functions to prevent infinite loops
  const processDataWithFilters = useCallback(
    (data: any[]) => {
      const filteredData = filterDataByRegions(data);
      return transformForRecharts(filteredData);
    },
    [filterDataByRegions, transformForRecharts]
  );

  const setupRegions = useCallback(
    (data: any[]) => {
      const regions = getAvailableRegions(data);
      if (!isEqual(regions, availableRegions)) {
        setAvailableRegions(regions);
        // Initialize selectedRegions with all regions if empty
        setSelectedRegions(prev => {
          if (prev.length === 0) {
            return regions;
          }
          const validRegions = prev.filter(region => regions.includes(region));
          return validRegions.length > 0 ? validRegions : regions;
        });
      }
    },
    [getAvailableRegions, availableRegions]
  );

  // Transform object with labels/values arrays to array of objects format
  const transformObjectToArray = useCallback((data: any, xKey: string, yKey: string) => {
    // Check if data is an object with arrays (like {labels: [...], values: [...]})
    if (!isArray(data) && isObject(data)) {
      const dataObj = data as Record<string, any>;
      if (dataObj[xKey] && dataObj[yKey] && isArray(dataObj[xKey]) && isArray(dataObj[yKey])) {
        const xArray = dataObj[xKey] as any[];
        const yArray = dataObj[yKey] as any[];
        // Transform to array of objects: [{labels: '2025-W43', values: 13.97}, ...]
        return xArray.map((xVal: any, index: number) => {
          const result: any = {};
          result[xKey] = xVal;
          result[yKey] = yArray[index];

          return result;
        });
      }
    }
    return data;
  }, []);

  // Single effect to handle all data processing
  useEffect(() => {
    let data = [];

    if (!binddataset) {
      // Use sample data
      data = getSampleData({ type, yaxisdatakey, shape }) as any;
      // set the xDataKeyArr to the datakeys in the data
      const dd = data?.map((item: any) => item.values?.map((item: any) => item.x));
      setXDataKeyArr(dd.flat());
    } else if (dataset) {
      // Transform object format to array format if needed
      // Check if dataset is an object with arrays matching xaxisdatakey and yaxisdatakey
      const xKey = xaxisdatakey || "labels";
      const yKey = yaxisdatakey?.split(",")[0]?.trim() || "values";
      let transformedDataset = transformObjectToArray(dataset, xKey, yKey);

      // Use real dataset
      const processedDataset = isArray(transformedDataset)
        ? transformedDataset
        : [transformedDataset];
      setChartData(processedDataset);

      if (processedDataset.length > 0) {
        data = processChartData(processedDataset);
      }
    }

    if (data.length > 0) {
      setupRegions(data);
      setProcessedData(processDataWithFilters(data));
    }
  }, [
    binddataset,
    dataset,
    type,
    xaxisdatakey,
    yaxisdatakey,
    shape,
    processDataWithFilters,
    setupRegions,
    transformObjectToArray,
  ]);

  // Handle chart data updates - only when NOT using onTransform
  useEffect(() => {
    if (binddataset && chartData.length > 0 && !onTransform) {
      _plotChartProxy();
    }
  }, [binddataset, chartData, onTransform]);

  // Handle transform separately
  useEffect(() => {
    if (binddataset) {
      handleTransform();
    }
  }, [binddataset]);

  // Handle region selection changes
  useEffect(() => {
    if (selectedRegions.length > 0 && chartData.length > 0) {
      const data = binddataset
        ? processChartData(chartData)
        : getSampleData({ type, yaxisdatakey, shape });
      setProcessedData(processDataWithFilters(data));
    }
  }, [selectedRegions]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (binddataset && chartData.length > 0) {
        _plotChartProxy();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [binddataset, chartData.length]);

  // BUG FIX 10: Fixed onSelect event handler
  const handleChartClick = useCallback(
    (data: any, event?: any) => {
      if (!data || !onSelect) return;

      let selectedChartItem = data;
      let dataObj = data?._dataObj || data;

      setSelectedItem(dataObj);
      onSelect?.(event, props, dataObj, selectedChartItem);
    },
    [onSelect, props]
  );

  // For Bar charts the categorical axis is Y; reduce label crowding and add ellipsis + tooltip
  const barYAxisExtras = useBarYAxisExtras({
    type,
    chartWidth: chartContainerRef.current?.offsetWidth,
  });

  // For Bar charts, categorical axis is Y and numeric axis is X. Align visibility with Angular semantics.
  const xAxisShow = useMemo(
    () => (type === "Bar" ? showyaxis : showxaxis),
    [type, showyaxis, showxaxis]
  );
  const yAxisShow = useMemo(
    () => (type === "Bar" ? showxaxis : showyaxis),
    [type, showxaxis, showyaxis]
  );

  const getXAxisConfig = useXAxisConfig({
    type,
    processedData,
    xDataKeyArr,
    chartContainerRef,
    getDefaultXAxisLabel,
    xnumberformat,
    showxaxis: xAxisShow,
    xaxislabeldistance,
  });

  const getYAxisConfig: YAxisProps = useMemo(() => {
    return {
      hide: !yAxisShow,
      label: {
        angle: -90,
        position: "insideLeft",
        offset: yaxislabeldistance,
        fill: "#000",
        style: { textAnchor: "middle" },
      },
      tick: {
        fontSize: 12,
        fontFamily: "inherit",
        fill: "currentColor",
      },
      ...(barYAxisExtras as any),
      tickFormatter: (value: any, index?: number) => {
        if (typeof value === "number") {
          return formatNumber(value, ynumberformat);
        }
        return value;
      },
    };
  }, [yAxisShow, getDefaultYAxisLabel, ynumberformat, yaxislabeldistance, processedData]);

  const handleRegionChange = useCallback(
    (region: string, isDoubleClick: boolean = false) => {
      setSelectedRegions(prev => {
        // If only one region exists, do nothing.
        if (availableRegions.length === 1) {
          return prev;
        }

        if (isDoubleClick) {
          // Double-click: isolate the clicked region.
          return [region];
        }

        // Single click: toggle the region's visibility.
        const newSelection = prev.includes(region)
          ? prev.filter(r => r !== region)
          : [...prev, region];

        // Prevent the case where all regions are deselected – fall back to selecting all.
        return newSelection.length === 0 ? [...availableRegions] : newSelection;
      });
    },
    [availableRegions]
  );

  // Unified click handler: uses e.detail to distinguish click vs double-click.
  const handleLegendClick = useCallback(
    (region: string, e: React.MouseEvent) => {
      // If a timer is already pending, clear it; we'll start a new one if needed.
      if (legendClickTimeoutRef.current) {
        clearTimeout(legendClickTimeoutRef.current);
        legendClickTimeoutRef.current = null;
      }

      if (e.detail === 2) {
        // Second click within system double-click threshold.
        handleRegionChange(region, true);
        return;
      }

      // Defer single-click logic; will be cancelled by a second click.
      legendClickTimeoutRef.current = setTimeout(() => {
        handleRegionChange(region, false);
        legendClickTimeoutRef.current = null;
      }, 200);
    },
    [handleRegionChange]
  );

  useEffect(() => {
    if (binddataset && datasource && isDataFilteringEnabled()) {
      getAggregatedData(() => _plotChartProxy());
    }
  }, [binddataset, datasource, isDataFilteringEnabled, getAggregatedData, _plotChartProxy]);

  const renderChart = () => {
    if (!processedData || processedData.length === 0 || selectedRegions.length === 0) {
      return (
        <NoDataMessage>
          <Typography variant="body1">
            {selectedRegions.length === 0
              ? "Please select at least one region to display"
              : nodatamessage}
          </Typography>
        </NoDataMessage>
      );
    }

    // BUG FIX 4 & 5: Proper data keys handling for multiple y-axis values
    const dataKeys = yaxisdatakey
      ? yaxisdatakey.split(",").map(key => prettifyLabels(key.trim()))
      : processedData.length > 0
        ? Object.keys(processedData[0]).filter(
            k => k !== "x" && !k.endsWith("_dataObj") && !k.endsWith("_size")
          )
        : [];

    const strokeWidth = linethickness ? parseInt(linethickness) : 2;
    const pointSize = highlightpoints ? 5 : 0;

    const commonProps = {
      data: processedData,
      dataKeys,
      selectedRegions,
      chartColors,
      margin: {
        top: 15,
        right: 60,
        left: 30,
        bottom: 15,
      },
      showLegend: shouldShowLegend,
      legendPosition,
      xAxisConfig: getXAxisConfig,
      yAxisConfig: getYAxisConfig,
      numberFormat: ynumberformat || "0.00",
      xDataKeyArr,
      onChartClick: handleChartClick,
      onLegendClick: handleLegendClick,
      tooltips,
      barSpacing: barspacing,
      legendtype,
      availableRegions,
    };

    switch (type) {
      case "Column":
        return <BarColumnChart {...commonProps} type="Column" viewtype={viewtype} />;

      case "Bar":
        return (
          <BarColumnChart
            {...commonProps}
            type="Bar"
            viewtype={viewtype}
            shouldShowLegend={shouldShowLegend}
          />
        );

      case "Line":
        return (
          <LineAreaChart
            {...commonProps}
            type="Line"
            interpolation={interpolation}
            strokeWidth={strokeWidth}
            pointSize={pointSize}
            legendtype={legendtype}
            availableRegions={availableRegions}
          />
        );

      case "Area":
        return (
          <LineAreaChart
            {...commonProps}
            type="Area"
            areaViewType={areaviewtype}
            interpolation={interpolation}
            strokeWidth={strokeWidth}
            pointSize={pointSize}
          />
        );

      case "Cumulative Line":
        return (
          <CumulativeLineChart
            {...commonProps}
            interpolation={interpolation}
            strokeWidth={strokeWidth}
            pointSize={pointSize}
          />
        );

      case "Pie":
      case "Donut":
        return (
          <PieDonutChart
            {...commonProps}
            type={type}
            showlabels={showlabels}
            labeltype={labeltype}
            shouldShowLegend={shouldShowLegend}
            onChartClick={handleChartClick}
            onLegendClick={handleLegendClick}
            showLegend={shouldShowLegend}
            centerlabel={centerlabel}
            donutratio={donutratio}
          />
        );

      case "Bubble":
        return <BubbleChart {...commonProps} shape={shape} />;

      default:
        return (
          <NoDataMessage>
            <Typography variant="body1">Unsupported chart type: {type}</Typography>
          </NoDataMessage>
        );
    }
  };

  const fontStyles = useMemo(() => {
    return {
      fontSize: fontsize && fontunit ? `${fontsize}${fontunit}` : undefined,
      color: color,
      fontFamily: fontfamily,
      fontWeight: fontweight,
      fontStyle: fontstyle,
      textDecoration: textdecoration,
    };
  }, [fontsize, fontunit, color, fontfamily, fontweight, fontstyle, textdecoration]);

  return (
    <Box
      component="div"
      className={`app-chart ${className || ""} ${title ? "panel" : ""}`}
      style={{
        ...styles,
        ...fontStyles,
        width: (styles as any)?.width ?? width ?? height,
        height: (styles as any)?.height ?? height,
      }}
      ref={chartContainerRef}
      id={`wmChart-${type}`}
      name={name}
    >
      {title && (
        <Box component="div" className="panel-heading">
          <h3 className="panel-title">
            {iconclass && (
              <div className="pull-left">
                <i className={`app-icon panel-icon ${iconclass}`} />
              </div>
            )}
            <div
              className="heading"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
            />
            {subheading && (
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subheading) }}
              />
            )}
          </h3>
        </Box>
      )}

      <Box component="div" className={`app-chart-inner ${title ? "panel-body" : ""}`}>
        {renderChart()}

        {isLoadInProgress && (
          <Box component="div" className="app-spinner">
            <Box className="spinner-message">
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {loadingdatamsg}
              </Typography>
            </Box>
          </Box>
        )}

        {showContentLoadError && (
          <NoDataMessage>
            <div className="wm-content-info readonly-wrapper">
              <p className={`wm-message ${invalidConfig ? "error" : ""}`}>
                {errMsg || nodatamessage}
              </p>
            </div>
          </NoDataMessage>
        )}
      </Box>
    </Box>
  );
};

export default withBaseWrapper(WmChart);
