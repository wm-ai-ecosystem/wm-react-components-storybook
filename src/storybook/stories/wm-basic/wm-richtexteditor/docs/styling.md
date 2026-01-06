# Styling

The Rich Text Editor can be styled using CSS classes to match your application's design.

## Container Styling

| CSS Class | Description |
|-----------|-------------|
| .rich-text-editor | The main container class for the editor |
| .rich-text-editor-toolbar | The toolbar container |
| .rich-text-editor-content | The editable content area |
| .rich-text-editor-statusbar | The bottom status bar (if enabled) |
| .rich-text-editor-disabled | Applied when the editor is disabled |
| .rich-text-editor-focused | Applied when the editor has focus |

## Toolbar Button Styling

| CSS Class | Description |
|-----------|-------------|
| .rich-text-editor-btn | Base class for all toolbar buttons |
| .rich-text-editor-btn-active | Applied to active state buttons |
| .rich-text-editor-dropdown | Applied to dropdown menus in the toolbar |
| .rich-text-editor-separator | Toolbar button group separators |

## Content Area Styling

| CSS Class | Description |
|-----------|-------------|
| .rich-text-editor-paragraph | Paragraph elements in the editor |
| .rich-text-editor-heading | Heading elements in the editor |
| .rich-text-editor-table | Table elements in the editor |
| .rich-text-editor-image | Image elements in the editor |
| .rich-text-editor-link | Link elements in the editor |

## Example Custom Styling

```css
/* Custom editor height */
.app-rich-text-editor .rich-text-editor-content {
  height: 400px;
}

/* Custom toolbar styling */
.app-rich-text-editor .rich-text-editor-toolbar {
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
}

/* Custom button styling */
.app-rich-text-editor .rich-text-editor-btn {
  color: #555;
}

.app-rich-text-editor .rich-text-editor-btn-active {
  background-color: #e3e3e3;
  color: #000;
}
```