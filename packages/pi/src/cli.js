#!/usr/bin/env node

import { createPiCertificate } from "./index.js";

const rawDigits = process.argv[2] ?? "100";
const decimalDigits = Number(rawDigits);

try {
  const certificate = createPiCertificate(decimalDigits);
  console.log(certificate.value);
  console.log(`digits=${certificate.digits}`);
  console.log(`algorithm=${certificate.algorithm}`);
  console.log(`sha256=${certificate.sha256}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
