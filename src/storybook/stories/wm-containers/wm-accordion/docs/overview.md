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

- Set the title of accordion panel

```Javascript
Page.Widgets.accordionpane.title = "Panel title"
```

- Set the type of accordion

```Javascript
Page.Widgets.myAccordion.type = "dynamic";
```

- Set the badge values and type

```Javascript
Page.Widgets.accordionpane.badgevalue = "10";
Page.Widgets.accordionpane.badgetype = "success";
```

#### Events

```javascript

//Event on load of accordion pane
Page.accordionpaneLoad = function (widget) {
  Page.Widgets.editProfileForm.show = false;
};

//Event on expand of accordion pane
Page.accordionpaneExpand = function ($event, widget) {
  if (widget.name === "orderDetailsPane") {
    Page.Variables.svOrderDetails.invoke(); // Call service
  }
};

//Event on collapse of accordion pane

Page.accordionpaneCollapse = function ($event, widget) {
  if (widget.name === "accountBalancePane") {
    Page.Widgets.txtBalance.show = false;
  }
};
```

#### Methods

```javascript
// Expand a specific pane
Page.Widgets.engineeringEmpPane.expand();

// Collapse a specific pane
Page.Widgets.salesEmpPane.collapse();

// Toggle a pane (open if closed, close if opened)
Page.Widgets.marketingEmpPane.toggle();
```
