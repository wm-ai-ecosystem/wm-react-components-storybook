# Methods

The Switch widget can be accessed programmatically via the Page.Widgets namespace. For example: `Page.Widgets.mySwitch`

While the Switch widget doesn't expose specific public methods beyond standard property access, you can manipulate its state and behavior through its properties.

## Common Method-like Operations

```javascript
// Get the current value
var currentValue = Page.Widgets.mySwitch.value;

// Set a new value programmatically
Page.Widgets.mySwitch.value = "option2";

// Enable/disable the switch
Page.Widgets.mySwitch.disabled = true; // disable
Page.Widgets.mySwitch.disabled = false; // enable

// Show/hide the switch
Page.Widgets.mySwitch.show = false; // hide
Page.Widgets.mySwitch.show = true; // show

// Update the dataset dynamically
Page.Widgets.mySwitch.dataset = ["option1", "option2", "option3", "option4"];
```