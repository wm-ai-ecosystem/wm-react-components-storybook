# Styling

The `lineAreaChart` component can be styled using custom CSS classes and by configuring its visual properties.

## CSS Classes

You can add custom CSS classes to the chart container to control layout and positioning. The chart internally uses SVG elements which can be targeted with CSS selectors for advanced styling.

Common selectors include:

- `.line-area-chart-container` - The main chart container
- `.recharts-line` - The line elements in line charts
- `.recharts-area` - The area elements in area charts
- `.recharts-legend-item` - Legend items
- `.recharts-tooltip-wrapper` - Tooltip container
- `.recharts-cartesian-axis-tick-value` - Axis tick labels

## Visual Styling through Props

The most effective way to style the `lineAreaChart` is through its props:

- Use `chartColors` to set custom colors for data series
- Adjust `strokeWidth` to make lines thicker or thinner
- Change `pointSize` to make data points more or less prominent
- Use `interpolation` to change how lines connect between data points
- Configure `margin` and `offset*` properties to control chart positioning

## Example CSS Styling

```css
/* Make the chart container have a light background with a border */
.app-lineAreaChart.line-area-chart-container {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 10px;
}

/* Style the lines in a line chart */
.app-lineAreaChart .recharts-line path {
  stroke-dasharray: none; /* Remove any dashed pattern */
}

/* Make hover effects for data points */
.app-lineAreaChart .recharts-dot:hover {
  transform: scale(1.5);
  transition: transform 0.2s ease-in-out;
}

/* Style the legend */
.app-lineAreaChart .recharts-legend-item {
  font-weight: bold;
  font-size: 12px;
}

/* Style the tooltips */
.app-lineAreaChart .recharts-tooltip-wrapper {
  border-radius: 4px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);
}

/* Style the axis labels */
.app-lineAreaChart .recharts-cartesian-axis-tick-value {
  font-size: 11px;
  fill: #6c757d;
}
```

Note that these CSS examples assume the chart has a class like `app-lineAreaChart` which should be replaced with your actual widget class name.