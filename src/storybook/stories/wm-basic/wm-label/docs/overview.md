# Overview

The **Label** component represents a caption in a user interface. The label displays text on the page.

### Markup

```javascript
<wm-label name="label" caption="label" class="p" type="p" variant="default:p"></wm-label>
```

### Examples

#### Properties

- This is the markup for a label, that conditionally displays based on a dataset or expression. The visibility can be set directly in the markup or dynamically via script.

```javascript
<wm-label show="bind:Variables.svGetUsersData.dataSet.status === &quot;Active&quot;" name="label"></wm-label>
```

```javascript
// Show the label only if the user's status is "Active"
Page.Widgets.label.show = Page.Variables.svGetUsersData.dataSet.status === "Active";
```

- This is the markup for a label that displays a combined string from a variable and can be set either in the markup or dynamically via script.

```javascript
<wm-label caption="bind:Variables.svGetUsersData.dataSet.name + &quot; - &quot; + Variables.svGetUsersData.dataSet.role" name="label"></wm-label>
```

```javascript
// Set the label caption to display the user's name and role in the format: "Name - Role"
Page.Widgets.label.caption = Page.Variables.svGetUsersData.dataSet.name + " - " + Page.Variables.svGetUsersData.dataSet.role;
```

- This is the markup for a label that displays a formatted caption using in-built formatter types (e.g., currency), where a value like 1234.000 is shown as $1,234.00.

```javascript
<wm-label caption="bind:&quot;1234.000&quot; | toCurrency: '$': '2'" name="label"></wm-label>
```

- This is the markup for a label that displays a combined string using dynamic data and a custom function; the function can be defined at the app level (called as App.formatDate()) or at the page level (called directly as formatDate()), and is invoked within the caption bind expression in the markup.

```javascript
<wm-label caption="bind:&quot;Created on&quot; + &quot; &quot; + App.formatDate(Widgets.listUserDetails.selecteditem.createdAt)" name="label"></wm-label>
```

#### Events

- This is the markup for a label with an on-mouseenter event, executed when the user hovers over the label to apply styling.

```javascript
<wm-label on-mouseenter="labelMouseenter($event, widget)" name="label"></wm-label>
```

```javascript
Page.labelMouseenter = function ($event, widget) {
  // Apply a hover style to the label by updating its CSS class
  widget.class = "text-primary";
};
```
