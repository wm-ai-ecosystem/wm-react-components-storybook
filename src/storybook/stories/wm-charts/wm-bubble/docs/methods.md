# Methods

The BubbleChart component can be accessed in scripts using the `Page.Widgets.widgetName` syntax. Currently, there are no documented methods specifically for the BubbleChart component beyond the standard properties and events.

You can still manipulate the chart by changing its properties programmatically:

```javascript
// Update chart data dynamically
Page.Widgets.bubbleChart1.data = newDataArray;

// Change selected regions to filter data
Page.Widgets.bubbleChart1.selectedRegions = ["Region A", "Region B"];

// Toggle tooltips
Page.Widgets.bubbleChart1.tooltips = !Page.Widgets.bubbleChart1.tooltips;

// Change chart appearance
Page.Widgets.bubbleChart1.chartColors = ["#ff0000", "#00ff00", "#0000ff"];
```