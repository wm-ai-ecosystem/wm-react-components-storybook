# Design Token Component Support

This document lists all components that are supported by the Design Token system.

## ✅ Fully Supported Components (52 components)

All components in `/src/designTokens/components/` are now supported for real-time design token updates.

### Basic Components
- ✅ **anchor** - Links and hyperlinks (`app-anchor`)
- ✅ **button** - Buttons and actions (`app-button`, `btn`, `btn-*`)
- ✅ **icon** - Icons and symbols (`app-icon`)
- ✅ **label** - Text labels (`app-label`, `text-*`)
- ✅ **badge** - Badges and labels (`app-badge`, `label-*`)
- ✅ **picture** - Images (`app-picture`)

### Form Controls (16 components)
- ✅ **checkbox** - Checkboxes (`app-checkbox`)
- ✅ **checkboxset** - Checkbox groups (`app-checkboxset`)
- ✅ **radioset** - Radio button groups (`app-radioset`, `app-radio`)
- ✅ **switch** - Toggle switches (`app-switch`)
- ✅ **toggle** - Toggle buttons (`app-toggle`)
- ✅ **chips** - Chips/Tags (`app-chips`, `app-chip`)
- ✅ **color-picker** - Color picker (`app-colorpicker`)
- ✅ **currency** - Currency input (`app-currency`)
- ✅ **date** - Date picker (`app-date`)
- ✅ **time** - Time picker (`app-time`)
- ✅ **fileupload** - File upload (`app-fileupload`)
- ✅ **rating** - Star ratings (`app-ratings`)
- ✅ **search** - Search input (`app-search`)
- ✅ **dropdown-menu** - Dropdowns and selects (`app-select`, `app-menu`)
- ✅ **form-controls** - Generic form controls (`app-form`)

### Layout Components (8 components)
- ✅ **accordion** - Expandable panels (`app-accordion`, `panel`, `panel-*`)
- ✅ **container** - Container layouts (`app-container`)
- ✅ **grid-layout** - Grid layouts (`app-grid-layout`, `app-grid`)
- ✅ **list** - Lists (`app-list`, `app-livelist`)
- ✅ **panel** - Panels (`app-panel`, `panel`, `panel-*`)
- ✅ **tabs** - Tab navigation (`app-tabs`)
- ✅ **tile** - Tiles (`app-tile`)
- ✅ **wizard** - Multi-step wizards (`app-wizard`)

### Data & Feedback Components (6 components)
- ✅ **message** - Alert messages (`app-message`, `alert-*`)
- ✅ **progress-bar** - Progress bars (`app-progress`, `progress-bar-*`)
- ✅ **progress-circle** - Circular progress (`progress-circle-*`)
- ✅ **spinner** - Loading spinners (`app-spinner`)
- ✅ **toast** - Toast notifications (`toast`, `toast-*`)
- ✅ **data-table** - Data tables/grids (`app-datagrid`, `app-grid`, `app-livegrid`)

### Navigation Components (9 components)
- ✅ **breadcrumb** - Breadcrumb navigation (`app-breadcrumb`)
- ✅ **nav** - Navigation (`app-nav`, `nav-*`)
- ✅ **page-top-nav** - Top navigation (`app-top-nav`, `app-navbar`)
- ✅ **page-left-nav** - Left sidebar (`app-left-panel`)
- ✅ **page-right-nav** - Right sidebar (`app-right-panel`)
- ✅ **pagination** - Pagination controls (`app-datanavigator`, `pagination`, `pager`)
- ✅ **button-group** - Button groups (`app-button-group`, `button-group`)

### Content/Display Components (7 components)
- ✅ **cards** - Card components (`app-card`, `card-*`)
- ✅ **carousel** - Image carousels (`app-carousel`)
- ✅ **modal-dialog** - Modal dialogs (`app-dialog`, `modal-dialog`, `modal-*`)
- ✅ **popover** - Popovers (`app-popover`)
- ✅ **page-content** - Page content (`app-page-content`)
- ✅ **page-header** - Page header (`app-header`)
- ✅ **page-footer** - Page footer (`app-footer`)

