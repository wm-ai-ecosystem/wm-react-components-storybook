# Overview

The **Nav** component is a flexible navigation component used to organize and display links to pages or sections within an application. It supports Anchor, Menu, Popover, and Button components, enabling the creation of headers, side navigation, tabs, or dropdown-style navigation structures that help users move through the application efficiently.

### Markup

```javascript
<wm-nav type="pills" autoclose="outsideClick" name="nav">
    <wm-nav-item name="nav_item1">
        <wm-anchor caption="Link 1" name="anchor1"></wm-anchor>
    </wm-nav-item>
    <wm-nav-item name="nav_item2">
        <wm-anchor caption="Link 2" name="anchor2"></wm-anchor>
    </wm-nav-item>
    <wm-nav-item name="nav_item3">
        <wm-anchor caption="Link 3" name="anchor3"></wm-anchor>
    </wm-nav-item>
</wm-nav>
```

### Examples

#### Properties 

- Defines the layout style of the navigation items.

```javascript
// "stacked" displays navigation items vertically (useful for dropdowns or side menus)
Page.Widgets.nav.layout = "stacked";
```

- Defines the display style, choose between pills or tabs.

```javascript
Page.Widgets.nav.type = "tabs";
```

#### Events 

- Triggered when a nav item is selected.

```javascript
Page.navSelect = function ($event, widget, $item) {
    // TopNav: Electronics | Fashion | Accessories | Offers

    if ($item.label === "electronics") {
        App.Actions.goToPage_Electronics.invoke();

    } else if ($item.label === "fashion") {
        App.Actions.goToPage_Fashion.invoke();

    } else if ($item.label === "accessories") {
        App.Actions.goToPage_Accessories.invoke();

    } else if ($item.label === "offers") {
        App.Actions.goToPage_Offers.invoke();
    }
};
```