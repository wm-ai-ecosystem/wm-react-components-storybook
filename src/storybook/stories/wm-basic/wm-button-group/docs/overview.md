# Overview

Button Group component organizes a set of buttons that can be managed and styled as a group. It provides a structured way to display related actions together, enhancing the user interface's clarity and aesthetics.

### Markup

```javascript
<wm-buttongroup name="buttongroup">
    <wm-button class="btn-filled btn-default" type="button" caption="left" name="buttonLeft"
        variant="filled:default"></wm-button>
    <wm-button class="btn-filled btn-default" type="button" caption="center" name="buttonCenter"
        variant="filled:default"></wm-button>
    <wm-button class="btn-filled btn-default" type="button" caption="right" name="buttonRight"
        variant="filled:default"></wm-button>
</wm-buttongroup>
```

### Examples

#### Properties 

- Set the Button Group to vertical alignment.

```javascript
Page.Widgets.buttongroup.vertical = true;
```