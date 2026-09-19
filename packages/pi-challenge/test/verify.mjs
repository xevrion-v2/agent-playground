import { computePi } from "../src/pi.mjs";

// The 100-decimal reference value quoted in the challenge issue.
const REFERENCE_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

const checks = [
  ["digits = 1", computePi(1), "3.1"],
  ["digits = 10", computePi(10), "3.1415926535"],
  ["digits = 100", computePi(100), REFERENCE_100],
];

// Determinism: identical inputs must always produce identical output.
checks.push(["deterministic (100 digits, twice)", computePi(100), computePi(100)]);

// Prefix property: a higher-precision result extends the lower-precision one.
checks.push([
  "prefix property (100 vs 200 digits)",
  computePi(200).slice(0, 102),
  REFERENCE_100,
]);

let failed = 0;
for (const [name, actual, expected] of checks) {
  const ok = actual === expected;
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`);
  if (!ok) {
    console.log(`  expected: ${expected}`);
    console.log(`  actual:   ${actual}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
