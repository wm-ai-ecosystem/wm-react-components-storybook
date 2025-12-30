# Methods

The `lineAreaChart` component can be accessed through script using the standard widget reference: `Page.Widgets.lineAreaChartName`.

Currently, this component does not expose specific public methods beyond the standard property getters and setters. Interactions with the chart should be done through configuration of the props and handling of events.

To manipulate the chart programmatically, you can set its properties directly:

```javascript
// Dynamically change chart type
Page.Widgets.lineAreaChart1.type = "Area";

// Update data source
Page.Widgets.lineAreaChart1.data = Page.Variables.myUpdatedDataset.dataSet;

// Change styling
Page.Widgets.lineAreaChart1.chartColors = ["#FF5733", "#33FF57", "#3357FF"];
Page.Widgets.lineAreaChart1.interpolation = "basis";

// Toggle visibility of legend
Page.Widgets.lineAreaChart1.showLegend = !Page.Widgets.lineAreaChart1.showLegend;

// Change legend position
Page.Widgets.lineAreaChart1.legendPosition = "right";
```