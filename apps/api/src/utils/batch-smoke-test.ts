import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalEatPresent } from "./is-kangxi-radical-eat-present";

assert.equal(isKangxiRadicalEatPresent(""), false);
assert.equal(isKangxiRadicalEatPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalEatPresent("contains \u2fb7 radical"), true);
assert.equal(isKangxiRadicalEatPresent("\u2fb7"), true);
assert.equal(isKangxiRadicalEatPresent("nearby radical \u2fb6"), false);
