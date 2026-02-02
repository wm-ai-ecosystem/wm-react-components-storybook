# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the search component. Special characters and spaces are not allowed. |
        | `type` | string | - | search (the default setting) where the filtered list of values is presented based on the user entry. autocomplete which would present a dropdown list of values for the user to select from. |
        | `placeholder` | string | - | A placeholder is a text to show in the search input when there is no value. A common use of this is a search box that says in faint gray italicized text "Search..." which disappears as soon as the user starts to edit the text box. This is a useful alternative to a caption if you are constrained in space and asking for something simple of the user. |
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
        | `dataset` | array | - | Set this property to a variable to populate the list of values to display. |
        | `searchkey` | string | - | Property to be searched upon, in the list object. |
        | `matchmode` | string | "startignorecase" | Specifies how to apply the filter on fields. For examples, match the query anywhere (or start or end) in the string. Options: startignorecase, start, endignorecase, end, anywhereignorecase, anywhere, exactignorecase and exact. |
        | `displaylabel` | string | - | (Label Value ) This is the default value to display value for an search editor. Note that the display value is just what the user sees initially, and is not always the dataValue returned by the component. |
        | `displayimagesrc` | string | - | (Picture Source) An image which displays along with the Label Value. |
        | `datafield` | string | - | This property sets the datavalue to be returned by a select editor when the list is populated using the dataSet property. |
        | `groupby` | string | - | This property allows for grouping the list of rows in the variable bound to a dataset by selecting one of the field names from the drop-down list. |
        | `orderby` | string | - | This allows for multiple selection for ordering the display of rows based on fields in asc or desc order - up arrow for asc and down arrow for desc. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `datavalue` | any | - | The default value sets what the user sees initially in the Search component. Note that this display value is for presentation only and may differ from the actual datavalue returned by the component. Its type depends on the selected data field—for example, if the data field is bound to "name," the display value will be a string. |
    </div>
</details>

<details>
  <summary>Display Format</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `limit` | number | - | Limits the search results to be displayed in the auto-complete. |
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
        | `disabled` | boolean | false | If the disabled property is true, the value of the search cannot change. The component becomes display-only. |
        | `showclear` | boolean | false | On setting show clear to true, the user is provided with an option to clear the input value in the search field. |
        | `searchon` | string | "typing" | This property specifies when to invoke the search call. If set to typing, then search call is invoked on typing. If set to onsearchiconclick, then search call is invoked only on search icon button click. Note: onsearchiconclick will work only when searchicon on the component is available. |
        | `debouncetime` | number | 250 | Delay Time (in ms) after which the query gets triggered when the last character is typed by the user. Default delay is 250 ms. This delay is for performance optimization to reduce multiple network calls. |
        | `minchars` | number | 1 | The minimum number of characters to be entered by the user before the search query is triggered. The value should be greater than 0. The default value is 1. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `imagewidth` | string | "16px" | (Picture Width) This property configure's the width of the picture that is shown in typeahead results' dropdown |
        | `clearsearchiconclass` | string | - | Specifies the CSS class for the clear icon (×) that allows users to quickly clear the search input. |
        | `backsearchiconclass` | string | - | Specifies the CSS class for the back icon that allows users to navigate back or collapse the search dropdown. |
        | `searchiconclass` | string | - | Specifies the CSS class for the search button icon (magnifying glass) that triggers the search action. |
    </div>
</details>

<details>
  <summary>Message</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `loadingdatamsg` | string | "Loading items..." | This message will be displayed when waiting for data to load. |
        | `datacompletemsg` | string | "No more data to load" | This message will be displayed when there is no more data to load. |
    </div>
</details>


