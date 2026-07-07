import assert from "node:assert/strict";
import test from "node:test";

import { isObliqueHyphenPresent } from "./is-oblique-hyphen-present";

test("returns true when the oblique hyphen character is present", () => {
  assert.equal(isObliqueHyphenPresent(`abc\u2e5ddef`), true);
  assert.equal(isObliqueHyphenPresent("abcdef"), false);
  assert.equal(isObliqueHyphenPresent("abc"), false);
});
