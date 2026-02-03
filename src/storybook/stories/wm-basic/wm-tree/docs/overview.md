# Overview

The **Tree** component displays data in a hierarchical structure, allowing you to represent parent-child relationships and nested information in a clear, organized format.

### Markup

```javascript
<wm-tree name="tree" dataset="bind:Variables.svTreeData.dataSet" nodechildren="children" nodelabel="label" nodeicon="icon"></wm-tree>
```

### Examples

#### Properties 

- Set levels of the tree to be expanded by default.

```javascript
Page.Widgets.tree.levels = 3;
```

#### Events 

- Triggered when a tree node is selected.

```javascript
    Page.treeSelect = function ($event, widget, $item, $path) {
    // When a node is selected, update another component (table, list, or grid)
    // Example: Load department details in a grid based on the selected tree node
    Page.Variables.getDepartmentDetails.setInput("deptId", $item.id);
    Page.Variables.getDepartmentDetails.invoke();
};
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


#### Methods 

- Clear the current tree selection.

```javascript
    Page.Widgets.tree.deselectById();
```

- Use this method to select a specific node in the tree.

```javascript
    Page.Widgets.tree.selectById(1);
```


#### Sample tree dataset.

```javascript
[
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