# Methods

<details open>
  <summary>Methods</summary>
    <div>
        | Method | Parameters | Return Type | Description |
        |--------|------------|------------|-------------|
        | `gotoMonth` | `Number` | void | This method renders the present view (i.e. year view will be the same) for the specified month. For example: To view the February month. |
        | `gotoNextMonth` | None | void | This method renders the present view (i.e. year view will be the same) for the next month. For example: To view the next month. |
        | `gotoPrevMonth` | None | void | This method renders the present view (i.e. year view will be the same) for the prev month. For example: To view the prev month. |
        | `gotoNextYear` | None | void | This method renders the present view (i.e. month/week view will be the same) for the next year. For example: To view the next year. |
        | `gotoPrevYear` | None | void |  It renders the present view (i.e. month/week view will be the same ) for the previous year. For example: To view the previous year. |
        | `rerenderEvents` | None | void | It rerenders the events from the dataset. For example, to get events on the calendar, we use |
        | `gotoDate` | None | void | It shows the calendar view to default date given for the calendar. For example, to go to a specific date - 1st Jan 2107. |
    </div>
</details>


<!-- | `allDaySlot` | None | void | Determines if the title ("all-day") slot is displayed at the top of the calendar. When false, all-day events will not be displayed in agenda views. |
        | `allDayText` | None | void | The text for title ("all-day") slot at the top of the calendar. |
        | `slotDuration` | None | void | The frequency for displaying time slots. Default: '00:30:00' (30 minutes). |
        | `slotLabelFormat` | None | void | Determines the time-text that will be displayed on the vertical axis of the agenda views. default: 'h(:mm)a' The default English value will produce times that look like "5pm" and "5:30pm". |
        | `slotLabelInterval` | None | void | Determines how often the time-axis is labeled with text displaying the date/time of slots. |
        | `snapDuration` | None | void | If not specified, this value is automatically computed from slotDuration. With slotDuration's default value of 30 minutes, this value will be 1 hour. |
        | `scrollTime` | None | void | Determines how far down the scroll pane is initially scrolled down. default: '06:00:00' (6am). The user will be able to scroll upwards to see events before this time. If you want to prevent users from doing this, use the minTime option instead. |
        | `minTime` | None | void | Determines the starting time that will be displayed, even when the scrollbars have been scrolled all the way up. default: "00:00:00" The default "00:00:00" means the start time will be at the very beginning of the day (midnight). |
        | `maxTime` | None | void | Determines the end time (exclusively) that will be displayed, even when the scrollbars have been scrolled all the way down. default: "24:00:00" The default "24:00:00" means the end time will be at the very end of the day (midnight). |
        | `slotEventOverlap` | None | void | Determines if timed events in agenda view should visually overlap. default: true. When set to true (the default), events will overlap each other. At the most half of each event will be obscured. When set to false, there will be absolutely no overlapping. | -->