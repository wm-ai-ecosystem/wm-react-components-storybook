# Methods

FileUpload component methods can be accessed using the pattern:
`Page.Widgets.{widgetName}.{methodName}()`

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| clear | none | void | Removes all uploaded files from the UI |
| setClearIconClass | iconClass: string | void | Sets the CSS class for the clear icon |
| setClearIconHint | hint: string | void | Sets the tooltip text for the clear icon |

## Common Use Cases

```javascript
// Clear all uploaded files programmatically
Page.Widgets.fileUpload1.clear();

// Change clear icon appearance
Page.Widgets.fileUpload1.setClearIconClass("wi wi-trash");
Page.Widgets.fileUpload1.setClearIconHint("Remove all files");

// Example of using onBeforeSelect for validation
Page.Widgets.fileUpload1.onBeforeSelect = function(files) {
    // Check if any file exceeds 2MB
    for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2 * 1024 * 1024) {
            alert("File '" + files[i].name + "' exceeds 2MB limit");
            return false;
        }
    }
    return true;
};
```