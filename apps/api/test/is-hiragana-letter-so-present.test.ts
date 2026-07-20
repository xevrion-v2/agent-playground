import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSoPresent } from "../src/utils/is-hiragana-letter-so-present";

test("isHiraganaLetterSoPresent returns true when the input contains そ", () => {
  assert.equal(isHiraganaLetterSoPresent("そう"), true);
});

test("isHiraganaLetterSoPresent returns false when the input does not contain そ", () => {
  assert.equal(isHiraganaLetterSoPresent("とう"), false);
});
