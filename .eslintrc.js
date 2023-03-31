module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['plugin:prettier/recommended', 'prettier'],
	plugins: ['prettier'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: { 'prettier/prettier': 'error', 'arrow-body-style': 'off', 'prefer-arrow-callback': 'off' },
};
