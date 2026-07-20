import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterDuPresent } from "../src/utils/is-hiragana-letter-du-present";

test("isHiraganaLetterDuPresent returns true when the input contains づ", () => {
  assert.equal(isHiraganaLetterDuPresent("づく"), true);
});

test("isHiraganaLetterDuPresent returns false when the input does not contain づ", () => {
  assert.equal(isHiraganaLetterDuPresent("つく"), false);
});
