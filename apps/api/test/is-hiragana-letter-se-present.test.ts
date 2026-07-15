import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSePresent } from "../src/utils/is-hiragana-letter-se-present";

test("isHiraganaLetterSePresent returns true when the input contains せ", () => {
  assert.equal(isHiraganaLetterSePresent("せん"), true);
});

test("isHiraganaLetterSePresent returns false when the input does not contain せ", () => {
  assert.equal(isHiraganaLetterSePresent("ぜん"), false);
});
