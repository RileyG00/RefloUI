import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
	stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
	core: {
		disableTelemetry: true,
	},
	addons: [
		getAbsolutePath("@storybook/addon-a11y"),
		getAbsolutePath("@storybook/addon-docs"),
		getAbsolutePath("@storybook/addon-links"),
	],
	framework: { name: getAbsolutePath("@storybook/react-vite"), options: {} },

	viteFinal: async (config) => {
		config.resolve ??= {};
		config.resolve.alias ??= {};
		const alias = config.resolve.alias as Record<string, string>;
		alias["@refloui/ui"] = path.resolve(
			__dirname,
			"../../../packages/ui/src",
		);
		alias["@storybook/blocks"] = "@storybook/addon-docs/blocks";
		return config;
	},
};

export default config;

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
