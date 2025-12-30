# Callback Events

| Event | Description |
|-------|-------------|
| `onChartClick(data: any, event: any)` | Triggered when the user clicks on any part of the chart. Provides the data point clicked and the original event object. |
| `onLegendClick(region: string, e: React.MouseEvent)` | Triggered when the user clicks on a legend item. Provides the region identifier and the original mouse event. |
| `onAreaSelect(dotProp: DotProps, series: any)` | Triggered when the user selects a specific area or data point. Provides the dot properties and the associated data series. |

### Example Usage

```javascript
// Set up chart click handler
Page.Widgets.lineAreaChart1.onChartClick = function(data, event) {
  console.log("Chart clicked!", data);
  // You can navigate to details page based on selected data
  Page.Variables.selectedDataItem.setValue(data);
};

// Handle legend clicks for toggling visibility
Page.Widgets.lineAreaChart1.onLegendClick = function(region, event) {
  console.log("Legend item clicked:", region);
  // Toggle region selection
  let currentSelections = [...Page.Widgets.lineAreaChart1.selectedRegions];
  const index = currentSelections.indexOf(region);
  
  if (index > -1) {
    currentSelections.splice(index, 1);
  } else {
    currentSelections.push(region);
  }
  
  Page.Widgets.lineAreaChart1.selectedRegions = currentSelections;
};

// Handle specific data point selection
Page.Widgets.lineAreaChart1.onAreaSelect = function(dotProp, series) {
  console.log("Selected data point:", dotProp, "from series:", series);
  // Show detailed information in a dialog
  Page.Variables.detailedPointInfo.setValue({
    x: dotProp.cx,
    y: dotProp.cy,
    value: dotProp.value,
    series: series.name
  });
  Page.Widgets.detailsDialog.open();
};
```