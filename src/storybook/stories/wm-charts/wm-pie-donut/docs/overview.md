# Overview

The **Pie** or **Donut** Chart component allows you to display data as a pie or donut, making it easy to visualize proportions and part-to-whole relationships. It supports customization of colors, legends, labels, and tooltips. Data can be bound from tables, variables, web services, live filters, or other sources, enabling dynamic visualization of distributions and comparisons for analysis and reporting.

### Markup

- Pie Chart

```javascript
<wm-chart type="Pie" title="Pie Chart" height="250px" iconclass="wi wi-pie-chart" name="pieChart"></wm-chart>
```

- Donut Chart

```javascript
<wm-chart type="Donut" title="Donut Chart" height="250px" iconclass="wi wi-donut-large" name="donutChart"></wm-chart>
```


### Examples

#### Properties 

- Sets the visual theme for the pie in the chart

```javascript
Page.Widgets.pieChart.theme = "Retro";
```

- Sets the visual colors for the donut in the chart

```javascript
Page.Widgets.donutChart.customcolors = "#4CAF50, #2196F3, #FFC107";
```

#### Events 

- Triggered during the initialization phase of the Pie Chart, just before it is rendered on the page (same applies to Donut Chart, only the component name differs and some properties).

```javascript
    Page.pieChartBeforerender = function (widget, chartInstance) {
    // Show the legend
    // Set legend type to "classic"
    widget.legendtype = "classic";
    widget.showlegend = true;
};
```