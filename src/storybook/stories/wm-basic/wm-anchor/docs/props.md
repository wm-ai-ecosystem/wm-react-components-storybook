# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | - | The caption is the text that the end user sees on your anchor. It can be bound to a variable or another component |
        | `name` | string | - | A unique identifier for the anchor component. Special characters and spaces are not allowed. |
        | `badgevalue` | string | - | Value to be displayed in the badge span for the anchor. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `shortcutkey` | string | - | The shortcut key property specifies a shortcut key to activate/focus an element. |
        | `arialabel` | string | - | Accessibility label for screen readers |
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
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `hyperlink` | string | - | The web URL you want to redirect to on clicking the anchor. |
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
        | `encodeurl` | boolean | false | Check this if you want the provided URL to be encoded at the run time. Enabling this property will encode the special characters in the URL and enable rendering of the page which otherwise might fail. By default, it is set to false. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | - | Defines the class of the icon that is applied to the anchor. |
        | `iconurl` | string | - | This optional property allows you to add an icon to the anchor, it can be an URL of the image. |
        | `iconwidth` | string | - | Optional property; but you will need this if you are using the anchor's iconUrl. Please enter the width of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconheight` | string | - | Optional property; but you will need this if you are using the anchor's iconUrl. Please enter the height of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconmargin` | string | - | Optional property; only has meaning if you specify the button's iconUrl. Values should all have "px" next to them. Use this to adjust the space between the icon and the button text. |
        | `iconposition` | string | "left" | Optional property; Property to set the position of icon in the component - can be left, top or right |
    </div>
</details>

