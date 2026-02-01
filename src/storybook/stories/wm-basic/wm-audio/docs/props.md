# Properties

<details open>
  <summary>Basic</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `name` | string | - | A unique identifier for the audio component. Special characters and spaces are not allowed. |
    </div>
</details>


<details>
  <summary>Accessibility</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `tabindex` | number | 0 | The tab index attribute specifies the tab order of an element. You can use this property to change the default tabbing order for component access using the tab key. The value can range from 0 to 32767. The default is 0 and -1 makes the element non-focusable. NOTE: In Safari browsers, by default, Tab highlights only text fields. To enable Tab functionality, in Safari Browser from Preferences -> Advanced -> Accessibility set the option "Press Tab to highlight each item on a webpage". |
        | `arialabel` | string | - | Accessibility label for screen readers |
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
  <summary>Audio</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `mp3format` | string | - | The file path or URL to the MP3 audio file. |
        | `audiopreload` | string | none | This property allows if and how the author thinks the audio should be loaded when the page loads. Can be set to: - none - default - metadata, or - auto |
        | `audiosupportmessage` | string | - | This property allows you to set the message when the audio file is not supported by the HTML5 media player. |
    </div>
</details>

<details>
  <summary>Behavior</summary>
    <div>
        | Property | Type | Default | Description |
        | --- | --- | --- | --- |
        | `show` | boolean | true | Showing determines whether or not a component is visible. |
        | `controls` | boolean | true | When enabled, displays audio playback controls (play/pause button, volume, etc.) |
        | `autoplay` | boolean | false | When enabled, audio will automatically start playing when loaded. |
        | `loop` | boolean | false | When enabled, audio will repeat playback in a loop. |
        | `muted` | boolean | false | When enabled, audio output will be muted. |
    </div>
</details>

### Use Cases


- Enable autoplay.

```javascript
Page.Widgets.audio.autoplay = true;
```

- Enable looping.

```javascript
Page.Widgets.audio.loop = true;
```

- Mute audio.

```javascript
Page.Widgets.audio.muted = true;
```

- Show controls.

```javascript
Page.Widgets.audio.controls = true;
```