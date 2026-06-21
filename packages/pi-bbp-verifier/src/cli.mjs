#!/usr/bin/env node

import { createPiCertificate } from "./index.mjs";

function parsePrecision(raw, fallback, name) {
  if (raw === undefined) {
    return fallback;
  }

  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
  return value;
}

try {
  const decimalDigits = parsePrecision(process.argv[2], 100, "decimalDigits");
  const hexDigits = parsePrecision(process.argv[3], 32, "hexDigits");
  const certificate = createPiCertificate(decimalDigits, hexDigits);

  console.log(JSON.stringify(certificate, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
