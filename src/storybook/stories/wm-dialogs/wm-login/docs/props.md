# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `title` | string | - | Set the title of an login dialog. |
        | `name` | string | - | A unique identifier for the login dialog component. Special characters and spaces are not allowed. |
    </div>
</details>

<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `headinglevel` | string | "h4" | This property allows you to select the HTML heading level for the dialog title. Choose from the options h1 to h6 based on the context and hierarchy of your content. |
    </div>
</details>

<details>
  <summary>Layout</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `width` | string | - | The width of the component can be specified in em, pt, px or % (i.e 50px, 75%). |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `animation` | string | - | This property controls the animation of an element. The animation is based on the CSS classes and works only in the run mode. |
    </div>
</details>

<details>
  <summary>Graphics</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `iconclass` | string | "wi wi-sign-in" | Defines the class of the icon that is applied to the login dialog. |
        | `iconurl` | string | - | This optional property allows you to add an icon to the login title, it can be an URL of the image. |
        | `iconwidth` | string | - | Optional property; but you will need this if you are using the login's iconUrl. Please enter the width of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconheight` | string | - | Optional property; but you will need this if you are using the login's iconUrl. Please enter the height of your icon. WARNING: It's best to specify size in pixels, not percent. |
        | `iconmargin` | string | - | Optional property; only has meaning if you specify the login's iconUrl. Values should all have "px" next to them. Use this to adjust the space between the icon and the alert title text. |
    </div>
</details>