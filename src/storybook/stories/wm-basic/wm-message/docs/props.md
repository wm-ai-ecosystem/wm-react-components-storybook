# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your message. It can be bound to a variable or another component |
        | `name` | string | - | A unique identifier for the message component. Special characters and spaces are not allowed. |
        | `type` | string | "success" | This property specifies the type of the variable: - error, - info, - loading, - success or - warning. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `hideclose` | boolean | false | Hides the close option. |
        | `animation` | string | - | Controls the animation of the component. |
    </div>
</details>

### Use Cases

- Set message type programmatically.

```javascript
Page.Widgets.message.type = "error";
```

- Hide the close option.

```javascript
Page.Widgets.message.hideclose = true;
```