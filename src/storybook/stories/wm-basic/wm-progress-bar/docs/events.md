# Callback Events

<details open>
  <summary>Mouse Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onClick` | This event handler is called whenever the click event is triggered on a component. |
        | `onDoubleClick` | This event handler is called whenever the double click event is triggered on a component. |
        | `onMouseEnter` | This event handler is called whenever the mouse enters the component. |
        | `onMouseLeave` | This event handler is called whenever the mouse leaves the component. |
    </div>
</details>

<details>
  <summary>Touch Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onTap` | This event handler is called whenever the component is tapped. |
        | `onDoubleTap` | This event handler is called whenever the component is double tapped. |
    </div>
</details>

### Use Cases

- Triggered on hover to display the caption inside the progress bar.

```javascript
    Page.progress_barMouseenter = function ($response, widget) {
        widget.captionplacement = "inside";
};
```

- Triggered when the cursor leaves to hide the caption for the progress bar.

```javascript
    Page.progress_barMouseleave = function ($response, widget) {
        widget.captionplacement = "hidden";
};
```