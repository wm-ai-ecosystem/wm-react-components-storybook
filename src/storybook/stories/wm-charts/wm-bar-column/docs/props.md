# Props

## Chart Configuration
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `type` | `"Bar" \| "Column"` | `"Column"` | Determines whether the chart displays horizontal bars or vertical columns |
| `data` | `any[]` | `[]` | The dataset to be displayed in the chart |
| `dataKeys` | `string[]` | `[]` | Array of keys to access the data values from the dataset |
| `xDataKeyArr` | `string[]` | `[]` | Array of keys for the x-axis values |
| `chartColors` | `string[]` | `[]` | Array of colors to be used for different data series |
| `viewtype` | `TChartViewType` | - | The viewing type of the chart |

## Layout Configuration
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `offsettop` | `number` | `0` | Top offset for the chart container |
| `offsetbottom` | `number` | `0` | Bottom offset for the chart container |
| `offsetleft` | `number` | `0` | Left offset for the chart container |
| `offsetright` | `number` | `0` | Right offset for the chart container |
| `margin` | `{ top: number; right: number; left: number; bottom: number; }` | `{ top: 20, right: 20, left: 50, bottom: 50 }` | Margins for the chart within its container |
| `barSpacing` | `string` | `"0.1"` | Spacing between bars or columns as a ratio (0-1) |

## Axis Configuration
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `xAxisConfig` | `any` | - | Configuration options for the x-axis |
| `yAxisConfig` | `any` | - | Configuration options for the y-axis |

## Legend Configuration
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `showLegend` | `boolean` | `true` | Determines whether the legend should be displayed |
| `showlegend` | `boolean` | - | Alternative prop for legend display control |
| `shouldShowLegend` | `boolean` | - | Final computed property for legend visibility |
| `legendPosition` | `"top" \| "bottom" \| "right"` | `"bottom"` | Position of the legend relative to the chart |
| `legendtype` | `TChartLegendType` | - | Type of legend to display |

## Visual Configuration
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `showValues` | `boolean` | `false` | Determines whether to display data values on bars/columns |
| `tooltips` | `boolean` | `true` | Enables or disables tooltips on hovering over data points |
| `numberFormat` | `string` | - | Format string for numerical values (e.g., ".0f" for integers, ".2f" for 2 decimal places) |

## Data Selection
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `selectedRegions` | `string[]` | `[]` | Array of currently selected data regions or categories |
| `availableRegions` | `string[]` | `[]` | Array of all available regions or categories |

### Common Use Cases

#### Basic Column Chart Configuration
```javascript
// Create a basic column chart
Page.Widgets.barColumnChart1.type = "Column";
Page.Widgets.barColumnChart1.data = myDataService.dataSet;
Page.Widgets.barColumnChart1.dataKeys = ["sales", "revenue"];
Page.Widgets.barColumnChart1.xDataKeyArr = ["month"];
```

#### Horizontal Bar Chart with Custom Colors
```javascript
// Create a horizontal bar chart with custom colors
Page.Widgets.barColumnChart1.type = "Bar";
Page.Widgets.barColumnChart1.chartColors = ["#FF6384", "#36A2EB", "#FFCE56"];
Page.Widgets.barColumnChart1.barSpacing = "0.2"; // More space between bars
```

#### Configure Chart Margins and Legend
```javascript
// Adjust chart margins and legend position
Page.Widgets.barColumnChart1.margin = {
  top: 30,
  right: 30,
  bottom: 70,
  left: 60
};
Page.Widgets.barColumnChart1.legendPosition = "right";
Page.Widgets.barColumnChart1.showValues = true; // Show values on bars/columns
```