# Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| **Source Settings** | | | |
| mp3format | string | - | The file path or URL to the MP3 audio file |
| audiosupportmessage | string | - | Message displayed when audio playback is not supported by the device |
| **Playback Controls** | | | |
| controls | boolean | false | When enabled, displays audio playback controls (play/pause button, volume, etc.) |
| autoplay | boolean | false | When enabled, audio will automatically start playing when loaded |
| loop | boolean | false | When enabled, audio will repeat playback in a loop |
| muted | boolean | false | When enabled, audio output will be muted |
| audiopreload | "auto" \| "metadata" \| "none" | "none" | Specifies how the audio should be loaded when the page loads:<br>- "none": Does not preload the audio<br>- "metadata": Only preloads metadata (file size, first frame, etc.)<br>- "auto": Preloads the entire audio file |
| **Accessibility** | | | |
| arialabel | string | - | Accessibility label for screen readers |
| tabindex | number | 0 | Specifies the tab order of the component for keyboard navigation |
| **General** | | | |
| prefabName | string | - | Name of the prefab if this component is part of a prefab |

## Configure Audio Playback
```javascript
// Enable autoplay
Page.Widgets.myAudio.autoplay = true;

// Enable looping
Page.Widgets.myAudio.loop = true;

// Mute audio
Page.Widgets.myAudio.muted = true;

// Show controls
Page.Widgets.myAudio.controls = true;
```