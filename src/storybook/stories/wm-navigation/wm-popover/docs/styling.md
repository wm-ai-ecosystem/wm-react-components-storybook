# Styling

The Popover component can be customized using CSS classes. While specific styling options aren't provided in the component data, typical styling approaches include:

## CSS Classes

| Class | Purpose |
|-------|--------|
| `.popover-container` | The main wrapper for the popover component |
| `.popover-trigger` | Styles the trigger element that activates the popover |
| `.popover-content` | Styles the popover body containing the displayed content |
| `.popover-arrow` | Styles the directional arrow that points to the trigger |
| `.popover-header` | Styles the optional header section of the popover |
| `.popover-footer` | Styles the optional footer section of the popover |

## Custom Styling Examples

```css
/* Customize the popover appearance */
.popover-container {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Style the popover content */
.popover-content {
  padding: 16px;
  font-size: 14px;
  max-width: 300px;
}

/* Custom arrow styling */
.popover-arrow {
  border-color: #f8f9fa;
}
```

## Theme Variations

You can create theme variations for the popover by applying modifier classes:

- `.popover-light` - Light themed popover with dark text
- `.popover-dark` - Dark themed popover with light text
- `.popover-warning` - Warning-styled popover with appropriate colors
- `.popover-info` - Information-styled popover with appropriate colors