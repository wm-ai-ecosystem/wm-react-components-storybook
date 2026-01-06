# Methods

You can access the Rich Text Editor's methods using the widget reference in your scripts (e.g., `Page.Widgets.myRichTextEditor`).

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| getValue() | None | string | Returns the current HTML content |
| setValue(content) | content: string | void | Sets the editor content |
| insertText(text) | text: string | void | Inserts plain text at the current cursor position |
| insertHTML(html) | html: string | void | Inserts HTML at the current cursor position |
| focus() | None | void | Sets focus to the editor |
| blur() | None | void | Removes focus from the editor |
| clear() | None | void | Clears all content from the editor |
| disable() | None | void | Disables the editor (makes it readonly) |
| enable() | None | void | Enables the editor |
| executeCommand(cmd, value) | cmd: string, value: any | void | Executes a rich text editing command |
| getSelectedText() | None | string | Returns the currently selected text |
| isEditorEmpty() | None | boolean | Checks if the editor is empty |

## Common Method Usage

```javascript
// Get current content
var content = Page.Widgets.myRichTextEditor.getValue();

// Set new content
Page.Widgets.myRichTextEditor.setValue("<h1>New Content</h1>");

// Insert HTML at cursor position
Page.Widgets.myRichTextEditor.insertHTML("<strong>Important</strong>");

// Clear editor content
Page.Widgets.myRichTextEditor.clear();

// Execute formatting command
Page.Widgets.myRichTextEditor.executeCommand("bold"); // Make selection bold
Page.Widgets.myRichTextEditor.executeCommand("fontSize", "18px"); // Change font size
```