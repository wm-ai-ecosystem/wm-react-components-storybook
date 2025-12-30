# Callback Events

| Event | Description |
| ----- | ----------- |
| `onChartClick(data: any, event: any)` | Triggered when a user clicks on any part of the chart. Returns the data associated with the clicked element and the original mouse event. |
| `onLegendClick(region: string, e: React.MouseEvent)` | Triggered when a user clicks on a legend item. Returns the region/category name that was clicked and the original mouse event. |

## Example Usage

### Handling Chart Click Events

```javascript
Page.onChartClick = function(data, event) {
  // data contains the information about the clicked bar/column
  console.log("Clicked on data point:", data);
  
  // You can extract specific properties from the data
  if (data && data.value) {
    App.Variables.selectedValue.setValue(data.value);
  }
};
```

### Handling Legend Click Events

```javascript
Page.onLegendClick = function(region, event) {
  // region contains the name of the clicked legend item
  console.log("Legend clicked:", region);
  
  // You might use this to toggle visibility or highlight specific regions
  var currentSelection = Page.Widgets.barColumnChart1.selectedRegions || [];
  
  // Toggle selection logic
  var index = currentSelection.indexOf(region);
  if (index === -1) {
    currentSelection.push(region);
  } else {
    currentSelection.splice(index, 1);
  }
  
  Page.Widgets.barColumnChart1.selectedRegions = currentSelection;
};
```