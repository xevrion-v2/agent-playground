#!/usr/bin/env node
/**
 * Validation script for issue #736: POST /users should only accept expected fields.
 *
 * Verifies that:
 * 1. The route does NOT spread req.body directly into the response.
 * 2. Only name and email are destructured from req.body.
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const routePath = resolve(__dirname, "../src/routes/users.ts");
const source = readFileSync(routePath, "utf8");

// Check that req.body spread is NOT used in the users route
if (source.includes("...req.body")) {
  console.error("FAIL: Found ...req.body spread in users route. Arbitrary client fields must not be spread into responses.");
  process.exit(1);
}

// Check that only expected fields are extracted
if (!source.includes("name") || !source.includes("email")) {
  console.error("FAIL: Expected destructuring of name and email from req.body not found.");
  process.exit(1);
}

console.log("PASS: POST /users only accepts expected fields (name, email) - no req.body spread.");
