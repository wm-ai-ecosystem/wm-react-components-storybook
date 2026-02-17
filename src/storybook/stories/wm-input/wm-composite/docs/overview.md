# Overview

The **Composite** component is used to manage the caption position and alignment for form input components such as text, select fields etc.

### Markup

```javascript
<wm-composite name="composite"></wm-composite>
```

### Examples

#### Properties

- This composite allows configuring the caption position for its child input, which can be set in the markup or dynamically via script.

```javascript
<wm-composite name="composite" captionposition="left">
  <wm-label class="col-md-3 control-label p" notag="true" name="label" variant="default:p"></wm-label>
  <wm-container class="col-md-9 app-container-default" name="container" variant="default">
    <wm-text name="text" class="form-control app-textbox" variant="standard"></wm-text>
  </wm-container>
</wm-composite>
```

```javascript
// Set the caption position to the left
Page.Widgets.composite.captionposition = "left";
```