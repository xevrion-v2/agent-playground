import assert from "node:assert/strict";

import { $fn as isKangxiRadicalSweetPresent } from "./is-kangxi-radical-sweet-present";

assert.equal(isKangxiRadicalSweetPresent(""), false);
assert.equal(isKangxiRadicalSweetPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalSweetPresent("contains \u2f62 radical"), true);
assert.equal(isKangxiRadicalSweetPresent("\u2f62"), true);
assert.equal(isKangxiRadicalSweetPresent("nearby radical \u2f61"), false);

console.log("API utils smoke tests passed");
