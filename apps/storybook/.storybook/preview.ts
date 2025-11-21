import type { Preview } from "@storybook/react";
import "../src/tailwind.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: { expanded: true },
	},
	tags: ["autodocs"],
};

export default preview;
