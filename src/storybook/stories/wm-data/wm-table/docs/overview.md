# Overview

The **Data Table** component is a versatile component for displaying and interacting with tabular data. It supports features like sorting, filtering, pagination, row selection, and in-line  or dialog-based editing, and can efficiently handle large datasets with on-demand loading. The table can be bound to databases, queries, procedures, or web/Java services. When connected to database CRUD variables, it supports full Create, Read, Update, Delete operations; for other data sources, it functions as a read-only table.

### Markup

```javascript
<wm-table editmode="inline" statehandler="URL" name="table" title="" dataset="bind:Variables.stvSalesData.dataSet"
    navigation="Basic" variant="default">
    <wm-table-column binding="item" caption="Item" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="description" caption="Description" pcdisplay="true" mobiledisplay="true"
        tabletdisplay="true"></wm-table-column>
    <wm-table-column binding="quantity" caption="Quantity" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="netAmount" caption="Net Amount" pcdisplay="true" mobiledisplay="true"
        tabletdisplay="true"></wm-table-column>
    <wm-table-action widget-type="button" key="addNewRow" display-name="New" iconclass="wi wi-plus" show="true"
        class="btn-primary" action="addNewRow()" position="footer" shortcutkey="">
    </wm-table-action>
    <wm-table-row-action key="updaterow" display-name="" title="Edit" iconclass="wi wi-pencil" show="true"
        class="btn-transparent" action="editRow($event)"></wm-table-row-action>
    <wm-table-row-action key="deleterow" display-name="" title="Delete" iconclass="wi wi-trash" show="true"
        class="btn-transparent" action="deleteRow($event)"></wm-table-row-action>
</wm-table>
```

### Examples

#### Properties

- This table displays a search box for filtering rows, which can be configured directly in the markup or updated dynamically via script.

```javascript
<wm-table filtermode="search" searchlabel="Search" filteronkeypress="true" name="table"></wm-table>
```

```javascript
// Set the filter mode of the Table to "search" (enables the search box) 
Page.Widgets.table.filtermode = "search";

// Set the placeholder text displayed in the search box
Page.Widgets.table.searchlabel = "Search"; 
```

- This table column displays a specific field from the table’s dataset and supports editing. Its properties can be configured directly in the markup or accessed and updated dynamically via script.

```javascript
<wm-table name="table" dataset="bind:Variables.stvSalesData.dataSet">
    <wm-table-column binding="netAmount" caption="Net Amount" col-class="column-net-amount" show="true" type="string"
        formatpattern="toCurrency" currencypattern="USD" fractionsize="2" showineditmode="true"
        edit-widget-type="currency" validationmessage="Please enter a valid amount" required="true" readonly="false"
        pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
</wm-table>
```

```javascript
// Update the column caption (header title text)
// This property can be updated dynamically via script
Page.Widgets.table.columns.netAmount.caption = "Net Amount";

// Alternate way to access the column using its binding name
// Use bracket notation when the binding name contains special characters (for example, hyphens like "net-amount")
// Page.Widgets.table.columns["net-amount"].caption = "Net Amount";

// Apply a custom CSS class to the column
// NOTE: Column CSS classes cannot be modified via script.
// This must be configured from: Table Properties → Advanced Settings → Columns → Style tab
// The line below is shown for reference only.
Page.Widgets.table.columns.netAmount["col-class"] = "column-net-amount";

// Configure how the column value is displayed in view mode
// NOTE: View-mode formatting properties cannot be modified via script.
// These must be configured from: Table Properties → Advanced Settings → Columns → Basic tab → View Mode
// Example formatting: 12345.6789 → $12,345.679 (USD, fraction size 3)
// The line below is shown for reference only.
Page.Widgets.table.columns.netAmount.formatpattern = "toCurrency";
Page.Widgets.table.columns.netAmount.currencypattern = "USD";
Page.Widgets.table.columns.netAmount.fractionsize = "3";

// Define the input component used when editing a table row
// NOTE: The edit component type cannot be set via script.
// It must be configured from: Table Properties → Advanced Settings → Columns → Basic tab → Edit Mode
Page.Widgets.table.columns.netAmount["edit-widget-type"]; // Read-only reference

// Validation settings for edit mode
// These properties can be configured either: From Table Properties → Advanced Settings → Columns → Edit Mode OR dynamically via script
Page.Widgets.table.columns.netAmount.validationmessage = "Please enter a valid amount";
Page.Widgets.table.columns.netAmount.required = true;

// These properties define whether the Table column is visible on specific device types
// NOTE: Device visibility properties are not intended to be modified via script.
// They should be configured from:
// Table Properties → Advanced Settings → Columns → Display
Page.Widgets.table.columns.netAmount.pcdisplay = true;
Page.Widgets.table.columns.netAmount.mobiledisplay = true;
Page.Widgets.table.columns.netAmount.tabletdisplay = true;
```


