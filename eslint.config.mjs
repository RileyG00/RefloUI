// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config({
    ignores: [
        "**/node_modules",
        "**/dist",
        "**/storybook-static/**",
    ],
}, js.configs.recommended, {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            project: [
                "tsconfig.base.json",
                "packages/ui/tsconfig.json",
                "apps/storybook/tsconfig.json",
            ],
            tsconfigRootDir: import.meta.dirname,
        },
    },
    plugins: {
        react: reactPlugin,
        "react-hooks": reactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        "react/react-in-jsx-scope": "off",
    },
}, storybook.configs["flat/recommended"], {
    rules: {
        "storybook/no-renderer-packages": "off",
    },
});
