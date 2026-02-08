# Overview

The **Accordion** component contains multiple panes where developers can add internal content or partial pages. It allows users to expand or collapse sections for better content organization and supports features like setting a default pane, allowing multiple panes to open, and dynamically controlling pane content.

### Markup

```javascript
<wm-accordion type="static" statehandler="URL" name="myAccordion" 
  class="app-accordion panel panel-default"
  variant="default:default"
>
  <wm-accordionpane name="accordionpane1" class="panel panel-default"
    variant="default:default"
  ></wm-accordionpane>
  <wm-accordionpane name="accordionpane2" class="panel panel-default"
    variant="default:default"
  ></wm-accordionpane>
  <wm-accordionpane name="accordionpane3" class="panel panel-default"
    variant="default:default"
  ></wm-accordionpane>
</wm-accordion>
```

### Examples

#### Properties

- Set the title of accordionpane

```javascript
Page.Widgets.accordionpane.title = "Panel title"
```

- Set the badge values and type

```javascript
Page.Widgets.accordionpane.badgevalue = "10";
Page.Widgets.accordionpane.badgetype = "success";
```

#### Events

- Triggered on load of accordionpane

```javascript
//Hide edit form initially & show only when edit button clicked
Page.accordionpaneLoad = function (widget) {
  Page.Widgets.editProfileForm.show = false;
};
```

- Triggered on expand of accordionpane

```javascript
Page.accordionpaneExpand = function ($event, widget) {
  if (widget.name === "orderDetailsPane") {
    Page.Variables.svOrderDetails.invoke(); // Call service
  }
};
```

- Triggered on collapse of accordionpane

```javascript
Page.accordionpaneCollapse = function ($event, widget) {
  if (widget.name === "accountBalancePane") {
    Page.Widgets.txtBalance.show = false;
  }
};
```

#### Methods

- Expand a specific accordionpane

```javascript
Page.Widgets.accordionpaneUser.expand();
```

- Collapse a specific accordionpane

```javascript
Page.Widgets.accordionpaneEmp.collapse();
```

- Toggle a accordionpane (open if closed, close if opened)

```javascript
Page.Widgets.accordionpaneDept.toggle();
```