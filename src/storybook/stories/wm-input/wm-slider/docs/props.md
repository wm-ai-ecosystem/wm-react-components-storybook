# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the slider component. Special characters and spaces are not allowed. |
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
  <summary>Defaut Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | number | - | This (Value) property is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
    </div>
</details>

<details>
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `minvalue` | number | - | Enter minimum value user is allowed to enter. |
        | `maxvalue` | number | - | Enter maximum value user is allowed to enter. |
        | `step` | number | - | Use the stepper to increment/decrement the input value by the specified step interval. Example: if step='3', legal numbers could be -3, 0, 3, 6, etc. |
        | `markerlabeltext` | string | - | Titles can be used in markers for the slider. This property applies when showmarkers is true. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `readonly` | boolean | false | This property prevents the user from being able to change the data value of a component. It is a bindable property. |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disabled` | boolean | false | If the disabled property is true (checked) the component becomes display-only and user input will not be accepted. It can also set programmatically by binding it to a boolean type variable. |
        | `showmarkers` | boolean | false | Showing determines whether or not a component is visible. It is a bindable property. |
    </div>
</details>

<details>
  <summary>Design System Properties</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `showicons` | boolean | false | Determines whether icons should be displayed on the component. When set to true, icons will be shown. When false, icons will be hidden. |
        | `starticon` | string | "wi wi-minus" | The icon to be displayed at the start of the component. Select an appropriate icon from the available options. |
        | `endicon` | string | "wi wi-plus" | The icon to be displayed at the end of the component. Select an appropriate icon from the available options. |
        | `rangelabelposition` | string | "bottom" | Specifies the position of the minimum and maximum value labels on the slider (top, bottom, or at the ends). |
    </div>
</details>