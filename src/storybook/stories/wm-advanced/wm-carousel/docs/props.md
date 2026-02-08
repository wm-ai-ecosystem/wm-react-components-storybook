# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the carousel component. Special characters and spaces are not allowed. |
        | `Add Carousel` | - | - | Allows you to add carousel content to the carousel component. **Note**: available only for static carousel. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "480px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Set this property to a variable to populate the list of images/content to display. **Note**: available only for dynamic carousel. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `controls` | string | "both" | This property allows you to enable the controls in the form of: - navs - arrows on either side of the images, - indicators - dots at the bottom of the images, - both - default or - none |
        | `animation` | string | "auto" | This property controls the animation of an element. The animation is based on the CSS classes and works only in the run mode. Can be set to: - auto - default or - none. |
        | `animationinterval` | number | 3 | This property defines the animation interval in seconds. This option is available only when the animation type is set to auto. |
    </div>
</details>

<details>
  <summary>Message</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `nodatamessage` | string | "No data found" | This message will be displayed when there is no data to display. **Note**: available only for dynamic carousel. |
    </div>
</details>


