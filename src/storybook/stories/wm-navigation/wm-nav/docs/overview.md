# Overview

The **Nav** component is a flexible navigation component used to organize and display links to pages or sections within an application. It supports Anchor, Menu, Popover, and Button components, enabling the creation of headers, side navigation, tabs, or dropdown-style navigation structures that help users move through the application efficiently.

### Markup

```javascript
<wm-nav type="pills" autoclose="outsideClick" name="nav" variant="standard">
    <wm-nav-item name="nav_item1">
        <wm-anchor caption="Link 1" name="anchor1" variant="standard"></wm-anchor>
    </wm-nav-item>
    <wm-nav-item name="nav_item2">
        <wm-anchor caption="Link 2" name="anchor2" variant="standard"></wm-anchor>
    </wm-nav-item>
    <wm-nav-item name="nav_item3">
        <wm-anchor caption="Link 3" name="anchor3" variant="standard"></wm-anchor>
    </wm-nav-item>
</wm-nav>
```

### Examples

#### Properties 

- This nav defines the layout and style of navigation items, which can be configured in the markup.

```javascript
<wm-nav layout="stacked" type="pills" name="nav"></wm-nav>
```

#### Events 

- This is the markup for a nav with an on-select event, executed when a navigation item is selected, allowing custom logic to be performed based on the selected item.

```javascript
<wm-nav on-select="navSelect($event, widget, $item)" name="nav"></wm-nav>
```

```javascript
Page.navSelect = function ($event, widget, $item) {
  // Execute logic when a Nav item is selected
  // Note: For the event to work correctly, Nav must be bound to a dataset, and item properties (label, icon, link) mapped correctly

  // Example: Top navigation with items like Electronics, Fashion, Accessories, and Offers

  if ($item.label === "electronics") {
    // Navigate to the Electronics page
    App.Actions.goToPage_Electronics.invoke();
  } else if ($item.label === "fashion") {
    // Navigate to the Fashion page
    App.Actions.goToPage_Fashion.invoke();
  } else if ($item.label === "accessories") {
    // Navigate to the Accessories page
    App.Actions.goToPage_Accessories.invoke();
  } else if ($item.label === "offers") {
    // Navigate to the Offers page
    App.Actions.goToPage_Offers.invoke();
  }
};
```

#### Sample Nav Dataset

- This is the markup for a nav bound to a hierarchical dataset, representing navigation items with multiple levels. Each item can have a label, icon, and optional children for nested submenus, allowing the Nav component to render complex, multi-level navigation dynamically.

```javascript
<wm-nav
  name="nav"
  dataset="bind:Variables.stvNavData.dataSet"
  itemlabel="label"
  itemicon="icon"
  itemchildren="children"
  type="pills"
  autoclose="outsideClick"
></wm-nav>
```

```javascript
// Sample dataset for the Nav component, containing hierarchical navigation items
let navData = [
  {
    "label": "item1",
    "icon": "wi wi-euro-symbol",
    "children": [
      {
        "label": "sub-menu-item1",
        "icon": "wi wi-euro-symbol"
      },
      {
        "label": "sub-menu-item2",
        "icon": "wi wi-euro-symbol",
        "children": [
          {
            "label": "sub-menu-child-item1",
            "icon": "wi wi-euro-symbol",
            "children": [
              {
                "label": "sub-menu-child-item1-item1",
                "icon": "wi wi-euro-symbol",
                "path": "/item1/item2/item1/item1"
              },
              {
                "label": "sub-menu-child-item1-item2",
                "icon": "wi wi-euro-symbol",
                "path": "/item1/item2/item1/item2"
              }
            ]
          },
          {
            "label": "sub-menu-child-item2",
            "icon": "wi wi-euro-symbol"
          }
        ]
      }
    ]
  },
  {
    "label": "item2",
    "icon": "wi wi-euro-symbol"
  },
  {
    "label": "item3",
    "icon": "wi wi-euro-symbol"
  },
  {
    "label": "item4",
    "icon": "wi wi-euro-symbol"
  }
]
```