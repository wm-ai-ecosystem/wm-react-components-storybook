# Callback Events

## Row Interaction Events

| Event | Description |
|-------|-------------|
| `onRowclick` | Triggered when a row is clicked |
| `onRowClick` | Alternative event for row clicks with different parameters |
| `onToggle` | Fired when a row is toggled (selected/deselected) |
| `onNewRowAdded` | Triggered after a new row has been successfully added to the table |
| `onAddNewRowClick` | Fired when the "Add New Row" button is clicked |

## Row Data Manipulation Events

| Event | Description |
|-------|-------------|
| `onRowinsert` | Triggered when a row is being inserted |
| `onRowupdate` | Triggered when a row is being updated |
| `onRowdelete` | Triggered when a row is being deleted |
| `onRowDelete` | Alternative event for row deletion with different parameters |
| `onRowUpdate` | Alternative event for row updates with different parameters |

## Row Expansion Events

| Event | Description |
|-------|-------------|
| `onBeforerowexpand` | Triggered before a row is expanded |
| `onRowexpand` | Triggered after a row has been expanded |
| `onBeforerowcollapse` | Triggered before a row is collapsed |
| `onRowcollapse` | Triggered after a row has been collapsed |

## Column Events

| Event | Description |
|-------|-------------|
| `onColumnselect` | Triggered when a column is selected |
| `onColumndeselect` | Triggered when a column is deselected |
| `onColumnSelect` | Alternative event for column selection with different parameters |
| `onColumnDeselect` | Alternative event for column deselection with different parameters |
| `onColumnFilterChange` | Triggered when a column filter value changes |

## Data Events

| Event | Description |
|-------|-------------|
| `onBeforedatarender` | Triggered before the data is rendered |
| `onDatarender` | Triggered after the data is rendered |
| `onBeforeexport` | Triggered before data export, allows cancellation |
| `onBeforeExport` | Alternative event for data export with different parameters |

## Operation Events

| Event | Description |
|-------|-------------|
| `onSuccess` | Triggered after a successful operation (insert, update, delete) |
| `onError` | Triggered when an operation encounters an error |

## DOM Events

| Event | Description |
|-------|-------------|
| `onClick` | Triggered when a table element is clicked |
| `onFocus` | Triggered when a table element receives focus |
| `onBlur` | Triggered when a table element loses focus |
| `onChange` | Triggered when a table element value changes |
| `onKeypress` | Triggered when a key is pressed |
| `onKeydown` | Triggered when a key is pressed down |
| `onKeyup` | Triggered when a key is released |
| `onKeyDown` | Alternative event for key down with different parameters |
| `onMouseEnter` | Triggered when the mouse enters a table element |
| `onMouseLeave` | Triggered when the mouse leaves a table element |