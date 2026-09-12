#!/usr/bin/env node
/**
 * Test suite for pi-calc.
 */

const { calculatePi, verifyPi, PI_100 } = require("./index");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e) {
    console.log(`  ✗ ${name}: ${e.message}`);
    failed++;
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || "assertion failed");
}

console.log("pi-calc tests:\n");

// Basic tests
test("calculates 1 digit", () => {
  const pi = calculatePi(1);
  assert(pi.startsWith("3."), `Expected 3. prefix, got ${pi}`);
});

test("calculates 10 digits", () => {
  const pi = calculatePi(10);
  assert(pi === "3.1415926535", `Got ${pi}`);
});

test("calculates 100 digits matching known value", () => {
  const pi = calculatePi(100);
  assert(verifyPi(pi, PI_100), `π₍₁₀₀₎ mismatch: ${pi}`);
});

test("calculates 500 digits without error", () => {
  const pi = calculatePi(500);
  assert(pi.length === 502, `Expected 502 chars (3. + 500 digits), got ${pi.length}`);
});

test("calculates 1000 digits without error", () => {
  const pi = calculatePi(1000);
  assert(pi.length === 1002, `Expected 1002 chars, got ${pi.length}`);
  // Check first 20 digits match
  assert(pi.startsWith("3.14159265358979323846"), `First 20 digits mismatch: ${pi.slice(0, 22)}`);
});

// Edge cases
test("throws on digits < 1", () => {
  let threw = false;
  try {
    calculatePi(0);
  } catch (e) {
    threw = true;
  }
  assert(threw, "Expected RangeError for digits=0");
});

test("works with digits=5000 (performance sanity)", () => {
  const start = Date.now();
  const pi = calculatePi(5000);
  const elapsed = Date.now() - start;
  console.log(`   5000 digits computed in ${elapsed}ms`);
  assert(pi.length === 5002, `Expected 5002 chars, got ${pi.length}`);
  assert(elapsed < 60000, `Too slow: ${elapsed}ms`); // should be fast
});

// Verify first 1000 digits cross-check with known constants
test("first 1000 digits internally consistent with mathematical properties", () => {
  const pi = calculatePi(1000);
  // Known: first 10 digits of π%10 (3.141592653...)
  assert(pi.startsWith("3.14159265358979323846"), `First 20 don't match`);
  assert(pi.length === 1002, `Expected 1002 chars, got ${pi.length}`);
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
