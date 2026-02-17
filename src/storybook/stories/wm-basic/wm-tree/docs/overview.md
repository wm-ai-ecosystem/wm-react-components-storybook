# Overview

The **Tree** component displays data in a hierarchical structure, allowing you to represent parent-child relationships and nested information in a clear, organized format.

### Markup

```javascript
<wm-tree name="tree"></wm-tree>
```

### Examples

#### Properties 

- This tree has a configurable levels to control how many nodes are expanded by default, which can be set in the markup or dynamically via script.

```javascript
<wm-tree levels="3" name="tree"></wm-tree>
```

```javascript
// Set the number of tree levels to be expanded by default
// Note: This works effectively when the tree is bound to a dataset
Page.Widgets.tree.levels = 3;
```

#### Events 

- This is the markup for a tree with an on-select event, executed when a user selects a tree node to fetch related data and update other UI components.

```javascript
<wm-tree on-select="treeSelect($event, widget, $item, $path)" name="tree"></wm-tree>
```

```javascript
Page.treeSelect = function ($event, widget, $item, $path) {
  // Get the ID of the selected tree node (e.g., department ID)
  let selectedDeptId = $item.id;

  // Call the service variable to fetch details for the selected department
  Page.Variables.svGetDepartmentDetails.invoke(
    {
      inputFields: {
        // Pass the selected department ID as input to the service
        deptId: selectedDeptId,
      },
    },
    function (data) {
      // On success, bind the returned department data to the department table
      Page.Widgets.tableDepartment.dataset = data;
    },
    function (error) {
      // Handle errors by showing a user-friendly notification
      Page.Actions.toasterError.dataBinding.text = error;
      Page.Actions.toasterError.invoke();
    },
  );
};
```


```javascript
// Alternate way to invoke a service variable programmatically when an event occurs (e.g., on-select of a tree item).
// This approach is generic and can be used for any event, not just on-select.

Page.treeSelect = function ($event, widget, $item, $path) {
  // Set the input value for the service variable
  Page.Variables.svGetDepartmentDetails.setInput("deptId", $item.id);

  // Invoke the service variable without inline callbacks
  Page.Variables.svGetDepartmentDetails.invoke();
};

// Success and error handling can now be managed via variable-level events such as:
//   - On Before Update
//   - On Success
//   - On Error
// This approach separates the logic from the invocation and is recommended for cleaner code.
// Refer to WaveMaker documentation for more details.

// After the service variable is invoked successfully, bind its returned data to the any data components like table, list etc.
Page.Widgets.tableDepartment.dataset = Page.Variables.svGetDepartmentDetails.dataSet;
```

#### Methods 

- Use this method to clear the current tree selection.

```javascript
// Clear the current selection in the Tree component, deselecting any previously selected node
Page.Widgets.tree.deselectById();
```

- Use this method to select a specific node in the tree.

```javascript
// Select a specific node in the Tree component by its ID (e.g., select the node with ID = 1)
Page.Widgets.tree.selectById(1);
```


#### Sample Tree Dataset

- This is the markup for a Tree component bound to a sample hierarchical dataset, using label as the node label, icon for node icons, and children to represent nested nodes. The dataset can be used to render a tree structure dynamically and supports multiple levels of nesting.

```javascript
<wm-tree
  name="tree"
  dataset="bind:Variables.svTreeData.dataSet"
  nodechildren="children"
  nodelabel="label"
  nodeicon="icon"
></wm-tree>
```

```javascript
// Sample hierarchical dataset for the Tree component
let treeData = [
  {
    "id": 1,
    "label": "Item 1",
    "icon": "glyphicon glyphicon-music",
    "children": [
      {
        "id": 1.1,
        "label": "Item 1.1",
        "icon": "glyphicon glyphicon-bookmark",
        "children": []
      }
    ]
  },
  {
    "id": 2,
    "label": "Item 2",
    "icon": "fa fa-align-left",
    "children": []
  }
]
```


<!-- - Triggered when a tree node is expanded.

```javascript
    Page.treeExpand = function ($event, widget, $item, $path) {
    // Example: Lazy-load subcategories in an e-commerce category tree
    Page.Variables.getSubCategories.setInput("categoryId", $item.id);
    Page.Variables.getSubCategories.invoke();
};
```

- Triggered when a tree node is collapsed.

```javascript
    Page.treeCollapse = function ($event, widget, $item, $path) {
    // Example: Clear selected subcategory products when parent category is collapsed
    Page.Widgets.productGrid.datavalue = [];
};
``` -->