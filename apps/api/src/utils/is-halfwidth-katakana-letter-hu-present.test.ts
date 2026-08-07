import assert from "node:assert/strict";

import { isHalfwidthKatakanaLetterHuPresent } from "./is-halfwidth-katakana-letter-hu-present";

assert.equal(isHalfwidthKatakanaLetterHuPresent("prefix \uFF8C suffix"), true);
assert.equal(isHalfwidthKatakanaLetterHuPresent("\uFF8C"), true);
assert.equal(isHalfwidthKatakanaLetterHuPresent(""), false);
assert.equal(isHalfwidthKatakanaLetterHuPresent("prefix suffix"), false);
assert.equal(isHalfwidthKatakanaLetterHuPresent("\uFF8B"), false);
assert.equal(isHalfwidthKatakanaLetterHuPresent("\u30D5"), false);
