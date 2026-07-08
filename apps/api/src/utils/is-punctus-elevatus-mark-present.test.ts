import assert from "node:assert/strict";
import test from "node:test";

import { isPunctusElevatusMarkPresent } from "./is-punctus-elevatus-mark-present";

test("returns true when the punctus elevatus mark character is present", () => {
  assert.equal(isPunctusElevatusMarkPresent(`abc\u2e4edef`), true);
  assert.equal(isPunctusElevatusMarkPresent("abcdef"), false);
  assert.equal(isPunctusElevatusMarkPresent("abc"), false);
});
