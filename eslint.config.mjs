// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			// https://github.com/typescript-eslint/typescript-eslint/issues/11732
			'@typescript-eslint/unified-signatures': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
		},
	},
);
