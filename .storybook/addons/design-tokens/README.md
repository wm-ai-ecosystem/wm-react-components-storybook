# Design Tokens Addon

A **fully generic, dynamic Design Token system** for Storybook that works with ANY component automatically. Features:
- 🎨 **Clean white tooltips** with hover-based help icons
- 🏷️ **Smart label generation** from CSS variable names (e.g., `border.color` from `--wm-btn-border-color`)
- 📂 **Simplified categories** - Color, Text, Size, Style (type-based categorization)
- 🔍 **Variable name tooltips** - Hover labels to see CSS variable names
- 🎯 **No hardcoded mappings** - fully dynamic token resolution

---

## Quick Start

### 1. Create JSON (`/src/designTokens/wm-button.json`)
```json
{
  "btn": {
    "meta": {
      "mapping": {
        "selector": { "web": ".app-button,button,.btn" }
      }
    },
    "mapping": {
      "background": {
        "value": "{color.primary.@.value}",
        "type": "color",
        "attributes": {
          "subtype": "color",
          "description": "Button background color"
        }
      }
    },
    "appearances": {
      "filled": {
        "variantGroups": {
          "status": {
            "primary": {
              "background": { "value": "{color.primary.@.value}", ... }
            }
          }
        }
      }
    }
  }
}
```

### 2. Configure Story (`button.stories.tsx`)
```typescript
import buttonTokensData from "../../../../designTokens/wm-button.json";

export const Filled: Story = {
  render: (args) => <ButtonDefaultExport className={args.className} />,
  args: {
    className: "btn-filled btn-primary"
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: buttonTokensData,           // Pass raw JSON
      componentKey: "btn",                    // Component identifier
      extractCSSVariablesAtRuntime: true,    // Extract from foundation.css
    }
  }
};
```

### 3. Done!
Open story → **Controls tab is default** → Click Design Tokens tab → **Hover labels** to see help icon → Click help icon for CSS variable name → Modify tokens → See instant changes ✅

---

## How It Works

### Dynamic Token Resolution + Runtime CSS Extraction Flow

```
Story loads with extractCSSVariablesAtRuntime: true
  ↓
Controls tab is shown by default (no performance impact)
  ↓
User clicks Design Tokens tab (panel becomes active)
  ↓
extractCSSVariables() runs (ONLY when panel is active)
  ↓
Reads iframe's foundation.css :root styles
  ↓
Extracts all --wm-* CSS variables (1306+ variables)
  ↓
Token reference detected: "{color.primary.@.value}"
  ↓
tokenReferenceToCSSVariable() dynamically converts it to "--wm-color-primary"
  ↓
Looks up "--wm-color-primary" in extracted CSS variables → "rgb(255, 114, 80)"
  ↓
parseDesignTokens() resolves ALL references dynamically (no hardcoded mappings!)
  ↓
Label generation: --wm-btn-border-color → "border.color" (extracted from CSS variable name)
  ↓
Categorization: token.type → "color" → "Color" category (simplified 4-category system)
  ↓
Design Tokens panel displays with clean labels and organized categories
  ↓
Polling monitors className changes every 300ms (when panel is active)
  ↓
User hovers label → Help icon appears → Click for tooltip with CSS variable name
  ↓
User changes className in Controls → Detected by polling → Tokens refresh automatically
  ↓
User changes token → CSS regenerated → Injected into iframe → Instant update
  ↓
User switches story → Previous tokens cleared → Clean slate for new story
```

### Example

**foundation.css:**
```css
:root {
  --wm-color-primary: #FF7250;
  --wm-opacity-hover: 8%;
}
```

**wm-button.json:**
```json
{
  "background": {
    "value": "{color.primary.@.value}"  // ← Reference
  },
  "states": {
    "hover": {
      "opacity": {
        "value": "{opacity.hover.value}"  // ← Reference
      }
    }
  }
}
```

**After extraction:**
- `{color.primary.@.value}` → `"rgb(255, 114, 80)"` (computed from foundation.css)
- `{opacity.hover.value}` → `"8%"` (from foundation.css)

