# Callback Events

| Event | Description |
|-------|-------------|
| `onChartClick(data, index, event)` | Triggered when a chart segment is clicked. Provides the data object, segment index, and the original mouse event. |
| `onLegendClick(region, e)` | Triggered when a legend item is clicked. Provides the region name/ID and the original mouse event. |

## Examples

```javascript
// Handle chart segment click
Page.Widgets.pieDonutChart1.onChartClick = function(data, index, event) {
  console.log("Clicked segment data:", data);
  console.log("Segment index:", index);
  
  // Perform actions based on clicked segment
  if (data.category === "Category A") {
    // Navigate to details page
    Page.Actions.goToDetailPage.invoke({"categoryId": data.id});
  }
};

// Handle legend item click
Page.Widgets.pieDonutChart1.onLegendClick = function(region, event) {
  console.log("Legend region clicked:", region);
  
  // Toggle selection of the region
  let currentSelected = Page.Widgets.pieDonutChart1.selectedRegions || [];
  
  if (currentSelected.includes(region)) {
    // Deselect the region
    Page.Widgets.pieDonutChart1.selectedRegions = currentSelected.filter(r => r !== region);
  } else {
    // Select the region
    Page.Widgets.pieDonutChart1.selectedRegions = [...currentSelected, region];
  }
};
```