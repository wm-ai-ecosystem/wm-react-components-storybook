# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | "Form" | Set the title of the component. |
        | `subheading` | string | - | Set the sub heading of the component. |
        | `name` | string | - | A unique identifier for the data table component. Special characters and spaces are not allowed. |
        | `spacing` | string | "normal" | Use condensed option for a compact table view. |
    </div>
</details>

<details>
  <summary>Advanced Settings</summary>
    <div>
        <details open>
          <summary>Data Table</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | **Layout** |  |  |  |
              | `showheader` | boolean | true | Show/hide the header of the component. |
              | `filtermode` | string | "no filter" | Enable filter in the data table component. |
              | `searchlabel` | string | "Search" | The placeholder to show for search box. Applicable when filtermode is set to search. |
              | `filteronkeypress` | boolean | false | Enable filter on keypress. Applicable when filtermode is set to search. |
              | **Behavior** |  |  |  |
              | `multiselect` | boolean | false | On checking this property users can select multiple items. |
              | `multiselecttitle` | string | - | This message will be displayed when hover the multiselect. Applicable when multiselect is enabled. |
              | `multiselectarialabel` | string | - | Any text you enter for this property will be used for accessibility WAI-ARIA labels. Applicable when multiselect is enabled. |
              | `headerselectall` | boolean | false | In a DataTable bound to a modal variable, enabling this property allows selecting all rows across all pages when the header checkbox is clicked. Applicable when multiselect is enabled. |
              | `radioselect` | boolean | false | Show a radio column in data table component. This enables the user to select single row. |
              | `enablesort` | boolean | true | If this property is enabled, data table can be sorted by clicking the column header cells. |
              | `enablecolumnselection` | boolean | false | If this property is enabled, columns in data table can be selected by clicking the column header cells. |
              | `gridfirstrowselect` | boolean | false | If this property is enabled, the first record of the data table will be selected automatically when the data table is displayed. |
              | `isrowselectable` | boolean | false | If this property is enabled, clicking anywhere on the row will trigger its selection, Otherwise, the row woll be not selected on click. |
              | `formposition` | string | "bottom" | This (New Row Position) property defines where to display the new row form on click of the new button. |
              | **Pagination** |  |  |  |
              | `navigation` | string | - | Select the pagination type for the component. This property determines how records are fetched. |
              | `navigationalign` | string | - | This property specifies how the paginator should be aligned horizontally: Left, center or right. |
              | `allowpagesizechange` | boolean | false | This property lets users adjust how many records are shown per page dynamically. For example, switching between 10, 25, or 50 records based on preference. |
              | `pagesizeoptions` | string | "5,10,20,50,100" | This property allows users to customize the page size options. For example: 3, 7, 10. |
              | **Data** |  |  |  |
              | `showrowindex` | boolean | false | Show row index column in tthe data table component. Adds a serial number column for display. |
              | **Message** |  |  |  |
              | `errormessage` | string | - | This message will be displayed, if there is an error during the CRUD operation. |
              | `confirmdelete` | string | "Are you sure you want to delete this?" | A message to show in confirm dialog so that the user can confirm that they want to delete this row. Leave blank to delete without asking the user to confirm. |
              | `nodatamessage` | string | "No data found" | This message will be displayed when there is no data to display. |
              | `loadingdatamsg` | string | "Loading..." | This message will be displayed when waiting for data to load. |
              | `insertmessage` | string | "Record added successfully" | This message will be displayed, when data is inserted by liveform. |
              | `updatemessage` | string | "Record updated successfully" | This message will be displayed, when data is updated by liveform. |
              | `deletemessage` | string | "Record deleted successfully" | This message will be displayed, when data is deleted by liveform. |
              | **Delete Dialog Actions** |  |  |  |
              | `deleteoktext` | string | - | This text will be displayed on confirm button for delete dialog. |
              | `deletecanceltext` | string | - | This text will be displayed on cancel button for delete dialog. |
              | **Styles** |  |  |  |
              | `rowclass` | string | - | CSS class provided will be applied on table row. |
              | `rowconditionalclass` | string | - | Conditional CSS class provided will be applied on table row. |
            </div>
        </details>
        <details>
          <summary>Columns</summary>
            <div>
              - **Platform-specific display**: Choose which columns or fields are visible on desktop and mobile to keep views clean.
            - **Column ordering and grouping**: Specify a custom column order, group columns under a common heading, or add custom columns. 
            - **Field representation and formatting**: Display fields according to their type (e.g., images for picture URLs, checkboxes for booleans) and define formats like date, currency, or decimals. 
            - **Styling and access control**: Apply styles for readability or highlighting, restrict columns based on security roles, and set filter criteria for inline or quick-edit tables.
              ![Form Columns Basic](/wm-assets/components/table/advanceSettingsColumnsBasic.png)
            </div>
        </details>
        <details>
          <summary>Row Detail</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              | `isrowexpansionenabled` | boolean | false | This property is used to enable row expansion feature |
              | **Content** |  |  |  |
              | `content` | string | - | Content (Partial) to be loaded on row expansion. |
              | **Behavior** |  |  |  |
              | `component` | string | "button" | Select a component from the list of available components. The selected component will be displayed in the table column. |
              | `expandtitle` | string | - | Expand title against the field. |
              | `collapsetitle` | string | - | Collapse title against the field. |
              | `position` | string | "0" | This property determines the position of the expand/collapse icon column. A value of "0" places the column at the beginning of the table, while "-1" places it at the end. |
              | `columnwidth` | string | "50px" | Accepts integer(x) between 1-12 and adds class col-md-(x), to suit bootstrap fuild grid system. |
              | `expandicon` | string | "wi wi-expand-more" | Icon class for expand action. |
              | `collapseicon` | string | "wi wi-chevron-right" | Icon class for collapse action. |
              | `closeothers` | boolean | true | This property specifies whether on clicking of a row, should other row close. |
              | `height` | string | - | The height of partial content can be specified in px or % i.e(50px, 75%). |
            </div>
        </details>
        <details>
          <summary>Actions</summary>
            <div>
              - **CRUD and Custom Actions**: Data Table supports Create, Read, Update, Delete operations via table-level (e.g., New row) and row-level (e.g., updateRow, deleteRow) actions. Custom actions can also be defined using JavaScript functions and displayed as Button or Anchor, with optional shortcut keys for quick access. 
            - **Action Layout**: Configure the action column with custom settings such as title, position, and CSS classes for styling.
              ![Form Actions](/wm-assets/components/table/advanceSettingsActionsBasic.png)
            </div>
        </details>
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
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `dataset` | array | - | (Value) Set this property to a variable to populate the list of values to display. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `statehandler` | string | "URL" | This (Retain State) property will allow users to maintain component states using state handling on the URL, Local Storage or Session Storage. **Note**: It does not work if the Pagination property is set as "On Demand" or "Infinite Scroll". |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `pagesize` | number | 5 | This property sets the maximum number of items to show in the table. For example, setting the pageSize property to 10 will cause the select menu list to show ten items, with an 11th item labelled "more choices." Selecting the "more choices" option will display an item labelled "previous choices" followed by the next 10 items |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `loadingicon` | string | "fa fa-circle-o-notch" | This property can assign an icon that is shown while loading table items. |
        | `iconclass` | string | - | This property defines the class of the icon that is applied to the table. |
    </div>
</details>


<!-- 
<details>
          <summary>Columns</summary>
            <div>
              | Property | Type | Default | Description |
              | --- | --- | --- | --- |
              |  |  |  | **Platform-specific display**: Choose which columns or fields are visible on desktop and mobile to keep views clean. |
              |  |  |  | **Column ordering and grouping**: Specify a custom column order, group columns under a common heading, or add custom columns. |
              |  |  |  | **Field representation and formatting**: Display fields according to their type (e.g., images for picture URLs, checkboxes for booleans) and define formats like date, currency, or decimals. |
              |  |  |  | **Styling and access control**: Apply styles for readability or highlighting, restrict columns based on security roles, and set filter criteria for inline or quick-edit tables. |
            </div>
        </details> -->