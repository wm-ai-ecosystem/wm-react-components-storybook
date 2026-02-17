# Overview

The **Button Group** component organizes a set of buttons that can be managed and styled as a group. It provides a structured way to display related actions together, enhancing the user interface's clarity and aesthetics.

### Markup

```javascript
<wm-buttongroup name="buttongroup" variant="standard"></wm-buttongroup>
```

### Examples

#### Properties 

- This is the markup for a button group with multiple buttons, which can be displayed vertically or horizontally. The vertical alignment can be set either in the markup or dynamically via script.

```javascript
<wm-buttongroup name="buttongroup" vertical="true">
    <wm-button class="btn-filled btn-default" type="button" caption="left" name="buttonLeft"
        variant="filled:default"></wm-button>
    <wm-button class="btn-filled btn-default" type="button" caption="center" name="buttonCenter"
        variant="filled:default"></wm-button>
    <wm-button class="btn-filled btn-default" type="button" caption="right" name="buttonRight"
        variant="filled:default"></wm-button>
</wm-buttongroup>
```

```javascript
// Set the button group to display its buttons vertically
Page.Widgets.buttongroup.vertical = true;
```