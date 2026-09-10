import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterTiPresent } from "../src/utils/is-hiragana-letter-ti-present";

test("isHiraganaLetterTiPresent returns true when the input contains ち", () => {
  assert.equal(isHiraganaLetterTiPresent("ちず"), true);
});

test("isHiraganaLetterTiPresent returns false when the input does not contain ち", () => {
  assert.equal(isHiraganaLetterTiPresent("しず"), false);
});
