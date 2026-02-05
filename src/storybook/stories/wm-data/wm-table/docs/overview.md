# Overview

The **Data Table** component is a versatile component for displaying and interacting with tabular data. It supports features like sorting, filtering, pagination, row selection, and in-line  or dialog-based editing, and can efficiently handle large datasets with on-demand loading. The table can be bound to databases, queries, procedures, or web/Java services. When connected to database CRUD variables, it supports full Create, Read, Update, Delete operations; for other data sources, it functions as a read-only table.

### Markup

```javascript
<wm-table statehandler="none" name="Table" title="" dataset="bind:Variables.stvProductsData.dataSet"
    navigation="Basic" variant="default">
    <wm-table-column binding="category" caption="Category" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="inStock" caption="In Stock" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="name" caption="Name" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="price" caption="Price" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
    <wm-table-column binding="quantity" caption="Quantity" pcdisplay="true" mobiledisplay="true" tabletdisplay="true">
    </wm-table-column>
</wm-table>
```

### Examples

#### Properties 

- To change a property of a column.

```javascript
//Will change the caption name of specified column to ‘Department Id’.
Page.Widgets.Table.columns.[columnname].caption = "Deptarment Id";
```

- Set filter mode.

```javascript
// To set filter mode as search 
Page.Widgets.Table.filtermode = ‘search’;  

//To set filter mode as multi column
Page.Widgets.Table.filtermode = ‘multicolumn’;  
```


#### Events 

- Triggered when a table row is selected. Allows you to take actions with the selected row data.

```javascript
Page.TableRowselect = function ($event, widget, row) {
    // Use the selected row's data to perform actions, e.g., fetch detailed information
    Page.Variables.getProductDetails.setInput("productId", row.id);
    Page.Variables.getProductDetails.invoke();
};
```

- Triggered when a table is rendered.

```javascript
Page.TableDatarender = function (widget, data) {
    // Set a default selected item when the table is rendered
    widget.selecteditem = {
        "id": 3,
        "name": "Keyboard",
        "price": 79,
        "category": "Accessories",
        "inStock": false,
        "quantity": 0
    }
};
```

#### Methods 

- To hide the edit row and go back to view mode

```javascript
Page.Widgets.Table.hideEditRow();
```