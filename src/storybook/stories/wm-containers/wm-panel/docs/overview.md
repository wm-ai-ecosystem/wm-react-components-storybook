# Overview

The **Panel** component is a container used to group and display content with a header. It supports features like expand, collapse, full-screen view, and header elements such as title, icons, and badges. Panels help organize content and improve UI structure.

### Markup

```javascript
<wm-panel
  subheading="subheading"
  iconclass="wi wi-account-circle"
  autoclose="outsideClick"
  title="Title"
  name="panel1"
  class="panel panel-default"
  variant="default:default"
>
  <wm-panel-footer name="panel_footer1">
    <wm-label
      padding="unset 0.5em"
      class="text-muted p"
      caption="Addition Info"
      name="label1"
      variant="default:p"
    ></wm-label>
  </wm-panel-footer>
</wm-panel>
```

### Examples

#### Properties

```Javascript
// Update panel title
Page.Widgets.myPanel.title = "Performance - Q1";

// Add badge to show total alerts
Page.Widgets.myPanel.badgeValue = "2";
Page.Widgets.myPanel.badgeType = "danger";

// ----- Behavior -----

// Enable or disable panel collapsing
Page.Widgets.myPanel.collapsible = true;

// Enable full screen option
Page.Widgets.myPanel.enableFullScreen = true;

// Enable default close button
Page.Widgets.myPanel.enableDefaultCloseAction = true;

```

#### Events

```Javascript

// Load complaint details when panel loads
Page.panelLoad = function (widget) {
    // Load complaint summary data
    Page.Variables.svGetComplaintSummary.invoke();
};

// When action menu item is clicked
Page.panelActionsclick = function ($item) {

    if ($item.label === "Refresh") {
        Page.Variables.svGetComplaintDetails.invoke();
    }

    if ($item.label === "Export") {
        Page.Variables.svExportComplaintReport.invoke();
    }
};


```

#### Methods

```Javascript
// When panel is expanded → Load full complaint details
Page.panelExpand = function ($event, widget) {
    Page.Variables.svGetComplaintDetails.invoke();
};

// When panel is collapsed → Hide sensitive details
Page.panelCollapse = function ($event, widget) {
    Page.Widgets.txtCustomerNotes.show = false;
};

// When panel is closed → Reset selected complaint
Page.panelClose = function ($event, widget) {
    Page.Variables.selectedComplaint.setValue(null);
};
```
