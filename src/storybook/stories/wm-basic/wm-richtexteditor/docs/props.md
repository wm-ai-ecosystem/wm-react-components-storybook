# Props

The Rich Text Editor component can be configured with the following properties:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| value | string | "" | The initial HTML content to display in the editor |
| placeholder | string | "Enter text here..." | Placeholder text when editor is empty |
| readonly | boolean | false | When true, makes the editor content non-editable |
| toolbar | string/array | "full" | Configures which toolbar buttons to display ("full", "basic", or custom array) |
| height | string | "300px" | Sets the height of the editor |
| minHeight | string | "200px" | Sets the minimum height of the editor |
| maxHeight | string | null | Sets the maximum height of the editor |
| enableResize | boolean | true | Allows users to resize the editor vertically |
| sanitize | boolean | true | When true, sanitizes HTML to prevent XSS attacks |
| plugins | array | [] | Additional plugins to enhance editor functionality |

## Basic Configuration

```javascript
// Set initial content
Page.Widgets.myRichTextEditor.value = "<p>Hello <strong>World</strong></p>";

// Make editor read-only
Page.Widgets.myRichTextEditor.readonly = true;
```

## Toolbar Configuration

```javascript
// Use basic toolbar preset
Page.Widgets.myRichTextEditor.toolbar = "basic";

// Custom toolbar configuration
Page.Widgets.myRichTextEditor.toolbar = [
  ['bold', 'italic', 'underline'],
  ['h1', 'h2', 'h3'],
  ['ul', 'ol'],
  ['undo', 'redo']
];
```

## Size Configuration

```javascript
// Set editor height
Page.Widgets.myRichTextEditor.height = "400px";

// Disable resize functionality
Page.Widgets.myRichTextEditor.enableResize = false;
```