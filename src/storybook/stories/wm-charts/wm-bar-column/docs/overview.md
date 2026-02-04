# Overview

The **Bar Chart** or **Column Chart** component allows you to display data as horizontal bars or vertical columns, making it easy to compare values across categories. It supports customization of colors, legends, tooltips, and axis settings, and data can be bound from tables, variables, web services, live filters etc. This enables dynamic visualization of trends, comparisons, and key metrics for analysis and reporting.

### Markup

- Bar Chart

```javascript
<wm-chart type="Bar" title="Bar Chart" height="250px" iconclass="wi wi-bar-chart" name="barChart"></wm-chart>
```

- Column Chart

```javascript
<wm-chart type="Column" title="Column Chart" height="250px" iconclass="wi wi-bar-chart" name="columnChart"></wm-chart>
```

### Examples

#### Properties 

- Sets the visual theme for the bars in the chart

```javascript
Page.Widgets.barChart.theme = "Retro";
```

- Sets the visual colors for the column in the chart

```javascript
Page.Widgets.columnChart.customcolors = "#4CAF50, #2196F3, #FFC107";
```

#### Events 

- Triggered when the user clicks on a specific bar of the Bar Chart (same applies to Column Chart, only the component name differs).

```javascript
    Page.barChartSelect = function ($event, widget, selectedItem, selectedChartItem) {
    // Example dataset reference
    // selectedItem:
    // { x: 'Feb', Sales: 3000, Revenue: 1398, Profit: 2210 }

    // selectedChartItem:
    // { x: 'Feb', y: 2210, series: 0, key: "Sales" , seriesIndex: 0, _dataObj: {...} }

    // Identify which month was clicked
    const month = selectedItem.x;

    // Identify which metric was clicked (Sales / Revenue / Profit)
    const metric = selectedChartItem.key;

    // Value of the clicked bar
    const value = selectedChartItem.y;

    // Example business action: Show details panel
    Page.Widgets.detailsLabel.caption =
        `${metric} for ${month}: ${value}`;

    Page.Widgets.detailsPanel.show = true;
};
```

- Triggered during the initialization phase of the Bar Chart, just before it is rendered on the page (same applies to Column Chart, only the component name differs and some properties).

```javascript
    Page.barChartBeforerender = function (widget, chartInstance) {
    //Example: Apply conditional styling or themes before rendering
    const chartMode = App.Variables.reportConfig.dataSet.chartMode;

    if (chartMode === "finance") {
        widget.theme = "Retro";
    } else if (chartMode === "sales") {
        widget.theme = "Azure";
    } else if (chartMode === "operations") {
        widget.theme = "Orient";
    }
};
```