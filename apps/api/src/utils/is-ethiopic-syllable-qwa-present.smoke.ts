import assert from "node:assert/strict";

import { isEthiopicSyllableQwaPresent } from "./is-ethiopic-syllable-qwa-present";

assert.equal(isEthiopicSyllableQwaPresent("prefix \u1248 suffix"), true);
assert.equal(isEthiopicSyllableQwaPresent(""), false);
assert.equal(isEthiopicSyllableQwaPresent("plain latin text"), false);
assert.equal(isEthiopicSyllableQwaPresent("\u1240\u1241\u1242"), false);
assert.equal(isEthiopicSyllableQwaPresent("\u124B"), false);
