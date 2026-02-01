# Methods

Calendar methods can be accessed through script using the widget reference: `Page.Widgets.calendarName`.

<table>
  <thead>
    <tr>
      <th>Methods</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gotoDate()</td>
      <td>
        It shows the calendar view to default date given for the calendar. For
        example, to go to a specific date - 1st Jan 2107.
      </td>
    </tr>
    <tr>
      <td>gotoMonth(int)</td>
      <td>
        This method renders the present view (i.e. year view will be the same)
        for the specified month. For example: To view the February month.
        <code>Page.Widgets.calendar.gotoMonth(2);</code>
      </td>
    </tr>
    <tr>
      <td>gotoNextMonth()</td>
      <td>
        This method renders the present view (i.e. year view will be the same)
        for the next month. For example: To view the next month.
        <code>Page.Widgets.calendar.gotoNextMonth();</code>
      </td>
    </tr>
    <tr>
      <td>gotoPrevMonth()</td>
      <td>
        This method renders the present view (i.e. year view will be the same)
        for the prev month. For example: To view the prev month.
        <code>Page.Widgets.calendar.gotoPrevMonth();</code>
      </td>
    </tr>
    <tr>
      <td>gotoNextYear()</td>
      <td>
        This method renders the present view (i.e. month/week view will be the
        same) for the next year. For example: To view the next year.
        <code>Page.Widgets.calendar.gotoNextYear();</code>
      </td>
    </tr>
    <tr>
      <td>gotoPrevYear()</td>
      <td>
        &nbsp;It renders the present view (i.e. month/week view will be the same
        ) for the previous year. For example: To view the previous year
        <code>Page.Widgets.calendar.gotoPrevYear();</code>
      </td>
    </tr>
    <tr>
      <td>selectDate()</td>
      <td>It highlights the default date given for the calendar.</td>
    </tr>
    <tr>
      <td>rerenderEvents()</td>
      <td>
        &nbsp;It rerenders the events from the dataset. For example, to get
        events on the calendar, we use:
        <code>Page.Widgets.calendar.rerenderEvents();</code>
      </td>
    </tr>
  </tbody>
</table>
