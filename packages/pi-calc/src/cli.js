#!/usr/bin/env node
/**
 * CLI for π calculation — prints π to the requested number of digits.
 * Usage: node src/index.js [digits]
 *   digits — number of decimal places (default: 100)
 */

const { calculatePi, PI_100 } = require("./index");

const digits = process.argv[2] ? parseInt(process.argv[2], 10) : 100;

if (isNaN(digits) || digits < 1) {
  console.error("Usage: node src/index.js [digits]");
  console.error("  digits — number of decimal places (>= 1, default: 100)");
  process.exit(1);
}

console.log(`Computing π to ${digits} decimal places...\n`);

const start = Date.now();
const pi = calculatePi(digits);
const elapsed = Date.now() - start;

console.log(pi);
console.log(`\nComputed in ${elapsed}ms`);

// Verify against known value if requesting 100 digits
if (digits === 100) {
  const match = pi === PI_100;
  console.log(`\nVerification against known π₍₁₀₀₎: ${match ? "PASS ✓" : "FAIL ✗"}`);
}
