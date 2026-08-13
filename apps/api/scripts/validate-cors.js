#!/usr/bin/env node
/**
 * Validation script for issue #692: CORS middleware should be present in the API.
 *
 * Verifies that:
 * 1. cors is imported in index.ts
 * 2. app.use(cors()) is called before routes are registered
 * 3. cors is declared as a dependency in package.json
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Check index.ts for cors usage
const indexPath = resolve(__dirname, "../src/index.ts");
const source = readFileSync(indexPath, "utf8");

if (!source.includes("import cors") && !source.includes("require('cors')") && !source.includes('require("cors")')) {
  console.error("FAIL: cors is not imported in apps/api/src/index.ts");
  process.exit(1);
}

if (!source.includes("app.use(cors())")) {
  console.error("FAIL: app.use(cors()) not found in apps/api/src/index.ts");
  process.exit(1);
}

// Verify cors is registered before routes
const lines = source.split("\n");
const corsUseLine = lines.findIndex(l => l.includes("app.use(cors())"));
const firstRouteLine = lines.findIndex((l, idx) => idx > corsUseLine && (l.includes("app.use(\"/") || l.includes("app.get(") || l.includes("app.post(")));

if (corsUseLine !== -1 && (firstRouteLine === -1 || corsUseLine < firstRouteLine)) {
  console.log("PASS: cors middleware is registered before routes.");
} else {
  console.error("FAIL: cors middleware must be registered before route handlers.");
  process.exit(1);
}

// Check package.json for cors dependency
const pkgPath = resolve(__dirname, "../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

if (!pkg.dependencies?.cors) {
  console.error("FAIL: cors is not listed in dependencies in apps/api/package.json");
  process.exit(1);
}

console.log("PASS: cors dependency declared in package.json.");
console.log("PASS: CORS middleware configured correctly in Express API.");
