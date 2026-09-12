import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computePi, piToDecimalPlaces } from "../pi.ts";

describe("PI calculator", () => {
  it("computes PI to JavaScript precision", () => {
    const pi = computePi();
    assert.ok(Math.abs(pi - Math.PI) < 1e-10, `Expected ~${Math.PI}, got ${pi}`);
  });

  it("matches Math.PI to 14 digits", () => {
    const pi = computePi();
    const piStr = pi.toFixed(14);
    const expected = Math.PI.toFixed(14);
    assert.strictEqual(piStr, expected);
  });

  it("returns a string with the requested number of decimal places", () => {
    const result = piToDecimalPlaces(10);
    assert.strictEqual(result, "3.1415926535");
  });

  it("starts with the known digits of PI", () => {
    const result = piToDecimalPlaces(50);
    assert.ok(result.startsWith("3.1415926535897932384626433832795028841971693993"));
  });

  it("handles 0 decimal places", () => {
    assert.strictEqual(piToDecimalPlaces(0), "3.");
  });
});