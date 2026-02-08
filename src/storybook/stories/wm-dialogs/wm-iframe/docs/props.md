# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | "External Content" | Set the title of an iframe dialog. |
        | `name` | string | - | A unique identifier for the iframe dialog component. Special characters and spaces are not allowed. |
        | `oktext` | string | "Ok" | This property sets the text displayed on the OK button of the dialog. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `headinglevel` | string | "h4" | This property allows you to select the HTML heading level for the dialog title. Choose from the options h1 to h6 based on the context and hierarchy of your content. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
        | `height` | string | "400px" | The height of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Content</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `url` | string | "https://www.wavemaker.com" | Any URL entered for this property will be shown in the dialog content. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `closable` | boolean | true | This property allows the user to access close action from header through an "x" icon; and also enables close through ESC key. |
        | `showactions` | boolean | true | This property shows/hides actions section of the iframe dialog. |
        | `animation` | string | - | This property controls the animation of an element. The animation is based on the CSS classes and works only in the run mode. |
        | `encodeurl` | boolean | false | Check this if you want the provided URL to be encoded at the run time. Enabling this property will encode the special characters in the URL and enable rendering of the page which otherwise might fail. By default, it is set to false. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | "wi wi-globe" | Defines the class of the icon that is applied to the iframe dialog. |
        | `iconurl` | string | - | This optional property allows you to add an icon to the iframe title, it can be an URL of the image. |
        | `iconwidth` | string | - | Optional property; but you will need this if you are using the iframe's iconUrl. Please enter the width of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconheight` | string | - | Optional property; but you will need this if you are using the iframe's iconUrl. Please enter the height of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconmargin` | string | - | Optional property; only has meaning if you specify the iframe's iconUrl. Values should all have "px" next to them. Use this to adjust the space between the icon and the alert title text. |
    </div>
</details>