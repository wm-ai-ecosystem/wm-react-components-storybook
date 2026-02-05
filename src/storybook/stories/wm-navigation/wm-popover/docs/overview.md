# Overview

The **Popover** component is a lightweight UI component used to display additional information or actions when a user interacts with an element, such as clicking or tapping it. It is commonly used for notifications, quick actions, or contextual menus (for example, a notifications panel). Popovers appear on top of the current screen without navigating away, allowing users to view details or take actions and easily dismiss them to continue with their current task.

### Markup

```javascript
<wm-popover
  popoverwidth="240"
  popoverheight="360"
  margin="unset 0.5em"
  name="popover"
  contentsource="partial"
  content="partialUserProfiles"
></wm-popover>
```

### Examples

#### Properties 

- Sets the caption displayed for the Popover.

```javascript
Page.Widgets.popover.caption = "User Profiles";
```

- Controls whether an arrow is displayed pointing from the Popover to its trigger element.

```javascript
// When false, displays the popover without an arrow
Page.Widgets.popover.popoverarrow = false;
```

#### Events 

- Triggered when the notifications popover is shown.

```javascript
Page.popoverShow = function ($event, widget) {
    // Fetch the latest notifications from the server when popover opens
    Page.Variables.getNotifications.invoke();
};
```

- Triggered when the notifications popover is hidden.

```javascript
Page.popoverHide = function ($event, widget) {
    // Mark notifications as read or log the closing event
    Page.Variables.markNotificationsRead.invoke();
};
```

#### Methods 

- Opens the popover and displays its content.

```javascript
Page.Widgets.popover.open();
```