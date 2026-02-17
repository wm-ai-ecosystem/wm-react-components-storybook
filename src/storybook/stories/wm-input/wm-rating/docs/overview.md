# Overview

The **Rating** component lets users provide or view feedback using a visual star-based system. It supports displaying ratings as well as collecting input in a simple, intuitive way.

### Markup

```javascript
<wm-rating name="rating" variant="standard"></wm-rating>
```

### Examples

#### Properties

- This rating allows setting a default value based on the bound datafield, which can be configured in the markup or dynamically via script.

```javascript
<wm-rating datavalue="2" name="rating"></wm-rating>
```

```javascript
// Set the default rating value dynamically, based on the bound datafield
Page.Widgets.rating.datavalue = 2;
```

- This rating allows controlling the visibility of captions, which can be configured in the markup or dynamically via script.

```javascript
<wm-rating showcaptions="false" name="rating"></wm-rating>
```

```javascript
// Hide or show captions dynamically
Page.Widgets.rating.showcaptions = false;
```

#### Events

- This is the markup for a rating with an on-change event, executed when a user updates the selected rating to trigger actions such as submitting data.

```javascript
<wm-rating on-change="ratingChange($event, widget, newVal, oldVal)" name="rating"></wm-rating>
```

```javascript
Page.ratingChange = function ($event, widget, newVal, oldVal) {
  if (newVal) {
    // Submit the selected rating to the backend service
    Page.Variables.svSubmitRating.setInput(
      "productId",
      Page.Widgets.productId.datavalue,
    );
    Page.Variables.svSubmitRating.setInput("rating", newVal);
    Page.Variables.svSubmitRating.invoke();

    // Invoke a toaster action to provide feedback to the user after successful submission
    Page.Actions.feedbackToaster.invoke();
  }
};
```

#### Sample Rating Dataset

- This is the markup for a Rating component bound to a sample dataset of rating options, using displayfield to show the label, datafield for the value, and supporting a default selected rating.

```javascript
<wm-rating
  name="rating"
  dataset="bind:Variables.stvRatingOptions.dataSet"
  datafield="value"
  displayfield="label"
  datavalue="5"
></wm-rating>
```

```javascript
// Sample dataset for the Rating component, containing id, value, and label

let ratingOptions = [
  {
    "id": "r1",
    "value": "1",
    "label": "Poor"
  },
  {
    "id": "r2",
    "value": "2",
    "label": "Fair"
  },
  {
    "id": "r3",
    "value": "3",
    "label": "Good"
  },
  {
    "id": "r4",
    "value": "4",
    "label": "Very Good"
  },
  {
    "id": "r5",
    "value": "5",
    "label": "Excellent"
  }
]
```
