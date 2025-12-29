# Methods

Accordion panes can be controlled programmatically through the following methods. Access these through `Page.Widgets.{accordionPaneName}.{method}`.

| Method | Parameters | Return Type | Description |
|--------|------------|------------|-------------|
| `expand` | none | void | Expands a specific accordion pane |
| `collapse` | none | void | Collapses a specific accordion pane |
| `toggle` | none | void | Toggles the state of a specific accordion pane |

### Common Method Usage

```javascript
// Expand a specific pane
Page.Widgets.engineeringEmpPane.expand();

// Collapse a specific pane
Page.Widgets.salesEmpPane.collapse();

// Toggle a pane (open if closed, close if opened)
Page.Widgets.marketingEmpPane.toggle();
```

### Example: Controlling Accordion from a Button

```javascript
Page.collapseSalesPaneBtnClick = function($event, widget) {
    Page.Widgets.salesEmpPane.collapse();
};

Page.expandSalesPaneBtnClick = function($event, widget) {
    Page.Widgets.salesEmpPane.expand();
};
```