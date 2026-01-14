import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    // "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    // "@storybook/addon-a11y",
    "@storybook/addon-docs",
    // Note: Design Tokens addon is loaded via manager.ts import
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ],
  async viteFinal(config) {
    // Mock @wavemaker/variables for Storybook
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@wavemaker/variables': new URL('./mocks/variables.ts', import.meta.url).pathname,
    };
    return config;
  },
};
export default config;