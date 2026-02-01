# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the picture component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `arialabel` | string | - | Accessibility label for screen readers |
        | `alttext` | string | - | Any text you enter for this property will be used as an alternate text for the image, if the image for some reason cannot be displayed. |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
    </div>
</details>

<details>
  <summary>Picture</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `picturesource` | string | - | This property specifies the source for the picture. The source can be either a file or a URL - File: enter the directory and filename for the image to display (supported file types include .jpg, .gif and .png). By default, WaveMaker looks for images in the src/main/webapp directory of the project. Every WaveMaker project has a data directory under src/main/webapp, so this is a good place to put pictures. - URL: enter a URL to any internet-accessible image. To display the file, foo.jpg, in the project directory src/main/webapp/resources/images/imagelists/, enter the following into the source property:resources/images/imagelists/foo.jpg or simply foo.jpg |
        | `pictureplaceholder` | string | - | This property will act as placeholder image for the picture. When the picture from the Source value is not provided or not available then placeholder picture will be shown. |
        | `pictureaspect` | string | - | This property can automatically size an image to the height or width of the picture component. The options are: - none: the image is displayed at its default size - h: the image is resized so that the width of the image is the same as the width of the picture component - v: the image is resized so that the height of the image is the same as the height of the picture component - the image is resized so that the height and width of the image is the same as the height of the picture component. |
        | `resizemode` | string | - | This property controls how the image fits within the component's dimensions. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | - | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. It is a bindable property. |
        | `loadOnDemand` | boolean | false | When this property is set and show property is bound, the initialization of the component will be deferred till the component becomes visible. This behavior improves the load time. Use this feature with caution, as it has a downside (as we will not be able to interact with the component through script until the component is initialized). When show property is not bound the component will be initialized immediately. |
        | `animation` | string | - | Controls the animation of the component. |
        | `encodeurl` | boolean | false | Check this if you want the provided URL to be encoded at the run time. Enabling this property will encode the special characters in the URL and enable rendering of the page which otherwise might fail. By default, it is set to false. |
    </div>
</details>

### Use Cases

- Set the image source dynamically for the picture component.

```javascript
Page.Widgets.picture.picturesource = "./resources/images/logos/wavemaker_logo.png";
```

- Apply animation to the picture component.

```javascript
Page.Widgets.picture.animation = "bounceIn";
```