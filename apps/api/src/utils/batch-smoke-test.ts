import { strict as assert } from "node:assert";

import { $fn as isKangxiRadicalSoundPresent } from "./is-kangxi-radical-sound-present";

assert.equal(isKangxiRadicalSoundPresent(""), false);
assert.equal(isKangxiRadicalSoundPresent("plain ascii text"), false);
assert.equal(isKangxiRadicalSoundPresent("contains \u2fb3 radical"), true);
assert.equal(isKangxiRadicalSoundPresent("\u2fb3"), true);
assert.equal(isKangxiRadicalSoundPresent("nearby radical \u2fb2"), false);
