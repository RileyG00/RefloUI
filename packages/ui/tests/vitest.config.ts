import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: [path.resolve(__dirname, "setup.ts")],
	},
	plugins: [
		{
			name: "vitest-css-stub",
			enforce: "pre",
			resolveId(id) {
				if (id.endsWith(".css")) {
					return path.resolve(__dirname, "__mocks__/styleMock.ts");
				}
				return null;
			},
			load(id) {
				if (id.endsWith(".css")) {
					return "export default {};";
				}
				return null;
			},
		},
	],
});