#### Events

- This is the markup for a table with an on-beforedatarender event, executed before the table is rendered onto the page.

```javascript
<wm-table on-beforedatarender="tableBeforedatarender(widget, data, columns)" name="table"></wm-table>
```

```javascript
Page.tableBeforedatarender = function (widget, data, columns) {
  // data: array of all rows to be displayed in the Table
  // columns: column definitions of the Table
  // widget: reference to the Table widget

  // Modify the netAmount field for each row before rendering in the Table
  data.forEach(function (obj) {
    if (obj.netAmount <= 120) {
      obj.netAmount = "cheap"; // netAmount ≤ 120
    } else if (obj.netAmount > 120 && obj.netAmount <= 500) {
      obj.netAmount = "moderate"; // 121 ≤ netAmount ≤ 500
    } else {
      obj.netAmount = "pricy"; // netAmount > 500
    }
  });
};
```

- This is the markup for a table with an on-datarender event, executed whenever the table is rendered or updated with data for the current page.

```javascript
<wm-table on-datarender="tableDatarender(widget, data)" name="table"></wm-table>
```

```javascript
Page.tableDatarender = function (widget, data) {
  // data contains all rows currently rendered in the Table for the current page

  // widget.datagridElement is the jQuery element representing the Table's body
  widget.datagridElement.find("tr.app-datagrid-row").each(function (index) {
    // Loop through each row and add a CSS class based on data
    // For example, add class "admin" to rows where the user's role is "adminrole"
    if (data[index].role === "adminrole") {
      $(this).addClass("admin");
    }
  });
};
```

```javascript
Page.tableDatarender = function (widget, data) {
  // Set a default selected item when the table is rendered
  widget.selecteditem = {
    id: "I001",
    item: "Laptop",
    description: "15-inch business laptop with 16GB RAM",
    quantity: 2,
    unitPrice: 750,
    discount: 50,
    netAmount: 1450,
  };
};

```

- This is the markup for a table with an on-beforerowinsert event, executed before a new record is inserted into the underlying data entity for an Editable Data Table with an insert action defined. For Data Tables with the Form option, this event is available in the corresponding Form component and not on the Table itself.

```javascript
<wm-table on-beforerowinsert="tableBeforerowinsert($event, widget, row, options)" name="table"></wm-table>
```

```javascript
Page.tableBeforerowinsert = function ($event, widget, row, options) {
  // row contains the data of the new record to be inserted
  // Modify or validate this data before it is sent to the service

  // Example validation: Ensure the password has at least 6 characters
  if (row.password && row.password.length < 6) {
    // Assumes that the Notification Action "notificationAction" is already created
    Page.Actions.notificationAction.invoke({
      class: "error",
      message: "Password too small",
      position: "center center",
    });
    return false; // Stop the row insertion
  }

  // Example modification: Set default fields before insertion
  row.dateModified = new Date(); //Set current date as modified date
};
```

- This is the markup for a table with an on-beforerowupdate event, executed before a record is updated in the underlying data entity for an Editable Data Table with an update action defined. For Data Tables with the Form option, this event is available in the corresponding Form component and not on the Table itself.

```javascript
<wm-table on-beforerowupdate="tableBeforerowupdate($event, widget, row, options)" name="table"></wm-table>
```

