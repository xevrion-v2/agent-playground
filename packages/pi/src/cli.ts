/**
 * Demo CLI for @taskflow/pi.
 *
 *   npm run demo -w packages/pi                 # 10,000 digits + verification
 *   npm run demo -w packages/pi -- 100000       # any digit count
 *   npm run demo -w packages/pi -- 1000 --print # also print all digits
 */

import { certifyPiDigits, computePiDigits } from "./index.js";

const args = process.argv.slice(2);
const digitsArg = args.find((a) => !a.startsWith("--"));
const digits = digitsArg ? Number.parseInt(digitsArg, 10) : 10_000;
const printAll = args.includes("--print");

if (!Number.isInteger(digits) || digits < 1) {
  console.error("usage: demo [digits >= 1] [--print]");
  process.exit(1);
}

console.log(`@taskflow/pi — exact truncated prefix of pi to ${digits.toLocaleString()} decimal places\n`);

const t0 = performance.now();
const value = computePiDigits(digits);
const computeMs = performance.now() - t0;
console.log(`compute (Chudnovsky + binary splitting): ${computeMs.toFixed(1)} ms`);

if (printAll) {
  console.log(`\n${value}\n`);
} else {
  console.log(`head: ${value.slice(0, 52)}...`);
  console.log(`tail: ...${value.slice(-40)}`);
}

// Independent verification is O(n^2)-ish for Machin, so cap the certified
// portion for very large runs; the certificate states its own digit count.
const certDigits = Math.min(digits, 5_000);
const t1 = performance.now();
const cert = certifyPiDigits(certDigits);
const verifyMs = performance.now() - t1;

console.log(`\nverification (${certDigits.toLocaleString()} digits, ${verifyMs.toFixed(1)} ms):`);
console.log(`  Chudnovsky (1988) === Machin (1706): ${cert.verification.crossEngineMatch ? "MATCH" : "MISMATCH"}`);
for (const check of cert.verification.hexSpotChecks) {
  console.log(
    `  BBP hex @ position ${String(check.position).padStart(6)}: bbp=${check.bbp} decimal-derived=${check.decimalDerived} ${check.match ? "MATCH" : "MISMATCH"}`,
  );
}
console.log(`  all checks passed: ${cert.verification.allPassed}`);
console.log(`\ncertificate (recompute computePiDigits(${certDigits}) and hash to reproduce):`);
console.log(JSON.stringify(cert, null, 2));

process.exit(cert.verification.allPassed ? 0 : 2);
