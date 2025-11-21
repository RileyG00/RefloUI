import type { Preview } from "@storybook/react";
import "../src/tailwind.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: { expanded: true },
	},
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Switch between light and dark color tokens",
			defaultValue: "light",
			toolbar: {
				icon: "circlehollow",
				items: [
					{ value: "light", title: "Light" },
					{ value: "dark", title: "Dark" },
				],
				dynamicTitle: true,
			},
		},
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme === "dark" ? "dark" : "light";

			const root = globalThis.document?.documentElement;
			if (root) {
				root.dataset.theme = theme;
				root.classList.remove("light", "dark");
				root.classList.add(theme);
				root.style.colorScheme = theme;
			}

			return Story();
		},
	],
	tags: ["autodocs"],
};

export default preview;
