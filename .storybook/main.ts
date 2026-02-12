import type { StorybookConfig } from '@storybook/nextjs-vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    "../public",
    "../style"
  ],
  async viteFinal(config) {
    // Mock @wavemaker/variables for Storybook
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@wavemaker/variables': resolve(__dirname, './mocks/variables.ts'),
    };
    return config;
  },
};
export default config;