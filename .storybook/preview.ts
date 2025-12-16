import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { Provider } from "react-redux";
import { WidgetProvider } from "../src/context/WidgetProvider";
import { store } from "../src/store";

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

  return React.createElement(
    Provider,
    { store, children: React.createElement(
      WidgetProvider,
      {
        value: mockContext,
        children: React.createElement(Story)
      }
    )}
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [withProviders],
};

export default preview;
