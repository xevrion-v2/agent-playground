import assert from "node:assert/strict";
import test from "node:test";

import { hasPipeCharacter } from "./has-pipe-character";

test("returns true when the pipe character is present", () => {
  assert.equal(hasPipeCharacter("a | b"), true);
});

test("returns false when the pipe character is absent", () => {
  assert.equal(hasPipeCharacter("a / b"), false);
});
