# Callback Events

| Event | Description |
|-------|-------------|
| `onChange` | Triggered when a pane is expanded or collapsed with the following parameters: `{ newPaneIndex: number, oldPaneIndex: number }` |
| `onLoad` | Called when the accordion component is loaded with the following parameters: `(props: any, onLoadCallback?: any)` |

## Example: Responding to Pane Changes

```javascript
// Set up an onChange handler
Page.Widgets.myAccordion.onChange = function(event) {
  console.log("Expanded pane changed from", event.oldPaneIndex, "to", event.newPaneIndex);
  
  // Perform actions based on the newly opened pane
  if (event.newPaneIndex === 1) {
    // Do something when the second pane is opened
    loadSalesData();
  }
};
```