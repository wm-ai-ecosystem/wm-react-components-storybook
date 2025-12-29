# Methods

Access the popover component methods using: `Page.Widgets.popoverWidgetName`

Typical popover components would include these methods:

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `open()` | None | void | Opens/displays the popover |
| `close()` | None | void | Closes/hides the popover |
| `toggle()` | None | void | Toggles the visibility of the popover |
| `updatePosition()` | None | void | Recalculates and updates the popover position |
| `setContent(content)` | content: String/Node | void | Updates the content of the popover |

### Common Use Cases

```javascript
// Programmatically open the popover
Page.Widgets.myPopover.open();

// Close the popover after a specific action
function onActionComplete() {
  Page.Widgets.myPopover.close();
}

// Toggle the popover visibility
Page.Widgets.myPopover.toggle();

// Update popover content dynamically
Page.Widgets.myPopover.setContent("Updated information: " + newValue);
```