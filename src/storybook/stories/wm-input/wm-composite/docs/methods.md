# Methods

The composite input component can be accessed programmatically through the Page.Widgets namespace. For example: `Page.Widgets.myInput`

This component does not expose specific methods beyond those inherited from its base implementation. However, you can typically interact with the underlying input using standard DOM methods and properties such as:

```javascript
// Get the current value
const value = Page.Widgets.myInput.datavalue;

// Set a new value
Page.Widgets.myInput.datavalue = "New Value";

// Reset the input
Page.Widgets.myInput.reset();
```

Refer to the base input component documentation for more specific methods that may be available.