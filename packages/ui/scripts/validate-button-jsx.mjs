import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const sourcePath = join(root, "src", "index.tsx");
const packagePath = join(root, "package.json");

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

if (!existsSync(sourcePath)) {
  fail("Expected UI entrypoint at src/index.tsx");
}

const source = readFileSync(sourcePath, "utf8");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

const checks = [
  [/function Button\(/, "Button component should be exported"],
  [/ReactElement/, "Button should expose a React element return type"],
  [/return\s*\(\s*<button\b/, "Button should return a JSX button element"],
  [/type="button"/, "Button should set the native button type"],
  [/disabled=\{disabled\}/, "Button should pass the disabled prop through"],
  [/\{label\}/, "Button should render the label as button content"]
];

for (const [pattern, message] of checks) {
  if (!pattern.test(source)) {
    fail(message);
  }
}

if (packageJson.main !== "src/index.tsx") {
  fail("packages/ui package main should point at src/index.tsx");
}

if (!packageJson.peerDependencies?.react) {
  fail("packages/ui should declare react as a peer dependency");
}

console.log("Button JSX validation passed");
