# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the time component. Special characters and spaces are not allowed. |
        | `placeholder` | string | - | A placeholder is text to show in the editor when there is no value. A common use of this is a search box that says in faint gray italicized text "Search..." which disappears as soon as the user starts to edit the text box. This is a useful alternative to a caption if you are constrained in space and asking for something simple of the user. |
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
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | string | - | This is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
    </div>
</details>

<details>
  <summary>Display Format</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `timepattern` | string | "h:mm:ss a" | Time pattern lets you override how time is displayed. Common options are 'hh-mm-ss'. |
        | `hourstep` | number | 1 | Number of hours to increase or decrease. |
        | `minutestep` | number | 15 | Number of minutes to increase or decrease. |
        | `showampmbuttons` | boolean | false | Allows the datetime component to show AM or PM after the selected time. |
    </div>
</details>

<details>
  <summary>Output</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `outputformat` | string | "HH:mm:ss" | Defines the format of output data value returned by the time widget. Default output format is 'timestamp', which returns the equivalent timestamp integer. E.g timestamp value for '10:10:00 AM' is '16800000'. If the output format is given as 'hh:mm a', widget returns data value as '10:10 AM'. |
    </div>
</details>

<details>
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `required` | boolean | false | A required editor in wm.LiveForm may refuse to save without a required field. |
        | `mintime` | string | - | User will not be allowed to enter a time value below the value mentioned here. |
        | `maxtime` | string | - | User will not be allowed to enter a time value above the value mentioned here. |
    </div>
</details>


<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `showdropdownon` | string | "default" | Using this property you can control the visibility of the Date Picker. You can choose to open it on: - input click and button click (default setting), or - only on button click. |
        | `dataentrymode` | string | "default" | This property defines how the user can enter a date—either by selecting it from the time picker only or by both selecting from the picker and entering it manually. |
        | `autofocus` | boolean | false | This property makes the element get focused automatically when the page loads. |
        | `readonly` | boolean | false | This property prevents the user from being able to change the data value of a component. It is a bindable property. |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disabled` | boolean | false | If the disabled property is true (checked) the component becomes display-only and user input will not be accepted. It can also set programmatically by binding it to a boolean type variable. |
    </div>
</details>