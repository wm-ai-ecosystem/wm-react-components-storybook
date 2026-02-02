# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your spinner. It can be bound to a variable or another component |
        | `name` | string | - | A unique identifier for the anchor component. Special characters and spaces are not allowed. |
        | `type` | string | "icon" | This property helps in specifying which type of icon is to be displayed for the spinner. The "Type" property has two options "icon" and "image". Based on the "Type" selected, the properties in the graphics section are changed. The animation property can be applied to both icons and images. |
        | `servicevariabletotrack` | string | - | This property (Track Variable) allows you to bind to the service or live variable for which you want to show the loading dialog. You can select multiple variables to track.  If more than two variables are selected, then spinner would be shown till both variable call requests have been completed/resolved. |
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
  <summary>Picture</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `imageheight` | string | - | This property allows you to set the height of the picture. |
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

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | This property defines the class of the icon that is applied to the spinner. |
        | `iconsize` | string | - | This property defines the size of the icon. Value has to be specified along with the units (em or px). |
        | `image` | string | - | This property (Source) allows you to set a particular image as the loading icon. |
        | `imagewidth` | string | - | This property allows you to set the width of the picture or image. |
    </div>
</details>

