# Overview

**_Tabs_** is a component that organizes content into separate panes where only one pane is viewable at a time. It provides an easy and powerful mechanism to handle large amounts of content within a limited area, allowing users to quickly access different sections without leaving the page.

The Tabs component can be used in both static mode (with predefined panes) or dynamic mode (generating panes from a dataset), making it versatile for various application needs.

### Markup

```javascript
<wm-tabs
  name="dashboardTab"
  type="static"
  defaultpaneindex="0"
  tabsposition="left"
  transition="slide"
  class="app-tabs-default"
  variant="default"
>
  <wm-tabpane name="tabpane1" title="Overview"></wm-tabpane>
  <wm-tabpane name="tabpane2" title="Reports"></wm-tabpane>
  <wm-tabpane name="tabpane3" title="Settings"></wm-tabpane>
</wm-tabs>

```

### Examples

#### Properties

```javascript
// Set default tab
Page.Widgets.dashboardTab.defaultpaneindex = 1;

// Show / hide tabs
Page.Widgets.dashboardTab.show = true;

// Enable header scrolling
Page.Widgets.dashboardTab.enableheaderscroll = true;

// Change tab transition animation
Page.Widgets.dashboardTab.transition = "slide";

```

#### Scripting with Tabs

- Select JavaScript for the on click event of previousBtn and use the following as javascript function with the following script:

```javascript 
Page.previousbtnClick = function($event, widget) {
Page.Widgets.dashboardTab.prev(); //Navigates to previous tab
};
```

- Select JavaScript for the on click event for nextBtn and use the following script:

```javascript 
Page.nextbtnClick = function($event, widget) {
Page.Widgets.dashboardTab.next(); //Navigates to next tab
};
```

- Select JavaScript for the on click event for goToSalesBtn and use the following script:

```javascript 
Page.gototabbtnClick = function($event, widget) {
Page.Widgets.dashboardTab.goToTab(2); //Navigates to sales tab
};
```

#### Events

```javascript

//on change event
Page.dashboardTabchange = function ($event, widget, newPaneIndex, oldPaneIndex) {
    if(widget.defaultpaneindex === 1) {
        Page.Variables.svLoadReports.invoke();
    }

    if(widget.defaultpaneindex === 2) {
        Page.Variables.svLoadSettings.invoke();
    }
};

```

#### Methods

```javascript
// Go to specific tab
Page.Widgets.tabs1.goToTab(2)
// Move to next tab
Page.Widgets.dashboardTab.next();
// Move to previous tab
Page.Widgets.dashboardTab.previous();
```
