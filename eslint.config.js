import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".astro/**", "dist/**", "node_modules/**", "examples/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      "src/**/*.ts",
      "tests/**/*.ts",
      "astro.config.mjs",
      "eslint.config.js",
      "tsup.config.ts",
      "vitest.config.ts",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
  }
);
