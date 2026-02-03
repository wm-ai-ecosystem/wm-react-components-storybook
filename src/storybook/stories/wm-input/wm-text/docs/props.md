# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the text component. Special characters and spaces are not allowed. |
        | `placeholder` | - | "Enter text" | A placeholder is text to show in the editor when there is no value. A common use of this is a search box that says in faint gray italicized text "Search..." which disappears as soon as the user starts to edit the text box. This is a useful alternative to a caption if you are constrained in space and asking for something simple of the user. |
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
        | `datavalue` | string | - | This (Value) property is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
    </div>
</details>

<details>
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `required` | boolean | false | A required editor in wm.LiveForm may refuse to save without a required field. |
        | `regexp` | string | - | Enter any regular expression to be used to validate user input for client-side input validation. |
        | `maxchars` | number | - | Defines the maximum number of characters that can be entered in the editor. **Note**: Not available for color, date, time, month, week types. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `autofocus` | boolean | false | This property makes the element get focused automatically when the page loads. |
        | `readonly` | boolean | false | This property prevents the user from being able to change the data value of a component. It is a bindable property. |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disabled` | boolean | false | If the disabled property is true (checked) the component becomes display-only and user input will not be accepted. It can also set programmatically by binding it to a boolean type variable. |
        | `autocomplete` | boolean | true | Checking this box turns on auto-completion in the editor. As the user types into the pull-down select editor, the choices change dynamically. |
        | `autotrim` | boolean | true | Automatically removes leading and trailing whitespace from the input value. |
        | `displayformat` | string | - | The keys in display format represent the special tokens/characters used to delimit acceptable ranges of inputs. For example, we use '9' here to accept any numeric values for a phone number: displayformat='(999) 999-9999'. The values associated with each token are regexen. Each regex defines the ranges of values that will be acceptable as inputs in the position of that token. When placeholder and default value are both provided for a component, the default value takes precedence. Upon focusing on the component, the display format will be shown to make the user input easy. Tokens: - A Any letter. - 9 Any number. - * Any letter or number. - ? Make any part of the mask optional. |
        | `showdisplayformaton` | string | "blur" | This property decides when to show the display format on the component. The display format will appear only if a display format has been selected for the component. |
        | `updateon` | string | "blur" | If the selected value is **blur**: datavalue will be updated on blur event, **keypress**: datavalue will be updated on keypress. |
        | `updatedelay` | number | 0 | The amount of delay in milliseconds to update the datavalue. |
        | `autocapitalize` | string | "none" | This property helps to change text to all capital, first letter in each sentence capital, only first letter capital in a sentence and no change, base on the properties characters, words, sentence and none respectively. |
    </div>
</details>

<details>
  <summary>Design System Properties</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `leadingiconclass` | string | - | Allows to specify the icon for the Leading Icon/Button from icon library. |
        | `trailingiconclass` | string | - | Allows to specify the icon for the Trailing Icon/Button from icon library. |
        | `supportingtext` | string | - | Specifies the supporting text(helper text) value of the TextField. |
    </div>
</details>