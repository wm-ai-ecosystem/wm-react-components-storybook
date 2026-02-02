# Overview

The **Label** component represents a caption in a user interface. The label displays text on the page.

### Markup

```javascript
<wm-label caption="label" name="label" class="p" type="p" variant="default:p"></wm-label>
```

### Examples

#### Properties 

- Show label only when a condition is met.

```javascript
Page.Widgets.label.show = Page.Variables.svGetUsersData.dataSet.length > 0;
```

- Use bold (rich text) formatting to highlight important information.

```javascript
Page.Widgets.label.caption = "Payment Status: <b>Completed</b>";
```

#### Events 

- Triggered on label mouse enter to apply hover styling and improve user interaction feedback.

```javascript
    Page.labelMouseenter = function ($event, widget) {
    widget.class = "text-primary";
};
```