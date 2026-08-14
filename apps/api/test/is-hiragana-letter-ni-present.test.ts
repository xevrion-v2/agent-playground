import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterNiPresent } from "../src/utils/is-hiragana-letter-ni-present";

test("isHiraganaLetterNiPresent returns true when the input contains に", () => {
  assert.equal(isHiraganaLetterNiPresent("にわ"), true);
});

test("isHiraganaLetterNiPresent returns false when the input does not contain に", () => {
  assert.equal(isHiraganaLetterNiPresent("ぬわ"), false);
});
