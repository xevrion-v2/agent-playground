import assert from "node:assert/strict";
import test from "node:test";

import { isParagraphusMarkPresent } from "./is-paragraphus-mark-present";

test("returns true when the paragraphus mark character is present", () => {
  assert.equal(isParagraphusMarkPresent(`abc\u2e4ddef`), true);
  assert.equal(isParagraphusMarkPresent("abcdef"), false);
  assert.equal(isParagraphusMarkPresent("abc"), false);
});
