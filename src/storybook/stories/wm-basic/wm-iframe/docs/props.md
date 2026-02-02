# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the iframe component. Special characters and spaces are not allowed. |
        | `iframesrc` | string | - | This property can be used to define the source attribute of the iframe. Example Source: '//bing.com' Note: The implementation of iFrame requires the source to be of http:// type and also the run Url of your app should be http:// and NOT https:// |
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
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | "300px" | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "150px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `encodeurl` | boolean | false | Check this if you want the provided URL to be encoded at the run time. Enabling this property will encode the special characters in the URL and enable rendering of the page which otherwise might fail. By default, it is set to false. |
    </div>
</details>



