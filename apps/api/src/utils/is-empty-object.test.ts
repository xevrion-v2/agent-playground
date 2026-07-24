import assert from "node:assert/strict";
import test from "node:test";

import { isEmptyObject } from "./is-empty-object.ts";

test("returns true for a plain object with no own keys", () => {
  assert.equal(isEmptyObject({}), true);
});

test("rejects objects with string or symbol keys", () => {
  assert.equal(isEmptyObject({ value: undefined }), false);
  assert.equal(isEmptyObject({ [Symbol("hidden")]: true }), false);
});

test("rejects arrays, nullish values, and non-plain objects", () => {
  assert.equal(isEmptyObject([]), false);
  assert.equal(isEmptyObject(null), false);
  assert.equal(isEmptyObject(new Date()), false);
});
