# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your icon. |
        | `name` | string | - | A unique identifier for the icon component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `arialabel` | string | - | Accessibility label for screen readers |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `target` | string | "_self" | Defines behavior on click of the link: _blank: Opens the linked document in a new window or tab _self: Opens the linked document in the same frame as it was clicked (this is default) _parent: Opens the linked document in the parent frame _top: Opens the linked document in the full body of the window. |
        | `animation` | string | - | Controls the animation of the component. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | Defines the class of the icon that is applied to the anchor. |
        | `iconposition` | string | "left" | Optional property; Property to set the position of icon in the component - can be left, top or right |
    </div>
</details>

### Use Cases

- Setting a Font Awesome icon.

```javascript
Page.Widgets.icon.iconclass = "fa fa-star";
```

- Positioning icon to the right of text.

```javascript
Page.Widgets.icon.iconposition = "right";
```