**Label generation from CSS variables:**
- `--wm-btn-background` → `"background"`
- `--wm-btn-border-color` → `"border.color"`
- `--wm-btn-states-disabled-background` → `"disabled.background"` (states prefix removed)
- `--wm-btn-states-hover-state-layer-opacity` → `"hover.state.layer.opacity"`

**Displayed in panel (organized by type-based categories):**
- **Color** category: background: rgb(255, 114, 80) [color picker]
- **Style** category: hover.state.layer.opacity: 0.08 [number input] (auto-converted from 8%)
- Hover any label → See help icon (?) → Click for tooltip showing "Variable name: --wm-btn-background"

---

## Label Generation & Categorization

### Smart Label Extraction from CSS Variables

Labels are automatically extracted from CSS variable names, making them intuitive and directly related to the CSS:

**Conversion Rules:**
1. Remove component prefix (e.g., `--wm-btn-`)
2. Remove "states-" prefix if present
3. Convert hyphens to dots for nested properties

**Examples:**
```
--wm-btn-background → "background"
--wm-btn-border-color → "border.color"
--wm-btn-border-width → "border.width"
--wm-btn-states-disabled-background → "disabled.background"
--wm-btn-states-hover-state-layer-opacity → "hover.state.layer.opacity"
--wm-editor-blockquote-color-reset-background → "blockquote.color.reset.background"
```

### Type-Based Categorization

Tokens are organized into 4 simple categories based on their `type` field:

| Token Type | Category Name | Example Tokens |
|------------|---------------|----------------|
| `color` | **Color** | background, color, border-color |
| `font` | **Text** | font-size, font-weight, font-family |
| `space` | **Size** | padding, margin, gap, width, height |
| `others` | **Style** | opacity, border-radius, box-shadow |

**Benefits:**
- Simpler organization (4 categories instead of 14)
- Consistent across all components
- Easy to find tokens by their purpose

### Hover-Based Help Icons & Tooltips

**Help Icon Behavior:**
- Hidden by default to reduce visual clutter
- Appears (fades in) when hovering over any label
- Click to show tooltip with detailed information

