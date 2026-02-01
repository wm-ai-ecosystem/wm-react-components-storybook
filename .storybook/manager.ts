import { addons, type State } from "storybook/manager-api";
import { create } from "storybook/theming/create";
import "../style/theme.css";
// Import Design Tokens addon registration
import "./addons/design-tokens/register";

const customTheme = create({
  base: "light", // or 'dark'
  brandUrl: "https://wavemaker.com",
  brandImage: "./wm-comp-logo.png", // Replace with your logo URL
  brandTarget: "_blank", // Open brandUrl in a new tab

  fontBase: "neurial-grotesk-regular",

  // Colors
  // colorPrimary: "rgba(135, 135, 135, 1)",
  colorSecondary: "#296df6",

  // UI
  appBg:
    "linear-gradient(170deg, rgb(226, 244, 254) 14.38%, rgb(218, 217, 252) 99.86%)",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  // appBorderColor: "rgba(0, 0, 0, 0.10)",
  appBorderRadius: 6,

  // Text colors
  textColor: "rgba(48, 48, 48, 1)",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  // barTextColor: "#5E686F",
  // barSelectedColor: "rgba(41, 109, 246, 0.14)",
  // barHoverColor: "#5E686F",
  // barBg: "#fff",

  // Form colors
  // inputBg: "#ffffff",
  // inputBorder: "rgba(0, 0, 0, 0.10)",
  // inputTextColor: "rgba(48, 48, 48, 1)",
  // inputBorderRadius: 4,
});

addons.setConfig({
  theme: customTheme,
  panelPosition: 'right', // Set panel to display on the right side by default
  initialActive: 'storybook/controls/panel', // Set Controls panel as default active
  // layoutCustomisations: {
  //   showPanel(state: State) {
  //     const tags = state.storyId && state.index ? state.index[state.storyId]?.tags : [];

  //     // Only show panel for stories with 'show-panel' tag
  //     if (tags && tags.includes('show-panel')) {
  //       return true;
  //     }

  //     // Hide panel by default for all other stories
  //     return false;
  //   },
  // },
});