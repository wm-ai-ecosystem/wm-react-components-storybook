# Props

## Dialog Control Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | `false` | Controls whether the dialog is visible or hidden. |
| `modal` | boolean | `true` | When true, blocks interaction with content behind the dialog. |
| `closable` | boolean | `true` | When true, displays a close button and allows ESC key to close the dialog. |
| `showheader` | boolean | `true` | Controls visibility of the dialog header section. |
| `showactions` | boolean | `true` | Controls visibility of the dialog action buttons. |

## Content Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `url` | string | `""` | The URL to load in the iframe. |
| `encodeurl` | boolean | `false` | When true, encodes the URL to handle special characters. |
| `hint` | string | `""` | Additional information displayed as a tooltip or helper text. |

## Header Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `""` | Text displayed in the dialog header. |
| `headinglevel` | "h1" \| "h2" \| "h4" | `"h2"` | Semantic heading level for the dialog title. |
| `iconclass` | string | `""` | CSS class for an icon displayed in the header. |
| `iconurl` | string | `""` | URL to an image to display as an icon in the header. |
| `iconwidth` | string | `""` | Width of the header icon. |
| `iconheight` | string | `""` | Height of the header icon. |
| `iconmargin` | string | `""` | Margin around the header icon. |

## Action Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `oktext` | string | `"OK"` | Text displayed on the primary action button. |

## Common Use Cases

```javascript
// Basic implementation with required URL
Page.Widgets.iframeDialog.url = "https://example.com/embedded-content";
Page.Widgets.iframeDialog.open = true;

// Create a modal dialog with custom title and icon
Page.Widgets.iframeDialog.modal = true;
Page.Widgets.iframeDialog.title = "External Documentation";
Page.Widgets.iframeDialog.iconclass = "wi wi-file-text";
Page.Widgets.iframeDialog.url = "https://docs.example.com/guide";
Page.Widgets.iframeDialog.open = true;

// Non-modal dialog with custom action button
Page.Widgets.iframeDialog.modal = false;
Page.Widgets.iframeDialog.oktext = "Apply Changes";
Page.Widgets.iframeDialog.url = "https://example.com/configuration";
Page.Widgets.iframeDialog.open = true;
```