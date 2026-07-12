#!/usr/bin/env node
/**
 * CLI runner for PI calculation.
 * Usage: node apps/api/src/pi/calculate-pi.js <digits>
 *   Default: 100 digits
 */
const { calculatePi } = require("./calculate-pi");

const digits = parseInt(process.argv[2] || "100", 10);
if (isNaN(digits) || digits < 1) {
  console.error("Usage: node calculate-pi.js <digits>");
  process.exit(1);
}

const pi = calculatePi(digits);
console.log(pi);
