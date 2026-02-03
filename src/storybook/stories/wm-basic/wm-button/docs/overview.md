# Overview

A **Button** indicates a possible user action. The button provides a styled clickable UI functionality with arbitrary content to indicate the different states.

### Markup

```javascript
<wm-button class="btn-filled btn-default" caption="Notifications" type="button" name="button" variant="filled:default" iconclass="wi wi-notifications-none" badgevalue="5"></wm-button>
```

### Examples


#### Properties

- Configure the button caption.

```javascript
Page.Widgets.button.caption = "WaveMaker";
```

- Disable/enable button based on a condition.

```javascript
Page.Widgets.button.disabled = !formIsValid;
```

- Set an icon using image URL.

```javascript
Page.Widgets.button.iconurl = "resources/images/download.png";
Page.Widgets.button.iconwidth = "20px";
Page.Widgets.button.iconheight = "20px";
Page.Widgets.button.iconmargin = "0px 8px 0px 0px";
```

#### Events

- Triggered on button click to submit a form.

```javascript
Page.buttonClick = function ($event, widget) {
  // Submit a form, e.g., registration or feedback form
  Page.Widgets.formCreate.submit();
};
```

- Triggered on button click to invoke a variable for actions such as fetching or submitting data.

```javascript
Page.buttonClick = function ($event, widget) {
  // Call a service or variable to fetch or submit data
  Page.Variables.svGetUsersData.invoke();
};
```

- Triggered on button click to open dialog.

```javascript
Page.buttonClick = function ($event, widget) {
  // Open a dialog or modal window
  Page.Widgets.dialog.open();
};
```