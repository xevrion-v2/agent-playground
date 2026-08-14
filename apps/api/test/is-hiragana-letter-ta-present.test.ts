import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterTaPresent } from "../src/utils/is-hiragana-letter-ta-present";

test("isHiraganaLetterTaPresent returns true when the input contains た", () => {
  assert.equal(isHiraganaLetterTaPresent("たこ"), true);
});

test("isHiraganaLetterTaPresent returns false when the input does not contain た", () => {
  assert.equal(isHiraganaLetterTaPresent("こ"), false);
});
