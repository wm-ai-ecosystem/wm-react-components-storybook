import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { Provider } from "react-redux";
import { WidgetProvider } from "../src/context/WidgetProvider";
import { store } from "../src/store";
import "@mui/material/styles";
import "@wavemaker/app-runtime-wm-build/wmapp/styles/foundation/foundation.css";
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

export default preview;