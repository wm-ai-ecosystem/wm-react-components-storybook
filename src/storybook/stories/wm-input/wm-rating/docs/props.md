# Props

| Property | Type | Default | Description |
|---------|------|---------|-------------|
| **Basic Configuration** |
| name | string | "rating1" | Unique identifier for the Rating component |
| value | number | 0 | Default value (number of active stars) of Rating. Must be less than or equal to the maximum value |
| maximumValue | number | 5 | Maximum value (number of stars) of Rating. Must be less than or equal to 10 |
| **Accessibility** |
| tabindex | number | 0 | Controls the tab order for keyboard navigation. Set to -1 to make non-focusable |
| **Data Configuration** |
| dataset | array/string | null | Maps caption values against rating values. Can be comma-separated string, array of strings, or array of objects |
| dataField | string | null | Field in dataset that maps to the rating value. Should be an integer field |
| displayField | string | null | Field in dataset that provides captions for corresponding rating values |
| displayExpression | string | null | JavaScript expression for custom formatting of displayed values. For read-only mode, can bind caption directly if dataset is null |
| **Behavior** |
| readonly | boolean | false | When true, prevents user interaction with the rating component |
| show | boolean | true | Controls the visibility of the component |
| loadOnDemand | boolean | false | When true and 'show' is bound to a variable, defers initialization until the component becomes visible |
| showCaptions | boolean | true | When true, displays captions for rating values |
| skipOnChangeEventFromScript | boolean | false | When true, 'Change' callbacks only trigger when the user updates value from UI, not from scripts |
| **Appearance** |
| iconSize | string | "1em" | Defines the size of the rating icons (in em or px units) |

## Setting up a Rating with Static Data

```javascript
// Configure a rating with 5 stars and preset value of 3
Page.Widgets.myRating.value = 3;
Page.Widgets.myRating.maximumValue = 5;

// Set up static captions
Page.Widgets.myRating.dataset = "Poor,Fair,Good,Very Good,Excellent";
Page.Widgets.myRating.showCaptions = true;
```

## Using with Dataset

```javascript
// Using a variable 'ratingOptions' with objects containing 'id' and 'label' fields
Page.Widgets.myRating.dataset = Page.Variables.ratingOptions;
Page.Widgets.myRating.dataField = "id";
Page.Widgets.myRating.displayField = "label";
```