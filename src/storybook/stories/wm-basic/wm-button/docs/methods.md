# Methods

Buttons can be accessed and manipulated through JavaScript using the `Page.Widgets.widgetName` notation in your application scripts.

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| getWidgetProperty | propertyName: string | any | Returns the current value of the specified property |
| setWidgetProperty | propertyName: string, value: any | void | Sets a new value for the specified property |

## Common Method Use Cases

```javascript
// Get the current caption
var currentCaption = Page.Widgets.myButton.getWidgetProperty('caption');

// Update the button caption
Page.Widgets.myButton.setWidgetProperty('caption', 'Processing...');

// Disable the button during async operation
Page.Widgets.myButton.setWidgetProperty('disabled', true);

// Re-enable the button after operation completes
function enableButton() {
  Page.Widgets.myButton.setWidgetProperty('disabled', false);
  Page.Widgets.myButton.setWidgetProperty('caption', 'Submit');
}
```

## Visibility Control

```javascript
// Hide the button
Page.Widgets.myButton.setWidgetProperty('show', false);

// Show the button
Page.Widgets.myButton.setWidgetProperty('show', true);

// Get the current visibility state
var isVisible = Page.Widgets.myButton.getWidgetProperty('show');
```