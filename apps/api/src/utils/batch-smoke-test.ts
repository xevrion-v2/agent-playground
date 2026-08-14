import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalGoldPresent } from "./is-kangxi-radical-gold-present";

assert.equal(isKangxiRadicalGoldPresent(""), false);
assert.equal(isKangxiRadicalGoldPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalGoldPresent("contains \u2fa6 radical"), true);
assert.equal(isKangxiRadicalGoldPresent("\u2fa6"), true);
assert.equal(isKangxiRadicalGoldPresent("nearby radical \u2fa5"), false);
