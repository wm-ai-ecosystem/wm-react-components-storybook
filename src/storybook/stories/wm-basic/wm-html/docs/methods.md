# Methods

The HTML component does not expose any specific methods.

<!-- <details open>
  <summary>Methods</summary>
    <div>
        | Method | Parameters | Return Type | Description |
        | --- | --- | --- | --- |
        | `getAttributes` | None | `Array<string>` | Returns a list of all attributes currently applied to the component. Useful for checking what properties and metadata are set on the component at runtime. |
        | `setWidgetProperty` | `prop:string`,`value:any` | None | Updates a specific property of the component at runtime. |
    </div>
</details>

### Use Cases

- Change html properties from script to hide html component use the following code snippet:

```javascript
Page.Widgets.html.setWidgetProperty('show', false);
``` -->