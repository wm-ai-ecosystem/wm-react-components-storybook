# Callback Events

<details open>
  <summary>Callback Events</summary>
    <div>
        | Event | Description |
        | --- | --- |
        | `onResult` | This event will be called after the live form is saved and API returns a response. The event is triggered in both success and failure cases. |
        | `onSuccess` | This event will be called after the live form is saved and API returns a success response. |
        | `onError` | This event will be called after the live form is saved and API returns a failure response. |
        | `onBeforeServiceCall` | This event will be called on saving the live form. Any validation checks can be performed here. Returning false from the script will stop the live form save. |
    </div>
</details>
