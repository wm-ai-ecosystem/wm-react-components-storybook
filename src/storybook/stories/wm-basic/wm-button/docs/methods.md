# Methods

The Button component does not expose any specific methods.

<!-- # Methods

<details open>
  <summary>Methods</summary>
    <div>
        | Method | Parameters | Return Type | Description |
        | --- | --- | --- | --- |
        | `focus` | None | None | Sets focus to the button component. |
        | `getAttributes` | None | `Array<string>` | Returns a list of all attributes currently applied to the component. Useful for checking what properties and metadata are set on the component at runtime. |
        | `setWidgetProperty` | `prop:string`,`value:any` | None | Updates a specific property of the component at runtime. |
    </div>
</details>

### Use Cases

- Change button properties from script to hide button use the following code snippet:

```javascript
Page.Widgets.button.setWidgetProperty('show', false);
```

- Programmatically retrieve all properties and metadata applied to the button component.

```javascript
Page.Widgets.button.getAttributes();
``` -->