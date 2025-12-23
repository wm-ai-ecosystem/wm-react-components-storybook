# Styling

Buttons support various styling options to customize their appearance in your mobile application.

## Style Classes

The Button component can use the following style classes:

| Class | Description |
|-------|-------------|
| btn-primary | Primary action button with brand color |
| btn-secondary | Secondary action button |
| btn-success | Button indicating a successful action |
| btn-danger | Button indicating a destructive action |
| btn-warning | Button indicating a cautionary action |
| btn-info | Button providing informational actions |
| btn-light | Button with light background |
| btn-dark | Button with dark background |
| btn-link | Button appearing as a link |

## Size Classes

Size classes can be combined with style classes to adjust button dimensions:

| Class | Description |
|-------|-------------|
| btn-xs | Extra small button |
| btn-sm | Small button |
| btn-md | Medium button (default) |
| btn-lg | Large button |

## Custom Styling

Additional styling can be applied to buttons using custom styles:

```javascript
// Apply custom style classes
Page.Widgets.myButton.class = "btn-primary btn-lg my-custom-class";

// Apply conditional styling
if (isHighPriority) {
  Page.Widgets.actionButton.class = "btn-danger btn-lg";
} else {
  Page.Widgets.actionButton.class = "btn-warning btn-lg";
}
```

> Note: For mobile apps, all styling should be compatible with React Native styling conventions.