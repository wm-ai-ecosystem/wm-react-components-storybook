# Methods

The Label component does not expose any specific methods.


<!-- # Methods

<details open>
  <summary>Methods</summary>
    <div>
        | Method | Parameters | Return Type | Description |
        | --- | --- | --- | --- |
        | `getAttributes` | None | `Array<string>` | Returns a list of all attributes currently applied to the component. Useful for checking what properties and metadata are set on the component at runtime. |
        | `setWidgetProperty` | `prop:string`,`value:any` | None | Updates a specific property of the component at runtime. |
        | `getDisplayType` | None | `string` | Returns the current CSS display type of the label (for example, inline, block, or inline-block). |
    </div>
</details>

### Use Cases

- Change label properties from script to hide label use the following code snippet:

```javascript
Page.Widgets.label.setWidgetProperty('show', false);
```

- Get the current display type of a component to check how it is rendered on the page.

```javascript
Page.Widgets.label.getDisplayType(); -->
```