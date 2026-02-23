# Overview

The **Popover** component is a lightweight UI component used to display additional information or actions when a user interacts with an element, such as clicking or tapping it. It is commonly used for notifications, quick actions, or contextual menus (for example, a notifications panel). Popovers appear on top of the current screen without navigating away, allowing users to view details or take actions and easily dismiss them to continue with their current task.

### Markup

```javascript
<wm-popover popoverwidth="240" popoverheight="360" margin="unset 0.5em" name="popover" variant="standard"></wm-popover>
```

### Examples

#### Properties 

- This popover sets the caption text displayed for the popover and the title text displayed for the popover content, both of which can be configured in the markup or dynamically via script.

```javascript
<wm-popover caption="User Profiles" title="User Details" name="popover"></wm-popover>
```

```javascript
// Set the popover caption text dynamically
Page.Widgets.popover.caption = "User Profiles";

// Set the popover content title text dynamically
Page.Widgets.popover.title = "User Details";
```

- This popover has a configurable content property that determines which partial is rendered inside it when the content source is set to partial. The partial can be specified in the markup or dynamically via script.

```javascript
<wm-popover contentsource="partial" content="partialEmployees" name="popover"></wm-popover>
```

```javascript
// Set the partial content to be rendered inside the Popover dynamically
Page.Widgets.popover.content = "partialEmployees";
```

- This popover supports inline content, where WaveMaker components or custom HTML can be placed directly as content inside the popover markup when the content source is set to inline.

```javascript
<wm-popover contentsource="inline" name="popover">
    <wm-label padding="unset" caption="Popover Inline Content" class="p" type="p" name="label" variant="default:p"></wm-label>
</wm-popover>
```


#### Events 

- This is the markup for a popover with an on-show event, executed when the popover content is displayed.

```javascript
<wm-popover on-show="popoverShow($event, widget)" contentsource="partial" content="partialEmployees" name="popover"></wm-popover>
```

```javascript
Page.popoverShow = function ($event, widget) {
  // Example: Invoke variables or access components from the loaded partial
  if (App.Variables.loggedInUser.dataSet.role === "Admin") {
    // Invoke a variable defined inside the partial
    widget.Variables.svGetEmployeesDetails.invoke();
  }

  // Components inside the partial can also be accessed if needed
  // Example: widget.Widgets.EmployeeList.show
};
```

- This is the markup for a popover with an on-hide event, executed when the popover content is hidden.

```javascript
<wm-popover on-hide="popoverHide($event, widget)" name="popover"></wm-popover>
```

```javascript
Page.popoverHide = function ($event, widget) {
  // Example: Mark notifications as read or perform any cleanup
  Page.Variables.svMarkNotificationsRead.invoke();
};
```

#### Methods 

- This method opens the popover programmatically and displays its content.

```javascript
// Open the Popover and display its content
Page.Widgets.popover.open();
```

- This method closes the popover programmatically and hides its content.

```javascript
// Close the Popover and hide its content
Page.Widgets.popover.close();
```