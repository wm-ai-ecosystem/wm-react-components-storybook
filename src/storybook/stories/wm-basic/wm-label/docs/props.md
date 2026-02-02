# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your label. It can be bound to a variable or another component |
        | `name` | string | - | A unique identifier for the label component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
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
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `required` | boolean | false | A required editor in wm.LiveForm may refuse to save without a required field. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `animation` | string | - | Controls the animation of the component. |
    </div>
</details>


