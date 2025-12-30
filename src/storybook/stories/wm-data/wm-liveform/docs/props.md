# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "" | The main heading text displayed at the top of the form. |
| `subheading` | string | "" | Secondary descriptive text displayed below the main title. |
| `iconclass` | string | "" | CSS class name for an icon to display alongside the form title. |
| `formType` | string | "" | Defines the type of form (e.g., "standard", "inline", etc.). |
| `defaultmode` | "create" \| "edit" \| "view" | "create" | Sets the initial operation mode of the form. |
| `isViewMode` | boolean | false | When true, displays the form in read-only view mode. |

## Data Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `formdatasource` | string | "" | The data source name that this form binds to for data operations. |
| `dataset` | string | "" | The dataset to use when binding form fields. |
| `numberoffields` | number | 0 | Specifies the number of fields in the form. |

## Form Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `method` | string | "post" | HTTP method used for form submission ("get" or "post"). |
| `enctype` | string | "application/x-www-form-urlencoded" | The encoding type for form data when submitted. |
| `autocomplete` | boolean | true | Enables or disables browser autocomplete functionality. |
| `collapsible` | boolean | false | Allows the form to be collapsed/expanded when true. |
| `expanded` | boolean | true | Initial expanded state when collapsible is enabled. |

## Layout and Presentation

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `captionposition` | string | "top" | Position of field captions relative to input fields. |
| `captionalign` | string | "left" | Horizontal alignment of field captions. |
| `tabindex` | number | 0 | The tab order of the form within the page. |
| `isLayoutDialog` | boolean | false | When true, optimizes the form for dialog/modal display. |
| `isInsideWizard` | boolean | false | Configures the form for use within a wizard component. |

## Error Handling

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `errormessage` | string | "" | Custom error message to display when form validation fails. |

## Common Use Cases

#### Basic Form Configuration
```javascript
// Configure a basic edit form
Page.Widgets.userForm.defaultmode = "edit";
Page.Widgets.userForm.formdatasource = "UserDataService";
Page.Widgets.userForm.title = "User Profile";
Page.Widgets.userForm.subheading = "Update your personal information";
```

#### Form Submission Configuration
```javascript
// Configure form to upload files
Page.Widgets.documentForm.method = "post";
Page.Widgets.documentForm.enctype = "multipart/form-data";
Page.Widgets.documentForm.autocomplete = false;
```

#### Collapsible Form
```javascript
// Make form collapsible and set initial state
Page.Widgets.advancedOptionsForm.collapsible = true;
Page.Widgets.advancedOptionsForm.expanded = false;
```