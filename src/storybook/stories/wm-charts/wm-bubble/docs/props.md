# Props

## Data Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | Array of data objects to be visualized in the bubble chart |
| `dataKeys` | `string[]` | `[]` | Array of keys to extract data values from the data objects |
| `xDataKeyArr` | `string[]` | `[]` | Array of keys to determine x-axis values |
| `selectedRegions` | `string[]` | `[]` | Array of region names to filter and display in the chart |
| `chartColors` | `string[]` | `[]` | Array of color strings used for different data series |

## Layout & Positioning

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `offsettop` | `number` | `0` | Top offset of the chart in pixels |
| `offsetbottom` | `number` | `0` | Bottom offset of the chart in pixels |
| `offsetleft` | `number` | `0` | Left offset of the chart in pixels |
| `offsetright` | `number` | `0` | Right offset of the chart in pixels |
| `margin` | `{ top: number; right: number; left: number; bottom: number; }` | `{ top: 20, right: 20, left: 50, bottom: 50 }` | Object specifying chart margins |

## Appearance & Formatting

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `TBubbleChartShape \| ScatterCustomizedShape` | `'circle'` | Shape to use for bubbles (can be a predefined shape or custom component) |
| `numberFormat` | `string` | `''` | Format string for numerical values displayed in the chart |
| `tooltips` | `boolean` | `true` | Whether to show tooltips on hover |
| `showLegend` | `boolean` | `true` | Whether to display the chart legend |
| `legendPosition` | `"top" \| "bottom" \| "right"` | `'bottom'` | Position of the legend relative to the chart |

## Axis Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `xAxisConfig` | `any` | `{}` | Configuration object for the X-axis |
| `yAxisConfig` | `any` | `{}` | Configuration object for the Y-axis |

### Common Use Cases

```javascript
// Basic bubble chart configuration
Page.Widgets.bubbleChart1.data = [
  { name: "Group A", value: 400, count: 20, radius: 30 },
  { name: "Group B", value: 300, count: 15, radius: 25 },
  { name: "Group C", value: 500, count: 30, radius: 35 }
];
Page.Widgets.bubbleChart1.dataKeys = ["value", "count", "radius"];
Page.Widgets.bubbleChart1.xDataKeyArr = ["name"];

// Customizing chart appearance
Page.Widgets.bubbleChart1.chartColors = ["#8884d8", "#82ca9d", "#ffc658"];
Page.Widgets.bubbleChart1.shape = "circle";

// Configuring axes
Page.Widgets.bubbleChart1.xAxisConfig = { 
  label: "Categories", 
  tickCount: 5,
  padding: { left: 10, right: 10 }
};
Page.Widgets.bubbleChart1.yAxisConfig = { 
  label: "Values", 
  domain: [0, 600],
  tickFormatter: (value) => `${value}k`
};
```