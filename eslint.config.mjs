import eslint from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintReact from '@eslint-react/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginNext from '@next/eslint-plugin-next'

export default defineConfig(
  // Ignore these directories...KA
  globalIgnores(['.next/', 'node_modules/', 'next-env.d.ts']),

  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  reactHooks.configs['recommended-latest'],
  eslintReact.configs['recommended-typescript'],
  jsxA11y.flatConfigs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@next/next': eslintPluginNext,
    },
    rules: {
      // Unified React
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',
      '@eslint-react/no-clone-element': 'off',
      '@eslint-react/no-children-map': 'off',

      // React Hooks
      'react-hooks/exhaustive-deps': 'off',

      // Stylistic
      quotes: ['error', 'single'],
      semi: ['error', 'never'],

      // TypeScript
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',

      // TODO: Temporary rules that we should fix...KA
      '@eslint-react/no-create-ref': 'off',
      '@eslint-react/hooks-extra/no-unnecessary-use-prefix': 'off',
      '@eslint-react/no-unstable-context-value': 'off',
      '@eslint-react/no-unstable-default-props': 'off',
      '@eslint-react/no-unstable-array-index-key': 'off',
      '@eslint-react/no-array-index-key': 'off',
      '@eslint-react/dom/no-missing-iframe-sandbox': 'off',

      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
    },
  }
)
