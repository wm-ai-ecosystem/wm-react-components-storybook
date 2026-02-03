# Overview

The **Rating** component lets users provide or view feedback using a visual star-based system. It supports displaying ratings as well as collecting input in a simple, intuitive way.

### Markup

```javascript
<wm-rating name="rating"></wm-rating>
```

### Examples

#### Properties

- Sets the rating’s component default value.

```javascript
Page.Widgets.rating.datavalue = 2;
```

- Controls the visibility of captions in the rating component. Setting it to false hides all captions.

```javascript
Page.Widgets.rating.showcaptions = false;
```

#### Events

- Triggered whenever the rating selection is updated.

```javascript
Page.ratingChange = function ($event, widget, newVal, oldVal) {
    if (newVal) {
        // Submit the rating to backend
        Page.Variables.svSubmitRating.setInput("productId", Page.Widgets.productId.datavalue);
        Page.Variables.svSubmitRating.setInput("rating", newVal);
        Page.Variables.svSubmitRating.invoke();

        // Invoke a pre-configured toaster action after the service variable successfully submits the rating
        Page.Actions.feedbackToaster.invoke();
    }
};

```

<!-- #### Sample checkboxset dataset

```json
[
  {
    "name": "United States",
    "code": "US"
  },
  {
    "name": "United Kingdom",
    "code": "UK"
  },
  {
    "name": "Canada",
    "code": "CA"
  },
  {
    "name": "Australia",
    "code": "AU"
  },
]
``` -->
