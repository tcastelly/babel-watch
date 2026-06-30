import eslint from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "flow-typed/**"]
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015
      }
    }
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      unicorn
    },
    rules: {
      "no-console": "off",
      "no-use-before-define": ["error", "nofunc"],
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-require-imports': 'off',
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          caughtErrors: "none"
        }
      ],
      "prefer-const": "error",

      "unicorn/better-regex": "warn",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/no-abusive-eslint-disable": "error"
    }
  }
);
