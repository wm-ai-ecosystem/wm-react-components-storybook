# Styling

The Progress Circle widget's appearance can be customized through its properties. In React Native applications, custom styling is primarily managed through props rather than CSS classes.

## Appearance Control

The primary way to control the appearance is through the `type` property, which applies predefined styles:

- `default`: Standard neutral appearance
- `success`: Green color scheme indicating successful completion
- `info`: Blue color scheme for informational status
- `warning`: Yellow/orange color scheme for warning states
- `danger`: Red color scheme for error or critical states

## Layout Customization

The widget's dimensions can be controlled using the `width` and `height` properties. These can be specified as pixel values or percentages (e.g., '100px' or '50%').

## Text Display

You can control the text display using:

- `title` and `subtitle` properties for the descriptive text
- `displayFormat` for controlling how the numeric value appears
- `captionPlacement` to position the value label or hide it entirely

## Advanced Customization

For more advanced styling needs beyond what the properties provide, you may need to create a custom version of the component. Since this is a React Native context, custom styling would typically be implemented through React Native's styling system rather than CSS.