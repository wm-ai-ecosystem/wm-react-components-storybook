# Props

## Basic Configuration
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | - | A unique identifier for the dialog component |
| title | string | "" | Sets the title text displayed in the dialog header |

## Layout
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| width | string | - | The width of the dialog, can be specified in px or % (e.g., "500px", "75%") |
| height | string | - | The height of the dialog, can be specified in px or % (e.g., "300px", "50%") |
| showHeader | boolean | true | Controls the visibility of the dialog header section |
| modal | boolean | false | When true, adds a backdrop that prevents interaction with the page behind the dialog |

## Behavior
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| enableDefaultCloseAction | boolean | true | When enabled, allows users to close the dialog via the "x" icon in the header or using the ESC key |
| animation | string | - | Controls the animation style applied to the dialog when opening or closing |

## Graphics
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| iconClass | string | - | CSS class for the icon displayed in the dialog |
| iconWidth | string | - | Width of the icon (best specified in pixels) |
| iconHeight | string | - | Height of the icon (best specified in pixels) |
| iconMargin | string | - | Margin around the icon to adjust spacing between the icon and dialog content |

## Accessibility
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| tabindex | number | 0 | Specifies the tab order for the dialog component (-1 makes it non-focusable) |

## Common Dialog Usage
```javascript
// Open dialog on button click
Page.button1Click = function($event, widget) {
    Page.Widgets.designDialog1.open();
};

// Close dialog programmatically
Page.closeButtonClick = function($event, widget) {
    Page.Widgets.designDialog1.close();
};

// Configure dialog as modal
Page.Widgets.designDialog1.modal = true;
```