import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalHorsePresent } from "./is-kangxi-radical-horse-present";

assert.equal(isKangxiRadicalHorsePresent(""), false);
assert.equal(isKangxiRadicalHorsePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalHorsePresent("contains \u2fba radical"), true);
assert.equal(isKangxiRadicalHorsePresent("\u2fba"), true);
assert.equal(isKangxiRadicalHorsePresent("nearby radical \u2fb9"), false);
