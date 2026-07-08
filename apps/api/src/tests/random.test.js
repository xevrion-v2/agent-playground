import assert from "node:assert/strict";
import { test } from "node:test";

import { randomInt, randomPick, randomString, randomUUID } from "../utils/random.js";

test("randomString returns empty string for zero length", () => {
  assert.equal(randomString(0), "");
});

test("randomString returns empty string for negative length", () => {
  assert.equal(randomString(-1), "");
});

test("randomString returns empty string for non-integer length", () => {
  assert.equal(randomString(1.5), "");
});

test("randomString returns empty string for empty alphabet", () => {
  assert.equal(randomString(3, ""), "");
});

test("randomString returns a string of the requested length", () => {
  assert.equal(randomString(8).length, 8);
});

test("randomString respects a custom alphabet", () => {
  const value = randomString(10, "ab");
  assert.equal(value.length, 10);
  assert.match(value, /^[ab]+$/);
});

test("randomString handles numeric length inputs", () => {
  assert.equal(randomString(1).length, 1);
});

test("randomString accepts single-character alphabets", () => {
  assert.equal(randomString(4, "x"), "xxxx");
});

test("randomInt returns a value inside a one-argument range", () => {
  const value = randomInt(5);
  assert.ok(Number.isInteger(value));
  assert.ok(value >= 0 && value <= 5);
});

test("randomInt returns a value inside an explicit range", () => {
  const value = randomInt(10, 15);
  assert.ok(Number.isInteger(value));
  assert.ok(value >= 10 && value <= 15);
});

test("randomInt returns the bound when min and max are equal", () => {
  assert.equal(randomInt(7, 7), 7);
});

test("randomInt rejects reversed bounds", () => {
  assert.equal(randomInt(8, 3), null);
});

test("randomInt rejects non-integer bounds", () => {
  assert.equal(randomInt(1.2, 3), null);
});

test("randomInt rejects non-integer max bounds", () => {
  assert.equal(randomInt(1, 3.7), null);
});

test("randomUUID returns a valid UUID string", () => {
  assert.match(randomUUID(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
});

test("randomPick returns the only item from a single-item array", () => {
  assert.equal(randomPick(["only"]), "only");
});

test("randomPick returns one of the provided items", () => {
  const values = ["alpha", "beta", "gamma"];
  assert.ok(values.includes(randomPick(values)));
});

test("randomPick returns undefined for an empty array", () => {
  assert.equal(randomPick([]), undefined);
});

test("randomPick returns undefined for non-array input", () => {
  assert.equal(randomPick("nope"), undefined);
});

test("randomPick handles arrays containing falsy values", () => {
  const value = randomPick([0, false, null]);
  assert.ok([0, false, null].includes(value));
});

test("randomString can build longer tokens", () => {
  assert.equal(randomString(32).length, 32);
});
