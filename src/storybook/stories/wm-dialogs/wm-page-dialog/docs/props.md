# Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dialogtype` | `"page-dialog"` | `"page-dialog"` | Specifies the type of dialog as a page dialog. This is a fixed value that identifies this specific dialog component. |
| `content` | `string` | `""` | The content to be displayed within the dialog. This can be HTML, plain text, or a reference to content defined elsewhere. |
| `prefab` | `boolean` | `false` | Determines whether the dialog should use a predefined prefab template. When set to `true`, the dialog will use the template specified by `prefabName`. |
| `prefabName` | `string` | `""` | The name of the prefab to use when `prefab` is set to `true`. This prefab should be defined in your project. |

## Common Use Cases

```javascript
// Basic usage with custom content
Page.Widgets.myPageDialog.content = "<div>Custom dialog content</div>";
Page.Widgets.myPageDialog.show();

// Using a prefab template
Page.Widgets.myPageDialog.prefab = true;
Page.Widgets.myPageDialog.prefabName = "MyCustomDialogPrefab";
Page.Widgets.myPageDialog.show();

// Dynamically updating content
function updateDialogContent(newContent) {
  Page.Widgets.myPageDialog.content = newContent;
  Page.Widgets.myPageDialog.show();
}
```