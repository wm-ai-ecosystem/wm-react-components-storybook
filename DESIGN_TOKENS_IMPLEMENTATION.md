# Design Tokens Implementation - Complete Guide

## 🎯 Overview
A **generic, fully-automated Design Token system** for Storybook that works with ANY component by just providing a JSON file.

---

## 📁 File Structure

```
/src/designTokens/
└── wm-button.json          # Design token definitions for button component

/src/storybook/stories/wm-basic/wm-button/
└── button.stories.tsx      # Updated with DesignToken story

/.storybook/
├── main.ts                 # Added design-tokens addon
├── addons/design-tokens/
    ├── types.ts            # TypeScript type definitions
    ├── tokenParser.ts      # JSON parser (400+ lines, heavily commented)
    ├── DesignTokenPanel.tsx  # UI component (500+ lines, heavily commented)
    ├── register.tsx        # Addon registration
    ├── preset.ts           # Storybook preset
    └── README.md           # Technical documentation
```

---

## 🚀 How It Works

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
      // BASE TOKENS - Apply to all buttons
      "background": {
        "value": "{color.surface.@.value}",
        "type": "color",
        "attributes": {
          "subtype": "color",
          "description": "Sets the background color..."
        }
      },
      "color": { ... },
      "font-size": { ... },
      ...
    },
    "appearances": {
      "filled": {
        "variantGroups": {
          "status": {
            // VARIANT TOKENS - Override base for specific variants
            "primary": {
              "background": { "value": "{color.primary.@.value}", ... },
              "color": { "value": "{color.on-primary.@.value}", ... }
            },
            "secondary": { ... },
            "tertiary": { ... }
          }
        }
      },
      "outlined": { ... },
      "text": { ... },
      "transparent": { ... }
    }
  }
}
```

### 2. Story Configuration (`button.stories.tsx`)

```typescript
// Import design tokens from centralized location
import buttonTokensData from "../../../../designTokens/wm-button.json";
import { parseDesignTokens } from "../../../../../.storybook/addons/design-tokens/tokenParser";

// Parse tokens once (converts hierarchical JSON → flat token list)
const buttonTokenConfig = parseDesignTokens(buttonTokensData, "btn");

// Create DesignToken story
export const DesignToken: Story = {
  render: (args) => {
    const { className } = args;  // Read from Controls tab

    return (
      <Box>
        {/* Basic Button */}
        <ButtonDefaultExport
          name="designTokenButton"
          caption="Button"
          className={className}  // Apply className from Controls
          listener={mockListener}
          data-design-token-target="true"  // CRITICAL: Scopes token changes to this story only
        />

        {/* Button with Icon */}
        <ButtonDefaultExport
          name="designTokenButtonIcon"
          caption="Button with Icon"
          className={className}
          iconclass="fa fa-star"
          iconposition="left"
          listener={mockListener}
          data-design-token-target="true"  // CRITICAL: Scopes token changes to this story only
        />

        {/* Button with Badge */}
        <ButtonDefaultExport
          name="designTokenButtonBadge"
          caption="Notifications"
          className={className}
          iconclass="fa fa-bell"
          badgevalue="5"
          listener={mockListener}
          data-design-token-target="true"  // CRITICAL: Scopes token changes to this story only
        />
      </Box>
    );
  },

  args: {
    className: "btn-filled btn-primary"  // Default variant
  },

  argTypes: {
    className: {
      control: { type: "select" },
      options: [
        "btn-filled btn-primary",
        "btn-filled btn-secondary",
        "btn-outlined btn-primary",
        ...
      ]
    }
  },

  parameters: {
    designTokens: {
      enabled: true,              // Show Design Tokens tab
      tokenConfig: buttonTokenConfig  // Parsed token configuration
    }
  }
};
```

### 3. Token Flow (When User Interacts)

```
1. USER ACTION: Opens "DesignToken" story
   ↓
2. STORYBOOK: Renders 3 buttons (basic, icon, badge) with className="btn-filled btn-primary"
   ↓
3. PANEL: Reads parameters.designTokens.enabled = true
   ↓
4. PANEL: Shows "Design Tokens" tab in bottom panel
   ↓
5. PARSER: Extracts tokens for "btn-filled btn-primary":
   - Base tokens from btn.mapping
   - Filled appearance tokens from btn.appearances.filled.mapping
   - Primary variant tokens from btn.appearances.filled.variantGroups.status.primary
   - Merges: base + appearance + variant (variant overrides base)
   ↓
6. PANEL: Displays tokens grouped by category with default values from JSON
   ↓
7. USER ACTION: Changes background color from #1976d2 to #ff0000
   ↓
8. PANEL: Updates state and calls applyTokens()
   ↓
9. CSS GENERATOR: Creates scoped CSS rules:
   ```css
   button[data-design-token-target="true"].btn-filled.btn-primary {
     background-color: var(--wm-btn-background) !important;  /* #ff0000 */
     color: var(--wm-btn-color) !important;
     padding: var(--wm-btn-padding) !important;
     ...
   }
   ```
   ↓
10. INJECTOR: Injects <style> tag into iframe's <head>
    ↓
