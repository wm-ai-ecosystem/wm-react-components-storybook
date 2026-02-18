# Overview

The **LeftNav** component is a layout element designed to provide a vertical navigation panel on the left side of the application. It offers flexible width and height configuration to accommodate various application layouts and navigation requirements. This component serves as a container for navigation links and other controls to help users navigate through different sections of the application.



# Markup

```javascript
<wm-left-panel columnwidth="2" content="leftnav" navtype="rail" navheight="full" name="leftpanel"></wm-left-panel>
```

### Examples

#### Properties

- This setting controls the left-panel width in a 12-column grid layout and can be configured either in the markup or dynamically using script.

```javascript
// Configure left-panel column width dynamically
Page.Widgets.leftpanel.columnwidth = "2";
```

- This property is used to load or update the content (partial) displayed inside the left-panel. It can be set in the markup or dynamically through script to show different left-panel layouts.

```javascript
//The 'content' property specifies a partial page to render inside the left-panel.
Page.Widgets.leftpanel.content = "leftnav";
```

#### Events

- This is the markup for a left-panel with an on-load event, which is executed when the left-panel is initialized and rendered on the page.

```javascript
<wm-left-panel on-load="leftpanelLoad($event, widget)" name="leftpanel"></wm-left-panel>
```

```javascript
Page.leftpanelLoad = function ($event, widget) {
  // Determine the logged-in user's role and load the appropriate navigation items
  if(App.Variables.loggedInUser.dataSet.roles.includes("admin")){
    // Note: To access variables inside a leftpanel (partial), the leftpanel layout must be bound to a partial content

    // Load admin-specific navigation items
    App.activePage.Widgets.leftpanel.Variables.svGetLeftNavAdmin.invoke();
  }else{
    // Load user-specific navigation item
    App.activePage.Widgets.leftpanel.Variables.svGetLeftNavUser.invoke();
  }
  // The variable's success data can be bound to the Nav component inside the LeftPanel for dynamic menu content based on the user's role
};
```
