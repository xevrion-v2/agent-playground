import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalLeekPresent } from "./is-kangxi-radical-leek-present";

assert.equal(isKangxiRadicalLeekPresent(""), false);
assert.equal(isKangxiRadicalLeekPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalLeekPresent("contains \u2fb2 radical"), true);
assert.equal(isKangxiRadicalLeekPresent("\u2fb2"), true);
assert.equal(isKangxiRadicalLeekPresent("nearby radical \u2fb3"), false);
