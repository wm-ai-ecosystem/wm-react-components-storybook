# Props

The Tree component accepts the following properties for configuration:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | Array | [] | The hierarchical data structure to display in the tree |
| selectable | Boolean | true | Whether tree nodes can be selected |
| multiSelect | Boolean | false | Allows selection of multiple nodes when true |
| showIcons | Boolean | true | Displays default folder/item icons for nodes |
| expandAll | Boolean | false | Expands all nodes by default when true |
| nodeIndent | Number | 24 | The indentation in pixels for each level |
| loadingState | String | "ready" | Indicates loading state ("ready", "loading", "error") |
| keyField | String | "id" | Field name to use as unique identifier for nodes |
| labelField | String | "label" | Field name to use as display text for nodes |
| childrenField | String | "children" | Field name that contains child nodes |

## Common Use Cases

#### Basic Tree Configuration
```javascript
// Set up basic tree with data
Page.Widgets.myTree.data = [
  {
    id: 1,
    label: "Root",
    children: [
      { id: 2, label: "Child 1" },
      { id: 3, label: "Child 2" }
    ]
  }
];

// Configure tree to expand all nodes on load
Page.Widgets.myTree.expandAll = true;
```

#### Custom Field Mapping
```javascript
// Use custom field names for your data structure
Page.Widgets.myTree.keyField = "nodeId";
Page.Widgets.myTree.labelField = "displayName";
Page.Widgets.myTree.childrenField = "subItems";
```