# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| **Content Configuration** |
| iframesrc | string | undefined | The URL of the content to be displayed in the iframe. This is the source URL that will be loaded. |
| encodeurl | boolean | false | When set to true, the URL specified in iframesrc will be URL-encoded before being used. This helps prevent issues with special characters in URLs. |
| **Identification & Accessibility** |
| name | string | undefined | Specifies a name for the iframe, which can be used for targeting by forms or for scripting access. |
| hint | string | undefined | Tooltip text that appears when a user hovers over the iframe. Provides additional context about the embedded content. |
| arialabel | string | undefined | Provides an accessible label for screen readers, improving accessibility for users with disabilities. |
| **Dimensions & Appearance** |
| width | string \| number | "100%" | Sets the width of the iframe. Can be specified as a pixel value (number) or as a percentage/CSS value (string). |
| height | string \| number | "300px" | Sets the height of the iframe. Can be specified as a pixel value (number) or as a percentage/CSS value (string). |
| className | string | undefined | Additional CSS class names to apply to the iframe for custom styling. |
| styles | React.CSSProperties | {} | Inline CSS styles to apply directly to the iframe element. |

## Common Use Cases

```javascript
// Basic iframe embedding a website
Page.Widgets.myIframe.iframesrc = "https://example.com";
Page.Widgets.myIframe.height = 500;

// Embedding a PDF document
Page.Widgets.documentViewer.iframesrc = "https://myapp.com/documents/report.pdf";
Page.Widgets.documentViewer.width = "100%";
Page.Widgets.documentViewer.height = 800;

// Embedding a map with encoded URL parameters
Page.Widgets.mapFrame.iframesrc = "https://maps.example.com/embed?location=New York,NY&zoom=12";
Page.Widgets.mapFrame.encodeurl = true;

// Setting up an accessible iframe
Page.Widgets.contentFrame.arialabel = "Product documentation viewer";
Page.Widgets.contentFrame.hint = "View product documentation in this frame";
```