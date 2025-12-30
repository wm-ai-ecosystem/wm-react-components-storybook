# Callback Events

| Event | Description |
|-------|-------------|
| `onClick(event, widget, item, currentItemWidgets)` | Triggered when the card is clicked. Provides the click event, widget reference, item data, and associated widgets. |
| `onDblclick(event, widget, item, currentItemWidgets)` | Triggered when the card is double-clicked. Useful for implementing secondary actions. |
| `onMouseover(event, widget, item, currentItemWidgets)` | Triggered when the mouse pointer moves over the card. Can be used for hover effects or tooltips. |
| `onMouseout(event, widget, item, currentItemWidgets)` | Triggered when the mouse pointer leaves the card after being over it. |
| `onMouseenter(event, widget, item, currentItemWidgets)` | Triggered when the mouse pointer enters the card. Similar to onMouseover but doesn't trigger when moving between child elements. |
| `onMouseleave(event, widget, item, currentItemWidgets)` | Triggered when the mouse pointer leaves the card. Similar to onMouseout but doesn't trigger when moving between child elements. |

## Event Parameters

| Parameter | Description |
|-----------|-------------|
| `event` | The React MouseEvent object containing information about the event (coordinates, target, etc.) |
| `widget` | Reference to the card widget that triggered the event |
| `item` | The data item associated with the card, if any |
| `currentItemWidgets` | Collection of widgets associated with the current item |

## Example Usage

```javascript
Page.Widgets.myCard.onClick = function(event, widget, item, currentItemWidgets) {
    // Open a detail view when card is clicked
    Page.Variables.productDetails.setInput({
        "productId": item.id
    });
    Page.Variables.productDetails.invoke();
    Page.Containers.detailsDialog.open();
};

Page.Widgets.myCard.onMouseenter = function(event, widget, item, currentItemWidgets) {
    // Apply a visual effect on hover
    $(event.currentTarget).addClass("highlighted");
};

Page.Widgets.myCard.onMouseleave = function(event, widget, item, currentItemWidgets) {
    // Remove the visual effect when no longer hovering
    $(event.currentTarget).removeClass("highlighted");
};
```