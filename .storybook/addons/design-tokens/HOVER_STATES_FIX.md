# Hover State Fix for Design Tokens

## Problem: Why Button Hover State Colors Weren't Working

### The Issue

When changing `--wm-btn-states-hover-state-layer-opacity` in the Design Tokens panel, button hover effects weren't updating in real-time.

### Root Cause Analysis

#### 1. Foundation.css CSS Structure

Buttons use a **layered approach** with pseudo-elements for hover effects:

```css
/* Base state layer variables (foundation.css:801-802) */
.wm-app .app-button {
  --wm-btn-state-layer-color: var(--wm-color-on-surface);
  --wm-btn-state-layer-opacity: 0;  /* Initially invisible */
}

/* Hover state (foundation.css:804-810) */
.wm-app .app-button:hover,
.btn:hover::before {
  --wm-btn-state-layer-opacity: var(--wm-opacity-hover);  /* ← References global variable! */
}

/* The ::before pseudo-element overlay (foundation.css:1002-1014) */
.wm-app .btn:before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: var(--wm-btn-state-layer-opacity);  /* ← Uses the variable */
  background: var(--wm-btn-state-layer-color);
}
```

#### 2. Global Opacity Variables

Foundation.css defines global opacity values (line 236):

```css
:root {
  --wm-opacity-hover: 8%;
  --wm-opacity-focus: 12%;
  --wm-opacity-active: 16%;
}
```

#### 3. The Variable Chain

When a button is hovered:

1. `:hover` pseudo-class becomes active
2. Sets `--wm-btn-state-layer-opacity` = `var(--wm-opacity-hover)`
3. Looks up `--wm-opacity-hover` → finds `8%`
4. The `::before` pseudo-element uses this value for its opacity
5. Creates a semi-transparent overlay effect

#### 4. The Mismatch

**JSON generates:**
- Path: `states.hover.state.layer.opacity`
- Variable name: `--wm-btn-states-hover-state-layer-opacity`

**CSS expects:**
- Variable name: `--wm-opacity-hover` (global variable)

These are **different variable names**! Setting `--wm-btn-states-hover-state-layer-opacity` has no effect because CSS is looking for `--wm-opacity-hover`.

### Why Inline Styles Can Affect Pseudo-Classes

While you **cannot** style pseudo-classes like `:hover` directly with inline styles:

```html
<!-- ❌ This doesn't work -->
<button style="hover { color: red; }">Button</button>
```

You **CAN** set CSS variables inline that pseudo-classes will use:

```html
<!-- ✅ This works! -->
<button style="--wm-opacity-hover: 20%;">Button</button>
```

When the button is hovered:
1. The `:hover::before` selector runs
2. Sets `--wm-btn-state-layer-opacity: var(--wm-opacity-hover)`
3. Looks up `--wm-opacity-hover` from the element
4. Finds the inline value: `20%`
5. Uses it for the hover effect ✅

## The Solution

### Implementation

When applying design token values, we now detect state tokens and set **both**:

1. The component-specific variable (from JSON)
2. The global opacity variable (that CSS references)

```typescript
// When we detect a hover state token
if (varName.includes('-states-hover-state-layer-opacity')) {
  htmlElement.style.setProperty(varName, value);              // Original variable
  htmlElement.style.setProperty('--wm-opacity-hover', value); // Global variable ✅
}
```

### What Gets Set

When you change button hover opacity to `20%`:

**Before fix:**
```css
/* Only this was set (unused) */
--wm-btn-states-hover-state-layer-opacity: 20%;
```

**After fix:**
```css
/* Both are set */
--wm-btn-states-hover-state-layer-opacity: 20%;  /* For completeness */
--wm-opacity-hover: 20%;                          /* Actually used by CSS ✅ */
```

### Supported States

The fix handles all three interaction states:

