# Design Tokens Addon

## Overview
This addon provides a **generic, reusable Design Token system** for Storybook that works with any component.

## How It Works

### 1. JSON Structure (`/src/designTokens/wm-button.json`)
```json
{
  "btn": {
    "meta": {
      "mapping": {
        "selector": { "web": ".app-button,button,.btn" }
      }
    },
    "mapping": {
      "background": { "value": "{color.surface.@.value}", "type": "color", ... },
      "color": { "value": "{color.on-surface.@.value}", "type": "color", ... },
      ...
    },
    "appearances": {
      "filled": {
        "variantGroups": {
          "status": {
            "primary": { "background": { "value": "{color.primary.@.value}", ... } },
            "secondary": { ... }
          }
        }
      },
      "outlined": { ... }
    }
  }
}
```

### 2. Story Configuration (`button.stories.tsx`)
```typescript
import buttonTokensData from "../../../../designTokens/wm-button.json";
import { parseDesignTokens } from "../../../../../.storybook/addons/design-tokens/tokenParser";

const buttonTokenConfig = parseDesignTokens(buttonTokensData, "btn");

export const DesignToken: Story = {
  render: (args) => {
    const { className } = args;
    return <ButtonDefaultExport className={className} {...other} />;
  },
  args: {
    className: "btn-filled btn-primary"
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenConfig: buttonTokenConfig
    }
  }
};
```

### 3. Token Flow
1. User opens DesignToken story → sees 3 buttons (basic, with icon, with badge)
2. Design Tokens tab appears in panel below
3. Panel reads `className` from Controls tab (e.g., "btn-filled btn-primary")
4. Parser extracts variant tokens: base + filled + primary
5. Panel displays tokens with default values from JSON
6. User changes a token (e.g., background color → red)
7. Panel generates CSS dynamically and injects into iframe
8. All buttons update instantly

### 4. CSS Generation
The panel automatically generates CSS like:
```css
button.btn-filled.btn-primary {
  background-color: var(--wm-btn-background) !important;
  color: var(--wm-btn-color) !important;
  padding: var(--wm-btn-padding) !important;
  ...
}
```

## Adding New Components

To add design tokens for a new component (e.g., anchor):

1. **Create JSON** (`/src/designTokens/wm-anchor.json`):
```json
{
  "anchor": {
    "meta": { "mapping": { "selector": { "web": ".app-anchor,a" } } },
    "mapping": { /* base tokens */ },
    "appearances": { /* variants */ }
  }
}
```

2. **Add to Story** (`anchor.stories.tsx`):
```typescript
import anchorTokensData from "../../../../designTokens/wm-anchor.json";
import { parseDesignTokens } from "../../../../../.storybook/addons/design-tokens/tokenParser";

const anchorTokenConfig = parseDesignTokens(anchorTokensData, "anchor");

export const DesignToken: Story = {
  render: (args) => <AnchorComponent className={args.className} />,
  args: { className: "anchor-primary" },
  parameters: {
    designTokens: {
      enabled: true,
      tokenConfig: anchorTokenConfig
    }
  }
};
```

3. **Done!** The Design Tokens tab will automatically work.

## File Structure
```
.storybook/addons/design-tokens/
├── types.ts              - TypeScript type definitions
├── tokenParser.ts        - JSON parser (hierarchical → flat tokens)
├── DesignTokenPanel.tsx  - UI component (panel in Storybook)
├── register.tsx          - Addon registration with Storybook
├── preset.ts             - Storybook preset configuration
└── README.md             - This file
```

## Key Features
✅ **Generic**: Works for any component (button, input, anchor, etc.)
✅ **Variant-Aware**: Shows different tokens for different className variants
✅ **Real-Time**: Changes apply immediately without page reload
✅ **Smart Controls**: Color pickers, dropdowns, text inputs based on token type
✅ **Foundation CSS Compatible**: Works with existing @wavemaker foundation styles
✅ **Reset**: Restore default values from JSON anytime
✅ **Reactive**: Automatically updates when className changes in Controls tab

## Token Types
- **Colors**: Background, text, border → Color picker + text input
- **Typography**: Font size, weight, family → Text input
- **Spacing**: Padding, margin, gap → Text input (supports px, rem, em)
- **Border**: Width, style, radius → Text/select inputs
- **States**: Hover, focus, active, disabled → Separate token groups
- **Effects**: Shadow, cursor, opacity → Various controls

## Architecture Benefits
1. **No Manual CSS Files**: CSS is generated dynamically from JSON
2. **Single Source of Truth**: All design decisions in JSON
3. **Type-Safe**: Full TypeScript support
4. **Scalable**: Add unlimited components without code changes
5. **Designer-Friendly**: Designers can edit JSON without touching code
