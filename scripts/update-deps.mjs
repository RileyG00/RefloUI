import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const workspaces = [
	{ name: "root", dir: repoRoot },
	{ name: "@refloui/ui", dir: path.join(repoRoot, "packages/ui") },

	// Ignore this for now, since Storybook doesn't support the latest version of all of it's deps
	//{ name: "storybook", dir: path.join(repoRoot, "apps/storybook") },
];

for (const workspace of workspaces) {
	console.log(`\nUpdating ${workspace.name}…`);
	execSync("npx npm-check-updates -u", {
		cwd: workspace.dir,
		stdio: "inherit",
	});
}

console.log("\nInstalling updated dependencies…");
execSync("npm install", { cwd: repoRoot, stdio: "inherit" });

console.log("\nDependency update complete.");
