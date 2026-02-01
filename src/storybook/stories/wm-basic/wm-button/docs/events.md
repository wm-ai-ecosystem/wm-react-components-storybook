# Callback Events

<details open>
  <summary>Basic Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onFocus` | This event handler is called each time your component is focused. |
        | `onBlur` | This event handler is called each time your focus leaves your component. |
    </div>
</details>

<details>
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
  <summary>Keyboard Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onKeyDown` | This event handler is called when the component is in focus and a key is pressed. |
        | `onKeyPress` | This event handler is called when the component is in focus and a key is pressed. This event will relay the character pressed. |
        | `onKeyUp` | This event handler is called when the component is in focus and a key is pressed and released. |
    </div>
</details>

### Use Cases

- Triggered on button click to submit a form.

```javascript
Page.buttonClick = function ($event, widget) {
  Page.Widgets.formCreate.submit();
};
```

- Triggered on button click to invoke a variable for actions such as fetching or submitting data.

```javascript
Page.buttonClick = function ($event, widget) {
  Page.Variables.svGetUsersData.invoke();
};
```