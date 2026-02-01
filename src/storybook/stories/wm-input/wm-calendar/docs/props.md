# Props

<details open>
  <summary>Basic</summary>

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | string | - | A unique identifier for the Calender component. Special characters and spaces are not allowed. |
| `type` | string | `list` | Defines the display type of the calendar component. |

</details>

---

<details>
  <summary>Accessibility</summary>

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `tabindex` | number | `0` | Specifies the tab order of the Calender component for keyboard navigation. |

</details>

---

<details>
  <summary>Layout</summary>

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | string | `100%` | Specifies the width of the Calender component. Supports px, %, em, or pt units. |
| `height` | string | - | Specifies the height of the Calender component. Supports px, %, em, or pt units. |

</details>

---

<details>
  <summary>Data</summary>

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `dataset` | array/object | - | Accepts event data used to populate the calendar. Usually bound to variables or API data. |
| `datavalue` | date/string | - | Sets or retrieves the selected date in the calendar. |

</details>

---

<details>
  <summary>Events Data Mapping</summary>

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | string | - | Maps dataset field representing event title. |
| `start` | string | `start` | Maps dataset field representing event start date and time. |
| `end` | string | `end` | Maps dataset field representing event end date and time. |
| `allDay` | string/boolean | - | Maps dataset field to indicate all-day events. |
| `className` | string | - | Applies custom CSS class to calendar events for styling. |

</details>

---

<details>
  <summary>Behavior</summary>
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Default</th>
      <th width="55%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>show</code></td>
      <td>boolean</td>
      <td>true</td>
      <td>Determines whether the Calender component is visible.</td>
    </tr>
    <tr>
      <td><code>view</code></td>
      <td>string</td>
      <td>month</td>
      <td>Sets the default calendar view. Supported values: <code>year</code>, <code>month</code>, <code>week</code>, <code>day</code>.</td>
    </tr>
    <tr>
      <td><code>selectionMode</code></td>
      <td>string</td>
      <td>none</td>
      <td>Determines date selection mode. Supported values: <code>single</code>, <code>multiple</code>, <code>none</code>.</td>
    </tr>
    <tr>
      <td><code>enableControls</code></td>
      <td>array</td>
      <td>navigation, today, year, month, week, day</td>
      <td>Enables navigation and view control options in the calendar header.</td>
    </tr>
  </tbody>
</table>

</details>