**Tooltip Content:**
- **Variable name:** Displays the CSS variable (e.g., `--wm-btn-background`)
- **Description:** Shows the token description if available
- **White theme:** Clean white background (#fff) with black text (#000)
- **Smart positioning:** Automatically positions above/below based on available space
- **Portal rendering:** Renders at document.body level to escape overflow constraints

**Example:**
```
Hover "background" label → Help icon (?) appears
Click help icon → Tooltip shows:
  ┌─────────────────────────────────────────┐
  │ Variable name: --wm-btn-background      │
  │ Sets the background color of the button │
  └─────────────────────────────────────────┘
```

---

## Key Features

### UI/UX Features
✅ **Smart label generation** - Labels extracted from CSS variable names (e.g., `border.color` from `--wm-btn-border-color`)
✅ **Simplified categories** - Only 4 categories based on token type: Color, Text, Size, Style
✅ **Hover-based help icons** - Help icons (?) only appear when hovering over labels
✅ **Clean white tooltips** - White background (#fff) with black text for better readability
✅ **Variable name display** - Tooltips show "Variable name: --wm-btn-background" as prefix
✅ **Text wrapping** - Long labels wrap properly with word-break support
✅ **Portal-based tooltips** - Tooltips render at document.body level to escape overflow constraints
✅ **No state badges** - Clean UI without redundant DISABLED/HOVER/FOCUS badges

### Core Features
✅ **Generic className parsing** - Automatically works with ANY component className pattern (button, label, pagination, etc.)
✅ **Type prop support (propToVariantMap)** - Works with components using type/variant props instead of className (message, progress-bar, accordion, etc.)
✅ **Dynamic selector lookup** - Reads selectors from JSON and matches variants automatically
✅ **Automatic wrapper detection** - Intelligently handles components that can't spread attributes
✅ **Dynamic token resolution** - Automatically converts ANY token reference to CSS variable name
✅ **Runtime extraction** - Reads actual values from foundation.css (no hardcoding)
✅ **Zero manual mapping** - Works with ALL foundation CSS variables automatically
✅ **Fully generic** - Works for ANY component with ANY JSON structure
✅ **Multiple JSON structures** - Supports appearances at root/meta, with/without variantGroups
✅ **Variant-aware** - Different tokens for different className/type variants
✅ **Real-time updates** - Changes apply instantly without reload
✅ **Smart controls** - Color pickers, dropdowns, number inputs based on token type
✅ **Automatic conversion** - Handles percentages (8% ↔ 0.08) for opacity values
✅ **Fallback support** - Uses hardcoded values if extraction fails
✅ **Reset button** - Restore default values anytime
✅ **Default Controls tab** - No performance impact on story load, CSS extraction only when panel active
✅ **Polling-based detection** - Reliably detects className/type changes (300ms polling when active)
✅ **Story isolation** - Automatic cleanup when switching stories prevents glitches
✅ **Icon size support** - Works with .app-icon, Font Awesome, and all icon classes automatically
✅ **Performance optimized** - Reduced delays (50-100ms) and minimal re-renders

---

## Adding New Components

The Design Token system supports two types of components based on how they handle styling:

### Standard Components (with className prop)

To add design tokens for components that accept a className prop and can spread `data-design-token-target` attribute (anchor, button, label, checkbox, etc.):

### 1. Create JSON file
```json
// /src/designTokens/components/anchor/anchor.json
{
  "anchor": {
    "meta": {
      "mapping": {
        "selector": { "web": ".app-anchor,a" }
      }
    },
    "mapping": {
      "color": {
        "value": "{color.primary.@.value}",
        "type": "color",
        "attributes": {
          "subtype": "color",
          "description": "Link text color"
        }
      },
      "font-size": {
        "value": "{h6.font-size.value}",  // ← Can reference ANY foundation token!
        "type": "font",
        "attributes": {
          "subtype": "font-size",
          "description": "Link font size"
        }
      }
    },
    "appearances": {
      "default": {
        "variantGroups": {
          "status": {
            "primary": { "color": { "value": "{color.primary.@.value}", ... } },
            "secondary": { "color": { "value": "{color.secondary.@.value}", ... } }
          }
        }
      }
    }
  }
}
```

**Supported JSON Structures:**
- **With variantGroups** (like buttons): `appearances.filled.variantGroups.status.primary`
- **Without variantGroups** (like pagination): `meta.appearances.basic.mapping`
- **No appearances** (like tabs): Just base `mapping` tokens

### 2. Add to story
```typescript
import anchorTokensData from "../../../../designTokens/components/anchor/anchor.json";

export const DesignToken: Story = {
  render: (args) => (
    <AnchorComponent
      className={args.className}
      data-design-token-target="true"  // REQUIRED for scoping
    />
  ),
  args: { className: "anchor-primary" },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: anchorTokensData,
      componentKey: "anchor",
      extractCSSVariablesAtRuntime: true,
    }
  }
};
```

### 3. Done! ✅

**That's it!** No manual mapping needed. The system:
- Automatically converts `{any.token.reference.value}` to `--wm-any-token-reference`
- Looks it up in foundation.css at runtime
- Works with ALL foundation CSS variables automatically
- Supports ANY JSON structure variation

**Can use ANY foundation token:**
- `{h6.font-size.value}` → `--wm-h6-font-size`
- `{border.style.base.value}` → `--wm-border-style-base`
- `{elevation.shadow-3.value}` → `--wm-elevation-shadow-3`
- `{any.new.token.value}` → `--wm-any-new-token` (works automatically!)

---

### Components with Type Prop (without className)

Some components use a `type` or similar prop that internally maps to specific CSS classes, rather than accepting a `className` prop directly. Examples include:
- **Message**: `type="success"` → CSS class `"alert-success"`
- **Progress Bar**: `type="success"` → CSS class `"progress-bar-success"`
- **Accordion**: `type="primary"` → CSS class `"panel-primary"`

For these components, use the **propToVariantMap** configuration to map prop values to CSS class names.

### 1. JSON file structure remains the same

```json
// /src/designTokens/components/message/message.json
{
  "message": {
    "meta": {
      "mapping": {
        "selector": { "web": ".app-message" }
      },
      "appearances": {
        "filled": {
          "mapping": {
            "selector": { "web": ".app-message" }
          },
          "variantGroups": {
            "status": {
              "success": {
                "selector": { "web": ".alert-success" }  // CSS class
              },
              "danger": {
                "selector": { "web": ".alert-danger" }
              },
              "warning": {
                "selector": { "web": ".alert-warning" }
              }
            }
          }
        }
      }
    },
    "mapping": {
      "background": {
        "value": "{color.surface.@.value}",
        "type": "color",
        "attributes": {
          "subtype": "color",
          "description": "Message background color"
        }
      }
    },
    "appearances": {
      "filled": {
        "variantGroups": {
          "status": {
            "success": {
              "container": {
                "background": { "value": "{color.success.@.value}", ... }
              }
            },
            "danger": {
              "container": {
                "background": { "value": "{color.danger.@.value}", ... }
              }
            }
          }
        }
      }
    }
  }
}
```

**Key Point**: The `meta.appearances.{appearance}.variantGroups.{group}.{variant}.selector.web` must match the CSS class name that the component renders in the DOM.

### 2. Configure Story with propToVariantMap

```typescript
import messageTokensData from "../../../../designTokens/components/message/message.json";

export const DesignToken: Story = {
  render: (args) => {
    // Message component can't spread data-design-token-target, so we apply it to a wrapper
    const { "data-design-token-target": dataAttr, ...componentArgs } = args as any;

    return (
      <Box style={{ padding: 16 }} data-design-token-target={dataAttr}>
        <MessageComponent {...componentArgs} listener={mockListener} />
      </Box>
    );
  },
  args: {
    name: "designTokenMessage",
    listener: mockListener,
    caption: "Operation completed successfully!",
    type: "success",  // This is the prop we're watching
    "data-design-token-target": true,  // Applied to wrapper
  },
  argTypes: {
    caption: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info", "loading"],
    }
  },
  parameters: {
    designTokens: {
      enabled: true,
      tokenData: messageTokensData,  // Pass raw JSON data
      componentKey: "message",  // Component identifier
      extractCSSVariablesAtRuntime: true,
      // NEW: Map the "type" prop to CSS class names
      propToVariantMap: {
        propName: "type",  // Watch the "type" prop instead of className
        mapping: {
          success: "alert-success",   // Prop value → CSS class (NOT variant key!)
          error: "alert-danger",
          warning: "alert-warning",
          info: "alert-info",
          loading: "alert-loading"
        }
      }
    },
    layout: 'fullscreen',
  },
};
```

### 3. How It Works

```
User changes type="warning" in Controls tab
  ↓
propToVariantMap maps "warning" → CSS class "alert-warning"
  ↓
Parser reads JSON: meta.appearances.filled.variantGroups.status.warning.selector.web = ".alert-warning"
  ↓
Parser matches ".alert-warning" to find variant key "filled-warning"
  ↓
Tokens load for "filled-warning" variant from appearances
  ↓
CSS generates: [data-design-token-target="true"] .app-message.alert-warning { ... }
  ↓
Tokens update in real-time! ✅
```

### 4. Important Notes

**Wrapper Pattern**:
- Components that can't spread `data-design-token-target` need a wrapper element
- The wrapper (usually a Box) gets the `data-design-token-target` attribute
- CSS targets child elements: `[data-design-token-target="true"] .app-message`

**CSS Class vs Variant Key**:
- Mapping must use **CSS class names** (what's in the DOM), NOT variant keys
- Example: `success: "alert-success"` ✅ (CSS class in DOM)
- Example: `success: "filled-success"` ❌ (variant key from JSON)

**Automatic Variant Detection**:
- System automatically detects wrapper pattern when `propToVariantMap` is present
- No manual configuration needed for wrapper behavior

### 5. Compatible Components

This approach works with ANY component that follows the pattern `type/variant prop → CSS class`. No code changes needed, just configure your story:

✅ **Message** (`type="success"` → `.alert-success`)
✅ **Progress Bar** (`type="success"` → `.progress-bar-success`)
✅ **Progress Circle** (`type="success"` → similar pattern)
✅ **Accordion** (`type="primary"` → `.panel-primary`)
✅ **Any future component** following the same pattern

### 6. Done! ✅

The system now:
- Watches the specified prop (e.g., `type`) instead of `className`
- Maps prop values to CSS class names dynamically
- Looks up variant keys from JSON selectors automatically
- Updates tokens in real-time when prop changes
- Works with ANY component following this pattern

---

## File Structure

```
.storybook/addons/design-tokens/
├── DesignTokenPanel.tsx      # Main UI component (panel in Storybook)
├── tokenParser.ts             # Parses JSON, resolves token references
├── cssVariableExtractor.ts    # Extracts CSS variables from foundation.css at runtime
├── types.ts                   # TypeScript type definitions
├── register.tsx               # Addon registration with Storybook
├── preset.ts                  # Storybook preset configuration
└── README.md                  # This file
```

---

## Token Types & Controls

| Type | Example | Control |
|------|---------|---------|
| **Color** | `background`, `color`, `border-color` | Color picker + text input |
| **Font** | `font-size`, `font-weight`, `font-family` | Text input |
| **Space** | `padding`, `margin`, `gap` | Text input (px, rem, em) |
| **Radius** | `border-radius`, `radius` | Text input |
| **Border** | `border-width`, `border-style` | Text / select input |
| **Opacity** | `opacity`, `state-layer-opacity` | Number input (0-1) |
| **Select** | `text-transform`, `cursor` | Dropdown |
| **Shadow** | `box-shadow`, `shadow` | Text input |

---

## FAQ & Troubleshooting

### Q: When are CSS variables picked from foundation.css?

**A:** At **runtime** when:
1. Story loads with `extractCSSVariablesAtRuntime: true`
2. Iframe becomes ready
3. CSS extraction runs and caches results

**Important:**
- Extraction happens ONCE per story load (cached)
- Values are computed values (e.g., `"rgb(255, 114, 80)"` not `"#FF7250"`)
- Cache clears when story changes

### Q: Why do we still need hardcoded fallback values?

**A:** The `resolveTokenValue()` function in tokenParser.ts is a **fallback** for:
- Runtime extraction disabled
- Iframe not accessible or CORS issues
- Development without foundation.css
- Backward compatibility

**Priority:**
```typescript
if (cssVariableMap && cssVariableMap.size > 0) {
  // ✅ PREFERRED: Use runtime extraction
  value = resolveTokenValueRuntime(value, cssVariableMap);
} else {
  // ⚠️ FALLBACK: Use hardcoded values
  value = resolveTokenValue(value);
}
```

### Q: Why aren't state tokens showing?

**A:** They are! Check the **"States"** section (scroll down in panel). You should see:
- Hover opacity: 0.08
- Focus opacity: 0.12
- Active opacity: 0.16
- Disabled state tokens

If empty, check console for extraction errors.

### Q: Why do opacity values show as decimals (0.08) not percentages (8%)?

**A:** Automatic conversion!
- foundation.css uses: `8%` (percentage)
- Number input expects: `0.08` (decimal between 0-1)
- System converts: `8%` ↔ `0.08` automatically

### Q: Tokens not refreshing when I change className in Controls tab?

**A:** The system uses **polling** to detect className changes reliably:
1. Change className in Controls tab → UI updates visually
2. If Design Tokens tab is active → Tokens refresh within 300ms automatically
3. If Design Tokens tab is inactive → Tokens refresh when you switch to the tab
4. Polling only runs when the panel is active (no performance impact on Controls tab)

**Why polling?** Storybook's `argsUpdated` event is unreliable. Polling every 300ms ensures className changes are always detected.

### Q: Token changes not applying?

**Check:**
1. **data-design-token-target** - Components must have this attribute
2. **tokenData + componentKey** - Both must be provided in parameters
3. **Panel is active** - CSS extraction and polling only run when Design Tokens tab is active
4. **Iframe ready** - Extraction waits up to 6 retries with 100ms intervals
5. **Browser DevTools** - Check for CSS in iframe's `<style id="design-tokens-{component}">`

### Q: Values not matching foundation.css?

**Check:**
1. **Panel is active** - CSS extraction only runs when Design Tokens panel is active
2. **Fallback values** - If using fallback, values in tokenParser.ts must match foundation.css
3. **Token reference conversion** - Verify tokenReferenceToCSSVariable() converts correctly
4. **CSS variable exists** - Check foundation.css has the expected `--wm-*` variable
5. **Cache cleared** - Cache is automatically cleared when switching stories

### Q: Can I use custom/new foundation tokens?

**A:** YES! The system works with ALL foundation CSS variables automatically:
```json
{
  "custom-property": {
    "value": "{my.new.custom.token.value}"
  }
}
```
Will automatically:
1. Convert to `--wm-my-new-custom-token`
2. Look it up in foundation.css
3. Use the value if found

No code changes needed!

---

## State Tokens Deep Dive

State tokens control visual feedback for user interactions (hover, focus, active, disabled).

### JSON Structure
```json
{
  "mapping": {
    "state": {
      "layer": {
        "color": "{color.on-surface.@.value}",    // Base overlay color
        "opacity": "0"                             // Base opacity (invisible)
      }
    },
    "states": {
      "hover": {
        "state": {
          "layer": {
            "opacity": "{opacity.hover.value}"     // 8% when hovering
          }
        }
      },
      "focus": {
        "state": {
          "layer": {
            "opacity": "{opacity.focus.value}"     // 12% when focused
          }
        }
      },
      "active": {
        "state": {
          "layer": {
            "opacity": "{opacity.active.value}"    // 16% when clicked
          }
        }
      }
    }
  }
}
```

### Generated CSS Variables
```css
--wm-btn-state-layer-color: rgb(29, 27, 32);
--wm-btn-state-layer-opacity: 0;
--wm-btn-states-hover-state-layer-opacity: 8%;
--wm-btn-states-focus-state-layer-opacity: 12%;
--wm-btn-states-active-state-layer-opacity: 16%;
```

### Generated CSS Output
```css
/* Base button with overlay positioning */
button[data-design-token-target="true"] {
  position: relative;
  overflow: hidden;
}

/* Hover overlay */
button[data-design-token-target="true"]:hover:not(:disabled)::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgb(29, 27, 32);
  opacity: 8%;
  pointer-events: none;
}

/* Focus and active overlays similar */
```

---

## Token Naming Convention

### CSS Variable Names (Component-specific)
Pattern: `--wm-{componentKey}-{path}-{property}`

Examples:
```
JSON: btn → mapping → background
CSS:  --wm-btn-background
Label: "background"

JSON: btn → mapping → border → color
CSS:  --wm-btn-border-color
Label: "border.color"

JSON: btn → mapping → states → hover → state → layer → opacity
CSS:  --wm-btn-states-hover-state-layer-opacity
Label: "hover.state.layer.opacity" (states prefix removed)
```

**Label Generation Logic:**
- Extracts from CSS variable name (not JSON path)
- Removes component prefix (`--wm-btn-`)
- Removes "states-" prefix for cleaner labels
- Converts hyphens to dots for nested structure

### Token References (Dynamic Conversion)
**NO MANUAL MAPPING NEEDED!** The system automatically converts token references:

```typescript
// In JSON:
"value": "{color.primary.@.value}"
"value": "{h6.font-size.value}"
"value": "{border.style.base.value}"

// Automatically converted by tokenReferenceToCSSVariable():
"{color.primary.@.value}" → "--wm-color-primary"
"{h6.font-size.value}" → "--wm-h6-font-size"
"{border.style.base.value}" → "--wm-border-style-base"

// Then looked up in foundation.css:
"--wm-color-primary" → "rgb(255, 114, 80)"
"--wm-h6-font-size" → "14px"
"--wm-border-style-base" → "solid"
```

**Conversion Rules:**
1. Remove curly braces `{ }`
2. Remove `.value` suffix
3. Replace `@` placeholder with empty string
4. Replace dots `.` with hyphens `-`
5. Add `--wm-` prefix

**Works with ANY foundation token automatically!**

---

## Architecture Benefits

### Technical Benefits
1. **Zero manual mapping** - Token references converted dynamically, no hardcoded maps
2. **Fully generic** - Works with ANY component and ANY JSON structure automatically
3. **Future-proof** - New foundation CSS variables work without code changes
4. **No manual CSS files** - CSS generated dynamically from JSON
5. **Single source of truth** - All design decisions in JSON
6. **Type-safe** - Full TypeScript support
7. **Scalable** - Add unlimited components without code changes
8. **Runtime sync** - Always uses actual foundation.css values
9. **Graceful fallback** - Works even if extraction fails
10. **Multiple structure support** - Handles variantGroups, meta.appearances, or no appearances

### UI/UX Benefits
1. **Intuitive labels** - Extracted from CSS variables, directly reflect CSS structure
2. **Simplified organization** - 4 categories instead of 14, easier navigation
3. **Clean interface** - No redundant state badges, hover-based help icons
4. **Better readability** - White tooltips with proper contrast ratios
5. **Accessible help** - Always available on hover, never obtrusive
6. **Designer-friendly** - Clear labels match CSS mental model
7. **No clipping issues** - Portal-based tooltips work in any panel position
8. **Text wrapping** - Long nested properties display properly

---

## Testing

```bash
npm run storybook
```

1. Navigate to "Basic/Button" → "Filled"
2. Open "Design Tokens" tab (bottom or right panel)
3. See tokens organized in 4 categories:
   - **Color** (background, color, border.color)
   - **Text** (font.size, font.weight, font.family)
   - **Size** (padding, gap, height)
   - **Style** (border.radius, hover.state.layer.opacity, box.shadow)
4. **Hover over any label** → See help icon (?) appear
5. **Click help icon** → Tooltip shows "Variable name: --wm-btn-background"
6. Change "background" to #FF0000
7. Button instantly turns red ✅
8. Scroll to "Style" → Change "hover.state.layer.opacity" to 0.5
9. Hover button → See strong overlay ✅
10. Click "Reset to Defaults" → Restores original values ✅

**UI Features to Notice:**
- Clean white tooltips with black text
- Labels extracted from CSS variables (e.g., "border.color" not "Border Color")
- Help icons only appear on hover (reduced clutter)
- Long labels wrap properly (e.g., "blockquote.color.reset.background")
- Tooltips work correctly in both bottom and right-aligned panels

---

## Performance & Architecture

### Optimizations Applied:
- **Lazy CSS extraction**: Only runs when Design Tokens panel is active (prevents blocking Controls tab)
- **Polling mechanism**: Detects className changes every 300ms (only when panel active)
- **Reduced delays**: 50-100ms timeouts instead of 150-200ms for faster responsiveness
- **Story isolation**: Automatic cleanup on story switch prevents interference
- **Minimal re-renders**: Effects optimized with proper dependencies
- **Cache management**: CSS variables cached per story, cleared on story change

### Icon Size Handling:
The system automatically targets icons using default selectors:
```css
.app-icon, i[class*="fa-"], i[class*="wi-"], i[class*="icon-"]
```

When you change `--wm-btn-icon-size`, it applies:
```css
font-size: 32px !important;
width: 32px !important;
height: 32px !important;
min-width: 32px !important;
min-height: 32px !important;
display: inline-flex !important;
align-items: center !important;
justify-content: center !important;
```

This ensures icons resize properly regardless of icon library used.

### Story Switch Behavior:
When switching stories, the system:
1. Clears all token state (tokens, defaultTokens, cssVariableMap)
2. Removes injected `<style id="design-tokens-*">` tags from iframe
3. Resets all refs and parameters
4. Clears CSS variable cache
5. Ensures Controls tab is default (no performance impact)

This prevents glitches and ensures a clean slate for each story.

---

## All Components Supported

The system is **fully generic** and works with:
- ✅ wm-button.json (completed)
- ✅ Any component in `/src/designTokens/components/*/*.json`
- ✅ Components with className prop (button, anchor, label, checkbox, etc.)
- ✅ Components with type prop (message, progress-bar, accordion, etc.)
- ✅ tabs, pagination, radioset, progress-circle, fileupload, etc.
- ✅ Components with variantGroups (buttons)
- ✅ Components without variantGroups (pagination)
- ✅ Components with nested tokens (tabs)
- ✅ ANY future component

**Just create the JSON file and add to story - it works automatically!**

No code changes needed. No manual mapping required. **Zero configuration.**

### Component Categories

**Standard Components (className prop)**:
- Button, Anchor, Label, Checkbox, Radio, Cards, Chips, etc.
- Configuration: Standard story setup with `className` in args

**Type Prop Components (propToVariantMap)**:
- Message, Progress Bar, Progress Circle, Accordion, etc.
- Configuration: Use `propToVariantMap` with wrapper pattern
