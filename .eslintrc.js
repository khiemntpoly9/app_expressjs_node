module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:security/recommended',
		'plugin:import/recommended',
	],
	plugins: ['prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: { 'prettier/prettier': 'error', 'arrow-body-style': 'off', 'prefer-arrow-callback': 'off' },
};
