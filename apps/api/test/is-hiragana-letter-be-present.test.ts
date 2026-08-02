import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterBePresent } from "../src/utils/is-hiragana-letter-be-present";

test("isHiraganaLetterBePresent returns true when the input contains べ", () => {
  assert.equal(isHiraganaLetterBePresent("べん"), true);
});

test("isHiraganaLetterBePresent returns false when the input does not contain べ", () => {
  assert.equal(isHiraganaLetterBePresent("へん"), false);
});
