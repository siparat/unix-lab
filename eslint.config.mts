import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
	{
		ignores: ['node_modules', 'dist']
	},
	{
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
		plugins: { js },
		extends: ['js/recommended'],
		languageOptions: { globals: globals.browser }
	},
	tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'@typescript-eslint/recommended-type-checked': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					ignoreRestSiblings: true,
					caughtErrors: 'none'
				}
			],
			'prettier/prettier': [
				'warn',
				{
					useTabs: true,
					indentSize: 4,
					singleQuote: true,
					trailingComma: 'none',
					printWidth: 120,
					semi: true,
					bracketSpacing: true,
					bracketSameLine: true,
					arrowParens: 'always',
					parser: 'typescript',
					endOfLine: 'lf'
				}
			]
		}
	}
]);
