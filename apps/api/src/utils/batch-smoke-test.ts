import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalFacePresent } from "./is-kangxi-radical-face-present";

assert.equal(isKangxiRadicalFacePresent(""), false);
assert.equal(isKangxiRadicalFacePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalFacePresent("contains \u2faf radical"), true);
assert.equal(isKangxiRadicalFacePresent("\u2faf"), true);
assert.equal(isKangxiRadicalFacePresent("nearby radical \u2fb0"), false);
