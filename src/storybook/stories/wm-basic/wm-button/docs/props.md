# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **Basic Configuration** |
| caption | string | "Button" | Text displayed on the button |
| type | "button" \| "submit" \| "reset" | "button" | Specifies the button type; use "submit" or "reset" when used within forms |
| disabled | boolean | false | When true, the button becomes non-interactive |
| **Icon Properties** |
| iconurl | string | "" | URL to an image to display as an icon |
| iconclass | string | "" | CSS class name for an icon (alternative to iconurl) |
| iconwidth | string | "" | Width of the icon (e.g., "24px") |
| iconheight | string | "" | Height of the icon (e.g., "24px") |
| iconmargin | string | "" | Margin around the icon (e.g., "0px 8px 0px 0px") |
| **Additional Features** |
| badgevalue | string \| number | "" | Value to display in a badge associated with the button |
| shortcutkey | string | "" | Keyboard shortcut to trigger the button action |
| children | ReactNode | null | React children elements to render inside the button |

## Common Use Cases

### Basic Button
```javascript
// Set button caption
Page.Widgets.myButton.caption = "Submit Form";

// Disable/enable button based on a condition
Page.Widgets.myButton.disabled = !formIsValid;
```

### Using Icons
```javascript
// Set an icon using icon class
Page.Widgets.actionButton.iconclass = "wm-icon-plus";

// Set an icon using image URL
Page.Widgets.downloadButton.iconurl = "resources/images/download.png";
Page.Widgets.downloadButton.iconwidth = "20px";
Page.Widgets.downloadButton.iconheight = "20px";
Page.Widgets.downloadButton.iconmargin = "0px 8px 0px 0px";
```

### Using Badge
```javascript
// Show notification count as badge
Page.Widgets.notificationButton.badgevalue = 5;

// Clear badge
Page.Widgets.notificationButton.badgevalue = "";
```