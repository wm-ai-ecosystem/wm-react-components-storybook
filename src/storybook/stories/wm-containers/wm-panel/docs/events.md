# Callback Events

## Panel Events

| Event | Description |
|-------|-------------|
| onLoad | Triggered when the panel is loaded |
| onClose | Triggered when the panel is closed using the close button |
| onCollapse | Triggered when the panel is collapsed |
| onExpand | Triggered when the panel is expanded |
| onFullscreen | Triggered when the panel enters full-screen mode |
| onExitfullscreen | Triggered when the panel exits full-screen mode |
| onActionsclick | Triggered when an action item in the menu is clicked |
| onPropertyChange | Triggered when any property of the panel is changed |

## Mouse Events

| Event | Description |
|-------|-------------|
| onMouseenter | Triggered when the mouse pointer enters the panel area |
| onMouseleave | Triggered when the mouse pointer leaves the panel area |
| onMouseover | Triggered when the mouse pointer moves over the panel |
| onMouseout | Triggered when the mouse pointer moves out of the panel |

## Event Handler Example

```javascript
// Handle panel collapse event
Page.onCollapsePanel = function(event, widget) {
  console.log('Panel collapsed:', widget.name);
  
  // Update other UI elements in response
  Page.Variables.notificationVar.notify('Panel collapsed');
};

// Handle panel action click
Page.onActionClickPanel = function(event, item) {
  console.log('Action clicked:', item.label);
  
  // Perform action based on which item was clicked
  if (item.label === 'Refresh') {
    Page.Variables.employeeData.update();
  }
};
```