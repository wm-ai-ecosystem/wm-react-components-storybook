# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the colorpicker component. Special characters and spaces are not allowed. |
        | `placeholder` | string | - | A placeholder is a text to show in the chips input when there is no value. A common use of this is a search box that says in faint gray italicized text "Search..." which disappears as soon as the user starts to edit the text box. This is a useful alternative to a caption if you are constrained in space and asking for something simple of the user. |
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
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | string | - | This is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
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
        | `readonly` | boolean | false | This property prevents the user from being able to change the data value of a component. It is a bindable property. |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disabled` | boolean | false | If the disabled property is true (checked) the component becomes display-only and user input will not be accepted. It can also set programmatically by binding it to a boolean type variable. |
        | `autoclose` | string | ""outsideClick"" | This property defines when to close the colorpicker popover. **Outside Click**: picker popover will close when user clicks anywhere outside the picker area. **Always**: picker popover will close when user clicks anywhere on the page. **Disabled**: picker popover will close only when user press enter key on the picker input field. |
    </div>
</details>