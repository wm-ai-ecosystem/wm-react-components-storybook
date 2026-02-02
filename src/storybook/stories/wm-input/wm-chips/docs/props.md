# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the chips component. Special characters and spaces are not allowed. |
        | `placeholder` | string | - | A placeholder is a text to show in the chips input when there is no value. A common use of this is a search box that says in faint gray italicized text "Search..." which disappears as soon as the user starts to edit the text box. This is a useful alternative to a caption if you are constrained in space and asking for something simple of the user. |
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
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `inputwidth` | string | "default" | Use this property to set the width of the chip item input box. You can select from: - Default – which is the normal Chip widget size, 170px, or - Full – 100% width of the container. |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Set this property to a variable to populate the list of values to display. Can be bound to a Variable. |
        | `searchkey` | string | - | The field from the above value dataset is based on which the search needs to be performed for fetching chip elements for the selection. |
        | `displayimagesrc` | string | - | (Picture Source) This property sets the image to be displayed in the search results. Pick from the fields from the above Dataset Value. |
        | `datafield` | string | "All Fields" | This property is useful when the dataSet is an array of objects. It decides the dataValue to be returned by the component. If set to All Fields, the whole object is returned against the selection. If set to a particular field, the returned value will be the value of that field in the selected object. In the case of multi-selection, the returned dataValue will also be an array. |
        | `displayfield` | string | - | This property sets the displayvalue to show in the select editor when the list is populated using the dataSet property. |
        | `displayexpression` | string | - | This is an advanced property that gives more control over what is displayed in the drop-down select list. A display Expression uses a Javascript expression to format exactly what is shown. |
        | `groupby` | string | - | This property allows for grouping the list of rows in the variable bound to a dataset by selecting one of the field names from the drop-down list. |
        | `orderby` | string | - | This allows for multiple selection for ordering the display of rows based on fields in asc or desc order - up arrow for asc and down arrow for desc. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | any | - | The default value sets what the user sees initially in the chips component. Note that this display value is for presentation only and may differ from the actual datavalue returned by the component. Its type depends on the selected data field—for example, if the data field is bound to "name," the display value will be a string. |
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
        | `autofocus` | boolean | false | This property makes the Chip to get focus automatically when the page loads. |
        | `readonly` | boolean | false | This property prevents the user from being able to change the data value of a component. It is a bindable property. |
        | `maxsize` | number | - | If the max size is set, chips will restrict adding more than the max size. |
        | `inputposition` | string | "Last" | Use this property to change the position of the newly added chip item as - First - The input box appears in the beginning followed by the selected chips - Last – The input box appears at the end of the chip item list, this is the default setting. |
        | `allowonlyselect` | boolean | false | If Allow Only Select is set to true, chips will restrict adding values other than in the selection. By default, there is no restriction. |
        | `enablereorder` | boolean | false | This property will allow you to reorder the Chip Elements at runtime. This is a bindable property. |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disabled` | boolean | false | If the disabled property is true (checked) the component becomes display-only and your input will not be accepted. It can also be set programmatically by binding it to a boolean type variable. |
        | `debouncetime` | number | 250 | Delay Time (in ms) after which the query gets triggered when the last character is typed by the user. Default delay is 250 ms. This delay is for performance optimization to reduce multiple network calls. |
        | `minchars` | number | 1 | The minimum number of characters to be entered by the user before the search query is triggered. The value should be greater than 0. The default value is 1. |
        | `selectionmode` | string | - | Determines how many chips can be selected at a time. **Note**: Available only for **React Native** only. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `lefticonclass` | string | - | Icon to display on the left side of each chip. **Note**: Available only for **React Native** only. |
        | `righticonclass` | string | - | Icon to display on the right side of each chip. **Note**: Available only for **React Native** only. |
        | `leftbadge` | string | - | Text badge to display on the left side of each chip.. **Note**: Available only for **React Native** only. |
        | `rightbadge` | string | - | Text badge to display on the right side of each chip. **Note**: Available only for **React Native** only. |
        | `selectediconclass` | string | - | Icon to display on selected chips to indicate selection. It is displayed on the left side of the chip. If there is any icon selected using Left Icon Class for left side, it will be overridden by Selected Icon Class when the chip is selected. **Note**: Available only for **React Native** only. |
    </div>
</details>

<details>
  <summary>Message</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datacompletemsg` | string | "No more data to load" | This message will be displayed when there is no more data to load. |
    </div>
</details>