# Styling

The Label component in React Native supports various styling options to customize its appearance.

### Label Types

Different label types can be applied to change the visual appearance:

- **Default**: Standard text display
- **Heading** (h1-h6): Larger text for section headers with appropriate emphasis
- **Paragraph**: Block of text formatted as a paragraph

### Text Styling

- **Font Weight**: Control text emphasis (normal, bold)
- **Text Color**: Customize the color of the label text
- **Font Size**: Adjust the size of the displayed text
- **Text Alignment**: Position text left, center, or right

### Animation Styling

When using text animation:

- The animation speed can be adjusted through the animationSpeed property
- Words appear one by one with a fade-in effect

### Platform Notes

- On Android, rich text formatting is disabled if ellipsis is enabled for a label
- For accessible design, ensure sufficient contrast between text and background colors