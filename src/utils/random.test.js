const test = require("node:test");
const assert = require("node:assert");
const { randomInt, randomString, randomUUID, randomPick } = require("./random");

test("random utility tests", async (t) => {
  // --- randomInt Tests (7 tests) ---
  await t.test("randomInt returns an integer within range (min, max)", () => {
    const val = randomInt(5, 10);
    assert.ok(Number.isInteger(val));
    assert.ok(val >= 5 && val <= 10);
  });

  await t.test("randomInt handles negative min and max", () => {
    const val = randomInt(-10, -5);
    assert.ok(Number.isInteger(val));
    assert.ok(val >= -10 && val <= -5);
  });

  await t.test("randomInt handles single parameter (min as max, 0 as min)", () => {
    const val = randomInt(5);
    assert.ok(Number.isInteger(val));
    assert.ok(val >= 0 && val <= 5);
  });

  await t.test("randomInt swaps min and max if min > max", () => {
    const val = randomInt(10, 5);
    assert.ok(Number.isInteger(val));
    assert.ok(val >= 5 && val <= 10);
  });

  await t.test("randomInt throws TypeError for non-numeric inputs", () => {
    assert.throws(() => randomInt("5", 10), TypeError);
  });

  await t.test("randomInt returns min when min === max", () => {
    assert.strictEqual(randomInt(7, 7), 7);
  });

  await t.test("randomInt handles large range correctly", () => {
    const val = randomInt(1000000, 2000000);
    assert.ok(val >= 1000000 && val <= 2000000);
  });

  // --- randomString Tests (6 tests) ---
  await t.test("randomString returns string of default length (8)", () => {
    const str = randomString();
    assert.strictEqual(typeof str, "string");
    assert.strictEqual(str.length, 8);
  });

  await t.test("randomString returns string of requested length", () => {
    const str = randomString(15);
    assert.strictEqual(str.length, 15);
  });

  await t.test("randomString returns empty string when length is 0", () => {
    assert.strictEqual(randomString(0), "");
  });

  await t.test("randomString throws RangeError for negative length", () => {
    assert.throws(() => randomString(-5), RangeError);
  });

  await t.test("randomString throws TypeError for non-numeric length", () => {
    assert.throws(() => randomString("10"), TypeError);
  });

  await t.test("randomString returns only alphanumeric characters by default", () => {
    const str = randomString(100);
    assert.match(str, /^[a-zA-Z0-9]+$/);
  });

  // --- randomUUID Tests (2 tests) ---
  await t.test("randomUUID returns a valid UUID v4 format", () => {
    const uuid = randomUUID();
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  await t.test("randomUUID returns unique values on subsequent calls", () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    assert.notStrictEqual(uuid1, uuid2);
  });

  // --- randomPick Tests (6 tests) ---
  await t.test("randomPick returns a random item from array", () => {
    const arr = [10, 20, 30];
    const val = randomPick(arr);
    assert.ok(arr.includes(val));
  });

  await t.test("randomPick returns undefined for empty array", () => {
    assert.strictEqual(randomPick([]), undefined);
  });

  await t.test("randomPick throws TypeError for non-array inputs", () => {
    assert.throws(() => randomPick("hello"), TypeError);
  });

  await t.test("randomPick works with arrays of different types", () => {
    const arr = [{ name: "Alice" }, { name: "Bob" }];
    const val = randomPick(arr);
    assert.ok(arr.includes(val));
  });

  await t.test("randomPick picks an item that actually exists in the array", () => {
    const arr = [42];
    assert.strictEqual(randomPick(arr), 42);
  });

  await t.test("randomPick handles array with a single element", () => {
    const arr = ["only-one"];
    assert.strictEqual(randomPick(arr), "only-one");
  });
});
