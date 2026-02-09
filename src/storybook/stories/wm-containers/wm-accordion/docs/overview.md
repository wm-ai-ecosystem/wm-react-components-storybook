# Overview

The **Accordion** component contains multiple panes where developers can add internal content or partial pages. It allows users to expand or collapse sections for better content organization and supports features like setting a default pane, allowing multiple panes to open, and dynamically controlling pane content.

### Markup

```javascript

<wm-accordion type="static" statehandler="URL" name="accordion" 
  class="app-accordion panel panel-default"
  variant="default:default">
  <wm-accordionpane name="accordionpaneUser" class="panel panel-default"
    variant="default:default"></wm-accordionpane>
  <wm-accordionpane name="accordionpaneEmp" class="panel panel-default"
    variant="default:default"></wm-accordionpane>
  <wm-accordionpane name="accordionpaneDept" class="panel panel-default"
    variant="default:default"></wm-accordionpane>
</wm-accordion>

```

### Examples

#### Properties

-  Show accordion only when a condition is met.

```javascript
Page.Widgets.accordion.show = Page.Variables.svGetUsersData.dataSet.length > 0;
```

#### Events

- Triggered on change of accordion

```javascript
Page.accordionChange = function ($event, widget, newPaneIndex, oldPaneIndex) {
Page.Widgets.labelHeading.caption = "Product Information";
};
```

#### Methods

- Expand a specific accordionpane

```javascript
Page.Widgets.accordionpaneEmp.expand();
```
