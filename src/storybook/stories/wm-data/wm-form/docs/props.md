# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | | The unique identifier for the form |
| `title` | string | | The title displayed at the top of the form |
| `subheading` | string | | Secondary text displayed below the title |
| `className` | string | | Additional CSS class names to apply to the form |
| `formKey` | string | | Unique key for form identification in complex scenarios |

## Form Behavior

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultmode` | "create" \| "edit" \| "view" | "create" | The operational mode of the form |
| `isViewMode` | boolean | false | When true, form is in read-only view mode |
| `autocomplete` | boolean | true | Enables/disables browser autocomplete functionality |
| `action` | (event, widget) => void | | Form submission handler function |
| `method` | string | "post" | HTTP method used for form submission |
| `enctype` | string | "application/x-www-form-urlencoded" | Content type for form data encoding |
| `formdatasource` | string | | Data source binding for the form |
| `validationtype` | string | "default" | Type of validation to apply |
| `validationType` | "default" \| "html" \| "none" | "default" | Specific validation strategy |
| `messagelayout` | "Inline" \| "Toaster" | "Inline" | How validation messages are displayed |
| `required` | boolean | false | Whether form requires input before submission |
| `maxchars` | number | | Maximum characters allowed across text inputs |

## Layout and Structure

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | FormLayout | | Layout configuration object |
| `noOfColumns` | number | 1 | Number of columns in the form grid |
| `isHorizontal` | boolean | false | When true, labels appear beside fields instead of above |
| `captionposition` | string | "top" | Position of field labels relative to inputs |
| `captionalign` | string | "left" | Text alignment for field labels |
| `captionwidth` | string | | Width of caption area (useful for horizontal forms) |
| `collapsible` | boolean | false | Whether the form can be collapsed |
| `expanded` | boolean | true | Initial expanded/collapsed state if collapsible |
| `iconclass` | string | | CSS class for optional form icon |
| `isLayoutDialog` | boolean | false | Whether form is displayed within a dialog |
| `isInsideWizard` | boolean | false | Whether form is part of a wizard interface |
| `numberoffields` | number | | Number of fields in the form |

## Validation & Submission

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `validators` | ValidatorConfig[] | | Array of validation configurations |
| `asyncValidators` | ValidatorConfig[] | | Array of asynchronous validation configurations |
| `errormessage` | string | | Global error message for the form |
| `postmessage` | string | | Message displayed after form submission |

## Advanced Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `metadata` | FormFieldMetadata[] | | Metadata describing the form fields |
| `formRef` | any | | Reference to the form DOM element |
| `tabindex` | number | | Tab index for the form |
| `listener` | any | | Event listener configuration |
| `dataset` | string | | Custom data attributes |

## Common Use Cases

#### Basic Form Configuration
```javascript
// Configure a basic edit form
Page.Widgets.userForm.defaultmode = "edit";
Page.Widgets.userForm.title = "Edit User Profile";
Page.Widgets.userForm.validationType = "default";
Page.Widgets.userForm.messagelayout = "Inline";
```

#### Form Layout Configuration
```javascript
// Set up a horizontal form with 2 columns
Page.Widgets.registrationForm.isHorizontal = true;
Page.Widgets.registrationForm.noOfColumns = 2;
Page.Widgets.registrationForm.captionposition = "left";
Page.Widgets.registrationForm.captionwidth = "30%";
```

#### Collapsible Form Section
```javascript
// Configure form as a collapsible section
Page.Widgets.advancedSettingsForm.collapsible = true;
Page.Widgets.advancedSettingsForm.expanded = false;
Page.Widgets.advancedSettingsForm.title = "Advanced Settings";
Page.Widgets.advancedSettingsForm.iconclass = "fa fa-cog";
```