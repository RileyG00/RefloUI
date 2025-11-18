import type { Preview } from "@storybook/react";
import "../../../packages/ui/src/styles/tokens.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: { expanded: true },
	},
	tags: ["autodocs"],
};

export default preview;
