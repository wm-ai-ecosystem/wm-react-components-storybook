# Styling

The Radioset component in React Native can be customized using various styling properties. You can modify the appearance of both the container and individual radio buttons.

## Container Styling

- `containerStyle`: Customize the main container of the radioset
- `rowStyle`: Style for each row when using multiple items per row

## Radio Button Styling

- `radioButtonStyle`: Style for individual radio buttons
- `radioButtonContainerStyle`: Style for the container around each radio button
- `labelStyle`: Style for the text label of each option
- `selectedRadioButtonStyle`: Style applied to the selected radio button
- `unselectedRadioButtonStyle`: Style applied to unselected radio buttons

## States Styling

- `disabledStyle`: Style applied when the component is disabled
- `focusedStyle`: Style applied to the focused radio button
- `errorStyle`: Style applied when validation fails

## Example Styling

```javascript
// Apply custom styles to radioset
Page.Widgets.colorRadioset.containerStyle = {
  backgroundColor: "#f0f0f0",
  padding: 10,
  borderRadius: 5
};

Page.Widgets.colorRadioset.selectedRadioButtonStyle = {
  backgroundColor: "#007bff",
  borderColor: "#0056b3"
};

Page.Widgets.colorRadioset.labelStyle = {
  fontSize: 16,
  fontWeight: "500",
  marginLeft: 8
};
```