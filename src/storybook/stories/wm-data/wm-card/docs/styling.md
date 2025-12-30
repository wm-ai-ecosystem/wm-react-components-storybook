# Styling

The Card component can be styled using CSS classes to customize its appearance. You can apply these styles using the `className` property or by targeting the component's CSS selectors.

## Basic Structure

The Card component typically has the following structure that can be targeted for styling:

```
.app-card (root element)
  ├── .card-header
  │     ├── .card-title
  │     └── .card-subtitle
  ├── .card-image-container
  │     └── img.card-image
  ├── .card-body
  │     └── .card-content
  └── .card-actions
        └── .action-buttons
```

## Common CSS Classes

| CSS Class | Purpose |
|-----------|----------|
| `.app-card` | The main container class for the entire card component |
| `.card-header` | Container for the title and subtitle elements |
| `.card-title` | Styles the main title of the card |
| `.card-subtitle` | Styles the subtitle or secondary text |
| `.card-image-container` | Wrapper for the card's image |
| `.card-image` | Applied to the image element itself |
| `.card-body` | Contains the main content area of the card |
| `.card-content` | Styles for the content within the card body |
| `.card-actions` | Container for action buttons or links |
| `.card-icon` | Styles for icons displayed in the card |
| `.card-item` | Applied to individual items in a card list |
| `.card-active` | Applied when the card is in an active state |
| `.card-interactive` | Applied to cards that have click or hover behaviors |

## Styling Examples

### Custom Card Styling

```css
/* Add drop shadow and rounded corners */
.app-card {
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* Hover effect */
.app-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Custom header styling */
.app-card .card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 15px;
}

/* Title styling */
.app-card .card-title {
  font-weight: 600;
  color: #343a40;
}

/* Custom image container */
.app-card .card-image-container {
  overflow: hidden;
  max-height: 200px;
}

/* Image hover zoom effect */
.app-card .card-image {
  transition: transform 0.3s ease;
}

.app-card:hover .card-image {
  transform: scale(1.05);
}

/* Action button styling */
.app-card .card-actions .btn {
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px 15px;
}
```

### Theme Variations

```css
/* Light theme card */
.app-card.light-theme {
  background-color: #ffffff;
  color: #333333;
}

/* Dark theme card */
.app-card.dark-theme {
  background-color: #343a40;
  color: #f8f9fa;
}

.app-card.dark-theme .card-title {
  color: #ffffff;
}

/* Accent colored card */
.app-card.accent-theme {
  border-top: 4px solid #007bff;
}

/* Status cards */
.app-card.success {
  border-left: 4px solid #28a745;
}

.app-card.warning {
  border-left: 4px solid #ffc107;
}

.app-card.danger {
  border-left: 4px solid #dc3545;
}
```

### Responsive Considerations

```css
/* Responsive adjustments */
@media (max-width: 768px) {
  .app-card {
    margin-bottom: 15px;
  }
  
  .app-card .card-title {
    font-size: 1.1rem;
  }
  
  .app-card .card-image-container {
    max-height: 150px;
  }
}

@media (max-width: 576px) {
  .app-card .card-actions {
    flex-direction: column;
  }
  
  .app-card .card-actions .btn {
    margin-bottom: 5px;
    width: 100%;
  }
}
```