# Overview

The **Accordion** component contains multiple panes where developers can add internal content or partial pages. It allows users to expand or collapse sections for better content organization and supports features like setting a default pane, allowing multiple panes to open, and dynamically controlling pane content.

### Markup

```javascript
<wm-accordion type="static" statehandler="URL" name="accordion" class="app-accordion panel panel-default"
    variant="default:default">
    <wm-accordionpane name="accordionpaneUser"></wm-accordionpane>
    <wm-accordionpane name="accordionpaneEmp"></wm-accordionpane>
    <wm-accordionpane name="accordionpaneDept"></wm-accordionpane>
</wm-accordion>
```

### Examples

#### Properties

-  The accordion has a configurable property close others which determines whether other panes should close when one pane is opened. It can be set in the markup or dynamically via script.

```javascript
<wm-accordion closeothers="false" name="accordion"></wm-accordion>
```

```javascript
// Setting closeothers = false allows multiple panes to stay open at the same time.
Page.Widgets.accordion.closeothers = false;
```

-  The accordion pane has a configurable content property which determines which partial page is rendered inside it. This partial can be set in the markup or dynamically via script.

```javascript
<wm-accordionpane content="partialUserDetails" name="accordionpaneUser"></wm-accordionpane>
```

```javascript
// The 'content' property of the accordion pane specifies a partial page to render inside the pane.
Page.Widgets.accordionpaneUser.content = "partialUserDetails";
```

#### Events

- This is the markup for an accordion with an on-change event, executed whenever the user switches between different panes.

```javascript
<wm-accordion on-change="accordionChange($event, widget, newPaneIndex, oldPaneIndex)" name="accordion"></wm-accordion>
```

```javascript
Page.accordionChange = function ($event, widget, newPaneIndex, oldPaneIndex) {
  // Check if the active pane is "User Details" and the first pane is selected
  if (widget.activePane.title === "User Details" && newPaneIndex === 0) {

    // Dynamically set the partial page to display inside the active acccordion pane
    // - Editable partial if the logged-in user has the "user" role
    // - Read-only partial otherwise
    widget.activePane.content =
      App.Variables.loggedInUser.dataSet.roles.includes("user")
        ? "partialEditUserDetails"
        : "partialUserDetails";
  }
};
```

- This is the markup for an accordion pane with an on-expand event, executed whenever the pane is expanded by the user.

```javascript
<wm-accordionpane on-expand="accordionpaneUserExpand($event, widget)" name="accordionpaneUser"></wm-accordionpane>
```

```javascript
Page.accordionpaneUserExpand = function ($event, widget) {
  // Check if the expanded pane is "User Details" and it is the first pane
  if (widget.title === "User Details" && widget.tabindex === 0) {
    
    // Show the editable user form only if the logged-in user has the "user" role
    Page.Widgets.userForm.show =
      App.Variables.loggedInUser.dataSet.roles.includes("user") ? true : false;
  }
};
```

#### Methods

- This method expands the specified accordion pane programmatically, making its content visible to the user.

```javascript
// Expand the accordion pane programmatically
Page.Widgets.accordionpaneUser.expand();
```

- This method collapses the specified accordion pane programmatically, making its content hidden to the user.

```javascript
// collapse the accordion pane programmatically
Page.Widgets.accordionpaneUser.collapse();
```
