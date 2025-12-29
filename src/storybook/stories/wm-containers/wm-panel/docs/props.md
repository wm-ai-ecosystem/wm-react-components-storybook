# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| name | string | "" | A unique identifier for the panel |
| title | string | "" | Primary text displayed in the panel header |
| subheading | string | "" | Secondary text displayed below the title |
| height | string \| number | "auto" | The height of the panel, can be specified in px or % |
| content | any | null | Content to be displayed inside the panel body |
| className | string | "" | Additional CSS class names to apply to the panel |
| style | React.CSSProperties | {} | Inline styles to apply to the panel |
| children | ReactNode | null | Child components to render inside the panel |

## Header Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| badgetype | BadgeType | "default" | Controls the color of the badge. Values: default, primary, success, info, warning, danger |
| badgevalue | string \| number | "" | Value displayed in the badge span |
| iconclass | string | "" | CSS class for the icon displayed in the panel header |
| iconurl | string | "" | URL for the icon image to be displayed in the header |
| iconwidth | string \| number | "auto" | Width of the icon |
| iconheight | string \| number | "auto" | Height of the icon |
| iconmargin | string | "" | Margin around the icon |
| helptext | string | "" | Text displayed when the help icon is clicked |
| hint | string | "" | Text displayed as a tooltip |

## Behavior Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| closable | boolean | false | When true, shows a close button in the panel header |
| collapsible | boolean | false | When true, shows expand/collapse controls |
| expanded | boolean | true | Sets the default expansion state of the panel |
| enablefullscreen | boolean | false | When true, allows the panel to enter full-screen mode |
| fullscreen | boolean | false | Sets the initial full-screen state of the panel |
| actions | ActionItem[] | [] | Configuration for dropdown menu actions in the header |

## Actions Configuration (when bound to a variable)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| itemlabel | string | "" | Label for action items generated dynamically |
| itemicon | string | "" | Icon class for action items |
| itemlink | string | "" | Link for action items |
| itemaction | string | "" | Task/function to execute when action item is clicked |
| itemchildren | any | null | Sub-items for nested action menus |
| userrole | string | "" | Role-based visibility control for menu items |

### Configure Panel Behavior

```javascript
// Set collapsible behavior
Page.Widgets.myPanel.collapsible = true;

// Toggle expansion state
Page.Widgets.myPanel.expanded = !Page.Widgets.myPanel.expanded;

// Enable full-screen capability
Page.Widgets.myPanel.enablefullscreen = true;

// Add a help text popup
Page.Widgets.myPanel.helptext = "This panel contains important user information";
```

### Configure Actions Menu

```javascript
// Set panel actions programmatically
Page.Widgets.myPanel.actions = [
  {
    "label": "Edit",
    "icon": "fa fa-pencil",
    "action": "editItemFunction()"
  },
  {
    "label": "Delete",
    "icon": "fa fa-trash",
    "action": "deleteItemFunction()"
  }
];
```