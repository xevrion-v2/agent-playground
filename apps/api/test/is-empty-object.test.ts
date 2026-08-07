import assert from "node:assert/strict";
import { test } from "node:test";

import { isEmptyObject } from "../src/utils/is-empty-object.ts";

test("returns true for a plain object with no own keys", () => {
  assert.equal(isEmptyObject({}), true);
});

test("returns false when a plain object has string, symbol, or non-enumerable own keys", () => {
  const hidden = {};
  Object.defineProperty(hidden, "secret", {
    enumerable: false,
    value: "shh",
  });

  assert.equal(isEmptyObject({ value: undefined }), false);
  assert.equal(isEmptyObject({ [Symbol("hidden")]: true }), false);
  assert.equal(isEmptyObject(hidden), false);
});

test("returns false for arrays, nullish values, and non-plain objects", () => {
  assert.equal(isEmptyObject([]), false);
  assert.equal(isEmptyObject(null), false);
  assert.equal(isEmptyObject(undefined), false);
  assert.equal(isEmptyObject(new Date()), false);
  assert.equal(isEmptyObject(Object.create(null)), false);
});
