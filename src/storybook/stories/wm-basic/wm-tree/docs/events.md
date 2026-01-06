# Callback Events

The Tree component emits the following events that you can handle in your application:

| Event | Description |
|-------|-------------|
| onSelect | Triggered when a node is selected |
| onExpand | Triggered when a node is expanded |
| onCollapse | Triggered when a node is collapsed |
| onNodeClick | Triggered when any node is clicked |
| onNodeDoubleClick | Triggered when a node is double-clicked |
| onNodeRightClick | Triggered when a node is right-clicked |
| onLoad | Triggered when the tree data is loaded |
| onError | Triggered when an error occurs while loading data |

## Example Event Handlers

```javascript
Page.onNodeClickEvent = function(event, node) {
  console.log("Node clicked:", node.label);
  // Take action based on the selected node
};

Page.onExpandEvent = function(event, node) {
  console.log("Node expanded:", node.label);
  // Potentially load additional data for this node
};
```