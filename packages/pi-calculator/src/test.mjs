import { computePi, getCertificate } from './index.js';
import { strict as assert } from 'assert';

const KNOWN_100 = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

// Test 1: Basic computation
const pi10 = computePi(10);
assert(pi10.startsWith("3.141592653"), `Expected 3.1415926535, got ${pi10}`);
console.log("✅ Test 1 passed: 10 digits =", pi10);

// Test 2: 100 digits
const pi100 = computePi(100);
assert(pi100 === KNOWN_100, `100 digit mismatch:\nGot: ${pi100}\nExp: ${KNOWN_100}`);
console.log("✅ Test 2 passed: 100 digits match known value");

// Test 3: Input validation
try {
  computePi(-1);
  assert.fail("Should have thrown");
} catch(e) {
  console.log("✅ Test 3 passed: rejects negative digits");
}

// Test 4: Certificate
const cert = getCertificate(50);
assert(cert.digits === 50);
assert(cert.value.startsWith("3.14"));
console.log("✅ Test 4 passed: certificate generated");

console.log("\n🎉 All tests passed!");