11. BROWSER: ONLY buttons in DesignToken story update to red background!
    ↓
12. SCOPING: Buttons in other stories are NOT affected (no data-design-token-target attribute)
    ↓
13. USER ACTION: Changes className to "btn-outlined btn-secondary" in Controls tab
    ↓
14. PANEL: Detects argsUpdated event, re-parses tokens for new variant
    ↓
15. REPEAT: Steps 6-12 with new variant tokens
```

---

## 🎨 Key Features

### ✅ Generic System
- Works for **ANY component** (button, input, anchor, etc.)
- Just provide JSON file following the structure
- Zero code changes needed for new components

### ✅ Variant-Aware
- Automatically shows tokens for selected className
- Merges base + appearance + variant tokens
- Variant tokens override base tokens

### ✅ Real-Time Updates
- Changes apply instantly without page reload
- CSS generated dynamically from token values
- Uses CSS variables + !important to override foundation.css

### ✅ Story-Scoped Changes
- Token changes ONLY affect the DesignToken story, not other stories
- Uses `data-design-token-target="true"` attribute to scope CSS selectors
- Prevents unintended style bleeding across stories
- Each component can have its own DesignToken story with isolated token changes

### ✅ Smart Controls
- **Color tokens** → Color picker + text input
- **Font/spacing tokens** → Text input (supports px, rem, em)
- **Enum tokens** (text-transform, border-style) → Dropdown
- **Opacity tokens** → Number input (0-1)

### ✅ Foundation CSS Compatible
- Respects existing `@wavemaker/app-runtime-wm-build/wmapp/styles/foundation/foundation.css`
- Overrides styles using higher specificity and !important
- Works alongside foundation styles

### ✅ Developer-Friendly
- Comprehensive inline comments (1000+ lines of documentation)
- TypeScript type safety throughout
- Clear separation of concerns (parser, panel, types)

---

## 📖 Usage Instructions

### For Users (Testing the System):

1. **Start Storybook**:
   ```bash
   npm run storybook
   ```

2. **Navigate to Story**:
   - Sidebar: **Basic > Button > DesignToken**

3. **Interact with Design Tokens**:
   - Open **Controls** tab → Change `className` dropdown
   - Open **Design Tokens** tab → See variant-specific tokens
   - Modify any token (e.g., background color → red)
   - Watch buttons update in real-time!
   - Click **Reset to Defaults** to restore

### For Developers (Adding New Components):

1. **Create JSON file** (`/src/designTokens/wm-anchor.json`):
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
     render: (args) => (
       <AnchorComponent
         className={args.className}
         data-design-token-target="true"  // CRITICAL: Required for scoping
       />
     ),
     args: { className: "anchor-primary" },
     parameters: {
       designTokens: {
         enabled: true,
         tokenConfig: anchorTokenConfig
       }
     }
   };
   ```

3. **Done!** Design Tokens tab will automatically work.

**IMPORTANT:** Always add `data-design-token-target="true"` to ALL component instances in your DesignToken story. This ensures token changes only affect that story and don't leak to other stories.

---

## 🔧 Technical Details

### Token Name Convention
- Format: `--wm-{component}-{property}`
- Examples:
  - `--wm-btn-background`
  - `--wm-btn-color`
  - `--wm-btn-border-color`
  - `--wm-btn-padding`
  - `--wm-btn-states-hover-state-layer-opacity`

### CSS Generation Strategy
- Uses data attribute selector for story scoping: `button[data-design-token-target="true"]`
- Uses higher specificity with multiple classes: `.btn-filled.btn-primary`
- Combined selector example: `button[data-design-token-target="true"].btn-filled.btn-primary`
- Uses `!important` to override foundation.css
- Generates separate rules for `:hover`, `:focus`, `:active`, `:disabled`
- Injects `<style id="design-tokens-{component}">` into iframe
- Scoping ensures token changes only affect DesignToken story, not other stories

### Token Reference Resolution
- `{color.primary.@.value}` → `#1976d2`
- `{space.6.value}` → `24px`
- `{label.large.font-size.value}` → `14px`
- Mappings defined in tokenParser.ts

---

## 📝 Comments & Documentation

Every file includes comprehensive inline comments explaining:
- **What** the code does
- **Why** design decisions were made
- **How** the system works
- **Examples** of usage

Total documentation: 1000+ lines of comments across all files.

---

## 🎉 Summary

You now have a **production-ready, generic Design Token system** that:
- Works with the existing button component ✅
- Shows 3 button variations (basic, icon, badge) ✅
- Has a dedicated "Design Tokens" tab in the panel ✅
- Reads tokens from `/src/designTokens/wm-button.json` ✅
- Shows default values based on className (btn-filled btn-primary, etc.) ✅
- Updates in real-time when tokens are modified ✅
- Updates automatically when className changes in Controls tab ✅
- Respects foundation.css styles ✅
- Is fully generic for future components ✅
- Has comprehensive comments and documentation ✅

**Next Step**: Refresh your browser at `http://localhost:6006` and navigate to **Basic > Button > DesignToken** to see it in action!
