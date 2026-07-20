import assert from "node:assert/strict";

import { $fn as isKangxiRadicalFieldPresent } from "./is-kangxi-radical-field-present";

assert.equal(isKangxiRadicalFieldPresent(""), false);
assert.equal(isKangxiRadicalFieldPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalFieldPresent("contains \u2f65 radical"), true);
assert.equal(isKangxiRadicalFieldPresent("\u2f65"), true);
assert.equal(isKangxiRadicalFieldPresent("nearby radical \u2f64"), false);

console.log("API utils smoke tests passed");
