# Props

| Property | Type | Default | Description |
|---------|------|---------|-------------|
| **Basic** |
| name | string | "" | A unique identifier for the label component. |
| caption | string | "Label" | The text content displayed by the label. Can be bound to variables or other widgets. |
| **Layout** |
| width | string | "" | The width of the label specified in px or % (e.g., "100px" or "50%"). |
| height | string | "" | The height of the label specified in px or % (e.g., "30px" or "10%"). |
| horizontalAlign | string | "left" | Horizontal alignment of text content ("left", "center", "right"). |
| **Behavior** |
| show | boolean | true | Controls the visibility of the label. Bindable to variables for conditional display. |
| loadOnDemand | boolean | false | When set to true and the show property is bound, initialization is deferred until the component becomes visible. |
| animation | string | "none" | Controls the CSS-based animation effect applied to the label. |
| **Text Animation** |
| textAnimation | boolean | false | Enables word-by-word text animation effects (React Native only). |
| animationSpeed | number | 500 | Controls the timing delay in milliseconds between words in text animation. Higher values create slower transitions. |
| **Accessibility** |
| hint | string | "" | Text shown as a tooltip when a user hovers over the label. Enhances accessibility. |

### Rich Text Formatting Examples

```javascript
// Bold text
Page.Widgets.myLabel.caption = "This is **bold** text";

// Clickable link
Page.Widgets.myLabel.caption = "Visit [WaveMaker](https://www.wavemaker.com)";

// Combined formatting
Page.Widgets.myLabel.caption = "**Check out our [documentation](https://docs.wavemaker.com)**";
```

### Conditional Display

```javascript
// Show label only when a condition is met
Page.Widgets.myLabel.show = Page.Variables.myVariable.dataSet.length > 0;

// Toggle label visibility based on user input
Page.Widgets.myLabel.show = Page.Widgets.checkbox1.datavalue;
```