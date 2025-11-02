import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  {
    ignores: [
      'next-env.d.ts',
      'node_modules/**',
      '.next/**',
      '.contentlayer/**',
      '.vscode/**',
      '.idea/**',
      '.vercel/**',
      'eslint.config.mjs',
      'app/tag-data.json',
      'public/**',
      'out/**',
      '.turbo/**',
      'packages/**/.next/**',
      'packages/**/.contentlayer/**',
      '**/generated/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs.recommended,
  prettierConfig,
  {
    plugins: {
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
      next: nextPlugin,
    },

    languageOptions: {
      globals: Object.fromEntries(
        Object.entries({
          ...globals.browser,
          ...globals.amd,
          ...globals.node,
        }).map(([key, value]) => [key.trim(), value]) // Trim any whitespace
      ),

      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]
