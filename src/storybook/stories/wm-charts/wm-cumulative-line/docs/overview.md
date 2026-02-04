# Overview

The **Cumulative Line Chart** component displays data as a continuously increasing line, making it easy to track totals or running sums over time. It supports customization of colors, legends, tooltips, and axis settings, ensuring clear visualization of accumulated metrics. Data can be bound from tables, variables, web services, live filters, or other sources, allowing dynamic updates as new values are added.

### Markup

```javascript
<wm-chart type="Cumulative Line" title="Cumulative Line Chart" height="250px" iconclass="wi wi-line-chart" name="cumulativeLineChart"></wm-chart>
```

### Examples

#### Properties 

- Sets the visual theme for the chart

```javascript
Page.Widgets.cumulativeLineChart.theme = "Retro";
```

- Sets the visual colors for the  the chart

```javascript
Page.Widgets.cumulativeLineChart.customcolors = "#4CAF50, #2196F3, #FFC107";
```

#### Events 

- Triggered during the initialization phase of the chart, just before it is rendered on the page.

```javascript
    Page.cumulativeLineChartBeforerender = function (widget, chartInstance) {
    // Example: Choose line interpolation based on a dataset or configuration variable
    const chartMode = App.Variables.reportConfig.dataSet.lineStyle; // "linear", "step", "cardinal"

    if(chartMode === "linear") {
        chartInstance.interpolate("linear");    // Smooth straight lines
    } else if(chartMode === "step") {
        chartInstance.interpolate("step");      // Step-like progression
    } else if(chartMode === "cardinal") {
        chartInstance.interpolate("cardinal");  // Smooth curves
    }
};
```