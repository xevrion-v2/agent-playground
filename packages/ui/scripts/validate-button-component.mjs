import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const sourcePath = fileURLToPath(new URL("../src/index.ts", import.meta.url));
const source = readFileSync(sourcePath, "utf8");

const expectations = [
  ["imports React createElement", /import\s+\{\s*createElement\b[\s\S]*\}\s+from\s+"react"/],
  ["returns a ReactElement", /:\s*ReactElement\s*\{/],
  ["renders a button element", /createElement\(\s*[\r\n]*\s*"button"/],
  ["keeps button type explicit", /type:\s*"button"/],
  ["passes disabled prop through", /\{\s*[\r\n]+\s*disabled,\s*[\r\n]+\s*type:\s*"button"/],
  ["uses label as button children", /,\s*[\r\n]+\s*label\s*[\r\n]*\)/]
];

for (const [description, pattern] of expectations) {
  if (!pattern.test(source)) {
    throw new Error(`Button validation failed: ${description}`);
  }
}

if (/return\s*\{\s*[\r\n]+\s*type:\s*"button"/.test(source)) {
  throw new Error("Button validation failed: object stub return is still present");
}

console.log("Button component validation passed");
