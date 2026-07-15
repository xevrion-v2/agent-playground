import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterRaPresent } from "../src/utils/is-hiragana-letter-ra-present";

test("isHiraganaLetterRaPresent returns true when the input contains ら", () => {
  assert.equal(isHiraganaLetterRaPresent("さら"), true);
});

test("isHiraganaLetterRaPresent returns false when the input does not contain ら", () => {
  assert.equal(isHiraganaLetterRaPresent("さと"), false);
});
