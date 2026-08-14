import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterMiPresent } from "../src/utils/is-hiragana-letter-mi-present";

test("isHiraganaLetterMiPresent returns true when the input contains み", () => {
  assert.equal(isHiraganaLetterMiPresent("みず"), true);
});

test("isHiraganaLetterMiPresent returns false when the input does not contain み", () => {
  assert.equal(isHiraganaLetterMiPresent("むず"), false);
});
