import pluginJs from "@eslint/js";
import eslintPluginHtml from "eslint-plugin-html";
import globals from "globals";

export default [
  {
    files: ["**/*.js", "**/*.html"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
    plugins: {
      html: eslintPluginHtml,
    },
    extends: ["eslint:recommended", pluginJs.configs.recommended],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      html: eslintPluginHtml,
    },
    extends: ["eslint:recommended", pluginJs.configs.recommended],
  },
];
