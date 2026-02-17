# Overview

The **Slider** component lets users choose a value or range by dragging a handle along a track. It’s ideal for inputs with a defined minimum and maximum such as volume, brightness, ratings, or price ranges where quick adjustment matters more than exact typing.

### Markup

```javascript
<wm-slider name="slider" variant="standard"></wm-slider>
```

### Examples

#### Properties

- This slider displays range labels for the minimum and maximum values, and allows configuring their position. The range label values and their position can be set in the markup or dynamically via script.

```javascript
<wm-slider rangelabelposition="bottom" minvalue="0" maxvalue="100" name="slider"></wm-slider>
```

```javascript
// Set the position of the range labels dynamically (e.g., bottom, top, side)
Page.Widgets.slider.rangelabelposition = "bottom";
```

- This slider displays icons at the start and end positions to provide visual context and improve usability. The icons can be configured in the markup or dynamically via script.

```javascript
<wm-slider showicons="true" starticon="wi wi-minus" endicon="wi wi-plus" name="slider"></wm-slider>
```

```javascript
// Enable start and end icons dynamically and set their classes
Page.Widgets.slider.showicons = true;
Page.Widgets.slider.starticon = "wi wi-minus";
Page.Widgets.slider.endicon = "wi wi-plus"
```

#### Events

- This is the markup for a slider with an on-change event, executed when a user updates the slider value to trigger actions such as filtering data or updating other UI components.

```javascript
<wm-slider on-change="sliderChange($event, widget, newVal, oldVal)" name="slider"></wm-slider>
```

```javascript
Page.sliderChange = function ($event, widget, newVal, oldVal) {
  // Update the product list dynamically based on the selected maximum price
  Page.Variables.svFilteredProducts.setInput("RequestBody.maxPrice", newVal);
  Page.Variables.svFilteredProducts.invoke();

  // After the service variable (svFilteredProducts) successfully retrieves data, the result can be bound to another UI component, such as a table, list, or cards
  // Page.Widgets.productsList.dataset = Page.Variables.svFilteredProducts.dataSet;
};
```
