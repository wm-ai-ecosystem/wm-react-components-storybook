# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dataset` | any[] | `[]` | The data to be displayed in the table |
| `title` | string | | The title displayed at the top of the table |
| `subheading` | string | | Supplementary text displayed beneath the title |
| `iconclass` | string | | CSS class for the icon displayed with the title |
| `nodatamessage` | string | "No data found" | Message displayed when the table has no data |
| `loadingdatamsg` | string | "Loading..." | Message shown while data is being loaded |
| `errormessage` | string | "Error loading data" | Message displayed when data loading fails |

## Display Settings

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `showheader` | boolean | `true` | Controls visibility of the table header |
| `showrowindex` | boolean | `false` | When `true`, displays row numbers in the first column |
| `rowClass` | string | | CSS class applied to table rows |
| `spacing` | TablePanelSpacing | `"medium"` | Controls spacing between elements ("small", "medium", "large") |
| `isdynamictable` | boolean | `false` | When `true`, the table structure can change at runtime |
| `table_reference` | string | | Unique identifier for the table |

## Selection Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radioselect` | boolean | `false` | When `true`, enables single row selection with radio buttons |
| `radioselecttitle` | string | | Title for the radio button column |
| `radioselectarialabel` | string | | Accessibility label for radio buttons |
| `multiselect` | boolean | `false` | When `true`, enables multiple row selection with checkboxes |
| `multiselecttitle` | string | | Title for the checkbox column |
| `multiselectarialabel` | string | | Accessibility label for checkboxes |
| `gridfirstrowselect` | boolean | `false` | When `true`, automatically selects the first row on load |
| `isrowselectable` | boolean | `true` | Controls whether rows can be selected |

## Editing Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `editmode` | TableEditMode | `"none"` | Editing mode: "none", "inline", "dialog", or "form" |
| `statehandler` | StorageType | `"none"` | Storage mechanism for table state |
| `formposition` | TableFormPosition | `"dialog"` | Position of the edit form ("dialog", "bottom", "right") |
| `formName` | string | | Name of the form used for editing |
| `isrowexpansionenabled` | boolean | `false` | When `true`, rows can be expanded to show more details |

## Pagination & Navigation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `shownavigation` | boolean | `true` | When `true`, displays pagination controls |
| `showrecordcount` | boolean | `true` | When `true`, shows the total record count |
| `navigation` | INavigation | | Navigation configuration object |
| `navigationalign` | IAlignment | `"center"` | Alignment of pagination controls ("left", "center", "right") |
| `pagesize` | number | `20` | Number of rows to display per page |
| `maxsize` | number | `5` | Maximum number of page buttons to display |
| `boundarylinks` | boolean | `false` | When `true`, shows first/last page buttons |
| `allowpagesizechange` | boolean | `false` | When `true`, allows changing page size |
| `pagesizeoptions` | string | "10,20,50,100" | Available page size options |
| `onDemandLoad` | boolean | `false` | When `true`, loads data on demand instead of all at once |

## Filtering & Sorting

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enablesort` | boolean | `true` | When `true`, enables column sorting |
| `enablecolumnselection` | boolean | `false` | When `true`, allows selecting entire columns |
| `filtermode` | TableFilterMode | `"none"` | Filtering mode: "none", "search", or "multi" |
| `searchlabel` | string | "Search" | Label for the search input field |
| `filteronkeypress` | boolean | `false` | When `true`, filters as user types instead of requiring Enter |

## Export Options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exportformat` | any[] | `[]` | Available export formats (e.g., ["csv", "excel", "pdf"]) |
| `exportdatasize` | number | `-1` | Maximum number of records to export (-1 for all) |

## Messaging

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `confirmdelete` | string | "Are you sure you want to delete this record?" | Confirmation message for row deletion |
| `deleteoktext` | string | "OK" | Text for the delete confirmation button |
| `deletecanceltext` | string | "Cancel" | Text for the delete cancellation button |
| `insertmessage` | string | "Record added successfully" | Message shown after successful row insertion |
| `updatemessage` | string | "Record updated successfully" | Message shown after successful row update |
| `deletemessage` | string | "Record deleted successfully" | Message shown after successful row deletion |

### Common Use Cases

#### Basic Table Configuration
```javascript
// Set up a simple table with pagination
Page.Widgets.myTable.dataset = myDataVariable;
Page.Widgets.myTable.pagesize = 10;
Page.Widgets.myTable.shownavigation = true;
Page.Widgets.myTable.showrecordcount = true;
```

#### Enable Row Selection
```javascript
// Configure multi-select table
Page.Widgets.myTable.multiselect = true;
Page.Widgets.myTable.multiselecttitle = "Select";
Page.Widgets.myTable.multiselectarialabel = "Select row";

// Configure single-select table
Page.Widgets.myTable.radioselect = true;
Page.Widgets.myTable.radioselecttitle = "Choose";
Page.Widgets.myTable.radioselectarialabel = "Select single row";
```

#### Configure Table Editing
```javascript
// Set up inline editing
Page.Widgets.myTable.editmode = "inline";
Page.Widgets.myTable.statehandler = "local";

// Set up form editing
Page.Widgets.myTable.editmode = "form";
Page.Widgets.myTable.formposition = "right";
Page.Widgets.myTable.formName = "myEditForm";
```

#### Configure Export Functionality
```javascript
// Enable multiple export formats
Page.Widgets.myTable.exportformat = ["excel", "csv", "pdf"];
Page.Widgets.myTable.exportdatasize = 1000; // Limit export to 1000 records
```

#### Enable Advanced Filtering
```javascript
// Set up multi-column filtering
Page.Widgets.myTable.filtermode = "multi";
Page.Widgets.myTable.searchlabel = "Filter records";
Page.Widgets.myTable.filteronkeypress = true;
```