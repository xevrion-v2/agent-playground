import { isPlainRecord } from "./is-plain-record.js";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`FAIL: ${label}`);
  }
}

// Plain objects
assert(isPlainRecord({}) === true, "empty object");
assert(isPlainRecord({ a: 1 }) === true, "object with keys");
assert(isPlainRecord(Object.create(null)) === true, "null-prototype object");

// Non-plain values
assert(isPlainRecord(null) === false, "null");
assert(isPlainRecord(undefined) === false, "undefined");
assert(isPlainRecord(42) === false, "number");
assert(isPlainRecord("string") === false, "string");
assert(isPlainRecord(true) === false, "boolean");
assert(isPlainRecord([]) === false, "array");
assert(isPlainRecord(new Date()) === false, "Date instance");
assert(isPlainRecord(/regex/) === false, "RegExp instance");
assert(isPlainRecord(() => {}) === false, "function");
assert(isPlainRecord(new Map()) === false, "Map instance");
assert(isPlainRecord(new Set()) === false, "Set instance");

// Summary
console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
