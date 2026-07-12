import test from "node:test";
import assert from "node:assert/strict";

import { isBellCharacterPresent } from "./is-bell-character-present";
import { isDeleteCharacterPresent } from "./is-delete-character-present";
import { isEscapeCharacterPresent } from "./is-escape-character-present";

test("control character helpers detect only their target characters", () => {
  assert.equal(isBellCharacterPresent("ring\u0007bell"), true);
  assert.equal(isBellCharacterPresent("ring bell"), false);

  assert.equal(isEscapeCharacterPresent("ansi\u001B[0m"), true);
  assert.equal(isEscapeCharacterPresent("ansi[0m"), false);

  assert.equal(isDeleteCharacterPresent("delete\u007Fchar"), true);
  assert.equal(isDeleteCharacterPresent("delete char"), false);
});
