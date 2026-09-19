const assert = require("node:assert/strict");
const test = require("node:test");

const { randomString, randomInt, randomUUID, randomPick } = require("../src/utils/random");

test("randomString returns the requested length", () => {
  assert.equal(randomString(12).length, 12);
});

test("randomString defaults to sixteen characters", () => {
  assert.equal(randomString().length, 16);
});

test("randomString supports a custom alphabet", () => {
  assert.match(randomString(20, "AB"), /^[AB]{20}$/);
});

test("randomString returns an empty string for zero length", () => {
  assert.equal(randomString(0), "");
});

test("randomString rejects negative lengths", () => {
  assert.throws(() => randomString(-1), RangeError);
});

test("randomString rejects fractional lengths", () => {
  assert.throws(() => randomString(1.5), RangeError);
});

test("randomString rejects an empty alphabet", () => {
  assert.throws(() => randomString(5, ""), TypeError);
});

test("randomString rejects non-string alphabets", () => {
  assert.throws(() => randomString(5, ["A"]), TypeError);
});

test("randomInt supports max-only form", () => {
  const value = randomInt(3);

  assert.ok(Number.isInteger(value));
  assert.ok(value >= 0);
  assert.ok(value < 3);
});

test("randomInt supports min/max form", () => {
  const value = randomInt(5, 8);

  assert.ok(Number.isInteger(value));
  assert.ok(value >= 5);
  assert.ok(value < 8);
});

test("randomInt supports negative ranges", () => {
  const value = randomInt(-5, -1);

  assert.ok(value >= -5);
  assert.ok(value < -1);
});

test("randomInt rejects equal bounds", () => {
  assert.throws(() => randomInt(2, 2), RangeError);
});

test("randomInt rejects descending bounds", () => {
  assert.throws(() => randomInt(4, 1), RangeError);
});

test("randomInt rejects fractional bounds", () => {
  assert.throws(() => randomInt(1.2, 5), TypeError);
});

test("randomInt rejects missing bounds", () => {
  assert.throws(() => randomInt(), TypeError);
});

test("randomUUID returns an RFC 4122 v4 UUID", () => {
  assert.match(randomUUID(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

test("randomUUID returns different values across calls", () => {
  assert.notEqual(randomUUID(), randomUUID());
});

test("randomPick returns an item from the array", () => {
  assert.ok(["red", "green", "blue"].includes(randomPick(["red", "green", "blue"])));
});

test("randomPick preserves object references", () => {
  const item = { id: 1 };

  assert.equal(randomPick([item]), item);
});

test("randomPick returns undefined for empty arrays", () => {
  assert.equal(randomPick([]), undefined);
});

test("randomPick rejects non-array input", () => {
  assert.throws(() => randomPick("red"), TypeError);
});
