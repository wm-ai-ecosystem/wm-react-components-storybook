# Methods

The PieDonutChart component can be accessed in scripts using `Page.Widgets.widgetName`, where `widgetName` is the name you've given to your chart instance.

This component doesn't expose specific methods beyond the standard widget properties and events. However, you can dynamically modify its properties through JavaScript:

```javascript
// Dynamically update chart data
Page.Widgets.pieDonutChart1.data = newDataArray;

// Change chart type on the fly
Page.Widgets.pieDonutChart1.type = "Donut";

// Update selected regions
Page.Widgets.pieDonutChart1.selectedRegions = ["region1", "region3"];

// Toggle tooltips
Page.Widgets.pieDonutChart1.tooltips = !Page.Widgets.pieDonutChart1.tooltips;

// Change the color scheme
Page.Widgets.pieDonutChart1.chartColors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];
```