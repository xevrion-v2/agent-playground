const test = require("node:test");
const assert = require("node:assert/strict");
const { randomString, randomInt, randomUUID, randomPick } = require("./random");

test("randomString default length", () => {
  const value = randomString();
  assert.equal(value.length, 8);
});

test("randomString custom length", () => {
  assert.equal(randomString(12).length, 12);
});

test("randomString zero length", () => {
  assert.equal(randomString(0), "");
});

test("randomString negative length", () => {
  assert.equal(randomString(-3), "");
});

test("randomString custom charset", () => {
  const value = randomString(5, "abc");
  assert.match(value, /^[abc]{5}$/);
});

test("randomString empty charset", () => {
  assert.equal(randomString(5, ""), "");
});

test("randomInt within range", () => {
  for (let i = 0; i < 20; i += 1) {
    const n = randomInt(1, 3);
    assert.ok(n >= 1 && n <= 3);
  }
});

test("randomInt reversed bounds", () => {
  const n = randomInt(5, 2);
  assert.ok(n >= 2 && n <= 5);
});

test("randomInt single value range", () => {
  assert.equal(randomInt(4, 4), 4);
});

test("randomInt invalid range throws", () => {
  assert.throws(() => randomInt(2.9, 2.1), RangeError);
});

test("randomInt non-finite throws", () => {
  assert.throws(() => randomInt(Number.NaN, 1), TypeError);
});

test("randomUUID format", () => {
  assert.match(randomUUID(), /^[0-9a-f-]{36}$/);
});

test("randomPick returns element", () => {
  const item = randomPick(["a", "b", "c"]);
  assert.ok(["a", "b", "c"].includes(item));
});

test("randomPick empty array", () => {
  assert.equal(randomPick([]), undefined);
});

test("randomPick undefined input", () => {
  assert.equal(randomPick(undefined), undefined);
});

test("randomPick single item", () => {
  assert.equal(randomPick(["only"]), "only");
});

test("randomString uses only charset chars", () => {
  assert.match(randomString(10, "01"), /^[01]{10}$/);
});

test("randomInt negative range", () => {
  const n = randomInt(-5, -1);
  assert.ok(n >= -5 && n <= -1);
});

test("randomUUID unique-ish", () => {
  assert.notEqual(randomUUID(), randomUUID());
});

test("randomPick not array", () => {
  assert.equal(randomPick("nope"), undefined);
});

test("randomString non-finite length", () => {
  assert.equal(randomString(Number.POSITIVE_INFINITY), "");
});
