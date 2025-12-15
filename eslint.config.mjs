// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  rules: {
    // Disable the `any` rule
    "@typescript-eslint/no-explicit-any": "off",
    // Disable the unsafe function types rule
    "@typescript-eslint/no-unsafe-function-type": "off",
    // Disable the unused vars rule
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "prefer-const": "off", // Disable the prefer-const rule
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prefer-spread": "off",
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
