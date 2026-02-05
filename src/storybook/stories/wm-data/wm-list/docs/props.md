# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | - | Set the title of the component. |
        | `subheading` | string | - | Set the sub heading of the component. |
        | `name` | string | - | A unique identifier for the list component. Special characters and spaces are not allowed. |
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
        | `height` | string | "250px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | Set this property to a variable to populate the list of values to display. |
        | `groupby` | string | - | This property allows for grouping the list of rows in the variable bound to a dataset by selecting one of the field names from the drop-down list. |
        | `orderby` | string | - | This allows for multiple selection for ordering the display of rows based on fields in asc or desc order - up arrow for asc and down arrow for desc. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `direction` | string | "vertical" | Changes the direction of the scroll. |
        | `enablereorder` | boolean | false | This property will allow users to reorder the list items at runtime. |
        | `statehandler` | string | "URL" | This (Retain State) property will allow users to maintain component states using state handling on the URL, Local Storage or Session Storage. **Note**: It does not work if the Pagination property is set as "On Demand" or "Infinite Scroll". |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `disableitem` | boolean | false | If this property is set to true (checked), selection of List item won't be allowed at run-time. |
        | `pagesize` | number | 5 | This property sets the maximum number of items to show in the list. For example, setting the pageSize property to 10 will cause the select menu list to show ten items, with an 11th item labelled "more choices." Selecting the "more choices" option will display an item labelled "previous choices" followed by the next 10 items |
        | `collapsible` | boolean | false | Enable control for collapsing and expanding the component. |
        | `showcount` | boolean | false | Count of list items in list group will be shown, if set to true |
        | `multiselect` | boolean | false | On checking this property users can select multiple items. |
        | `selectfirstitem` | boolean | false | If this bindable property is checked, the first item of the livelist will be selected automatically when the livelist is displayed. |
        | `selectionlimit` | number | - | This bindable property will allow users to select only a limited number of items. |
        | `hidehorizontalscrollbar` | boolean | false | The horizontal scrollbar will be hidden if set to true. |
    </div>
</details>

<details>
  <summary>Pagination</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `navigation` | string | - | Select the pagination type for the list. This property determines how records are fetched. It can be: Basic, Pager, Classic, Infinite Scroll, Horizontal Slider or None |
        | `showrecordcount` | boolean | false | This property controls whether the total record count is displayed in the pagination or not. |
        | `navigationalign` | string | - | This property specifies how the paginator should be aligned horizontally: Left, center or right. |
        | `ondemandmessage` | string | "Load More" | The property can be used to customize the on demand navigation message. |
        | `allowpagesizechange` | boolean | false | This property lets users adjust how many records are shown per page dynamically. For example, switching between 10, 25, or 50 records based on preference. |
        | `pagesizeoptions` | string | "5,10,20,50,100" | This property allows users to customize the page size options. For example: 3, 7, 10. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `loadingicon` | string | "fa fa-circle-o-notch" | This property can assign an icon that is shown while loading list items. |
        | `iconclass` | string | - | This property defines the class of the icon that is applied to the list. |
    </div>
</details>

<details>
  <summary>Format</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `horizontalalign` | string | "left" | This property specifies how the elements should be aligned horizontally. |
    </div>
</details>

<details>
  <summary>Message</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `nodatamessage` | string | "No data found" | This message will be displayed when there is no data to display. |
        | `loadingdatamsg` | string | "Loading..." | This message will be displayed when waiting for data to load. |
    </div>
</details>