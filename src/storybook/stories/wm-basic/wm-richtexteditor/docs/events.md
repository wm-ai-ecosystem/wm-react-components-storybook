# Callback Events

The Rich Text Editor provides several events that you can hook into to extend its functionality:

| Event | Description |
|-------|-------------|
| onChange | Triggered when the editor content changes |
| onFocus | Triggered when the editor receives focus |
| onBlur | Triggered when the editor loses focus |
| onInit | Triggered when the editor is fully initialized |
| onKeyDown | Triggered when a key is pressed down in the editor |
| onKeyUp | Triggered when a key is released in the editor |
| onPaste | Triggered when content is pasted into the editor |
| onImageUpload | Triggered when an image is being uploaded |
| onImageUploadError | Triggered when an image upload fails |
| onToolbarClick | Triggered when a toolbar button is clicked |

## Example Event Usage

```javascript
// Content change event
Page.Widgets.myRichTextEditor.onchange = function(newContent) {
  console.log("Editor content changed to:", newContent);
};

// Focus and blur events
Page.Widgets.myRichTextEditor.onfocus = function() {
  console.log("Editor is now focused");
};

Page.Widgets.myRichTextEditor.onblur = function() {
  console.log("Editor lost focus");
};
```