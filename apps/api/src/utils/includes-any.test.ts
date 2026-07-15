import { strict as assert } from "node:assert";
import { test } from "node:test";

import { includesAny } from "./includes-any";

test("detects overlapping values", () => {
  assert.equal(includesAny([1, 2, 3], [4, 2]), true);
  assert.equal(includesAny(["a", "b"], ["c", "d"]), false);
  assert.equal(includesAny(["a", "b"], []), false);
  assert.equal(includesAny([], ["a"]), false);
});
