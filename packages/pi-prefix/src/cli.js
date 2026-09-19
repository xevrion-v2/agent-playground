#!/usr/bin/env node

import { calculatePi } from "./index.js";

const requestedDigits = process.argv[2] ?? "100";
const decimalPlaces = Number(requestedDigits);

try {
  console.log(calculatePi(decimalPlaces));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
