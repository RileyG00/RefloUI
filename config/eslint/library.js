module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "react", "react-hooks"],
	settings: { react: { version: "detect" } },
	env: { browser: true, es2021: true, jest: true },
	rules: { "react/react-in-jsx-scope": "off" },
};
