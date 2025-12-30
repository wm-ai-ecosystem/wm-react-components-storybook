# Callback Events

| Event | Description |
|-------|-------------|
| `onLegendClick` | Triggered when a user clicks on a legend item. Provides the region name and the mouse event. |
| `onChartClick` | Triggered when a user clicks on a bubble in the chart. Provides the data object, index, and the mouse event. |

### Example Usage

```javascript
// Handle legend click event
Page.Widgets.bubbleChart1.onLegendClick = function(region, event) {
  console.log("Legend clicked:", region);
  // Toggle visibility or apply filters based on region
};

// Handle bubble click event
Page.Widgets.bubbleChart1.onChartClick = function(data, index, event) {
  console.log("Bubble clicked:", data);
  // Show detailed information about the clicked bubble
  // or navigate to a details page
};
```