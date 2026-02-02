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

- Simple tree dataset.

```javascript
[
  {
    "id": 1,
    "label": "Item 1",
    "icon": "fa fa-align-left",
    "children": []
  },
  {
    "id": 2,
    "label": "Item 2",
    "icon": "glyphicon glyphicon-music",
    "children": [
      {
        "id": 2.1,
        "label": "Item 2.1",
        "icon": "glyphicon glyphicon-bookmark",
        "children": []
      }
    ]
  }
];
```

#### Events 

- Triggered when a tree node is selected.

```javascript
    Page.treeSelect = function ($event, widget, $item, $path) {
    console.log("Selected node", $item);
};
```

- Triggered when a tree node is expanded.

```javascript
    Page.treeExpand = function ($event, widget, $item, $path) {
    console.log("Expanded node", $item);
};
```

- Triggered when a tree node is collapsed.

```javascript
    Page.treeCollapse = function ($event, widget, $item, $path) {
    console.log("Collapsed node", $item);
};
```


#### Methods 

- Clear the current tree selection.

```javascript
    Page.Widgets.tree.deselectById();
```

- Use this method to select a specific node in the tree.

```javascript
    Page.Widgets.tree.selectById(1);
```