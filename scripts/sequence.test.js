import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { naturals, take } from "./sequence.js";

describe("sequence", () => {
  it("yields first N naturals safely via take()", () => {
    assert.deepEqual(take(naturals(), 5), [1, 2, 3, 4, 5]);
  });

  it("supports custom start", () => {
    assert.deepEqual(take(naturals(10), 3), [10, 11, 12]);
  });
});
