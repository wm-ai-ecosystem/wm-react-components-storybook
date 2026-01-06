# Props

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | | A unique identifier for the Datetime component. |
| placeholder | string | | Text to display when no value is selected. |
| value | Date/string | | The default value to display. Can be set to current date. |
| tabindex | number | 0 | Specifies the tab order of the element. Range: 0-32767. Use -1 to make non-focusable. |
| hint | string | | Text shown as a tooltip when hovering over the component. |
| shortcutkey | string | | Specifies a keyboard shortcut to focus/activate the component. |

## Display Format

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| datePattern | string | | Controls how dates are displayed (e.g., 'dd-MMMM-yyyy', 'yyyy/MM/dd'). |
| hourStep | number | 1 | Number of hours to increment/decrement when using the time picker controls. |
| minuteStep | number | 1 | Number of minutes to increment/decrement when using the time picker controls. |

## Output

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| outputFormat | string | 'timestamp' | Format of the data value returned by the component. Default returns timestamp integer. Can be customized (e.g., 'yyyy-MM-dd hh:mm a'). |

## Validation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| required | boolean | false | When true, the field cannot be left empty. |
| minDate | Date/string | | The minimum selectable date. Dates before this will be disabled. |
| maxDate | Date/string | | The maximum selectable date. Dates after this will be disabled. |
| excludeDays | array | | Array of day numbers (0-6, where 0 is Sunday) to exclude from selection. |
| excludeDates | array/string | | Specific dates to exclude from the date picker. |

## Behavior

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| showDateTimePickerOn | string | 'inputAndButtonClick' | Controls when the picker appears: 'inputAndButtonClick' or 'buttonClick'. |
| showWeekNumber | boolean | false | When true, displays week numbers in the date picker UI. |
| autoFocus | boolean | false | When true, the component automatically receives focus when the page loads. |
| readonly | boolean | false | When true, prevents the user from changing the component's value. |
| show | boolean | true | Controls the visibility of the component. Bindable. |
| loadOnDemand | boolean | false | When true and 'show' is bound, defers initialization until the component becomes visible. |
| disabled | boolean | false | When true, the component becomes display-only and cannot be interacted with. |
| skipOnChangeEvent | boolean | false | When true, the onChange callback only triggers on user interaction, not script updates. |

## Common Use Cases

#### Setting Default Date and Time
```javascript
// Set to current date and time
Page.Widgets.myDatetime.value = new Date();

// Set to specific date and time
Page.Widgets.myDatetime.value = new Date(2023, 0, 15, 10, 30); // Jan 15, 2023, 10:30 AM
```

#### Configuring Date Restrictions
```javascript
// Set minimum date to today
Page.Widgets.myDatetime.minDate = new Date();

// Set maximum date to 1 month from now
let maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 1);
Page.Widgets.myDatetime.maxDate = maxDate;

// Exclude weekends
Page.Widgets.myDatetime.excludeDays = [0, 6]; // Sunday and Saturday
```

#### Customizing Display Format
```javascript
// Show date in yyyy-MM-dd format with 12-hour time
Page.Widgets.myDatetime.datePattern = 'yyyy-MM-dd hh:mm a';

// Set 15-minute intervals for time selection
Page.Widgets.myDatetime.minuteStep = 15;
```