# Styling

The color-picker component does not have documented styling options. However, typical color picker components often support the following CSS customization:

| CSS Class | Description |
|-----------|-------------|
| `.color-picker` | The main container element of the color picker |
| `.color-picker-trigger` | The clickable element that shows the current color |
| `.color-picker-panel` | The popup panel containing the color selection interface |
| `.color-picker-palette` | The container for the color palette swatches |
| `.color-picker-slider` | Sliders for adjusting hue, saturation, brightness, etc. |
| `.color-picker-input` | Text input fields for entering color values manually |
| `.color-picker-swatch` | Individual color swatches in the palette |
| `.color-picker-preview` | Preview area showing the selected color |

## Custom Styling Examples

```css
/* Customize the color picker trigger button */
.color-picker-trigger {
  border-radius: 50%;
  border: 2px solid #ccc;
  transition: all 0.3s ease;
}

/* Style the color palette area */
.color-picker-palette {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

/* Style individual color swatches */
.color-picker-swatch {
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-picker-swatch:hover {
  transform: scale(1.1);
}
```

For accessibility, ensure sufficient contrast between UI elements and maintain appropriate focus indicators when customizing the appearance.