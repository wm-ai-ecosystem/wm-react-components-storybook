# Methods

The Slider component can be accessed in scripts through the Page.Widgets namespace:

```javascript
var mySlider = Page.Widgets.sliderName;
```

| Method | Parameters | Return Type | Description |
| --- | --- | --- | --- |
| getValue | None | number | Returns the current value of the slider |
| setValue | value: number | void | Sets the slider to the specified value |
| disable | None | void | Disables the slider, making it non-interactive |
| enable | None | void | Enables the slider, making it interactive again |
| show | None | void | Makes the slider visible |
| hide | None | void | Hides the slider |

## Common Method Use Cases

```javascript
// Get the current value
var currentValue = Page.Widgets.mySlider.getValue();
console.log("Current slider value:", currentValue);

// Set the slider to a specific value
Page.Widgets.mySlider.setValue(75);

// Disable the slider temporarily
Page.Widgets.mySlider.disable();

// Re-enable the slider
Page.Widgets.mySlider.enable();
```