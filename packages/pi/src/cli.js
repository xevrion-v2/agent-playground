#!/usr/bin/env node
import { calculatePi } from "./pi.js";

const args = process.argv.slice(2);
let digits = 100;

if (args.length > 0) {
  const parsed = parseInt(args[0], 10);
  if (isNaN(parsed) || parsed < 0) {
    console.error("Error: Please provide a valid non-negative number of digits.");
    process.exit(1);
  }
  digits = parsed;
}

console.log(`Calculating Pi to ${digits} decimal places...`);
console.time("Execution Time");
try {
  const pi = calculatePi(digits);
  console.timeEnd("Execution Time");
  console.log("\nResult:");
  console.log(pi);
  console.log("\nMathematical Note:");
  console.log("Pi is an irrational and transcendental number, meaning it has an infinite,");
  console.log("non-repeating decimal expansion. Therefore, it is mathematically impossible");
  console.log("to calculate to a 'very last' decimal point. This utility calculates the exact");
  console.log("prefix of Pi to any finite precision using Machin's arctangent formula.");
} catch (error) {
  console.error("Error calculating Pi:", error.message);
  process.exit(1);
}
