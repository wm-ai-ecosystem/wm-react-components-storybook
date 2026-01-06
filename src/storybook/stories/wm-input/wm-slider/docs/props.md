# Props

## Basic Configuration

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| name | string | "" | A unique identifier for the slider component |
| value | number | 0 | The default value displayed for the slider |
| minimumValue | number | 0 | The minimum possible value for the slider |
| maximumValue | number | 100 | The maximum possible value for the slider |
| step | number | 1 | The increment value for the slider movement |

## Range Settings

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| range | boolean | false | When enabled, shows a range slider with two thumbs |
| datatype | string | "number" | Select input datatype - "number" or "dataset" |
| dataset | array | [] | Input data array when datatype is "dataset" |
| datafield | string | "" | Field in dataset representing the selected value for the range |
| displayexpression | string | "" | JavaScript expression to format the displayed value |
| tooltipexpression | string | "" | Expression to customize the text displayed in the tooltip |

## Visual Configuration

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| showmarkers | boolean | false | Controls whether markers are displayed on the slider |
| showtooltip | boolean | true | Controls whether tooltips are shown when interacting with the slider |
| markerText | string | "" | Text displayed as markers in the slider (applies when showmarkers is true) |

## Behavior

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| readonly | boolean | false | When true, prevents user from changing the slider value |
| show | boolean | true | Controls whether the component is visible |
| loadOnDemand | boolean | false | When true and show property is bound, defers initialization until visible |
| disabled | boolean | false | When true, makes the slider display-only |
| skipChangeEventFromScript | boolean | false | When true, Change events only trigger on user interaction, not script changes |

## Accessibility

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| hint | string | "" | Text shown as tooltip when hovering over the component |
| tabindex | number | 0 | Specifies the tab order for keyboard navigation |
| shortcutkey | string | "" | Keyboard shortcut to focus/activate the component |

## Configure Slider Behavior
```javascript
// Set minimum and maximum values
Page.Widgets.mySlider.minimumValue = 0;
Page.Widgets.mySlider.maximumValue = 500;

// Set step size for incremental movement
Page.Widgets.mySlider.step = 25;

// Enable range selection with two thumbs
Page.Widgets.mySlider.range = true;

// Show markers on the slider track
Page.Widgets.mySlider.showmarkers = true;
Page.Widgets.mySlider.markerText = "Price Range";
```