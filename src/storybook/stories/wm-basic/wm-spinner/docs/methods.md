# Methods

The Spinner component can be accessed in scripts using the syntax: `Page.Widgets.spinnerName`

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| show | None | None | Shows the spinner component |
| hide | None | None | Hides the spinner component |

## Common Method Use Cases

```javascript
// Show spinner before a time-consuming operation
Page.Widgets.spinner1.show();

// Perform operation
setTimeout(function() {
  // Operation complete
  Page.Widgets.spinner1.hide();
}, 3000);

// Alternative approach using the show property
Page.Widgets.spinner1.show = true;
// Later...
Page.Widgets.spinner1.show = false;
```