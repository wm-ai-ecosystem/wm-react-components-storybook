# Callback Events

<details open>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onSelect` | This event handler is called each time a user selects a line in the chart. |
        | `onBeforeRender` | This event handler is called just before the chart is rendered on the page. |
        | `onTransform` | This event handler is called when the data or configuration of the chart is transformed prior to rendering. |
    </div>
</details>


### Use Cases

- Triggered when a user clicks on a line or data point.

```javascript
    Page.cumulativeLineChartSelect = function ($event, widget, selectedItem, selectedChartItem) {
    //Example: Clicking the cumulative revenue line for March shows a detailed breakdown of sales, refunds, and promotions for that month.
};
```

- Triggered during the initialization phase of the chart, just before it is rendered on the page.

```javascript
    Page.cumulativeLineChartBeforerender = function (widget, chartInstance) {
    //Example: Highlight months where revenue exceeded targets or apply custom line colors.
};
```

- Triggered when the chart is re-rendered due to data updates, filtering, or configuration changes.

```javascript
    Page.cumulativeLineChartTransform = function ($event, widget) {
    //Example: Filter the chart to show only the last quarter or calculate cumulative totals from raw monthly data.
};
```