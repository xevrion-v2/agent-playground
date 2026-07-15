const test = require("node:test");
const assert = require("node:assert/strict");
const { chunk, unique, shuffle, groupBy } = require("./array-utils");

test("chunk splits array", () => {
  assert.deepEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
});

test("chunk empty array", () => {
  assert.deepEqual(chunk([], 2), []);
});

test("chunk invalid size", () => {
  assert.deepEqual(chunk([1, 2], 0), []);
});

test("chunk non-array", () => {
  assert.deepEqual(chunk(null, 2), []);
});

test("unique removes duplicates", () => {
  assert.deepEqual(unique([1, 1, 2, 3, 2]), [1, 2, 3]);
});

test("unique empty", () => {
  assert.deepEqual(unique([]), []);
});

test("unique non-array", () => {
  assert.deepEqual(unique(null), []);
});

test("shuffle preserves elements", () => {
  const input = [1, 2, 3, 4];
  const out = shuffle(input);
  assert.deepEqual([...out].sort(), input);
  assert.equal(out.length, input.length);
});

test("shuffle empty", () => {
  assert.deepEqual(shuffle([]), []);
});

test("shuffle non-array", () => {
  assert.deepEqual(shuffle(undefined), []);
});

test("groupBy groups items", () => {
  const rows = [{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }];
  assert.deepEqual(groupBy(rows, (r) => r.type), {
    a: [{ type: "a", v: 1 }, { type: "a", v: 3 }],
    b: [{ type: "b", v: 2 }],
  });
});

test("groupBy empty", () => {
  assert.deepEqual(groupBy([], (x) => x), {});
});

test("groupBy invalid keyFn", () => {
  assert.deepEqual(groupBy([1, 2], null), {});
});

test("groupBy non-array", () => {
  assert.deepEqual(groupBy(null, () => "x"), {});
});

test("chunk size 1", () => {
  assert.deepEqual(chunk(["a", "b"], 1), [["a"], ["b"]]);
});

test("unique strings", () => {
  assert.deepEqual(unique(["x", "y", "x"]), ["x", "y"]);
});

test("shuffle single item", () => {
  assert.deepEqual(shuffle([42]), [42]);
});

test("groupBy numeric keys", () => {
  assert.deepEqual(groupBy([1, 2, 3], (n) => n % 2), { 0: [2], 1: [1, 3] });
});

test("chunk large size", () => {
  assert.deepEqual(chunk([1, 2], 10), [[1, 2]]);
});

test("unique preserves order", () => {
  assert.deepEqual(unique(["b", "a", "b", "c"]), ["b", "a", "c"]);
});
