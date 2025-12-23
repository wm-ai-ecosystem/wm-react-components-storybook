# Methods

Label components can be accessed and manipulated through JavaScript using the Page.Widgets namespace.

The basic syntax for accessing a label is:

```javascript
Page.Widgets.labelName
```

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getProperty | property (string) | any | Gets the specified property's value for the label widget. |
| setProperty | property (string), value (any) | void | Sets the specified property's value for the label widget. |

### Common Method Usage

```javascript
// Get the current caption
var labelText = Page.Widgets.myLabel.getProperty("caption");

// Set a new caption
Page.Widgets.myLabel.setProperty("caption", "New label text");

// Check if label is visible
var isVisible = Page.Widgets.myLabel.getProperty("show");

// Change text alignment
Page.Widgets.myLabel.setProperty("horizontalAlign", "center");
```