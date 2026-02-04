# Overview

The **Line Chart** or **Area Chart** component allows you to display data as a line or an area, making it easy to visualize trends and changes over time. It supports customization of colors, legends, tooltips, and axis settings. Data can be bound from tables, variables, web services, live filters, or other sources, enabling dynamic visualization of trends, comparisons, and key metrics for analysis and reporting.

### Markup

- Line Chart

```javascript
<wm-chart type="Line" title="Line Chart" height="250px" iconclass="wi wi-line-chart" name="lineChart"></wm-chart>
```

- Area Chart

```javascript
<wm-chart type="Area" title="Area Chart" height="250px" iconclass="fa fa-area-chart" name="areaChart"></wm-chart>
```

### Examples

#### Properties 

- Sets the visual theme for the line in the chart

```javascript
Page.Widgets.lineChart.theme = "Retro";
```

- Sets the visual colors for the area in the chart

```javascript
Page.Widgets.areaChart.customcolors = "#4CAF50, #2196F3, #FFC107";
```

#### Events 

- Triggered during the initialization phase of the Line Chart, just before it is rendered on the page (same applies to Area Chart, only the component name differs and some properties).

```javascript
    Page.lineChartBeforerender = function (widget, chartInstance) {
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