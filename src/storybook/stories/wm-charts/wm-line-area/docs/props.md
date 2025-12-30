# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"Line" \| "Area"` | `"Line"` | Determines whether to render a line chart or an area chart |
| `data` | `any[]` | `[]` | Array of data objects to be visualized in the chart |
| `dataKeys` | `string[]` | `[]` | Array of object keys to extract values for rendering in the chart |
| `xDataKeyArr` | `string[]` | `[]` | Array of keys to be used for the x-axis values |

## Layout & Positioning

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `offsettop` | `number` | `0` | Additional space in pixels above the chart area |
| `offsetbottom` | `number` | `0` | Additional space in pixels below the chart area |
| `offsetleft` | `number` | `0` | Additional space in pixels to the left of the chart area |
| `offsetright` | `number` | `0` | Additional space in pixels to the right of the chart area |
| `margin` | `{ top: number; right: number; left: number; bottom: number; }` | `{ top: 5, right: 5, left: 5, bottom: 5 }` | Margin object specifying space around the chart content |

## Styling & Appearance

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `chartColors` | `string[]` | `[]` | Array of color codes for the different data series |
| `interpolation` | `TChartInterpolation` | `"linear"` | Type of interpolation for the line/area curve (e.g., "linear", "basis", "cardinal") |
| `strokeWidth` | `number` | `2` | Width of the line strokes in pixels |
| `pointSize` | `number` | `4` | Size of data points in pixels |
| `areaViewType` | `StackOffsetType` | `"none"` | Defines how areas stack on top of each other ("none", "wiggle", "silhouette", "expand") |

## Axis Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `xAxisConfig` | `any` | `{}` | Configuration object for the x-axis appearance and behavior |
| `yAxisConfig` | `any` | `{}` | Configuration object for the y-axis appearance and behavior |
| `numberFormat` | `string` | `""` | Format string to control how numbers appear on the axes |

## Legend & Tooltips

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `showLegend` | `boolean` | `true` | Controls whether the legend is displayed |
| `legendPosition` | `TChartLegendPosition` | `"bottom"` | Position of the legend ("top", "bottom", "left", "right") |
| `legendtype` | `TChartLegendType` | `"default"` | Visual style of the legend |
| `tooltips` | `boolean` | `true` | Controls whether tooltips appear on hover |

## Data Selection

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selectedRegions` | `string[]` | `[]` | Array of currently selected region identifiers |
| `availableRegions` | `string[]` | `[]` | Array of all available region identifiers |

### Common Use Cases

#### Basic Line Chart Configuration
```javascript
Page.Widgets.lineAreaChart1.type = "Line";
Page.Widgets.lineAreaChart1.data = myDataService.dataSet;
Page.Widgets.lineAreaChart1.dataKeys = ["sales", "revenue", "profit"];
Page.Widgets.lineAreaChart1.xDataKeyArr = ["month"];
```

#### Styling a Stacked Area Chart
```javascript
Page.Widgets.lineAreaChart1.type = "Area";
Page.Widgets.lineAreaChart1.areaViewType = "silhouette";
Page.Widgets.lineAreaChart1.chartColors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];
Page.Widgets.lineAreaChart1.interpolation = "cardinal";
Page.Widgets.lineAreaChart1.strokeWidth = 1.5;
```

#### Customizing Axes
```javascript
Page.Widgets.lineAreaChart1.xAxisConfig = {
  tickCount: 5,
  label: "Time Period",
  angle: -45
};

Page.Widgets.lineAreaChart1.yAxisConfig = {
  tickCount: 8,
  label: "Value ($)",
  domain: [0, 1000]
};

Page.Widgets.lineAreaChart1.numberFormat = "$,.2f";
```