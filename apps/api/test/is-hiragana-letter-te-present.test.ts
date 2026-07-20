import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterTePresent } from "../src/utils/is-hiragana-letter-te-present";

test("isHiraganaLetterTePresent returns true when the input contains て", () => {
  assert.equal(isHiraganaLetterTePresent("てすと"), true);
});

test("isHiraganaLetterTePresent returns false when the input does not contain て", () => {
  assert.equal(isHiraganaLetterTePresent("すと"), false);
});
