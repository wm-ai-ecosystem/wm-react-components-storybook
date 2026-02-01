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

<details>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onBeforerender` | This event handler is called on before update of the progress. |
    </div>
</details>

### Use Cases

- Triggered before the progress circle is rendered to track or log the current progress value.

```javascript
    Page.progress_circleBeforerender = function ($event, widget) {
    console.log('Progress updating to: ' + Page.Widgets.progressCircle.datavalue);
};
```