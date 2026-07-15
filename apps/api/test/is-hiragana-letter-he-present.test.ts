import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterHePresent } from "../src/utils/is-hiragana-letter-he-present";

test("isHiraganaLetterHePresent returns true when the input contains へ", () => {
  assert.equal(isHiraganaLetterHePresent("へや"), true);
});

test("isHiraganaLetterHePresent returns false when the input does not contain へ", () => {
  assert.equal(isHiraganaLetterHePresent("ほや"), false);
});
