import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalMoundPresent } from "./is-kangxi-radical-mound-present";

assert.equal(isKangxiRadicalMoundPresent(""), false);
assert.equal(isKangxiRadicalMoundPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalMoundPresent("contains \u2fa9 radical"), true);
assert.equal(isKangxiRadicalMoundPresent("\u2fa9"), true);
assert.equal(isKangxiRadicalMoundPresent("nearby radical \u2faa"), false);
