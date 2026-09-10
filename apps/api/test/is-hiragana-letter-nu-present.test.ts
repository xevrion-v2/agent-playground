import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterNuPresent } from "../src/utils/is-hiragana-letter-nu-present";

test("isHiraganaLetterNuPresent returns true when the input contains ぬ", () => {
  assert.equal(isHiraganaLetterNuPresent("ぬい"), true);
});

test("isHiraganaLetterNuPresent returns false when the input does not contain ぬ", () => {
  assert.equal(isHiraganaLetterNuPresent("ない"), false);
});
