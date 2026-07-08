import assert from "node:assert/strict";
import test from "node:test";

import { isTripleDaggerPresent } from "./is-triple-dagger-present";

test("returns true when the triple dagger character is present", () => {
  assert.equal(isTripleDaggerPresent(`abc\u2e4bdef`), true);
  assert.equal(isTripleDaggerPresent("abcdef"), false);
  assert.equal(isTripleDaggerPresent("abc"), false);
});
