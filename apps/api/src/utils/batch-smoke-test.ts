import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalVillagePresent } from "./is-kangxi-radical-village-present";

assert.equal(isKangxiRadicalVillagePresent(""), false);
assert.equal(isKangxiRadicalVillagePresent("plain ascii text"), false);
assert.equal(isKangxiRadicalVillagePresent("contains \u2fa5 radical"), true);
assert.equal(isKangxiRadicalVillagePresent("\u2fa5"), true);
assert.equal(isKangxiRadicalVillagePresent("nearby radical \u2fa6"), false);
