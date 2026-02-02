# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the video component. Special characters and spaces are not allowed. |
    </div>
</details>


<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `hint` | string | - | Any text you enter for this property will be shown as a tooltip if the mouse hovers over this component for 1.5 seconds. |
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
  <summary>Video</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `videoposter` | string | - | This property allows you to set an image to be shown while the video is downloading, or until the user hits the play button. |
        | `mp4format` | string | - | This property allows you to set an video/mp4 format of the video. |
        | `oggformat` | string | - | This property allows you to set an video/Ogg source of the video. |
        | `webmformat` | string | - | This property allows you to set an video/WebM source of the video. |
        | `videopreload` | string | "none" | This property allows if and how the author thinks the video should be loaded when the page loads. Can be set to: - none - default - metadata, or - auto |
        | `videosupportmessage` | string | - | This property allows setting the message when Html 5 video is not supported. |
        | `subtitlesource` | string | - | This property allows setting the source URL for the subtitle in the .vtt format. |
        | `subtitlelang` | string | "en" | This property allows setting the language for the subtitle. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. |
        | `controls` | boolean | true | When enabled, displays video playback controls (play/pause button, volume, etc.) |
        | `autoplay` | boolean | false | When enabled, video will automatically start playing when loaded. |
        | `loop` | boolean | false | When enabled, vodep will repeat playback in a loop. |
        | `muted` | boolean | false | When enabled, video output will be muted. |
    </div>
</details>

