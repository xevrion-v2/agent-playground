import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isCharacterPresent,
  resolveControlOrSpacingCharacter
} from "./characters";

describe("isCharacterPresent", () => {
  it("detects the null character by default", () => {
    assert.deepEqual(isCharacterPresent(`alpha${"\0"}omega`), {
      character: "\0",
      codePoint: "U+0000",
      present: true
    });
  });

  it("returns false when the requested character is absent", () => {
    assert.equal(isCharacterPresent("alpha omega", "tab").present, false);
  });

  it("supports named spacing characters", () => {
    assert.equal(isCharacterPresent("alpha omega", "space").present, true);
  });

  it("supports unicode code point input", () => {
    assert.equal(resolveControlOrSpacingCharacter("U+000A"), "\n");
    assert.equal(isCharacterPresent("alpha\nomega", "U+000A").present, true);
  });

  it("rejects non-control non-spacing characters", () => {
    assert.throws(() => isCharacterPresent("alpha", "a"), /control or spacing/);
  });
});
