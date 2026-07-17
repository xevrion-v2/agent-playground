import { test } from "node:test";
import assert from "node:assert/strict";
import { computePi } from "./pi.ts";

test("computePi returns the known first digits of PI", () => {
  assert.equal(computePi(15), "3.141592653589793");
  assert.equal(computePi(5), "3.14159");
});

test("computePi(0) returns '3'", () => {
  assert.equal(computePi(0), "3");
});

test("computePi rejects invalid input", () => {
  assert.throws(() => computePi(-1));
  assert.throws(() => computePi(1.5));
});
