# Overview

The **List** component is a flexible data container for displaying a collection of items in a structured layout. It supports both static datasets and dynamic data from services like databases, queries, or web APIs through variables. The List offers customizable templates for item presentation, along with features such as pagination, sorting, grouping, multi-selection, and responsive layouts, making it suitable for a wide range of data display scenarios.

### Markup

```javascript
<wm-list listclass="list-group" itemclass="list-group-item" template="true" template-name="Text with Description List"
    itemsperrow="xs-1 sm-1 md-1 lg-1" class="media-list" statehandler="none" name="list"
    dataset="bind:Variables.stvListData.dataSet" navigation="Basic" variant="standard">
    <wm-listtemplate layout="inline" name="listtemplate">
        <wm-container direction="row" alignment="top-left" gap="4" width="fill" name="List"
            class="app-elevated-container" variant="elevated" padding="12px">
            <wm-picture resizemode="cover" class="img-circle img-rounded" variant="default:rounded" width="24px"
                height="24px" picturesource="bind:Widgets.list.currentItem.image" name="Picture"></wm-picture>
            <wm-container direction="column" alignment="top-left" gap="0" width="fill" wrap="false"
                class="app-container-default" variant="default" name="text" height="hug">
                <wm-label padding="unset" caption="bind:Widgets.list.currentItem.title" class="h5" type="p"
                    variant="default:h5" show="true" required="required" name="labelTitle"></wm-label>
                <wm-label padding="unset" caption="bind:&quot;Price: &quot; + Widgets.list.currentItem.price" class="p"
                    type="p" variant="default:p" show="true" required="required" name="labelPrice"></wm-label>
            </wm-container>
        </wm-container>
    </wm-listtemplate>
</wm-list>
```

### Examples

#### Properties 

- Can access the List component and change its configuration, such as navigation type or page size.

```javascript
// Set the navigation type of the list to "Basic"
Page.Widgets.list.navigation = "Basic";

// Set the number of items displayed per page
Page.Widgets.list.pagesize = 10;
```

- Can access the components inside the selected item and update their properties dynamically.

```javascript
// Change the caption of the "labelTitle" widget in the selected list item
Page.Widgets.list.selectedItemWidgets.labelTitle.caption = "Product Selected";
```

- Set or update the selected item in the List.

```javascript
// Assign a specific item as the selected item in the List
Page.Widgets.list.selecteditem = selectedProductItem;
```

#### Events 

- Triggered when items in the List are reordered.

```javascript
Page.listReorder = function ($event, $data, $changedItem) {
    // Update the position property for each item based on its new order
    $data.forEach((item, index) => {
        item.position = index + 1;
    });

    // Save the reordered data to a variable
    Page.Variables.mdReorderedProductsData.dataSet = $data;
};
```

- Triggered when a List item is selected.

```javascript
Page.listSelect = function (widget, $data) {
    // open a dialog or take any other action with the selected item
    Page.Widgets.productDetailsDialog.open();

    Page.Variables.getProductDetails.setInput("productId", $data.id);
    Page.Variables.getProductDetails.invoke();
};
```

- Triggered when the List is rendered.

```javascript
Page.listRender = function (widget, $data) {
    // Set a specific item as the selected item when the list is rendered
    Page.Widgets.list.selecteditem = selectedProductItem;
};
```

#### Methods 

- Select an item in the List by its index.

```javascript
    Page.Widgets.list.selectItem(0);
```

- Deselect an item in the List by its index.

```javascript
    Page.Widgets.list.deselectItem(0); 
```