# Props

## Basic Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"static" | "dynamic"` | `"static"` | Determines if the accordion uses static content or generates panes from a dataset |
| `closeothers` | `boolean` | `true` | When true, only one pane can be open at a time |
| `defaultpaneindex` | `number` | `0` | Index of the pane that should be open by default |
| `statehandler` | `StateHandler` | - | Custom state handler for managing accordion state |

## Data Configuration

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dataset` | `any[]` | `[]` | Array of data objects used to generate panes in dynamic mode |
| `nodatamessage` | `string` | `"No Data Found"` | Message displayed when dataset is empty |
| `render` | `(props: any, index?: number, dataset?: any[]) => ReactNode` | - | Custom renderer function for dynamic accordion panes |

## Content

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to be displayed within accordion panes (for static type) |

## Configure Accordion Behavior

```javascript
// Allow multiple panes to be open
Page.Widgets.myAccordion.closeothers = false;

// Set default expanded pane
Page.Widgets.myAccordion.defaultpaneindex = 2;
```

### Using Dynamic Data

```javascript
// Sample dataset for dynamic accordion
Page.Widgets.myAccordion.dataset = [
  { title: "Engineering", content: "Team details..." },
  { title: "Sales", content: "Sales information..." },
  { title: "Marketing", content: "Marketing data..." }
];
```