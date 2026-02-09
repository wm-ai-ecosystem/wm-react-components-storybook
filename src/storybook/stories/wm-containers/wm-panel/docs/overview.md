# Overview

A **Panel** is used to organize and group related components inside a container. It includes a collapsible section with a title bar for better structure and readability.

### Markup

```javascript
<wm-panel subheading="subheading" iconclass="wi wi-account-circle" autoclose="outsideClick" title="Title" name="panel"
  class="panel panel-default"
  variant="default:default"
>
  <wm-panel-footer name="panel_footer1">
    <wm-label padding="unset 0.5em" class="text-muted p" caption="Addition Info" name="label1" variant="default:p"
    ></wm-label>
  </wm-panel-footer>
</wm-panel>
```

### Examples

#### Properties

- Adding title to panel

```javascript
Page.Widgets.panel.title = "Performance";
```

- Adding badge to panel

```javascript
Page.Widgets.panel.badgevalue = "2";
Page.Widgets.panel.badgetype = "success";
```

- Enable full screen

```javascript
Page.Widgets.panel.enablefullscreen = true;
```

#### Events

- Invoke service on load of panel

```javascript
Page.panelLoad = function (widget) {
  Page.Variables.svGetComplaintSummary.invoke();
};
```

#### Methods

- Trigger close panel action

```javascript

Page.Widgets.panel.close();

```

- To toggle panel status

```javascript
// i.e expands if closed, closes if expanded
Page.Widgets.panel.toggle(); 
```
