# Overview

The **Tabs** can be used when you need multiple containers within a single window. Tab-based navigation provides an easy and powerful mechanism to handle a large amount of content within a limited area by separating content into different panes where one pane is viewable at a time. The user can quickly access the content by switching between the panes without leaving the page.

### Markup

```javascript
 <wm-tabs type="static" statehandler="URL" name="tabs" variant="standard">
  <wm-tabpane title="Tab title" name="tabpane1"></wm-tabpane>
  <wm-tabpane title="Tab title" name="tabpane2"></wm-tabpane>
  <wm-tabpane title="Tab title" name="tabpane3"></wm-tabpane>
 </wm-tabs>
```

### Examples

#### Properties

- Set tab type and dataset through script

```javascript
  Page.Widgets.tabs.type = "dynamic";
  Page.Widgets.tabs.dataset = Page.Variables.svDynamicPanel.dataSet;
```

#### Events

- On change of tab invoke service

```javascript
Page.tabsChange = function ($event, widget, newPaneIndex, oldPaneIndex) {
  Page.Variables.getProductDetails.invoke();
};
```

#### Methods

- Go to specific tab

```javascript
Page.Widgets.tabs.goToTab(2)
```
- Move to next tab

```javascript 
Page.Widgets.tabs.next();
```
- Move to previous tab

```javascript
Page.Widgets.tabs.previous();
```
