# Props

The Popover component doesn't have predefined props in the provided data. However, typical popover implementations would include the following properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `trigger` | String | `'click'` | Defines the interaction that displays the popover (`'click'`, `'hover'`, `'focus'`) |
| `placement` | String | `'bottom'` | Controls the positioning of the popover relative to the trigger element |
| `content` | String/Node | `''` | The content to display within the popover |
| `open` | Boolean | `false` | Controls whether the popover is visible |
| `closeOnOutsideClick` | Boolean | `true` | Determines if clicking outside the popover closes it |
| `arrow` | Boolean | `true` | Shows or hides the directional arrow on the popover |

### Basic Popover Usage
```javascript
// Configure a basic popover
Page.Widgets.myPopover.content = "This is important information";
Page.Widgets.myPopover.placement = "top";

// Open programmatically
Page.Widgets.myPopover.open = true;
```

### Custom Positioning
```javascript
// Position the popover relative to the trigger
Page.Widgets.myPopover.placement = "right-start";

// Add an offset to adjust position
Page.Widgets.myPopover.offset = [0, 10]; // Horizontal and vertical offset
```