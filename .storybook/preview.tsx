import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { Provider } from "react-redux";
import { WidgetProvider } from "../src/context/WidgetProvider";
import { store } from "../src/store";
import "@mui/material/styles";
import "@wavemaker/app-runtime-wm-build/wmapp/styles/foundation/foundation.css";
import { addons } from "storybook/preview-api";
// Mock page context for Storybook
const createMockPageContext = () => ({
  Widgets: {},
  App: {
    Widgets: {},
  },
  componentType: "PAGE",
});

// Mock proxy
const createMockProxy = () => ({
  Widgets: {},
  App: {
    Widgets: {},
  },
});

// Decorator to wrap components with Redux Provider and WidgetProvider
const withProviders = (Story: any) => {
  const mockContext = {
    value: createMockPageContext(),
    proxy: createMockProxy(),
  };

  return (
      <Provider store={store}>
        <WidgetProvider value={mockContext}>
          <Story />
        </WidgetProvider>
      </Provider>
  );
};

const preview: Preview = {
  parameters: {
    options: {
      selectedPanel: "storybook/controls/panel",
      storySort: {
        order: [
          "Basic",
          "Input",
          "Charts",
          "Containers",
          "Data",
          "Layout",
          "Navigation",
          "Dialogs",
          "Advanced",
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Disable Actions addon panel
    actions: {
      disable: true,
    },
    // Disable Interactions addon panel, hidden -> style -> theme.css
    // interactions: {
    //   disable: true,
    // },
    // Disable Backgrounds addon panel (if you don't need it)
    backgrounds: {
      disable: true,
    },
    // Disable Viewport addon panel (if you don't need it)
    viewport: {
      disable: true,
    },
    // Disable Measure addon panel
    measure: {
      disable: true,
    },
    // Disable Outline addon panel
    outline: {
      disable: true,
    },

    // a11y: {
    //   // 'todo' - show a11y violations in the test UI only
    //   // 'error' - fail CI on a11y violations
    //   // 'off' - skip a11y checks entirely
    //   test: "todo",
    // },
  },
  decorators: [withProviders],
};

// Listen for design token events from the manager and apply to preview :root.
// This is the official manager <-> preview communication route in Storybook.
(() => {
  try {
    const channel = addons.getChannel();
    // Keep token application scoped to the currently selected story.
    // This avoids leaking variables to other stories (popover/search/date/etc.) without hard-coding component types.
    let lastStoryId: string | undefined;
    let lastAppliedKeys = new Set<string>();

    const getScopeElement = (): HTMLElement => {
      // Storybook preview renders the story inside #storybook-root.
      // Applying CSS variables here scopes them to the selected story subtree.
      return (document.getElementById("storybook-root") as HTMLElement) || document.body;
    };

    const clearPreviouslyApplied = (el: HTMLElement) => {
      lastAppliedKeys.forEach(name => {
        try {
          el.style.removeProperty(name);
          // Some portal-based components mount outside #storybook-root and inherit from body/html.
          // Clear from body too, to prevent cross-story leakage.
          document.body.style.removeProperty(name);
        } catch (e) {
          // ignore
        }
      });
      lastAppliedKeys.clear();
    };

    channel.on(
      "wm/designTokens/apply",
      ({ tokenValues, storyId }: { tokenValues: Record<string, string>; storyId?: string }) => {
      try {
        const scopeEl = getScopeElement();

        // If the selected story changed, clear whatever we applied for the previous story.
        if (lastStoryId !== storyId) {
          clearPreviouslyApplied(scopeEl);
          lastStoryId = storyId;
        }

        // Apply the full token map to the story scope.
        // This is generic for popover/search/date/dialog/etc. and doesn't rely on portal heuristics.
        const entries = Object.entries(tokenValues || {});
        entries.forEach(([name, value]) => {
          try {
            scopeEl.style.setProperty(name, value);
            lastAppliedKeys.add(name);
          } catch (e) {
            // ignore invalid
          }
        });

        // Some portal-based components may mount outside #storybook-root (e.g., via document.body).
        // Mirror the same tokens to body so portals inherit them, but keep cleanup story-scoped.
        // NOTE: This is still per-story because we clear body vars on story change above.
        entries.forEach(([name, value]) => {
          try {
            document.body.style.setProperty(name, value);
            lastAppliedKeys.add(name);
          } catch (e) {
            // ignore
          }
        });
      } catch (e) {
        // ignore
      }
    }
    );
  } catch (e) {
    // ignore if channel isn't available
  }
})();

export default preview;
