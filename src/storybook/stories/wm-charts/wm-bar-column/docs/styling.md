# Styling

The **Bar** or **Column** charts component does not expose any design tokens. Most of the styling is handled internally by the component.


<!-- # Styling

The barColumnChart component uses a combination of default styling and accepts customization through its props. Since the component is based on a charting library, most styling is controlled through the component's properties rather than direct CSS.

## Key Styling Properties

- `chartColors`: Defines the color palette for the chart data series
- `margin`: Controls the internal spacing within the chart
- `offsettop`, `offsetbottom`, `offsetleft`, `offsetright`: Control the external spacing around the chart
- `barSpacing`: Controls the space between bars or columns

## CSS Customization

While most styling is handled by the component's internal logic, you can target the chart container and its SVG elements for additional styling:

```css
/* Target the chart container */
.app-bar-column-chart {
  background-color: #f9f9f9;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

/* Style the axis lines */
.app-bar-column-chart .axis path,
.app-bar-column-chart .axis line {
  stroke: #ccc;
  shape-rendering: crispEdges;
}

/* Style the axis text */
.app-bar-column-chart .axis text {
  font-family: sans-serif;
  font-size: 11px;
  fill: #666;
}

/* Style the legend */
.app-bar-column-chart .legend-item text {
  font-size: 12px;
  fill: #333;
}
```

## Responsive Considerations

The chart attempts to be responsive within its container. For best results:

1. Ensure the container has a defined width and height or fills its parent appropriately
2. Consider adjusting margins, font sizes, and other dimensions based on viewport size
3. For mobile views, you may want to switch to a simpler visualization or adjust the `legendPosition` -->