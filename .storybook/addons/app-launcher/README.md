# App Launcher Addon

A custom Storybook addon that integrates the `AppLauncher` component from `wm-ui-components` into the Storybook manager toolbar (top header). The AppLauncher appears as the **first item in the right-side button group**, alongside fullscreen, share, and editor buttons.

## Overview

This addon provides quick access to the app launcher popover directly from Storybook's toolbar, allowing users to navigate between different applications without leaving the Storybook environment.

## Files

### `AppLauncherTool.tsx`
The main component that:
- Uses a `MutationObserver` to detect when the Storybook toolbar becomes available
- Creates a vanilla DOM element and renders the `AppLauncher` component into it via a React portal
- Manages cleanup and prevents memory leaks with debouncing and timeout fallbacks
- Optimized for performance with debounced callbacks and early exit logic

**Key Features:**
- Waits for toolbar stability before appending (prevents React reconciliation conflicts)
- Uses `createRoot` from React 18+ to render in an isolated portal
- Automatic cleanup and timeout fallback (3s)
- No interference with Storybook's React tree

### `register.tsx`
Storybook addon registration file that:
- Registers the addon with the Storybook manager API
- Uses `types.TOOL` to place the component in the toolbar
- Provides the `AppLauncherTool` component to be rendered

## How It Works

1. **Registration** — The addon is registered in `manager.ts` via the import statement
2. **Component Mounting** — Storybook calls `AppLauncherTool` to render in the toolbar
3. **DOM Detection** — Component waits for the toolbar to be fully mounted and both button groups to exist
4. **Portal Creation** — Creates a plain DOM div and renders the AppLauncher into it via `createRoot`
5. **Positioning** — The wrapper is inserted as the first child of the right-side button group
6. **Cleanup** — Observer and timers are properly cleaned up on unmount

## Performance Optimizations

- **Debounced MutationObserver** (100ms) — Prevents excessive callback firing
- **Early exit logic** — Stops checking once successfully appended
- **Single timeout fallback** (3s) — Replaces polling with a clean timeout
- **Guaranteed cleanup** — All resources are released in the cleanup function
- **Isolated React tree** — Portal prevents conflicts with Storybook's React rendering

## Configuration

### Props

The `AppLauncher` is configured with:
```tsx
<AppLauncher excludeId="webstorybook" />
```

- `excludeId="webstorybook"` — Excludes the Storybook app from the launcher

To modify behavior, edit the `AppLauncherTool.tsx` file and change the props passed to `<AppLauncher>`.

## Integration

### Adding to Storybook

The addon is already registered in `.storybook/manager.ts`:

```typescript
import "./addons/app-launcher/register";
```

### Styling (Optional)

CSS rules can be added to `style/theme.css` for custom styling:

```css
.app-launcher-wrapper {
  /* Custom styles */
}

.app-launcher-wrapper button {
  /* Button-specific styles */
}
```

## Troubleshooting

### AppLauncher doesn't appear
- Check browser console for warnings
- Ensure `wm-ui-components` package is installed and contains `AppLauncher`
- Verify Storybook toolbar has both button groups loaded
- Wait 3+ seconds for the component to initialize

### Popover not visible on click
- Check `style/theme.css` for popover z-index rules
- Ensure popover styling is not being hidden by overflow constraints
- Inspect the DOM to verify the popover wrapper exists

### Performance issues
- Check DevTools Performance tab for excessive re-renders
- Verify MutationObserver is disconnected after appending (check console warnings)
- Ensure no console errors are thrown during mounting

## Dependencies

- `react` — Component framework
- `react-dom/client` — For `createRoot` and portals
- `wm-ui-components` — Source of the `AppLauncher` component
- `storybook/manager-api` — For addon registration

## License

MIT (same as the main project)
