# Callback Events

<details open>
  <summary>Touch Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onSwipeUp` | This event handler is called whenever swipeup event is triggered. |
        | `onSwipeDown` | This event handler is called whenever swipedown event is triggered. |
        | `onSwipeLeft` | This event handler is called whenever swipeleft event is triggered. |
        | `onSwipeRight` | This event handler is called whenever swiperight event is triggered. |
        | `onPinchIn` | This event handler is called whenever pinchin event is triggered. |
        | `onPinchOut` | This event handler is called whenever pinchout event is triggered. |
    </div>
</details>

<details>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onBeforeSubmit` | This event will be called before submitting the form. Any validation checks can be performed here. Returning false from the script will stop the form submit. |
        | `onSubmit` | This event will be called on submitting the form. (This is called after ‘on before submit’. If on before submit returns false, this function will not be called). |
        | `onResult` | This event will be called after the form is submitted and API returns a response. This event is triggered in both success and failure cases. |
        | `onSuccess` | This event will be called after the form is submitted and API returns a success response. |
        | `onError` | This event will be called after the form is submitted and API returns a failure response. |
    </div>
</details>