```javascript
Page.tableBeforerowupdate = function ($event, widget, row, options) {
  // row contains the data of the record to be updated
  // This data can be modified or validated before sending the update request

  // Example validation: Ensure the password has at least 6 characters
  if (row.password && row.password.length < 6) {
    // Assumes that the Notification Action "notificationAction" is already created
    Page.Actions.notificationAction.invoke({
      class: "error",
      message: "Password too small",
      position: "center center",
    });
    return false; // Stop the row update
  }

  // Example modification: Set default fields before updating
  row.dateModified = new Date(); // Set current date as modified date
};
```

- This is the markup for a table with an on-beforeformrender event, executed on editing a row and before the inline form is rendered. It gives access to the data to be displayed in the form, allowing values to be modified or editing to be prevented based on conditions. (Only for Data Tables with Quick-Edit and Inline-Edit)

```javascript
<wm-table on-beforeformrender="tableBeforeformrender($event, widget, row, $operation)" name="table"></wm-table>
```

```javascript
Page.tableBeforeformrender = function ($event, widget, row, $operation) {
  // row: Contains the data of the row being edited or inserted
  // $operation: 'new' for a new row, 'edit' when editing an existing row

  // Prevent editing of rows with admin role
  if (row.role === "admin") {
    // Assumes that the Notification Action "notificationAction" is already created
    Page.Actions.notificationAction.invoke({
      class: "error",
      message: "Admin row can not be edited",
      position: "center center",
    });
    return false; // Stop the form from rendering
  }

  // Set default city if missing
  if (!row.city) {
    row.city = "New York";
  }

  // For new rows, set default role
  if ($operation === "new") {
    row.role = "user";
  }
};
```

- This is the markup for a table with an on-formrender event, executed after the inline form is rendered for a row in Quick-Edit or Inline-Edit mode. It gives access to all components in the form, allowing individual components to be disabled, modified, or configured based on conditions. (Only for Data Tables with Quick-Edit and Inline-Edit)

```javascript
<wm-table on-formrender="tableFormrender($event, widget, formWidgets, $operation)" name="table"></wm-table>
```

```javascript
Page.tableFormrender = function ($event, widget, formWidgets, $operation) {
  // formWidgets has the scopes of all the components in the form. Individual component can be accessed as formWidgets.[fieldName]
  //$operation: $operation value is 'new' for new row and 'edit' when row being edited

  //Disabled the editing of role field
  formWidgets.role.disabled = true;
};
```

- This is the markup for a table with an on-sort event, executed whenever a Data Table header is clicked to sort by a particular column.

```javascript
<wm-table on-sort="tableSort($event, widget, $data)" name="table"></wm-table>
```

```javascript
Page.tableSort = function ($event, widget, $data) {
  // $data: Contains the newly sorted data, the column definition (colDef), and the sort direction (asc/desc)

  // $event: The header element that was clicked to perform sorting
  // Example: Log the sorted data for debugging or further processing
  console.log("Sorted column data:", $data);
};
```

- This is the markup for a table with an on-rowclick event, executed whenever a row in the Data Table is clicked. This includes both selecting and deselecting a row.

```javascript
<wm-table on-rowclick="tableRowclick($event, widget, row)" name="table"></wm-table>
```

```javascript
Page.tableRowclick = function ($event, widget, row) {
  // row: Contains the data of the clicked row along with its index in the table
  // $event: The table cell element that was clicked to trigger the row selection

  // Example: Log the clicked row data and its index for debugging or further actions
  console.log("Clicked row index and data:", row.$index, row);
};
```

- This is the markup for a table with an on-rowselect event, executed whenever a row is selected in the Data Table.

```javascript
<wm-table on-rowselect="tableRowselect($event, widget, row)" name="table"></wm-table>
```

```javascript
Page.tableRowselect = function ($event, widget, row) {
  // row: Contains the data of the selected row, including its index ($index)
  // $event: The table cell element that was clicked to select the row

  // Example: Log the selected row data and its index
  console.log("Selected row data with index:", row.$index, row);
};
```

- This is the markup for a table with an on-headerclick event, executed whenever a Data Table header is clicked.

