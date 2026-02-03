# Styling

The **Cumulative Line** chart component does not expose any design tokens. Most of the styling is handled internally by the component.


<!-- # Styling

The BubbleChart component uses SVG for rendering, and many visual aspects can be controlled through component properties rather than CSS. However, you can still apply custom styling for fine-grained control.

## Container Styling

You can style the container of the chart using standard CSS:

```css
.bubble-chart-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 10px;
}
```

## SVG Elements

You can target specific SVG elements within the chart for custom styling:

```css
/* Style the bubbles */
.bubble-chart .recharts-symbols {
  stroke-width: 1;
  stroke: #fff;
}

/* Style the chart grid lines */
.bubble-chart .recharts-cartesian-grid-horizontal line,
.bubble-chart .recharts-cartesian-grid-vertical line {
  stroke: #e0e0e0;
  stroke-dasharray: 3 3;
}

/* Style axis labels */
.bubble-chart .recharts-cartesian-axis-tick-value {
  font-size: 12px;
  fill: #666;
}

/* Style tooltips */
.bubble-chart .recharts-tooltip-wrapper .recharts-default-tooltip {
  background-color: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid #ccc !important;
  border-radius: 4px !important;
  padding: 10px !important;
}
```

Note that the exact class names may vary depending on the implementation of the chart component. Inspect the rendered DOM elements to identify the correct selectors for your specific instance. -->