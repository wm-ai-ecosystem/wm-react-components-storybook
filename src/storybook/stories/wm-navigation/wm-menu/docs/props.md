# Props

The Menu component currently does not have any documented properties. This component likely relies on standard HTML attributes and child components to define its structure and behavior.

## Basic Usage

```javascript
// Basic menu implementation
<menu>
  <menu-item route="/home">Home</menu-item>
  <menu-item route="/products">Products</menu-item>
  <menu-item route="/about">About</menu-item>
  <menu-item route="/contact">Contact</menu-item>
</menu>
```

## Common Use Cases

### Creating a Dropdown Menu

```javascript
<menu class="dropdown-menu">
  <menu-item>Profile</menu-item>
  <menu-item>Settings</menu-item>
  <menu-item>Logout</menu-item>
</menu>
```

### Sidebar Navigation Menu

```javascript
<menu class="sidebar-menu">
  <menu-item icon="dashboard">Dashboard</menu-item>
  <menu-item icon="users">Users</menu-item>
  <menu-item icon="settings">Settings</menu-item>
</menu>
```