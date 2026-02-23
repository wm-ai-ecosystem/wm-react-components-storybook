# Overview

A **Menu** is a navigation component that displays a group of related actions or links. Typically used in headers or toolbars, it appears as a drop-down when the user hovers over or clicks the trigger element, allowing easy access to related pages or actions.

### Markup

```javascript
<wm-menu caption="Menu" autoclose="outsideClick" name="menu" variant="standard"></wm-menu>
```

### Examples

#### Properties 

- This menu controls how the menu is triggered, either on hover or click, which can be configured in the markup or dynamically via script.

```javascript
<wm-menu showonhover="true" name="menu"></wm-menu>
```

```javascript
// Set the menu to open when the user hovers over the trigger element
Page.Widgets.menu.showonhover = true;
```

- This menu sets the opened position of its menu items, which can be configured in the markup or dynamically via script.

```javascript
<wm-menu menuposition="down,right" name="menu"></wm-menu>
```

```javascript
// Set the menu to display items in a downwards, aligned to the right.
Page.Widgets.menu.menuposition = "down,right";
```

#### Events 

- This is the markup for a menu with an on-select event, executed when a menu item is selected, allowing custom logic to be performed based on the selected item.

```javascript
<wm-menu on-select="menuSelect($event, widget, $item)" name="menu"></wm-menu>
```

```javascript
Page.menuSelect = function ($event, widget, $item) {
  // Execute logic when a menu item is selected
  // Example: Application header menu with options like Profile, Settings, Logout

  if ($item.label === "Profile") {
    // Navigate to the user profile page
    App.Actions.goToPage_UserProfile.invoke();
  } else if ($item.label === "Settings") {
    // Open the settings dialog
    Page.Widgets.settingsDialog.open();
  } else if ($item.label === "Logout") {
    // Perform the logout action
    App.Actions.logoutAction.invoke();
  }
};
```

#### Sample Menu Dataset

- This is the markup for a menu bound to a hierarchical dataset, representing items such as Main Page, external links, and grouped submenus. The dataset supports multiple levels, with each item having a label, icon, link, and optional children for nested menu items, and allows the Menu component to render the items dynamically.

```javascript
<wm-menu
  name="menu"
  dataset="bind:Variables.stvDropdownMenuData.dataSet"
  itemlabel="label"
  itemlink="link"
  itemicon="icon"
  itemchildren="children"
  caption="Menu"
  autoclose="outsideClick"
></wm-menu>
```

```javascript
// Sample dataset for the Menu component, containing hierarchical menu items
let menuData = [
  {
    label: "Main Page",
    icon: "wi wi-home",
    link: "#/Main",
  },
  {
    label: "Facebook",
    icon: "glyphicon glyphicon-user",
    link: "http://www.facebook.com",
  },
  {
    label: "Search Engines",
    icon: "glyphicon glyphicon-search",
    children: [
      {
        label: "Google",
        icon: "glyphicon glyphicon-arrow-right",
        link: "http://www.google.com",
      },
      {
        label: "Yahoo",
        icon: "glyphicon glyphicon-arrow-right",
        link: "http://www.yahoo.com",
      },
    ],
  },
]
```