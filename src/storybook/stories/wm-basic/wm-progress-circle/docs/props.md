# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | - | Title of the progress cirle.. |
        | `subtitle` | string | - | Subtitle of the progress circle. |
        | `name` | string | - | A unique identifier for the progress circle component. Special characters and spaces are not allowed. |
        | `type` | string | - | Indicates the format you want to use to display the progress circle. Choose from - default, - success, - info, - warning, - danger |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `arialabel` | string | - | Accessibility label for screen readers |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | "150px" | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "150px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | string | "30" | This is the default value to display value for an component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
    </div>
</details>

<details>
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `minvalue` | number | 0 | Enter minimum number for the progress circle. |
        | `maxvalue` | number | 100 | Enter maximum number for the progress circle. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `displayformat` | string | - | Format in which the progress needs to be displayed. You can choose from a list of decimal options like 9, 9.9, 9.99 etc. If the progress circle's data value is 30.7056 and the selected display format is: -  9.9 then label will be rounded as 30.7 -  9.999% then label will be rounded to 30.706% |
        | `captionplacement` | string | - | Placement of progress circle value can be - inside or - hidden. |
    </div>
</details>


