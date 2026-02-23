# Overview

The **Tabs** can be used when you need multiple containers within a single window. Tab-based navigation provides an easy and powerful mechanism to handle a large amount of content within a limited area by separating content into different panes where one pane is viewable at a time. The user can quickly access the content by switching between the panes without leaving the page.

### Markup

```javascript
<wm-tabs type="static" name="tabs" statehandler="URL" variant="standard">
  <wm-tabpane title="Tab title" name="tabpaneLatestVersion"></wm-tabpane>
  <wm-tabpane title="Tab title" name="tabpanePreviousVersion"></wm-tabpane>
  <wm-tabpane title="Tab title" name="tabpaneReadMe"></wm-tabpane>
</wm-tabs>
```

### Examples

#### Properties

- This tab has a configurable tabsposition property, which determines the placement of the tabs. It can be set in the markup or dynamically via script to adjust the layout of the tabs.

```javascript
<wm-tabs tabsposition="left" name="tabs"></wm-tabs>
```

```javascript
// Set the tab position dynamically; e.g., move tabs from top to left
Page.Widgets.tabs.tabsposition = "left";
```

- The tab pane has a configurable content property which determines the partial page displayed inside it. This property can be set in the markup or dynamically via script.

```javascript
<wm-tabpane content="bind:Variables.loggedInUser.dataSet.role == &quot;ADMIN&quot; ? &quot;partialEditLatestVersion&quot; : &quot;partialLatestVersion&quot;" title="Latest Version" name="tabpaneLatestVersion"></wm-tabpane>
```

```javascript
// Dynamically load a partial based on the logged-in user's role
// - Editable version for admins
// - Read-only version for other users
Page.Widgets.tabpaneLatestVersion.content = App.Variables.loggedInUser.dataSet.role === "ADMIN" ? "partialEditLatestVersion" : "partialLatestVersion";
```

#### Events

- This is the markup for a tabs component with an on-change event, executed whenever the user switches between different tabs.

```javascript
<wm-tabs on-change="tabsChange($event, widget, newPaneIndex, oldPaneIndex)" name="tabs"></wm-tabs>
```

```javascript
Page.tabsChange = function ($event, widget, newPaneIndex, oldPaneIndex) {
  // Check if the active tab is "Latest Version" and it is the first tab
  if (widget.activeTab.title == "Latest Version" && newPaneIndex === 0)
    // Invoke the backend service to fetch the latest version details
    Page.Variables.svGetLatestVersionDetails.invoke();
};
```

- This is the markup for a tab pane with an on-deselect event, executed whenever the tab is deselected by the user.

```javascript
<wm-tabpane on-deselect="tabpaneLatestVersionDeselect($event, widget)" name="tabpaneLatestVersion"></wm-tabpane>
```

```javascript
Page.tabpaneLatestVersionDeselect = function ($event, widget) {
  // Reset the latest version form to clear any unsaved input
  Page.Widgets.latestVersionForm.reset();
};
```

#### Methods

- This method switches to the specified tab pane programmatically, allowing to open a particular tab directly without manual selection.

```javascript
// Navigate to a specific tab pane programmatically by its index
Page.Widgets.tabs.goToTab(2)
```

- This method navigates to the next tab pane programmatically, allowing the application to control tab flow or guide the user through sequential steps.

```javascript 
// Move to the next tab pane programmatically
Page.Widgets.tabs.next();
```
