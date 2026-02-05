# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `caption` | string | "Link" | The caption is the text that the end user sees on Popover. |
        | `title` | string | - | The Title is the text that the end user sees on Popover. |
        | `name` | string | - | A unique identifier for the popover component. Special characters and spaces are not allowed. |
        | `badgevalue` | string | - | Value to be displayed in the badge span for Popover. |
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
        | `popoverwidth` | string | "240px" | This property defines the width of the popover. |
        | `popoverheight` | string | "360px" | This property defines the height of the popover. |
    </div>
</details>

<details>
  <summary>Content</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `contentsource` | string | "partial" | Can be inline or partial. |
        | `content` | string | - | In case the source is selected as - inline enter the HTML code for the same. - Partial source, choose from the available list of partial pages. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `interaction` | string | "click" | This property defines which action should trigger the Popover to open or close. You can choose from the following options: - Click: Popover opens on click and closes on click anywhere on the document. - Hover: Popover opens on hover and closes on hover out. - Click and Hover (Default): Popover opens and closes on both click or hover. |
        | `autoclose` | string | "outsideClick" | This property defines when to close the popover. Outside Click: popover will close when user clicks anywhere outside the popover content. Always: the popover will close when user clicks anywhere on the page. Disabled: popover will close only when user clicks on the popover link. |
        | `animation` | string | - | This property controls the animation of an element. The animation is based on the CSS classes and works only in the run mode. |
        | `encodeurl` | boolean | false | Check this if you want the provided URL to be encoded at the run time. Enabling this property will encode the special characters in the URL and enable rendering of the page which otherwise might fail. By default, it is set to false. |
    </div>
</details>

<details>
  <summary>Popover Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `popoverplacement` | string | "bottom" | This property defines the placement of the popover. Choose from - bottom, - left, - right or - top. |
        | `contentanimation` | string | - | This property defines the animation of the popover content. |
        | `popoverarrow` | boolean | true | This property defines the arrow for the popover. |
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
