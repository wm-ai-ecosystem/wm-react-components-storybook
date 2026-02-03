# Styling

The **Pie** or **Donut** charts component does not expose any design tokens. Most of the styling is handled internally by the component.

<!-- # Styling

The PieDonutChart component uses SVG for rendering and can be styled using custom CSS classes. While the component itself handles most of the visual presentation through its props, you can further customize its appearance using CSS.

The chart is rendered within a container div that can be styled for positioning and sizing:

```css
/* Target the chart container */
.app-pieDonutChart {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Style chart tooltips */
.pie-tooltip {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* Style chart legends */
.chart-legend text {
  font-family: Arial, sans-serif;
  font-size: 12px;
}

/* Style chart labels */
.chart-labels text {
  fill: white;
  font-weight: bold;
  font-size: 11px;
}
```

Since this is an SVG-based chart, many styles are applied directly to SVG elements:

- Chart segments are rendered as SVG `path` elements
- Labels are rendered as SVG `text` elements
- The legend uses a combination of SVG elements and/or HTML depending on configuration

Note that some styling capabilities might be limited by the underlying chart implementation, and changing certain visual aspects may require using the component's props rather than CSS. -->