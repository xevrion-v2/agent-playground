#!/usr/bin/env node
/**
 * Validation script for issue #1173: Button component should return JSX element.
 *
 * Verifies that:
 * 1. The Button function does not return a plain object literal.
 * 2. JSX syntax is used (tsx file with React element).
 * 3. The peerDependency for React is declared.
 */
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Check that index.tsx exists (JSX file)
const tsxPath = resolve(__dirname, "../src/index.tsx");
if (!existsSync(tsxPath)) {
  console.error("FAIL: packages/ui/src/index.tsx does not exist. Button must be in a .tsx file to use JSX.");
  process.exit(1);
}

const source = readFileSync(tsxPath, "utf8");

// Check that the old plain object return is NOT present
if (source.includes("return {") && source.includes("type: \"button\"")) {
  console.error("FAIL: Button still returns a plain object. It must return JSX.");
  process.exit(1);
}

// Check that JSX/React element return is present
if (!source.includes("<button") && !source.includes("React.createElement")) {
  console.error("FAIL: Button does not appear to return a JSX <button> element.");
  process.exit(1);
}

// Check React peer dependency
const pkgPath = resolve(__dirname, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

if (!pkg.peerDependencies?.react) {
  console.error("FAIL: react is not declared as a peerDependency in packages/ui/package.json");
  process.exit(1);
}

console.log("PASS: Button component returns a JSX <button> element.");
console.log("PASS: React is declared as a peer dependency.");
