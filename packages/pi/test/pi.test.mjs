import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computePi, verifyPi } from "../src/pi.mjs";

describe("@taskflow/pi — PI Calculator (#17)", () => {
  it('should return "3" for 0 digits', () => {
    const { pi } = computePi(0);
    assert.equal(pi, "3");
  });

  it("should compute 1 decimal digit correctly", () => {
    const { pi } = computePi(1);
    assert.ok(pi.startsWith("3."));
    assert.equal(pi.length, 3); // "3.1"
    assert.equal(pi, "3.1");
  });

  it("should compute 10 decimal digits correctly", () => {
    const { pi } = computePi(10);
    assert.equal(pi, "3.1415926535");
  });

  it("should compute 20 decimal digits correctly", () => {
    const { pi } = computePi(20);
    assert.equal(pi, "3.14159265358979323846");
  });

  it("should compute 50 decimal digits correctly", () => {
    const { pi } = computePi(50);
    const expected = "3.14159265358979323846264338327950288419716939937510";
    assert.equal(pi, expected);
  });

  it("should compute 100 decimal digits correctly", () => {
    const { pi } = computePi(100);
    const expected =
      "3.14159265358979323846264338327950288419716939937510" +
      "58209749445923078164062862089986280348253421170679";
    assert.equal(pi, expected);
  });

  it("should compute 200 decimal digits consistently", () => {
    const { pi } = computePi(200);
    // First 100 digits must match
    assert.ok(pi.startsWith("3.14159265358979323846264338327950288419716939937510"));
    // Must have correct length: "3." + 200 digits = 202 chars
    assert.equal(pi.length, 202);
    // Last 5 digits should be deterministic
    assert.equal(pi.slice(-5), "38196");
  });

  it("should return a SHA-256 certificate", () => {
    const { certificate } = computePi(50);
    assert.ok(certificate.sha256);
    assert.equal(certificate.sha256.length, 64); // hex-encoded SHA-256
    assert.equal(certificate.digits, 50);
    assert.equal(certificate.algorithm, "machin-bigint");
  });

  it("should include chunk certificates", () => {
    const { certificate } = computePi(120);
    assert.ok(certificate.chunks.length >= 2);
    assert.equal(certificate.chunks[0].start, 0);
    assert.equal(certificate.chunks[0].end, 50);
    assert.ok(certificate.chunks[0].sha256);
  });

  it("should produce consistent results across multiple calls", () => {
    const { pi: a } = computePi(50);
    const { pi: b } = computePi(50);
    assert.equal(a, b);
  });

  it("should handle negative digits gracefully", () => {
    const { pi } = computePi(-5);
    assert.equal(pi, "3");
  });

  it("verifyPi should validate correctly", () => {
    const { pi } = computePi(100);
    const result = verifyPi(pi, 100);
    assert.equal(result.valid, true);
  });

  it("verifyPi should reject incorrect values", () => {
    const result = verifyPi("3.14000", 5);
    assert.equal(result.valid, false);
  });
});