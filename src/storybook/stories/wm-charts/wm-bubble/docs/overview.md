# Overview

The **Bubble Chart** component is a powerful visualization tool that displays data as bubbles. Each bubble’s position represents two variables (X and Y), while its size represents a third variable, allowing you to visualize relationships between three dimensions of data at once. Data can be bound from tables, variables, web services, live filters etc. This makes it ideal for spotting patterns, correlations, and trends in complex datasets.

### Markup

```javascript
<wm-chart type="Bubble" title="Bubble Chart" height="250px" iconclass="wi wi-bubble-chart" name="bubbleChart"></wm-chart>
```

### Examples

#### Properties 

- Sets the visual theme for the bubbles in the chart

```javascript
Page.Widgets.bubbleChart.theme = "Retro";
```

- Sets the visual colors for the bubbles in the chart

```javascript
Page.Widgets.bubbleChart.customcolors = "#4CAF50, #2196F3, #FFC107";
```

#### Events 

- Triggered during the initialization phase of the bubble chart, just before it is rendered on the page.

```javascript
    Page.bubbleChartBeforerender = function (widget, chartInstance) {
    // Example: Customize the bubble appearance before rendering
    chartInstance.pointShape("square");
};
```