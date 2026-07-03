import assert from "node:assert/strict";

import { hasDotCharacter } from "./has-dot-character.ts";

assert.equal(hasDotCharacter("1.0"), true);
assert.equal(hasDotCharacter("nodot"), false);
assert.equal(hasDotCharacter(".leading"), true);
assert.equal(hasDotCharacter(""), false);

console.log("hasDotCharacter tests passed");
