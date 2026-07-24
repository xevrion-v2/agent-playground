import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterMoPresent } from "../src/utils/is-hiragana-letter-mo-present";

test("isHiraganaLetterMoPresent returns true when the input contains も", () => {
  assert.equal(isHiraganaLetterMoPresent("もり"), true);
});

test("isHiraganaLetterMoPresent returns false when the input does not contain も", () => {
  assert.equal(isHiraganaLetterMoPresent("まり"), false);
});
