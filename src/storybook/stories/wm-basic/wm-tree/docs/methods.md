# Methods

The Tree component can be controlled programmatically using the following methods. Access these methods using the pattern `Page.Widgets.widgetName.methodName()`.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| expandNode | nodeId: String/Number | void | Expands the specified node |
| collapseNode | nodeId: String/Number | void | Collapses the specified node |
| expandAll | none | void | Expands all nodes in the tree |
| collapseAll | none | void | Collapses all nodes in the tree |
| selectNode | nodeId: String/Number, clearExisting: Boolean | void | Selects the specified node |
| getSelectedNodes | none | Array | Returns array of selected node objects |
| findNode | nodeId: String/Number | Object | Returns the node object with the specified ID |
| refresh | none | void | Refreshes the tree view with current data |

## Common Method Use Cases

```javascript
// Expand a specific node by ID
Page.Widgets.myTree.expandNode(5);

// Select a node and clear other selections
Page.Widgets.myTree.selectNode(3, true);

// Get all currently selected nodes
var selectedNodes = Page.Widgets.myTree.getSelectedNodes();
console.log(selectedNodes);

// Expand all nodes then collapse a specific branch
Page.Widgets.myTree.expandAll();
Page.Widgets.myTree.collapseNode(2);
```