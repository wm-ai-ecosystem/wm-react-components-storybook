# Callback Events

<details open>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onRowClick` | This event will be called when a row in Data Table is clicked. **Note**: This event can happen when selecting or deselecting a row. |
        | `onRowSelect` | This event will be called when a row from Data Table is selected. |
        | `onRowDeselect` | This event will be called when a row from Data Table is deselected. |
        | `onDataSort` | This event will be called when the Data Table header is clicked to sort by a particular column. |
        | `onHeaderClick` | This event will be called when the Data Table header is clicked. |
        | `onBeforeFormRender` | (Only for Data Table with Quick-Edit and Inline-Edit) This event is fired on the edit of a row and before the inline form is rendered. |
        | `onFormRender` | This event is accessible for Data Table with Quick-Edit and Inline-Edit templates. This event is called after the inline form is rendered. |
        | `onBeforeRowDelete` | This event handler is triggered before a record is deleted from the underlying data entity. |
        | `onRecordDelete` | This event handler is triggered after a record is deleted from the underlying data entity. |
        | `onBeforeRecordInsert` | This event handler is triggered before a new record is inserted into the underlying data entity. |
        | `onRecordInsert` | This event handler is triggered after a new record is successfully inserted into the underlying data entity. |
        | `onBeforeRecordUpdate` | This event handler is triggered before a record is updated in the underlying data entity. |
        | `onRecordUpdate` | This event handler is triggered after a record is updated in the underlying data entity. |
        | `onError` | (Only for Data Table with Quick-Edit and Inline-Edit) This event will be called after the edit/insert/delete operation returns a failure response. |
        | `onBeforeDataRender` | This event handler is called before the data is rendered on component. |
        | `onDataRender` | This event handler is triggered when the component is rendered with data. |
        | `onPaginationChange` | This event is called on change of pagination. |
    </div>
</details>
