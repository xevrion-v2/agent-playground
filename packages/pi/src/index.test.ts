/**
 * Tests for the Chudnovsky PI calculator.
 *
 * Run with: tsx packages/pi/src/index.test.ts
 */

import { computePi } from "./index.js";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  OK ${name}`);
  } catch (err) {
    failed++;
    console.error(`  FAIL ${name}: ${(err as Error).message}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

// --- tests -------------------------------------------------------

console.log("");
console.log("PI Chudnovsky Tests");
console.log("");

test("computes 10 digits of PI", () => {
  const pi = computePi(10);
  assert(pi.startsWith("3."), "Expected 3.xxx, got " + pi);
  assert(pi.length >= 12, "Expected at least 12 chars, got " + pi.length);
  assert(pi === "3.1415926535",
    "Expected 3.1415926535, got " + pi);
});

test("computes 100 digits matching the issue reference (truncated)", () => {
  const pi = computePi(100);
  const expected = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  assert(pi === expected, "Mismatch at 100 digits:\n  got:      " + pi + "\n  expected: " + expected);
});

test("computes 200 digits, first 100 match issue reference", () => {
  const pi = computePi(200);
  assert(pi.startsWith("3."), "Expected 3.xxx, got " + pi);
  assert(pi.length >= 202, "Expected at least 202 chars, got " + pi.length);
  const first100 = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  assert(pi.startsWith(first100), "First 100 digits changed at 200 precision:\n" + pi.slice(0, 105));
});

test("computes 50 digits and matches known sequence", () => {
  const pi = computePi(50);
  const known = "3.14159265358979323846264338327950288419716939937510";
  assert(pi === known, "Mismatch at 50 digits:\n  got:      " + pi + "\n  expected: " + known);
});

test("rejects digits < 1", () => {
  let threw = false;
  try {
    computePi(0);
  } catch {
    threw = true;
  }
  assert(threw, "Expected an error for digits < 1");
});

test("computes 1 digit correctly", () => {
  const pi = computePi(1);
  assert(pi === "3.1", "Expected 3.1, got " + pi);
});

// --- summary -----------------------------------------------------

console.log("");
console.log(passed + " passed, " + failed + " failed");
console.log("");

if (failed > 0) {
  const proc = (globalThis as any).process;
  if (proc && typeof proc.exit === "function") {
    proc.exit(1);
  }
}
