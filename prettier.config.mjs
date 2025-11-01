// @ts-check
/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
    semi: true,
    printWidth: 100,
    tabWidth: 4,
    useTabs: true,
    singleQuote: true,
    quoteProps: "as-needed",
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    proseWrap: "always",
    plugins: ["prettier-plugin-organize-imports"],
    overrides: [
      {
        files: [
          "*.cjs",
          "*.cts",
          "*.js",
          "*.jsx",
          "*.mjs",
          "*.mts",
          "*.ts",
          "*.tsx",
        ],
        options: {
          parser: "typescript",
        },
      },
      {
        files: ["*.json"],
        options: {
          parser: "json",
          tabWidth: 2,
          useTabs: false,
        },
      },
      {
        files: ["*.json5"],
        options: {
          parser: "json5",
          tabWidth: 2,
          useTabs: false,
        },
      },
      {
        files: ["*.jsonc"],
        options: {
          parser: "jsonc",
          tabWidth: 2,
          useTabs: false,
        },
      },
      {
        files: ["*.yml", "*.yaml"],
        options: {
          parser: "yaml",
          tabWidth: 2,
          useTabs: false,
        },
      },
    ],
  };