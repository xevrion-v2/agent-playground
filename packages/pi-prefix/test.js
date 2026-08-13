import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { piPrefix } from "./index.js";

describe("piPrefix", () => {
  it("returns correct 100-digit prefix of PI", () => {
    const expected =
      "3.14159265358979323846264338327950288419716939937510" +
      "58209749445923078164062862089986280348253421170679";
    assert.equal(piPrefix(100), expected);
  });

  it("returns 3 for zero decimals", () => {
    assert.equal(piPrefix(0), "3");
  });

  it("returns 3.14 for two decimals", () => {
    assert.equal(piPrefix(2), "3.14");
  });

  it("is consistent for longer prefixes", () => {
    const short = piPrefix(50);
    const long = piPrefix(200);
    assert.ok(long.startsWith(short), "long prefix should start with short prefix");
  });

  it("throws for negative decimals", () => {
    assert.throws(() => piPrefix(-1), /non-negative integer/);
  });
});
