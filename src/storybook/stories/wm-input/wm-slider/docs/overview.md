# Overview

The **Slider** component lets users choose a value or range by dragging a handle along a track. It’s ideal for inputs with a defined minimum and maximum such as volume, brightness, ratings, or price ranges where quick adjustment matters more than exact typing.

### Markup

```javascript
<wm-switch
  name="switch"
  dataset="bind:Variables.stvViewOptions.dataSet"
  datafield="id"
  displayfield="value"
  multiple="true"
  checkediconclass="wm-sl-l sl-keyboard"
  iconclass=""
></wm-switch>
```

### Examples

#### Properties

- Displays marker labels and enables markers on the Slider component.

```javascript
Page.Widgets.slider.showmarkers = true;
Page.Widgets.slider.markerlabeltext = "Range Slider";
```

- Enables icons at both ends of the Slider component to improve usability and visual context.

```javascript
Page.Widgets.slider.showicons = true;
Page.Widgets.slider.starticon = "wi wi-minus";
Page.Widgets.slider.endicon = "wi wi-plus"
```

#### Events

- Triggered whenever the slider component’s value is updated

```javascript
Page.sliderChange = function ($event, widget, newVal, oldVal) {
    // Update product list based on selected price range
    Page.Variables.getFilteredProducts.setInput("maxPrice", newVal);
    Page.Variables.getFilteredProducts.invoke();
};
```
