# Overview

**Marquee** component is used to display the content in marquee styles, any component can be dropped into it.

### Markup

```javascript
<wm-marquee name="marquee">
    <wm-label padding="unset" caption="Flash Sale: Up to 50% off on selected products – Hurry, limited time only!" class="p" type="p" name="labelMessage" variant="default:p"></wm-label>
</wm-marquee>
```

### Examples

#### Properties 

- Control the scrolling speed of the marquee text.

```javascript
// Sets the delay (in milliseconds) between each scroll movement.
// Higher values result in slower scrolling.
Page.Widgets.marquee.scrolldelay = 200;
```

- Set the scrolling direction of the marquee.

```javascript
// Controls the direction in which the marquee text scrolls.
// Possible values: "left", "right", "up", "down".
Page.Widgets.marquee.direction = "right";
```