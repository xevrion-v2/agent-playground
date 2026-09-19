#!/usr/bin/env node

import { calculatePi } from "./index.js";

const args = process.argv.slice(2);
const digits = parseInt(args[0] || "100", 10);

if (isNaN(digits) || digits < 0) {
  console.error("Usage: pi-calc [digits]");
  console.error("  digits: Number of decimal places (default: 100)");
  process.exit(1);
}

console.log(`Calculating PI to ${digits} decimal places...\n`);

const startTime = Date.now();
const pi = calculatePi(digits);
const elapsed = Date.now() - startTime;

console.log(pi);
console.log(`\nCalculated in ${elapsed}ms`);

// Verify against known value
if (digits <= 100) {
  const known = `3.${"1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679".substring(0, digits)}`;
  if (pi === known) {
    console.log("\n✓ Verified against known value");
  } else {
    console.error("\n✗ Verification failed!");
    console.error(`Expected: ${known}`);
    console.error(`Got:      ${pi}`);
    process.exit(1);
  }
}
