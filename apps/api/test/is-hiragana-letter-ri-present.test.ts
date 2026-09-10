import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterRiPresent } from "../src/utils/is-hiragana-letter-ri-present";

test("isHiraganaLetterRiPresent returns true when the input contains り", () => {
  assert.equal(isHiraganaLetterRiPresent("さり"), true);
});

test("isHiraganaLetterRiPresent returns false when the input does not contain り", () => {
  assert.equal(isHiraganaLetterRiPresent("さと"), false);
});
