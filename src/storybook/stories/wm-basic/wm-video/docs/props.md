# Props

## Basic Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| name | string | - | A unique identifier for the video widget |
| show | boolean | true | Controls whether the video component is visible |
| width | string | "100%" | The width of the video player (in px or %) |
| height | string | "150px" | The height of the video player (in px or %) |

## Video Source

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| mp4SourcePath | string | - | Path to the MP4 format of the video |
| oggSourcePath | string | - | Path to the Ogg format of the video |
| webmSourcePath | string | - | Path to the WebM format of the video |
| poster | string | - | Image to be displayed while the video is downloading or until the user hits play |
| supportMessage | string | - | Message displayed when HTML5 video is not supported |

## Subtitle Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| subtitleSource | string | - | Source URL for the subtitle in .vtt format |
| subtitleLanguage | string | - | Language code for the subtitle |

## Playback Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| enableControls | boolean | true | Enables display of video controls (play/pause button, etc.) |
| enableAutoplay | boolean | false | Automatically starts playing the video when loaded |
| loop | boolean | false | Causes the video to start over when finished |
| mute | boolean | false | Mutes the audio output of the video |
| videoPreload | string | "none" | Determines how the video should be loaded when the page loads. Options: "none", "metadata", or "auto" |

## Accessibility

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| hint | string | - | Text displayed as a tooltip when hovering over the video |
| tabindex | number | 0 | Sets the tab order for keyboard navigation |

## Configure Video Playback
```javascript
// Enable autoplay
Page.Widgets.myVideo.enableAutoplay = true;

// Mute the video
Page.Widgets.myVideo.mute = true;

// Enable looping
Page.Widgets.myVideo.loop = true;

// Set video sources
Page.Widgets.myVideo.mp4SourcePath = "/resources/videos/sample.mp4";
```