# Methods

The barColumnChart component can be accessed programmatically using the Page.Widgets namespace:

```javascript
Page.Widgets.barColumnChart1
```

The component doesn't expose specific public methods beyond the standard properties and event handlers. However, you can manipulate the component by directly setting its properties.

## Common Patterns

### Updating Chart Data Dynamically

```javascript
// After receiving new data from a service call
Page.ServiceVariableSuccess = function(variable, data) {
  // Update the chart with new data
  Page.Widgets.barColumnChart1.data = data;
};
```

### Toggling Between Bar and Column View

```javascript
Page.switchChartType = function() {
  var chart = Page.Widgets.barColumnChart1;
  
  // Toggle between Bar and Column types
  if (chart.type === "Bar") {
    chart.type = "Column";
  } else {
    chart.type = "Bar";
  }
};
```

### Filtering Data Regions

```javascript
Page.filterByRegion = function(regionArray) {
  // Set the selected regions to filter the chart
  Page.Widgets.barColumnChart1.selectedRegions = regionArray;
};
```