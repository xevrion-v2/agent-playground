import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterBiPresent } from "../src/utils/is-hiragana-letter-bi-present";

test("isHiraganaLetterBiPresent returns true when the input contains び", () => {
  assert.equal(isHiraganaLetterBiPresent("びく"), true);
});

test("isHiraganaLetterBiPresent returns false when the input does not contain び", () => {
  assert.equal(isHiraganaLetterBiPresent("ひく"), false);
});