```javascript
<wm-table on-headerclick="tableHeaderclick($event, widget, column)" name="table"></wm-table>
```

```javascript
Page.tableHeaderclick = function ($event, widget, column) {
  // column: Contains the definition data of the clicked header column
  // $event: The header element that was clicked

  // Example: Log the clicked column field and its definition for debugging or further actions
  console.log("Clicked column field and definition:", column.field, column);
};
```

#### Methods 

- This method is to refresh the data in data table with the currently applied filters and sort.

```javascript
Page.Widgets.table.refreshData();
```

- This method is to clear the filters applied on data table.

```javascript
Page.Widgets.table.clearFilter();
```

- This method is to force re-render data table.

```javascript
//Will force re-render data table.
Page.Widgets.table.redraw(true);
```

- This method is to select a row of table.

```javascript
// The parameter can be index or object of row
Page.Widgets.table.selectItem(1);
```

- This method is to de-select a row of table.

```javascript
// The parameter can be index or object of row
//Deselect will work only for data table with multiselect enabled on it.
Page.Widgets.table.deselectItem(1);
```

- This method is to edit a row of table (applicable to inline and quick edit data tables alone).

```javascript
// Selected row will be edited
Page.Widgets.table.editRow();
```

- This method is to add a new row of table (applicable to inline and quick edit data tables alone).

```javascript
Page.Widgets.table.addRow();
```

- This method is to save a row of table (applicable to inline and quick edit data tables alone).

```javascript
Page.Widgets.table.saveRow();
```

- This method is to cancel a row edit of table (applicable to inline and quick edit data tables alone).

```javascript
Page.Widgets.table.cancelRow();
```

- This method is to delete a row of table (applicable to inline and quick edit data tables alone).

```javascript
Page.Widgets.table.deleteRow();
```

- This method is to hide the edit row and go back to view mode of table (applicable to inline and quick edit data tables alone).

```javascript
Page.Widgets.table.hideEditRow();
```

- This method is to change a property title of a table column.

```javascript
//Will change the display name of specified column to "Net Amount"
//Page.Widgets.[dataTableName].columns.[columnname].displayName
Page.Widgets.table.columns.netAmount.displayName = "Net Amount";
```

- This method is to change a property sortable of a table column.

```javascript
// disables the sort property on the data table 
//Page.Widgets.[dataTableName].columns.[columnname].sortable
Page.Widgets.table.columns.netAmount.sortable = false;
```

- This method is to focus on a field in edit mode(applicable to inline and quick edit data tables alone).

```javascript
//This will focus the input on [columnname] field
//Page.Widgets.[dataTableName].formfields.[columnname].focus();
Page.Widgets.table.formfields.netAmount.focus();
```

- This method is to change value of a field which is in edit mode (applicable to inline and quick edit data tables alone).

```javascript
// Sets ‘Amount’ to the specified column edit field 
//Note: This will work only on click of edit on a row.
//Page.Widgets.[dataTableName].formfields.[columnname].widget.datavalue
Page.Widgets.table.formfields.netAmount.widget.datavalue = "Amount";
```

- This method is retrieve value of a field which is in edit mode (applicable to inline and quick edit data tables alone).

```javascript
// This will display the specified column field value in the console. 
//Note: This will work only on click of edit on a row.
//Page.Widgets.[dataTableName].formfields.[columnname].getProperty('value')
Page.Widgets.table.formfields.netAmount.widget.getProperty('value');
```

#### Sample Data Table Dataset

```javascript
// Sample dataset for the Table component, containing a list of sales items
let salesData = [
  {
    "id": "I001",
    "item": "Laptop",
    "description": "15-inch business laptop with 16GB RAM",
    "quantity": 2,
    "unitPrice": 750,
    "discount": 50,
    "netAmount": 1450
  },
  {
    "id": "I002",
    "item": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "quantity": 5,
    "unitPrice": 25,
    "discount": 0,
    "netAmount": 125
  },
  {
    "id": "I003",
    "item": "Keyboard",
    "description": "Mechanical keyboard with backlight",
    "quantity": 3,
    "unitPrice": 45,
    "discount": 15,
    "netAmount": 120
  }
]
```