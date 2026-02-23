# Overview

The **Breadcrumb** component is a secondary navigation component that displays a hierarchical path of links, helping users understand their current location within the application. It typically starts from the home page and follows a trail pattern, showing navigational levels in order, allowing users to easily navigate back to previous sections.

### Markup

```javascript
<wm-breadcrumb dataset="Home, Page" class="path-based" name="breadcrumb"></wm-breadcrumb>
```

### Examples

#### Properties 

- This breadcrumb displays the navigation path and supports multiple visual styles, which can be configured in the markup or dynamically via script.

```javascript
<wm-breadcrumb class="path-based" name="breadcrumb"></wm-breadcrumb>
```

```javascript
// Apply the attribute-based style to the breadcrumb
Page.Widgets.breadcrumb.class = "attribute-based";

// Apply the classic style to the breadcrumb
Page.Widgets.breadcrumb.class = "classic";

// Apply the path-based style to the breadcrumb
Page.Widgets.breadcrumb.class = "path-based";
```

#### Events 

- This is the markup for a breadcrumb with an on-beforenavigate event, executed before navigating to the selected breadcrumb item.

```javascript
<wm-breadcrumb on-beforenavigate="breadcrumbBeforenavigate(widget, $item)" name="breadcrumb"></wm-breadcrumb>
```

```javascript
Page.breadcrumbBeforenavigate = function (widget, $item) {
  // Execute only when navigating away from the Products Page
  if ($item.id === "Products") {
    // Show an alert dialog to confirm navigation
    Page.Widgets.alertDialog.message = "You are leaving the Products Page. Do you want to continue?";
    Page.Widgets.alertDialog.open();

    return false; // Prevent navigation until user confirms
  }

  // Allow navigation for all other breadcrumb items
  return true;
};
```

#### Sample Breadcrumb Dataset

- This is the markup for a breadcrumb bound to a hierarchical dataset representing pages like Main, Products, and Product Details. The dataset supports multiple levels of navigation, with each item having a label, icon, link, and optional children for subpages, and allows the Breadcrumb component to render navigation paths dynamically. For example, on the Products Page, the breadcrumb will show Main Page → Products Page, and on the Product Details Page, it will show Main Page → Products Page → Product Details.

```javascript
<wm-breadcrumb
  dataset="bind:Variables.stvBreadcrumbData.dataSet"
  class="path-based"
  name="breadcrumb"
  itemid="id"
  itemlabel="label"
  itemicon="icon"
  itemlink="link"
  itemchildren="children"
></wm-breadcrumb>
```

```javascript
// Sample dataset for the Breadcrumb component, containing hierarchical page details
// Note: If the ID's are repeating then the first possible path will be shown in the breadcrumb.
let breadcrumbData = [
  {
    "label": "Main Page",
    "icon": "wi wi-home",
    "link": "#/Main",
    "id": "Main",
    "children": [
      {
        "label": "Products Page",
        "icon": "",
        "link": "#/Products",
        "id": "Products",
        "children": [
          {
            "label": "Product Details",
            "id": "ProductDetails",
            "icon": "",
            "link": "#/ProductDetails"
          }
        ]
      }
    ]
  },
  {
    "label": "Page2",
    "id": "Page2",
    "icon": "wi wi-euro-symbol",
    "link": "#/Page2"
  }
]
```