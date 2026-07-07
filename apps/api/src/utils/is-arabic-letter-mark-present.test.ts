import assert from "node:assert/strict";
import test from "node:test";

import { isArabicLetterMarkPresent } from "./is-arabic-letter-mark-present";

test("returns true when Arabic Letter Mark is present", () => {
  assert.equal(isArabicLetterMarkPresent("abc\u061cdef"), true);
  assert.equal(isArabicLetterMarkPresent("hello world"), false);
  assert.equal(isArabicLetterMarkPresent("abc"), false);
});
