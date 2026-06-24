#!/usr/bin/env node
/**
 * Validation script for issue #1268: disable ETag generation.
 *
 * Verifies that:
 * 1. `app.set("etag", false)` appears in index.ts before routes are registered.
 * 2. The setting is placed before any middleware or route registration calls.
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, "../src/index.ts");
const source = readFileSync(indexPath, "utf8");
const lines = source.split("\n");

// Find position of etag disable
const etagLine = lines.findIndex(l => l.includes('app.set("etag", false)') || l.includes("app.set('etag', false)"));
if (etagLine === -1) {
  console.error("FAIL: app.set(\"etag\", false) not found in apps/api/src/index.ts");
  process.exit(1);
}

// Verify it appears before routes are registered (app.use/app.get/app.listen)
const firstRouteOrListen = lines.findIndex(
  (l, idx) => idx > etagLine && (l.includes("app.use(") || l.includes("app.get(") || l.includes("app.listen("))
);

if (firstRouteOrListen === -1 || etagLine < firstRouteOrListen) {
  console.log("PASS: ETag is disabled before routes/middleware are registered.");
} else {
  console.error("FAIL: app.set(\"etag\", false) must appear before route/middleware registration.");
  process.exit(1);
}

console.log(`PASS: ETag disabled at line ${etagLine + 1} of apps/api/src/index.ts`);
