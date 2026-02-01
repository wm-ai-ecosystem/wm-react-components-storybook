# Callback Events

<details open>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onSelect` | This event handler is called each time a user selects a line or area in the chart. |
        | `onBeforeRender` | This event handler is called just before the line or area chart is rendered on the page. |
        | `onTransform` | This event handler is called when the data or configuration of the line or area chart is transformed prior to rendering. |
    </div>
</details>


### Use Cases

- Triggered when the user clicks on a point of the Line Chart (same applies to Area Chart, only the component name differs).

```javascript
    Page.lineChartSelect = function ($event, widget, selectedItem, selectedChartItem) {
    //Example: Clicking the data point for “March” displays detailed sales breakdown for that month in a panel.
};
```

- Triggered during the initialization phase of the Line Chart, just before it is rendered on the page (same applies to Area Chart, only the component name differs).

```javascript
    Page.lineChartBeforerender = function (widget, chartInstance) {
    //Example: Customize chart options before rendering
};
```

- Triggered when the Line Chart is re-rendered due to data updates, filtering, or configuration changes (same applies to Area Chart, only the component name differs).

```javascript
    Page.lineChartTransform = function ($event, widget) {
    //Example: Modify incoming data before display (format values, apply calculations)
};
```