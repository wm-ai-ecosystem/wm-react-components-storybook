# Overview

The **Breadcrumb** component is a secondary navigation component that displays a hierarchical path of links, helping users understand their current location within the application. It typically starts from the home page and follows a trail pattern, showing navigational levels in order, allowing users to easily navigate back to previous sections.

### Markup

```javascript
<wm-breadcrumb dataset="Home, Page" class="path-based" name="breadcrumb"></wm-breadcrumb>
```

### Examples

#### Properties 

- To change the visual style of the Breadcrumb component.

```javascript
// Apply the attribute-based style to the breadcrumb
Page.Widgets.breadcrumb.class = "attribute-based";

// Apply the classic style to the breadcrumb
Page.Widgets.breadcrumb.class = "classic";

// Apply the path-based style to the breadcrumb
Page.Widgets.breadcrumb.class = "path-based";
```

#### Events 

- Triggered before navigating via a breadcrumb.

```javascript
Page.breadcrumbBeforenavigate = function (widget, $item) {
    //Allows you to validate, confirm, or take actions based on the target breadcrumb item before the navigation occurs.
    const form = Page.Widgets.employeeForm.valid;
    if (!form) {
        Page.Widgets.alertDialog.message = "Employee profile is incomplete. Complete all required fields before navigating.";
        Page.Widgets.alertDialog.open();
        
        return false; // Block navigation
    }

    // Form is valid, allow breadcrumb navigation
    return true;
};
```