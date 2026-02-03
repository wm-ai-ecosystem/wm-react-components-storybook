# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the radioset component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "auto" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Set this property to a variable to populate the list of values to display. |
        | `usekeys` | boolean | false | Use the keys of the live variable object as radio set options. |
        | `datafield` | string | "All Fields" | This property sets the datavalue to be returned by a select editor when the list is populated using the dataSet property. |
        | `displayfield` | string | - | This property sets the displayvalue to show in the select editor when the list is populated using the dataSet property. |
        | `displayexpression` | string | - | This is an advanced property that gives more control over what is displayed in the drop-down select list. A Display Expression uses a Javascript expression to format exactly what is shown. |
        | `groupby` | string | - | This property allows for grouping the list of rows in the variable bound to a dataset by selecting one of the field names from the drop-down list. |
        | `orderby` | string | - | This allows for multiple selection for ordering the display of rows based on fields in asc or desc order - up arrow for asc and down arrow for desc. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | array | - | This is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the datavalue returned by the component. |
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
    </div>
</details>