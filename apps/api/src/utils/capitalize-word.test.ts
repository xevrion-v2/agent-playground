import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { capitalizeWord } from "./capitalize-word.js";

describe("capitalizeWord", () => {
  it("uppercases the first character of a lowercase word", () => {
    assert.equal(capitalizeWord("agent"), "Agent");
  });

  it("returns an empty string unchanged", () => {
    assert.equal(capitalizeWord(""), "");
  });

  it("preserves the rest of the word exactly", () => {
    assert.equal(capitalizeWord("gPT-codex"), "GPT-codex");
  });

  it("leaves strings with non-letter first characters structurally unchanged", () => {
    assert.equal(capitalizeWord("1agent"), "1agent");
    assert.equal(capitalizeWord("-agent"), "-agent");
  });
});