### Media Components (4 components)
- ✅ **audio** - Audio players (`app-audio`)
- ✅ **video** - Video players (`app-video`)
- ✅ **iframe** - Embedded iframes (`app-iframe`)
- ✅ **calendar** - Calendar views (`app-calendar`)

### Rich/Complex Components (2 components)
- ✅ **richtext-editor** - WYSIWYG editor (`app-richtexteditor`, `note-editor`, `note-frame`)
- ✅ **scrollbar** - Custom scrollbars

## How It Works

The design token system now automatically detects **ALL** WaveMaker components by their CSS classes. When you change a design token value in the Design Tokens panel:

1. **Direct Prop Pattern** (Button, Anchor, Label, etc.)
   - Component has `data-design-token-target="true"` directly on it
   - CSS variables applied to the component element itself

2. **Wrapper Pattern** (Message, Progress-bar, RichTextEditor, etc.)
   - Wrapper Box has `data-design-token-target="true"`
   - Component is a child inside the wrapper
   - CSS variables applied to wrapper AND all children

3. **Inline Style Application**
   - CSS variables set as inline styles (highest specificity)
   - Overrides foundation.css values immediately
   - Changes reflect in real-time without page refresh

## Component Detection

The system detects components using these patterns:

### Variant Patterns (checked first for specificity)
- `alert-*` - Message variants (success, danger, warning, info, loading)
- `progress-bar-*` - Progress bar variants (success, danger, etc.)
- `progress-circle-*` - Progress circle variants
- `panel-*` - Panel/accordion variants (primary, secondary, default, etc.)
- `text-*` - Label text variants (primary, secondary, danger, etc.)
- `toast-*` - Toast variants (success, error, warning, info)
- `btn-*` - Button variants (filled, outlined, text, primary, etc.)
- `card-*` - Card variants (default, elevated, filled)
- `modal-*` - Modal size variants (lg, sm, xl, xs, full-screen)
- `label-*` - Badge/label variants (primary, success, etc.)
- `nav-*` - Navigation item classes

### Base Classes
- `app-{component}` - Standard WaveMaker component class
- Additional framework classes (btn, panel, pagination, toast, etc.)

## Testing Your Component

To verify your component works with design tokens:

1. Create a `DesignToken` story in your component's stories file
2. Use either pattern:
   - **Direct**: `<Component data-design-token-target="true" {...args} />`
   - **Wrapper**: `<Box data-design-token-target={true}><Component {...args} /></Box>`
3. Configure parameters:
   ```typescript
   parameters: {
     designTokens: {
       enabled: true,
       tokenData: yourComponentTokensData,
       componentKey: "your-component-key",
       extractCSSVariablesAtRuntime: true,
     }
   }
   ```
4. Open the Design Tokens tab in Storybook
5. Change token values and verify they update in real-time

## Troubleshooting

If design tokens don't work for a component:

1. **Check Console Logs**: Look for "Found component elements" in browser console
2. **Verify CSS Classes**: Ensure component renders with expected `app-*` classes
3. **Check foundation.css**: Verify CSS variables are defined in foundation.css
4. **Inspect DOM**: Confirm inline styles are being applied to the component element
5. **Check JSON**: Verify component JSON file has correct selector mappings

## Recent Fixes Applied

- ✅ Fixed `@` placeholder in variable names (anchor, button)
- ✅ Fixed wrapper pattern detection (message, progress-bar)
- ✅ Fixed direct prop pattern detection (button, anchor, label)
- ✅ Added retry logic for React rendering timing
- ✅ Added comprehensive component class detection (all 52+ components)

---

Last Updated: 2026-01-12
System Version: v2.0 (Comprehensive Component Support)
