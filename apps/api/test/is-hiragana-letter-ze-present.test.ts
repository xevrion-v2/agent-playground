import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterZePresent } from "../src/utils/is-hiragana-letter-ze-present";

test("isHiraganaLetterZePresent returns true when the input contains ぜ", () => {
  assert.equal(isHiraganaLetterZePresent("ぜん"), true);
});

test("isHiraganaLetterZePresent returns false when the input does not contain ぜ", () => {
  assert.equal(isHiraganaLetterZePresent("せん"), false);
});
