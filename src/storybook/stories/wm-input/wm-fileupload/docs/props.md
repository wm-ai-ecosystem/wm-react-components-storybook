# Props

## Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | "" | Unique identifier for the FileUpload component |
| caption | string | "" | The text displayed as the component label |
| show | boolean | true | Controls component visibility |
| disabled | boolean | false | When true, makes the component display-only |

## Upload Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| multiple | boolean | false | Enables selection of multiple files when set to true |
| message | string | "" | Message text displayed for file upload in multi-select mode |
| allowedFileExtensions | string | "" | Comma-separated list of permitted file extensions (e.g., '.pdf, .doc, .gif') |
| maxFileSize | number | 1 | Maximum allowed file size in MB (up to 50MB) |

## Appearance

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| height | string | "" | Height of the component (in px or %) |
| width | string | "" | Width of the component (in px or %) |
| horizontalAlign | string | "left" | Horizontal alignment of the component contents |
| iconClass | string | "wi wi-file-upload" | CSS class for the upload icon |
| clearIconClass | string | "wi wi-clear" | CSS class for the clear icon |
| clearIconHint | string | "Clear" | Tooltip text shown when hovering over the clear icon |

## Accessibility

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hint | string | "" | Tooltip text shown on hover after 1.5 seconds |
| tabindex | number | 0 | Order in which the component gets focus when tabbing |

## Common Use Cases

```javascript
// Configure file extensions and size
Page.Widgets.fileUpload1.allowedFileExtensions = ".jpg, .png, .pdf";
Page.Widgets.fileUpload1.maxFileSize = 5; // 5MB

// Enable multiple file selection
Page.Widgets.fileUpload1.multiple = true;
Page.Widgets.fileUpload1.message = "Drop files here or click to upload";

// Customize clear icon
Page.Widgets.fileUpload1.setClearIconClass("wi wi-delete");
Page.Widgets.fileUpload1.setClearIconHint("Remove all files");
```