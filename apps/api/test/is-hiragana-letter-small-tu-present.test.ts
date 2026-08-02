import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSmallTuPresent } from "../src/utils/is-hiragana-letter-small-tu-present";

test("isHiraganaLetterSmallTuPresent returns true when the input contains っ", () => {
  assert.equal(isHiraganaLetterSmallTuPresent("きって"), true);
});

test("isHiraganaLetterSmallTuPresent returns false when the input does not contain っ", () => {
  assert.equal(isHiraganaLetterSmallTuPresent("きて"), false);
});
