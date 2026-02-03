# Props

<details open>
  <summary>Basic</summary>
    <div>
    | Property | Type | Default | Description |
    | --- | --- | --- | --- |
    | `name` | string | - | A unique identifier for the calender component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `width` | string | "100%" | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
      | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Dataset</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `dataset` | array | - | Set this property to a variable to populate the list of values to display. |
    </div>
</details>

<details>
  <summary>Default Value</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `datavalue` | - | - | This is the default value to display value for an editor component. Note that the display value is just what the user sees initially, and is not always the dataValue returned by the component. |
    </div>
</details>

<details>
  <summary>Events Data</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `eventtitle` | string | - | Title for the Event, set from the Dataset fields. |
      | `eventstart` | string | - | Start date or date time for the event, set from the Dataset fields. |
      | `eventend` | string | - | End date or date time for the event, set from the Dataset fields. |
      | `eventallday` | boolean | - | Whether it is an All day event or not. |
      | `eventclass` | string | - | Display Class to be applied to that event. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
      | Property | Type | Default | Description |
      | --- | --- | --- | --- |
      | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
      | `calendartype` | string | "basic" | This property allows you to set the type of the calendar component: agenda, basic, list. |
      | `controls` | string | - | This property allows you to enable the header controls for calendar component. These include - navigation - to navigate previous/next month/week/day(depending upon the display) on the calendar, - today - go to today's location on the calendar, - month - to display entire month, - week - to display entire week, - day - to display entire day. All these controls on the calendar are used to navigate between the months and switch the view to Month(or) Week (or) Day. |
      | `view` | string | "month" | This property allows you to set the default view of the calendar component: month, week, day. |
      | `selectionmode` | string | "none" | This property can be used to control the user selection of the dates using a simple mouse drag operation. The values can be: - None: no selection, the calendar is just there to present data, not to be selected - Single: only one row can be selected at a time - Multiple: many rows can be selected at a time. |
    </div>
</details>


