# Methods

The Anchor component can be accessed in script using `Page.Widgets.widgetName` where `widgetName` is the name you assigned to the widget.

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| `focus` | None | None | Sets focus to the anchor component. |
| `blur` | None | None | Removes focus from the anchor component. |
| `show` | None | None | Makes the anchor visible. |
| `hide` | None | None | Hides the anchor. |

## Common Method Use Cases

```javascript
// Programmatically focus the anchor
Page.Widgets.myAnchor.focus();

// Dynamically show/hide based on condition
if (someCondition) {
  Page.Widgets.myAnchor.show();
} else {
  Page.Widgets.myAnchor.hide();
}
```