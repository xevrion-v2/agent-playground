#!/usr/bin/env node
/**
 * CLI for @taskflow/pi — compute π to a given number of decimal places.
 *
 * Usage:
 *   node src/cli.mjs [digits]          — compute π to [digits] places (default 100)
 *   node src/cli.mjs [digits] --json   — output JSON certificate
 *   node src/cli.mjs verify [pi-str]   — verify π string against reference
 */

import { computePi, verifyPi } from "./pi.mjs";

function main() {
  const args = process.argv.slice(2);

  if (args[0] === "verify") {
    const piStr = args[1] || "3.14";
    const digits = parseInt(args[2], 10) || piStr.length - 2;
    const result = verifyPi(piStr, digits);
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  const digits = parseInt(args[0], 10) || 100;
  const outputJson = args.includes("--json");

  const { pi, certificate } = computePi(digits);

  if (outputJson) {
    console.log(JSON.stringify({ pi, certificate }, null, 2));
  } else {
    console.log(`π to ${digits} decimal places:\n`);
    console.log(pi);
    console.log(`\nCertificate:`);
    console.log(`  algorithm:  ${certificate.algorithm}`);
    console.log(`  digits:     ${certificate.digits}`);
    console.log(`  guard:      ${certificate.guard_digits}`);
    console.log(`  SHA-256:    ${certificate.sha256}`);
    console.log(`  chunks:     ${certificate.chunks.length}`);

    // Verification
    const result = verifyPi(pi, digits);
    console.log(`\nVerification:`);
    console.log(`  valid:      ${result.valid}`);
    if (!result.valid) {
      console.log(`  reference:  ${result.reference}`);
    }
  }
}

main();