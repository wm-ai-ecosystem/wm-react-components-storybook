# Overview

The **List** component is a flexible data container for displaying a collection of items in a structured layout. It supports both static datasets and dynamic data from services like databases, queries, or web APIs through variables. The List offers customizable templates for item presentation, along with features such as pagination, sorting, grouping, multi-selection, and responsive layouts, making it suitable for a wide range of data display scenarios.

### Markup

```javascript
<wm-list listclass="list-group" itemclass="list-group-item" template="true" template-name="Blank List"
    itemsperrow="xs-1 sm-1 md-1 lg-1" class="media-list" statehandler="URL" name="list"
    dataset="bind:Variables.stvProductsList.dataSet" navigation="Basic" variant="standard">
    <wm-listtemplate layout="inline" name="listtemplate">
        <wm-container direction="row" alignment="top-left" gap="4" width="fill" name="listContainer"
            class="app-elevated-container" variant="elevated" padding="12px" height="56"></wm-container>
    </wm-listtemplate>
</wm-list>
```

### Examples

#### Properties 

- This list displays a collection of items, with configurable features such as navigation type, page size, allowing users to change page size, and page size options, which can be set directly in the markup or accessed and updated dynamically via script.

```javascript
<wm-list navigation="Basic" pagesize="10" allowpagesizechange="true" pagesizeoptions="5,10,20,50,100" name="list"></wm-list>
```

```javascript
// Set the navigation type of the list dynamically
Page.Widgets.list.navigation = "Basic";

// Set the number of items displayed per page dynamically
Page.Widgets.list.pagesize = 10;

// Enable users to change the number of items shown per page dynamically.
// This works only if the List has page navigation enabled.
Page.Widgets.list.allowpagesizechange = true;

// Define the available page size options for the list
Page.Widgets.list.pagesizeoptions = "5,10,20,50,100";
```

#### Events 

- This is the markup for a list with an on-reorder event, executed whenever the items in the List are reordered by the user.

```javascript
<wm-list on-render="listRender(widget, $data)" name="list"></wm-list>
```

```javascript
Page.listReorder = function ($event, $data, $changedItem) {
  // $data contains all items in the List with their current order
  // $changedItem refers to the item that was moved by the user

  // Update the "position" property for each item based on its new order
  $data.forEach((item, index) => {
    item.position = index + 1;
  });

  // Save the reordered data to a variable for further use or persistence
  Page.Variables.mdReorderedProductsData.dataSet = $data;
};
```

- This is the markup for a list with an on-select event, executed whenever a user selects an item from the list.

```javascript
<wm-list on-select="listSelect(widget, $data)" name="list"></wm-list>
```

```javascript
Page.listSelect = function (widget, $data) {
  // $data contains the data of the selected List item

  // Open a dialog to show details of the selected item
  Page.Widgets.productDetailsDialog.open();

  // Pass the selected item's ID as input to a service and invoke it
  Page.Variables.getProductDetails.setInput("productId", $data.id);
  Page.Variables.getProductDetails.invoke();
};
```

- This is the markup for a list component with an on-render event, executed whenever the list is rendered on the page.

```javascript
<wm-list on-reorder="listReorder($event, $data, $changedItem)" name="list"></wm-list>
```

```javascript
Page.listRender = function (widget, $data) {
  // $data contains all items currently in the List

  // Define the item to be selected by default when the List is rendered
  let selectedProductItem = {
    "id": "P001",
    "name": "Wireless Headphones",
    "price": 39.99,
    "currency": "USD",
    "image": "resources/images/products/headphones.png",
    "rating": 4.5,
    "position": 1
  };

  // Set the specified item as the selected item in the List
  // Page.Widgets.list.selecteditem = selectedProductItem;
  widget.selecteditem = selectedProductItem;
};
```

#### Methods 

- This method selects an item in the list by its index, highlighting it and making it the currently selected item.

```javascript
// Select the first item in the List (index 0)
Page.Widgets.list.selectItem(0);
```

- This method deselects an item in the list by its index, removing it from the currently selected item.

```javascript
// Deselect the first item in the List (index 0)
Page.Widgets.list.deselectItem(0); 
```

- This method returns the zero-based index of a specific list item object within the List, allowing you to determine its position programmatically.

```javascript
// Get the index of the currently selected item in the List
Page.Widgets.list.getIndex(Page.Widgets.list.selecteditem); 
```

- This method retrieves the list item object at the specified zero-based index, allowing programmatic access to its data and properties.

```javascript
// Get the first List item object (index 0) for programmatic access to its data and properties
Page.Widgets.list.getItem(0); 
```

- This method clear the list items.

```javascript
// Remove all items from the List, clearing its contents
Page.Widgets.list.clear(); 
```

- This method retrieves one or more component instances placed inside a list template by their name. If an index is provided, it returns the component instance for that specific List item; otherwise, it returns all matching components across the List.

```javascript
// Get the component named "labelProductName" from the second item in the List (index 1)
Page.Widgets.list.getWidgets("labelProductName", 1); 
```

#### Sample List Dataset

- This is the markup for a list bound to a sample dataset of products, displaying each product’s name using a label inside a template container, with support for navigation.

```javascript
<wm-list listclass="list-group" itemclass="list-group-item" template="true" template-name="Blank List"
    itemsperrow="xs-1 sm-1 md-1 lg-1" class="media-list" statehandler="URL" name="list"
    dataset="bind:Variables.stvProductsList.dataSet" navigation="Basic" variant="standard" pagesize="10">
    <wm-listtemplate layout="inline" name="listtemplate1">
        <wm-container direction="row" alignment="top-left" gap="4" width="fill" name="List"
            class="app-elevated-container" variant="elevated" padding="12px" height="56">
            <wm-label padding="unset" caption="bind:Widgets.list.currentItem.name" class="p" type="p"
                name="labelProductName" variant="default:p"></wm-label>
        </wm-container>
    </wm-listtemplate>
</wm-list>
```

```javascript
// Sample dataset for the List component, containing a list of products
let productsLists = [
  {
    "id": "P001",
    "name": "Wireless Headphones",
    "price": 39.99,
    "currency": "USD",
    "image": "resources/images/products/headphones.png",
    "rating": 4.5,
    "position": 1
  },
  {
    "id": "P002",
    "name": "Smart Watch",
    "price": 69.99,
    "currency": "USD",
    "image": "resources/images/products/smartwatch.png",
    "rating": 4.2,
    "position": 2
  },
  {
    "id": "P003",
    "name": "Bluetooth Speaker",
    "price": 29.99,
    "currency": "USD",
    "image": "resources/images/products/speaker.png",
    "rating": 4,
    "position": 3
  }
]
```


<!-- - Can access the components inside the selected item and update their properties dynamically.

```javascript
// Change the caption of the "labelTitle" widget in the selected list item
Page.Widgets.list.selectedItemWidgets.labelTitle.caption = "Product Selected";
``` -->

<!-- - currentItem and currentItemWidgets can’t be accessed through script. But those were given as parameters for events of components inside list component template. currentItem is given as item in the arguments.

```javascript
currentItemWidgets.Name.caption = ‘Eric’;  
``` -->