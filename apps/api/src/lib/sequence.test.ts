import { test } from "node:test";
import assert from "node:assert/strict";
import { naturalNumbers, take, firstNaturalNumbers } from "./sequence.ts";

test("firstNaturalNumbers returns a safe prefix", () => {
  assert.deepEqual(firstNaturalNumbers(5), [0, 1, 2, 3, 4]);
  assert.deepEqual(firstNaturalNumbers(0), []);
});

test("naturalNumbers is infinite but safe to take from", () => {
  const gen = naturalNumbers();
  assert.equal(gen.next().value, 0);
  assert.equal(gen.next().value, 1);
  assert.deepEqual(take(naturalNumbers(), 3), [0, 1, 2]);
});

test("take rejects a negative count", () => {
  assert.throws(() => take(naturalNumbers(), -1));
});
