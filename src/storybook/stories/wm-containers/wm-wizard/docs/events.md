# Callback Events

<details>
<summary>Wizard Events</summary>
| Event | Description |
|-------|-------------|
| `onDone` | Triggered when the Done button is clicked on the final step. Receives the current step data and all steps data. |
| `onCancel` | Triggered when the Cancel button is clicked. Receives the current step data and all steps data. |
| `onStepClick` | Triggered when a step header is clicked. Receives the index of the clicked step. |

</details>

<details>
<summary>Wizard Step Events</summary>
| Event | Description |
|-------|-------------|
| `onLoad` | Triggered when a step is loaded and becomes active. Receives the step data and step index. |
| `onNext` | Triggered when the Next button is clicked. Receives the widget reference, current step data, and step index. Return boolean or Promise<boolean> to control navigation. |
| `onPrev` | Triggered when the Previous button is clicked. Receives the widget reference, current step data, and step index. Return boolean or Promise<boolean> to control navigation. |
| `onSkip` | Triggered when the Skip link is clicked. Receives the widget reference, current step data, and step index. Return boolean or Promise<boolean> to control navigation. |

</details>
