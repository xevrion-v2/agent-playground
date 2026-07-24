#!/usr/bin/env node

import { calculatePi } from "./index.js";

const digitsArg = process.argv[2] ?? "100";
const digits = Number.parseInt(digitsArg, 10);

if (!Number.isSafeInteger(digits) || digits < 0) {
  console.error("Usage: npm run demo -w @agent-playground/pi-exact -- <decimal places>");
  process.exit(1);
}

console.log(calculatePi(digits));