| State | Generated Variable | Global Variable Set | CSS Usage |
|-------|-------------------|---------------------|-----------|
| Hover | `--wm-{component}-states-hover-state-layer-opacity` | `--wm-opacity-hover` | `.btn:hover::before` |
| Focus | `--wm-{component}-states-focus-state-layer-opacity` | `--wm-opacity-focus` | `.btn:focus::before` |
| Active | `--wm-{component}-states-active-state-layer-opacity` | `--wm-opacity-active` | `.btn:active::before` |

## How It Works

### Example: Changing Button Hover Opacity

1. **User action**: Changes "Hover State Layer Opacity" to `20%` in Design Tokens panel

2. **Token application**:
   ```typescript
   htmlElement.style.setProperty('--wm-btn-states-hover-state-layer-opacity', '20%');
   htmlElement.style.setProperty('--wm-opacity-hover', '20%');  // ← THE KEY!
   ```

3. **When button is hovered**:
   ```css
   /* CSS runs this */
   .btn:hover::before {
     --wm-btn-state-layer-opacity: var(--wm-opacity-hover);
     /* Looks up --wm-opacity-hover from element → finds 20% → applies it */
   }

   /* ::before pseudo-element uses it */
   .btn:before {
     opacity: var(--wm-btn-state-layer-opacity);  /* Now 20%! */
     background: var(--wm-btn-state-layer-color);
   }
   ```

4. **Result**: Button hover effect uses the updated 20% opacity ✅

## Testing

To verify the fix works:

1. Open a button story with Design Tokens tab
2. Find "Hover State Layer Opacity" token
3. Change value (e.g., from `8%` to `50%`)
4. Hover over the button
5. Verify the hover overlay is more visible (50% opacity)

### Inspect in DevTools

When hovering a button, you should see:

```css
/* Inline styles on button element */
<button style="
  --wm-btn-states-hover-state-layer-opacity: 50%;
  --wm-opacity-hover: 50%;  /* ← This makes it work */
  ...
">
```

## Components Affected

This fix applies to **all components** that use state layer hover effects:

- ✅ Button (`--wm-btn-states-*`)
- ✅ Card (`--wm-card-states-*`)
- ✅ Checkbox (`--wm-checkbox-states-*`)
- ✅ Radio (`--wm-radio-states-*`)
- ✅ Switch (`--wm-switch-states-*`)
- ✅ Any component with state layer pattern

## Technical Details

### CSS Variable Scope and Inheritance

CSS variables are inherited by pseudo-elements:

```css
.button {
  --my-variable: blue;  /* Set on element */
}

.button::before {
  color: var(--my-variable);  /* Inherited from .button ✅ */
}
```

This is why setting `--wm-opacity-hover` as an inline style on the button works—the `:hover::before` selector inherits it.

### Pseudo-Class Specificity

The `:hover` selector has higher specificity than inline styles for actual properties:

```css
/* Inline style */
<button style="background: red;">

/* CSS overrides it when hovering */
button:hover {
  background: blue !important;  /* Blue wins when hovering */
}
```

But CSS variables work differently—they're inherited, not overridden:

```css
/* Inline variable */
<button style="--bg-color: red;">

/* CSS uses the inline value */
button:hover {
  background: var(--bg-color);  /* Uses red from inline! */
}
```

This is why our fix works.

## Limitations

### Global Variable Side Effects

Setting `--wm-opacity-hover` on a button element affects that button only. However, if you have nested components, they might inherit this value.

**Example:**
```html
<button style="--wm-opacity-hover: 50%;">
  <span>Text</span>
  <i class="icon"></i>  <!-- Inherits 50% opacity -->
</button>
```

This is usually not a problem because state tokens are component-specific.

### Non-State-Layer Hover Effects

Some components use different hover patterns (e.g., changing `background-color` directly). This fix only handles state layer opacity patterns.

## Future Improvements

1. **Generalize the pattern**: Detect any state token reference and set the referenced variable
2. **JSON Structure**: Consider aligning JSON paths with actual CSS variable names
3. **Documentation**: Generate mapping between JSON paths and CSS variables

---

**Fixed in**: DesignTokenPanel.tsx (lines 647-670, 690-710)
**Date**: 2026-01-12
**Related Issue**: Button hover state colors not updating in real-time
