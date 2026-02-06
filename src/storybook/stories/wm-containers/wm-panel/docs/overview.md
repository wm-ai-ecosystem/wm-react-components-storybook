# Overview

A **Panel** is used to organize and group related components inside a container. It includes a collapsible section with a title bar for better structure and readability.

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

- Adding title to panel widget

```javascript
Page.Widgets.myPanel.title = "Performance - Q1";
```

- Adding badge to show total alerts

```javascript
Page.Widgets.myPanel.badgeValue = "2";
Page.Widgets.myPanel.badgeType = "success";
```

- Enable or disable panel collapsing

```javascript
Page.Widgets.myPanel.collapsible = true;
```

- Enable full screen option

```javascript
Page.Widgets.myPanel.enableFullScreen = true;
```

- Enable default close button

```javascript
Page.Widgets.myPanel.enableDefaultCloseAction = true;
```

#### Events

- On load of panel

```javascript
Page.panelLoad = function (widget) {
    // Load complaint summary data
    Page.Variables.svGetComplaintSummary.invoke();
};

```

- When action menu item is clicked

```javascript
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

- When panel is expanded 

```javascript
//Load full complaint details
Page.panelExpand = function ($event, widget) {
    Page.Variables.svGetComplaintDetails.invoke();
};
```

- When panel is collapsed

```javascript
//Hide sensitive details
Page.panelCollapse = function ($event, widget) {
    Page.Widgets.txtCustomerNotes.show = false;
};
```

- When panel is closed 

```javascript
//Reset selected complaint
Page.panelClose = function ($event, widget) {
    Page.Variables.selectedComplaint.setValue(null);
};
```
