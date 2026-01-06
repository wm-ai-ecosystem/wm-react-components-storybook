# Props

## Chart Type and Data

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"Pie" \| "Donut"` | `"Pie"` | Determines whether to render a Pie or Donut chart. |
| `data` | `any[]` | `[]` | Array of data objects to be visualized in the chart. |
| `dataKeys` | `string[]` | `[]` | Array of keys to extract data values from each data object. |
| `xDataKeyArr` | `string[]` | `[]` | Array of keys for x-axis data points. |

## Layout and Positioning

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `offsettop` | `number` | `0` | Top offset for the chart in pixels. |
| `offsetbottom` | `number` | `0` | Bottom offset for the chart in pixels. |
| `offsetleft` | `number` | `0` | Left offset for the chart in pixels. |
| `offsetright` | `number` | `0` | Right offset for the chart in pixels. |
| `margin` | `{ top: number; right: number; left: number; bottom: number; }` | `{ top: 10, right: 10, bottom: 10, left: 10 }` | Object specifying the margin around the chart. |
| `donutratio` | `string` | `"0.6"` | For Donut charts, specifies the ratio of the inner radius to the outer radius (0-1). |

## Visual Customization

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `chartColors` | `string[]` | | Array of color codes to be used for chart segments. |
| `showlabels` | `TChartShowValues` | `"none"` | Controls the visibility of data labels ('none', 'inside', 'outside'). |
| `labeltype` | `TChartValuesDisplay` | `"value"` | Determines what information to display in labels ('value', 'percentage', 'both'). |
| `tooltips` | `boolean` | `true` | Enables or disables tooltips when hovering over chart segments. |
| `centerlabel` | `string` | `""` | Text to display in the center of a Donut chart. |
| `numberFormat` | `string` | | Format pattern for displayed numbers. |
| `ynumberformat` | `string` | | Format pattern for y-axis values. |

## Legend Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `showLegend` | `boolean` | `true` | Controls whether the legend is displayed. |
| `shouldShowLegend` | `boolean` | `true` | Alternative prop to control legend visibility. |
| `legendPosition` | `TChartLegendPosition` | `"bottom"` | Position of the legend ('top', 'right', 'bottom', 'left'). |
| `legendtype` | `TChartLegendType` | `"list"` | Display style of the legend ('list', 'table'). |

## Region Selection

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `selectedRegions` | `string[]` | `[]` | Array of currently selected region IDs. |
| `availableRegions` | `string[]` | `[]` | Array of all available region IDs that can be selected. |

## Common Use Cases

```javascript
// Basic Pie chart configuration
Page.Widgets.pieDonutChart1.type = "Pie";
Page.Widgets.pieDonutChart1.data = [
  { category: "Category A", value: 30 },
  { category: "Category B", value: 45 },
  { category: "Category C", value: 25 }
];
Page.Widgets.pieDonutChart1.dataKeys = ["value"];
Page.Widgets.pieDonutChart1.xDataKeyArr = ["category"];

// Customize Donut chart with center label
Page.Widgets.pieDonutChart2.type = "Donut";
Page.Widgets.pieDonutChart2.donutratio = "0.7";
Page.Widgets.pieDonutChart2.centerlabel = "Total: 100";

// Configure legend and labels
Page.Widgets.pieDonutChart1.showLegend = true;
Page.Widgets.pieDonutChart1.legendPosition = "right";
Page.Widgets.pieDonutChart1.showlabels = "outside";
Page.Widgets.pieDonutChart1.labeltype = "percentage";

// Apply custom colors
Page.Widgets.pieDonutChart1.chartColors = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];
```