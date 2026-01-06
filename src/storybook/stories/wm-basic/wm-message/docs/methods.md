# Methods

Message widget methods can be accessed via JavaScript using the widget reference: `Page.Widgets.widgetName`

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| showMessage | None | void | Displays the message widget |
| hideMessage | None | void | Hides the message widget |

## Usage Examples

```javascript
// Display a message
Page.Widgets.message1.showMessage();

// Hide a message
Page.Widgets.message1.hideMessage();

// Complete example: Show success message after API call
Page.Variables.myAPI.invoke({
    onSuccess: function(data) {
        Page.Widgets.message1.type = "success";
        Page.Widgets.message1.caption = "Data retrieved successfully";
        Page.Widgets.message1.showMessage();
        
        // Auto-hide after 3 seconds
        setTimeout(function() {
            Page.Widgets.message1.hideMessage();
        }, 3000);
    },
    onError: function(error) {
        Page.Widgets.message1.type = "error";
        Page.Widgets.message1.caption = "Failed to retrieve data: " + error;
        Page.Widgets.message1.showMessage();
    }
});
```