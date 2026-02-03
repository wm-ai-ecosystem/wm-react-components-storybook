# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the rating component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | This (Value) property is used to map a caption value against the value of the widget. It can accept: 1. Comma separated string containing the caption values (mappped to rating value in ascending order). 2. Array of strings (mapped as above). 3. Array of objects, needs selection of DataField(to map to rating value) and DisplayField(to map to caption against the rating value). |
        | `datafield` | string | - | This property indicates the field (in dataset) to represent selected value for the rating component. It should be mapped to an integer field in dataset. |
        | `displayfield` | string | - | This property indicates the field (in dataset) that represents caption against the selected value(mapped as datafield) of the rating component. |
        | `displayexpression` | string | - | This is an advanced property that gives more control over what is displayed in the drop-down select list. A Display Expression uses a Javascript expression to format exactly what is shown. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | number | - | Default value (number of active stars) of Rating.It should always be less than or equal to the maximum value of Rating |
    </div>
</details>

<details>
  <summary>Validation</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `maxvalue` | number | - | Maximum value (number of stars) of Rating.It should be less than or equal to 10. |
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
        | `showcaptions` | boolean | true | Captions for Rating widget are shown only when this property is set. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconsize` | string | - | This property defines the size of the icon. Value has to be specified along with the units (em or px). |
        | `activeiconclass` | string | - | Sets the icon class for active (selected) stars in the rating component. |
        | `inactiveiconclass` | string | - | Sets the icon class for inactive (unselected) stars in the rating component. |
    </div>
</details>