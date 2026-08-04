import assert from "node:assert/strict";

import { isHiraganaLetterHuPresent } from "./is-hiragana-letter-hu-present";

assert.equal(isHiraganaLetterHuPresent("prefix \u3075 suffix"), true);
assert.equal(isHiraganaLetterHuPresent("\u3075"), true);
assert.equal(isHiraganaLetterHuPresent(""), false);
assert.equal(isHiraganaLetterHuPresent("prefix suffix"), false);
assert.equal(isHiraganaLetterHuPresent("\u3074"), false);
assert.equal(isHiraganaLetterHuPresent("\u3076"), false);
